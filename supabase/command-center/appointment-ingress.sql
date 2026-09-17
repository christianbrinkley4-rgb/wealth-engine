-- Reviewed deployed definition for T65 Daily Command Center, project lyvhrxiukmlvrznkrtkv.
-- Applied remotely: 20260910145448_website_appointment_ingress;
-- function amended: 20260910145909_website_appointment_review_visibility.
-- This is a source record; do not rerun CREATE TABLE against the existing deployment.
-- Service-only ledger. Existing lead access policies and ownership are unchanged.

create table public.website_appointments (
  id uuid primary key default gen_random_uuid(),
  booking_uid text not null unique check (booking_uid ~ '^[a-zA-Z0-9_-]{8,128}$'),
  previous_uid text check (previous_uid ~ '^[a-zA-Z0-9_-]{8,128}$'),
  lead_id uuid not null references public.leads(id) on delete cascade,
  inquiry_id uuid references public.website_inquiries(id) on delete set null,
  event_type_id bigint not null check (event_type_id > 0),
  topic text not null check (topic in ('medicare', 'life_insurance', 'care_coverage', 'financial_planning')),
  status text not null check (status in ('requested', 'confirmed', 'cancelled', 'rejected', 'rescheduled')),
  starts_at timestamptz not null,
  ends_at timestamptz not null check (ends_at > starts_at),
  last_event_at timestamptz not null,
  last_event_rank integer not null,
  requires_review boolean not null default false,
  action_id uuid references public.lead_actions(id) on delete set null,
  -- Only a separate, explicit human outcome process may change attendance.
  attendance text not null default 'unknown' check (attendance in ('unknown', 'attended', 'no_show')),
  attendance_recorded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index website_appointments_lead_idx on public.website_appointments(lead_id, starts_at);
create index website_appointments_inquiry_idx on public.website_appointments(inquiry_id) where inquiry_id is not null;
create index website_appointments_action_idx on public.website_appointments(action_id) where action_id is not null;
create index website_appointments_previous_idx on public.website_appointments(previous_uid) where previous_uid is not null;
alter table public.website_appointments enable row level security;
revoke all on public.website_appointments from public, anon, authenticated;
grant select, insert, update on public.website_appointments to service_role;
comment on table public.website_appointments is 'Booking state, not proof of attendance, marketing consent, or a Medicare Scope of Appointment. Calendar notes, health answers and video credentials are not retained.';

create table public.website_appointment_events (
  event_key text primary key check (event_key ~ '^[a-f0-9]{64}$'),
  booking_uid text not null,
  event_type text not null,
  occurred_at timestamptz not null,
  received_at timestamptz not null default now(),
  disposition text not null check (disposition in ('applied', 'stale'))
);
alter table public.website_appointment_events enable row level security;
revoke all on public.website_appointment_events from public, anon, authenticated;
grant select, insert on public.website_appointment_events to service_role;

create or replace function public.capture_website_appointment(p_payload jsonb)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_uid text := p_payload->>'booking_uid';
  v_previous text := p_payload->>'previous_uid';
  v_key text := p_payload->>'event_key';
  v_event text := p_payload->>'event_type';
  v_status text := p_payload->>'status';
  v_topic text := p_payload->>'topic';
  v_email text := lower(trim(p_payload->>'email'));
  v_phone text := nullif(p_payload->>'phone', '');
  v_name text := trim(p_payload->>'full_name');
  v_at timestamptz;
  v_start timestamptz;
  v_end timestamptz;
  v_event_type bigint;
  v_rank integer;
  v_existing public.website_appointments%rowtype;
  v_old public.website_appointments%rowtype;
  v_lead public.leads%rowtype;
  v_id uuid;
  v_inquiry uuid;
  v_action uuid;
  v_matches uuid[];
  v_review boolean := false;
  v_note text;
  v_action_status text;
  v_projected timestamptz;
begin
  if jsonb_typeof(p_payload) is distinct from 'object' or octet_length(p_payload::text) > 4096 or
    v_uid is null or v_uid !~ '^[a-zA-Z0-9_-]{8,128}$' or
    v_key is null or v_key !~ '^[a-f0-9]{64}$' or
    (v_previous is not null and (v_previous !~ '^[a-zA-Z0-9_-]{8,128}$' or v_previous = v_uid)) or
    v_event is null or v_event not in ('BOOKING_CREATED','BOOKING_REQUESTED','BOOKING_RESCHEDULED','BOOKING_CANCELLED','BOOKING_REJECTED') or
    v_status is null or v_status not in ('requested','confirmed','cancelled','rejected') or
    v_topic is null or v_topic not in ('medicare','life_insurance','care_coverage','financial_planning') or
    v_email is null or length(v_email) > 254 or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or
    v_name is null or length(v_name) not between 1 and 160 or v_name ~ '[[:cntrl:]]' or
    (v_phone is not null and v_phone !~ '^[0-9]{10}$') or
    (v_event = 'BOOKING_RESCHEDULED' and v_previous is null) or
    not ((v_event = 'BOOKING_CREATED' and v_status = 'confirmed') or
      (v_event = 'BOOKING_REQUESTED' and v_status = 'requested') or
      (v_event = 'BOOKING_RESCHEDULED' and v_status in ('confirmed','requested')) or
      (v_event = 'BOOKING_CANCELLED' and v_status = 'cancelled') or
      (v_event = 'BOOKING_REJECTED' and v_status = 'rejected')) then
    raise exception 'Invalid appointment' using errcode = '22023';
  end if;
  begin
    v_at := (p_payload->>'occurred_at')::timestamptz;
    v_start := (p_payload->>'starts_at')::timestamptz;
    v_end := (p_payload->>'ends_at')::timestamptz;
    v_event_type := (p_payload->>'event_type_id')::bigint;
  exception when invalid_text_representation or invalid_datetime_format or datetime_field_overflow or numeric_value_out_of_range then
    raise exception 'Invalid appointment' using errcode = '22023';
  end;
  if v_at is null or v_start is null or v_end is null or v_event_type is null or v_event_type <= 0 or
    not isfinite(v_at) or not isfinite(v_start) or not isfinite(v_end) or
    v_at > now() + interval '5 minutes' or v_end <= v_start or v_end - v_start > interval '8 hours' then
    raise exception 'Invalid appointment' using errcode = '22023';
  end if;

  -- Shared with inquiry ingress: matching, booking state and visible tasks commit together.
  perform pg_advisory_xact_lock(hashtextextended('website-inquiry', 0));
  if exists (select 1 from public.website_appointment_events where event_key = v_key) then
    return jsonb_build_object('stored', true, 'duplicate', true);
  end if;
  v_rank := case v_event when 'BOOKING_CANCELLED' then 60 when 'BOOKING_REJECTED' then 60
    when 'BOOKING_RESCHEDULED' then 50 when 'BOOKING_CREATED' then 20 else 10 end;
  select * into v_existing from public.website_appointments where booking_uid = v_uid;
  if v_existing.id is not null and (v_existing.event_type_id <> v_event_type or
    v_existing.topic <> v_topic or (v_previous is not null and v_existing.previous_uid is not null
      and v_previous <> v_existing.previous_uid)) then
    raise exception 'Inconsistent appointment' using errcode = '22023';
  end if;
  if v_existing.id is not null and (v_at < v_existing.last_event_at or
    (v_at = v_existing.last_event_at and v_rank <= v_existing.last_event_rank)) then
    -- Cal may deliver the replacement's create/cancel before its reschedule event.
    -- Retain that chain without rolling the replacement back to an older state.
    if v_event = 'BOOKING_RESCHEDULED' and v_existing.previous_uid is null and
      v_existing.event_type_id = v_event_type and v_existing.topic = v_topic and
      exists (select 1 from public.leads where id = v_existing.lead_id and
        lower(trim(email)) = v_email and lower(trim(name)) = lower(v_name)) then
      select * into v_lead from public.leads where id = v_existing.lead_id for update;
      v_review := coalesce(v_existing.requires_review or v_lead.do_not_call or v_lead.do_not_knock or
        v_lead.dnc_reason is not null or
        (v_lead.callable = false and v_lead.source <> 'Calendar booking' and not (
          v_lead.source = 'Website' and nullif(trim(v_lead.phone), '') is null and
          nullif(trim(v_lead.phone2), '') is null and v_lead.email_consent and v_lead.ptc_on_file)) or
        coalesce(v_lead.assigned_to not in ('Christian', 'Both', 'Either'), true) or
        exists (select 1 from public.website_inquiries where id = v_existing.inquiry_id and requires_review), false);
      select * into v_old from public.website_appointments where booking_uid = v_previous;
      if v_old.id is null or (v_old.lead_id = v_existing.lead_id and v_old.topic = v_topic) then
        update public.website_appointments set previous_uid = v_previous, requires_review = v_review, updated_at = now()
          where id = v_existing.id;
        if v_review then
          -- The service-only review flag must also appear where Christian works.
          -- Preserve a person's completed task and avoid repeating the warning on retries.
          update public.lead_actions set due_at = least(due_at, now()),
            note = case when position('REVIEW REQUIRED:' in coalesce(note, '')) > 0 then note else
              'REVIEW REQUIRED: contact restriction, ownership or identity changed. Do not initiate automated outreach.' ||
              E'\n' || coalesce(note, '') end
            where id = v_existing.action_id and created_by = 'Calendar' and status = 'pending';
        end if;
        if v_old.id is not null then
          update public.website_appointments set status = 'rescheduled', updated_at = now(),
            requires_review = requires_review or v_review,
            last_event_at = greatest(last_event_at, v_at),
            last_event_rank = case when last_event_at > v_at then last_event_rank
              when last_event_at = v_at then greatest(last_event_rank, 50) else 50 end
            where id = v_old.id;
          update public.lead_actions set status = 'cancelled'
            where id = v_old.action_id and created_by = 'Calendar' and status = 'pending';
          -- Clear only the obsolete managed time, not an unrelated manual appointment.
          update public.leads set appointment_datetime = (
            select min(starts_at) from public.website_appointments where lead_id = v_old.lead_id
              and status = 'confirmed' and not requires_review and starts_at >= now()
          ) where id = v_old.lead_id and assigned_to = 'Christian'
            and not v_review and appointment_datetime = v_old.starts_at;
        end if;
      end if;
    end if;
    insert into public.website_appointment_events(event_key, booking_uid, event_type, occurred_at, disposition)
      values (v_key, v_uid, v_event, v_at, 'stale');
    return jsonb_build_object('stored', true, 'duplicate', false, 'stale', true);
  end if;

  if v_existing.id is not null then
    -- A booking UID can never be reassigned to a different lead or service via later events.
    v_id := v_existing.lead_id;
    v_inquiry := v_existing.inquiry_id;
    v_review := v_existing.requires_review;
  else
    -- A verified reschedule chain is stronger than re-matching a shared household email.
    if v_previous is not null then
      select * into v_old from public.website_appointments where booking_uid = v_previous;
      if v_old.id is not null and v_old.topic = v_topic then
        select * into v_lead from public.leads where id = v_old.lead_id;
        if lower(trim(v_lead.email)) = v_email and lower(trim(v_lead.name)) = lower(v_name) then
          v_id := v_old.lead_id;
          v_inquiry := v_old.inquiry_id;
          v_review := v_old.requires_review;
        end if;
      end if;
    end if;
    -- Exact email plus compatible name/phone only; a shared telephone is not an identity.
    if v_id is null then
    select array_agg(id) into v_matches from public.leads where lower(trim(email)) = v_email;
    if cardinality(v_matches) = 1 then
      select * into v_lead from public.leads where id = v_matches[1];
      if lower(trim(v_lead.name)) = lower(v_name) and
        (v_phone is null or (nullif(v_lead.phone, '') is null and nullif(v_lead.phone2, '') is null) or
         right(regexp_replace(coalesce(v_lead.phone, ''), '[^0-9]', '', 'g'), 10) = v_phone or
         right(regexp_replace(coalesce(v_lead.phone2, ''), '[^0-9]', '', 'g'), 10) = v_phone) then
        v_id := v_lead.id;
      else
        v_review := true;
      end if;
    elsif coalesce(cardinality(v_matches), 0) > 1 then
      v_review := true;
    end if;
    if v_id is null then
      if v_phone is not null and exists (select 1 from public.leads where
        right(regexp_replace(coalesce(phone, ''), '[^0-9]', '', 'g'), 10) = v_phone or
        right(regexp_replace(coalesce(phone2, ''), '[^0-9]', '', 'g'), 10) = v_phone) then
        v_review := true;
      end if;
      insert into public.leads(name, email, phone, source, assigned_to, lead_type, status,
        stage_bucket, callable, ptc_on_file, sms_consent, email_consent, tags, notes)
      values(v_name, v_email, v_phone, 'Calendar booking', 'Christian',
        case v_topic when 'medicare' then 'Medicare' when 'life_insurance' then 'Life'
          when 'care_coverage' then 'Care' else 'Retirement' end,
        'New', 'Unscheduled', false, false, false, false, array['Calendar booking', v_topic],
        'Requested a calendar appointment with Christian. This booking does not grant marketing permission or replace a Medicare Scope of Appointment.')
      returning id into v_id;
    end if;
    end if;
    -- Link only the latest preceding inquiry for the same person and requested service.
    select id into v_inquiry from public.website_inquiries
      where lead_id = v_id and lower(trim(payload->>'email')) = v_email and interest_topic = v_topic
        and received_at <= v_at + interval '5 minutes' and received_at >= v_at - interval '90 days'
      order by received_at desc, id limit 1;
  end if;
  select * into v_lead from public.leads where id = v_id for update;
  -- Email-only website inquiries have callable=false simply because they supplied no
  -- phone. Their explicit email/PTC permission is preserved without inventing call consent.
  v_review := v_review or v_lead.do_not_call or v_lead.do_not_knock or v_lead.dnc_reason is not null or
    (v_lead.callable = false and v_lead.source <> 'Calendar booking' and not (
      v_lead.source = 'Website' and nullif(trim(v_lead.phone), '') is null and
      nullif(trim(v_lead.phone2), '') is null and v_lead.email_consent and v_lead.ptc_on_file)) or
    coalesce(v_lead.assigned_to not in ('Christian', 'Both', 'Either'), true) or
    lower(trim(coalesce(v_lead.email, ''))) <> v_email or
    exists (select 1 from public.website_inquiries where id = v_inquiry and requires_review);
  v_review := coalesce(v_review, false);

  if v_previous is not null then
    select * into v_old from public.website_appointments where booking_uid = v_previous;
    if v_old.id is not null and (v_old.lead_id <> v_id or v_old.topic <> v_topic) then
      -- An inconsistent chain cannot cancel another person's appointment.
      v_review := true;
      v_previous := null;
    elsif v_old.id is not null then
      update public.website_appointments set status = 'rescheduled', updated_at = now(),
        last_event_at = greatest(last_event_at, v_at),
        last_event_rank = case when last_event_at > v_at then last_event_rank
          when last_event_at = v_at then greatest(last_event_rank, 50) else 50 end
        where id = v_old.id;
      update public.lead_actions set status = 'cancelled'
        where id = v_old.action_id and created_by = 'Calendar' and status = 'pending';
    end if;
  end if;
  -- A replacement can arrive before its original create webhook. Never revive the old slot.
  if exists (select 1 from public.website_appointments where previous_uid = v_uid and lead_id = v_id)
    then v_status := 'rescheduled'; end if;

  v_note := 'CALENDAR APPOINTMENT — Christian' || E'\nStatus: ' || v_status ||
    E'\nTopic: ' || v_topic || E'\nTime: ' ||
    to_char(v_start at time zone 'America/New_York', 'Mon DD, YYYY HH12:MI AM') || ' America/New_York' ||
    E'\nBooking reference: ' || v_uid ||
    E'\nUse Cal.com for meeting details, confirmation and cancellation.' ||
    E'\nBooking is not marketing consent or proof of attendance. Record the actual outcome after the meeting.' ||
    case when v_topic = 'medicare' then E'\nConfirm required Medicare appointment scope before discussing plan-specific products.' else '' end ||
    case when v_review then E'\nREVIEW REQUIRED: contact restriction, ownership or identity needs review. Do not initiate automated outreach.' else '' end;
  v_action_status := case when v_status in ('confirmed','requested') then 'pending' else 'cancelled' end;
  v_action := v_existing.action_id;
  if v_action is null and v_action_status = 'pending' then
    insert into public.lead_actions(lead_id, action_type, due_at, note, status, created_by, assigned_to)
      values(v_id, 'Other', case when v_status = 'requested' or v_review then now() else v_start end,
        v_note, 'pending', 'Calendar', 'Christian') returning id into v_action;
  elsif v_action is not null then
    -- Do not reopen a task a person already completed or change unrelated follow-ups.
    update public.lead_actions set due_at = case when v_status = 'requested' or v_review then now() else v_start end,
      note = v_note, status = v_action_status
      where id = v_action and created_by = 'Calendar' and status = 'pending';
  end if;

  insert into public.website_appointments(booking_uid, previous_uid, lead_id, inquiry_id, event_type_id,
    topic, status, starts_at, ends_at, last_event_at, last_event_rank, requires_review, action_id)
  values(v_uid, v_previous, v_id, v_inquiry, v_event_type, v_topic, v_status,
    v_start, v_end, v_at, v_rank, v_review, v_action)
  on conflict (booking_uid) do update set status = excluded.status, starts_at = excluded.starts_at,
    ends_at = excluded.ends_at, last_event_at = excluded.last_event_at, last_event_rank = excluded.last_event_rank,
    previous_uid = coalesce(public.website_appointments.previous_uid, excluded.previous_uid),
    requires_review = excluded.requires_review, action_id = excluded.action_id, updated_at = now();

  -- Reflect the next confirmed slot only when Christian owns this lead and the field is
  -- empty or still points at a time managed by this integration. No stages/consents change.
  if v_lead.assigned_to = 'Christian' and not v_review and
    (v_lead.appointment_datetime is null or v_lead.appointment_datetime = v_existing.starts_at or
      v_lead.appointment_datetime = v_old.starts_at or exists (select 1 from public.website_appointments
        where lead_id = v_id and starts_at = v_lead.appointment_datetime)) then
    select min(starts_at) into v_projected from public.website_appointments
      where lead_id = v_id and status = 'confirmed' and starts_at >= now() and not requires_review;
    update public.leads set appointment_datetime = v_projected where id = v_id;
  end if;
  insert into public.activity_log(lead_id, activity_type, outcome, notes, logged_by)
    values(v_id, 'Calendar Appointment', v_status, v_note, 'Calendar');
  insert into public.website_appointment_events(event_key, booking_uid, event_type, occurred_at, disposition)
    values(v_key, v_uid, v_event, v_at, 'applied');
  return jsonb_build_object('stored', true, 'duplicate', false, 'requires_review', v_review);
end;
$$;
revoke all on function public.capture_website_appointment(jsonb) from public, anon, authenticated;
grant execute on function public.capture_website_appointment(jsonb) to service_role;

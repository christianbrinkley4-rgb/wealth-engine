-- Run AFTER appointment-ingress.sql is applied, in a controlled verification session.
-- All fixtures and events roll back. Returns only an aggregate success message.
begin;
do $$
declare
  suffix text := replace(gen_random_uuid()::text, '-', '');
  email1 text;
  email2 text;
  lead1 uuid;
  lead2 uuid;
  inquiry1 uuid;
  first_uid text;
  next_uid text;
  third_uid text;
  direct_uid text;
  p jsonb;
  result jsonb;
  saved jsonb;
  role_name text;
  table_name text;
  lead3 uuid;
  email3 text;
  record_at timestamptz := now() - interval '1 hour';
  first_time timestamptz := now() + interval '3 days';
  next_time timestamptz := now() + interval '4 days';
begin
  foreach role_name in array array['anon', 'authenticated'] loop
    foreach table_name in array array['website_appointments', 'website_appointment_events'] loop
      if has_table_privilege(role_name, 'public.' || table_name, 'SELECT,INSERT,UPDATE,DELETE') then
        raise exception 'Unexpected public ledger privilege';
      end if;
    end loop;
    if has_function_privilege(role_name, 'public.capture_website_appointment(jsonb)', 'EXECUTE') then
      raise exception 'Unexpected public appointment RPC privilege';
    end if;
  end loop;
  if exists (select 1 from pg_class where oid in ('public.website_appointments'::regclass,
    'public.website_appointment_events'::regclass) and not relrowsecurity) then
    raise exception 'Appointment ledger RLS is missing';
  end if;
  if not has_function_privilege('service_role','public.capture_website_appointment(jsonb)','EXECUTE') then
    raise exception 'Service appointment RPC privilege is missing';
  end if;
  email1 := 'booking-test-' || suffix || '@example.invalid';
  email2 := 'restricted-test-' || suffix || '@example.invalid';
  first_uid := 'first_' || suffix;
  next_uid := 'next_' || suffix;
  third_uid := 'third_' || suffix;
  direct_uid := 'direct_' || suffix;
  insert into public.leads(name,email,source,assigned_to,callable,email_consent,sms_consent,ptc_on_file)
    values ('Booking Verification', email1, 'Website', 'Christian', false, true, false, true)
    returning id into lead1;
  insert into public.website_inquiries(request_key, lead_id, received_at, source, interest_topic, payload)
    values (encode(sha256(convert_to('inquiry-' || suffix, 'UTF8')), 'hex'), lead1,
      record_at - interval '1 minute', 'help_quiz', 'medicare', jsonb_build_object('email',email1))
    returning id into inquiry1;
  p := jsonb_build_object('event_key', encode(sha256(convert_to('create-' || suffix, 'UTF8')), 'hex'),
    'event_type','BOOKING_CREATED','occurred_at',record_at,'booking_uid',first_uid,'previous_uid',null,
    'event_type_id',123,'status','confirmed','starts_at',first_time,'ends_at',first_time + interval '30 minutes',
    'full_name','Booking Verification','email',email1,'phone',null,'topic','medicare');
  result := public.capture_website_appointment(p);
  if result->>'stored' <> 'true' or not exists (select 1 from public.website_appointments
    where booking_uid=first_uid and lead_id=lead1 and inquiry_id=inquiry1 and status='confirmed' and attendance='unknown') then
    raise exception 'Creation/inquiry link verification failed';
  end if;
  if result->>'requires_review' <> 'false' or not exists (select 1 from public.leads where id=lead1
    and appointment_datetime=first_time and not callable and email_consent and ptc_on_file and phone is null) then
    raise exception 'Email-only appointment or consent preservation failed';
  end if;
  result := public.capture_website_appointment(p);
  if result->>'duplicate' <> 'true' or (select count(*) from public.activity_log where lead_id=lead1 and logged_by='Calendar') <> 1 then
    raise exception 'Replay verification failed';
  end if;

  -- The replacement creation reaches us before its reschedule webhook.
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('new-' || suffix,'UTF8')),'hex'),
    'booking_uid',next_uid,'occurred_at',record_at+interval '3 minutes',
    'starts_at',next_time,'ends_at',next_time+interval '30 minutes');
  perform public.capture_website_appointment(p);
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('move-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_RESCHEDULED','previous_uid',first_uid,'occurred_at',record_at+interval '2 minutes');
  perform public.capture_website_appointment(p);
  if not exists (select 1 from public.website_appointments where booking_uid=first_uid and status='rescheduled') or
    not exists (select 1 from public.website_appointments where booking_uid=next_uid and status='confirmed' and previous_uid=first_uid) or
    not exists (select 1 from public.leads where id=lead1 and appointment_datetime=next_time) then
    raise exception 'Out-of-order reschedule verification failed';
  end if;

  -- Even a later original create cannot revive a slot that has a replacement.
  saved := p;
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('old-create-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_CREATED','booking_uid',first_uid,'previous_uid',null,
    'occurred_at',record_at+interval '4 minutes','starts_at',first_time,'ends_at',first_time+interval '30 minutes');
  perform public.capture_website_appointment(p);
  if not exists (select 1 from public.website_appointments where booking_uid=first_uid and status='rescheduled'
    and last_event_at >= record_at+interval '2 minutes') or
    not exists (select 1 from public.leads where id=lead1 and appointment_datetime=next_time) then
    raise exception 'Superseded original appointment revived';
  end if;
  p := saved;

  -- Cancel, then deliver an older create: the confirmed slot must not return.
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('cancel-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_CANCELLED','status','cancelled','previous_uid',null,'occurred_at',record_at+interval '5 minutes');
  perform public.capture_website_appointment(p);
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('late-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_CREATED','status','confirmed','occurred_at',record_at+interval '4 minutes');
  perform public.capture_website_appointment(p);
  if not exists (select 1 from public.website_appointments where booking_uid=next_uid and status='cancelled' and attendance='unknown') or
    not exists (select 1 from public.leads where id=lead1 and appointment_datetime is null and email_consent and ptc_on_file and not sms_consent) then
    raise exception 'Cancellation/state or permission preservation failed';
  end if;

  -- A requested slot does not become a confirmed appointment merely by existing.
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('request-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_REQUESTED','booking_uid',third_uid,'status','requested','occurred_at',record_at+interval '6 minutes');
  perform public.capture_website_appointment(p);
  if not exists (select 1 from public.leads where id=lead1 and appointment_datetime is null) then
    raise exception 'Unconfirmed appointment projection failed';
  end if;

  -- An inconsistent previous UID must not cancel a different slot or partially commit.
  saved := p;
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('bad-chain-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_RESCHEDULED','booking_uid',next_uid,'previous_uid',third_uid,
    'status','confirmed','occurred_at',record_at+interval '8 minutes');
  begin
    perform public.capture_website_appointment(p);
    raise exception 'Expected inconsistent chain rejection';
  exception when sqlstate '22023' then null;
  end;
  if not exists (select 1 from public.website_appointments where booking_uid=third_uid and status='requested') or
    not exists (select 1 from public.website_appointments where booking_uid=next_uid and previous_uid=first_uid and status='cancelled') or
    exists (select 1 from public.website_appointment_events where event_key=p->>'event_key') then
    raise exception 'Inconsistent chain produced side effects';
  end if;
  p := saved;

  -- A manual time remains unchanged when a separate calendar booking arrives or cancels.
  update public.leads set appointment_datetime=first_time+interval '7 days' where id=lead1;
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('manual-create-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_CREATED','booking_uid','manual_'||suffix,'previous_uid',null,'status','confirmed');
  perform public.capture_website_appointment(p);
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('manual-cancel-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_CANCELLED','status','cancelled','occurred_at',record_at+interval '8 minutes');
  perform public.capture_website_appointment(p);
  if not exists (select 1 from public.leads where id=lead1 and appointment_datetime=first_time+interval '7 days') then
    raise exception 'Manual appointment time was changed';
  end if;

  -- Household-shared email with a different name is a separate review record.
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('shared-email-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_CREATED','booking_uid','shared_'||suffix,'status','confirmed','full_name','Different Household Member');
  result := public.capture_website_appointment(p);
  if result->>'requires_review' <> 'true' or not exists (select 1 from public.website_appointments
    where booking_uid='shared_'||suffix and lead_id<>lead1 and inquiry_id is null) then
    raise exception 'Ambiguous email identity was merged';
  end if;

  -- Existing restricted contacts retain their owner and all consent/DNC flags.
  insert into public.leads(name,email,source,assigned_to,do_not_call,callable,email_consent,sms_consent,ptc_on_file,appointment_datetime)
    values ('Restricted Verification',email2,'Imported','Will',true,false,false,false,false,first_time)
    returning id into lead2;
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('restricted-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_CREATED','booking_uid','restricted_'||suffix,'status','confirmed',
    'full_name','Restricted Verification','email',email2,'occurred_at',record_at+interval '7 minutes');
  result := public.capture_website_appointment(p);
  if result->>'requires_review' <> 'true' or not exists (select 1 from public.leads
    where id=lead2 and assigned_to='Will' and do_not_call and not callable and not email_consent
      and not sms_consent and not ptc_on_file and appointment_datetime=first_time) then
    raise exception 'Restricted-contact preservation failed';
  end if;

  -- A direct calendar booking is not an opt-in to marketing.
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('direct-' || suffix,'UTF8')),'hex'),
    'booking_uid',direct_uid,'full_name','Direct Verification','email','direct-'||suffix||'@example.invalid');
  perform public.capture_website_appointment(p);
  if not exists (select 1 from public.website_appointments a join public.leads l on l.id=a.lead_id
    where a.booking_uid=direct_uid and a.inquiry_id is null and not l.callable and not l.email_consent
      and not l.sms_consent and not l.ptc_on_file and a.attendance='unknown') then
    raise exception 'Direct-booking consent verification failed';
  end if;

  -- Restrictions can change after the replacement create but before a delayed reschedule.
  email3 := 'changed-restriction-'||suffix||'@example.invalid';
  insert into public.leads(name,email,source,assigned_to,callable,email_consent,ptc_on_file)
    values ('Changed Restriction',email3,'Website','Christian',true,true,true) returning id into lead3;
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('restrict-old-' || suffix,'UTF8')),'hex'),
    'booking_uid','restrict_old_'||suffix,'full_name','Changed Restriction','email',email3,
    'occurred_at',record_at,'starts_at',first_time,'ends_at',first_time+interval '30 minutes');
  perform public.capture_website_appointment(p);
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('restrict-new-' || suffix,'UTF8')),'hex'),
    'booking_uid','restrict_new_'||suffix,'occurred_at',record_at+interval '3 minutes',
    'starts_at',next_time,'ends_at',next_time+interval '30 minutes');
  perform public.capture_website_appointment(p);
  update public.leads set do_not_call=true,callable=false where id=lead3;
  p := p || jsonb_build_object('event_key',encode(sha256(convert_to('restrict-move-' || suffix,'UTF8')),'hex'),
    'event_type','BOOKING_RESCHEDULED','previous_uid','restrict_old_'||suffix,
    'occurred_at',record_at+interval '2 minutes');
  perform public.capture_website_appointment(p);
  if not exists (select 1 from public.leads where id=lead3 and do_not_call and not callable and appointment_datetime=first_time) or
    not exists (select 1 from public.website_appointments where booking_uid='restrict_new_'||suffix and requires_review) or
    not exists (select 1 from public.website_appointments where booking_uid='restrict_old_'||suffix and requires_review and status='rescheduled') then
    raise exception 'Stale reschedule ignored current restrictions';
  end if;
  if not exists (select 1 from public.website_appointments a join public.lead_actions t on t.id=a.action_id
    where a.booking_uid='restrict_new_'||suffix and t.status='pending' and t.due_at<=now()
      and position('REVIEW REQUIRED:' in t.note)>0) then
    raise exception 'Delayed-reschedule review was not visible in the command center';
  end if;
end;
$$;
rollback;
select 'Appointment transaction checks passed; fixture changes rolled back.' as verification;

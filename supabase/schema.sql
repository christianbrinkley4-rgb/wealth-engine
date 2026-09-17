-- DEVELOPER NOTE: Run this file in:
-- Supabase Dashboard → SQL Editor → New Query
-- Paste contents → Click Run
-- Last updated: May 10, 2026

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Auth / legacy ownership
  user_id uuid references auth.users(id) on delete set null,

  -- Contact
  email text not null,
  full_name text,
  phone text,
  phone_number text,
  net_triggered text,
  zip_code text,
  primary_zip_code text,

  -- Medicare wizard outputs
  filing_status text check (
    filing_status in ('individual', 'married_jointly') or filing_status is null
  ),
  age integer check (age >= 18 and age <= 100 or age is null),
  annual_income numeric check (annual_income >= 0 or annual_income is null),
  calculated_premium numeric,
  irmaa_bracket text,

  -- Capture source - critical for Make.com filtering in Phase 2.
  -- Nullable only so older Wealth Engine rows/routes keep working.
  source text check (source in (
    'wizard_completion',
    'wizard_soft_ask',
    'exit_intent',
    'footer_subscribe',
    'pdf_request',
    'tax_waitlist',
    'sms_optin',
    'about_page_cta',
    'roth_calculator',
    'help_quiz'
  ) or source is null),

  -- Help quiz (/start) fields
  interest_topic text check (
    interest_topic in (
      'medicare',
      'annuities',
      'financial_planning',
      'life_insurance'
    ) or interest_topic is null
  ),
  quiz_answers jsonb,

  -- Engagement lifecycle
  consultation_requested boolean default false,
  consultation_scheduled boolean default false,

  -- Compliance
  consent_given boolean default true,

  -- Existing Wealth Engine / dossier fields
  estimated_income numeric(12,2),
  calculated_tax_drag numeric(12,2) default 0,
  irmaa_risk_status text check (
    irmaa_risk_status in ('low', 'moderate', 'high') or irmaa_risk_status is null
  ),
  funnel text check (funnel in ('WEALTH', 'MEDICARE') or funnel is null),
  annual_contribution numeric(12,2),
  portfolio_value numeric(14,2),
  strategic_alpha numeric(14,2),
  include_nc_tax boolean default true,
  nc_tax_drag numeric(12,2) default 0,
  key_outcome_label text,
  key_outcome_value numeric(14,2),
  cta_variant text,
  preset_id text,
  goals text,
  notes text,
  enriched_data jsonb,
  master_dossier jsonb,
  payload jsonb default '{}'::jsonb
);

-- Phase 1/3 columns for projects with the older schema already installed
alter table public.leads add column if not exists zip_code text;
alter table public.leads add column if not exists annual_income numeric;
alter table public.leads add column if not exists calculated_premium numeric;
alter table public.leads add column if not exists irmaa_bracket text;
alter table public.leads add column if not exists source text;
alter table public.leads add column if not exists consultation_requested boolean default false;
alter table public.leads add column if not exists consultation_scheduled boolean default false;
alter table public.leads add column if not exists consent_given boolean default true;
alter table public.leads add column if not exists phone_number text;
alter table public.leads add column if not exists net_triggered text;
alter table public.leads add column if not exists lead_score integer;
alter table public.leads add column if not exists interest_topic text;
alter table public.leads add column if not exists quiz_answers jsonb;

create index if not exists leads_score_idx on public.leads(lead_score desc);
create index if not exists leads_risk_idx  on public.leads(irmaa_risk_status);
create index if not exists leads_interest_topic_idx on public.leads(interest_topic);

alter table public.leads drop constraint if exists leads_source_check;

alter table public.leads
  add constraint leads_source_check
  check (
    source in (
      'wizard_completion',
      'wizard_soft_ask',
      'exit_intent',
      'footer_subscribe',
      'pdf_request',
      'tax_waitlist',
      'sms_optin',
      'about_page_cta',
      'roth_calculator',
      'help_quiz'
    ) or source is null
  );

alter table public.leads drop constraint if exists leads_interest_topic_check;

alter table public.leads
  add constraint leads_interest_topic_check
  check (
    interest_topic in (
      'medicare',
      'annuities',
      'financial_planning',
      'life_insurance'
    ) or interest_topic is null
  );

-- Relax older required fields so passive captures such as footer_subscribe can coexist.
alter table public.leads alter column age drop not null;
alter table public.leads alter column primary_zip_code drop not null;
alter table public.leads alter column estimated_income drop not null;
alter table public.leads alter column calculated_tax_drag drop not null;
alter table public.leads alter column irmaa_risk_status drop not null;
alter table public.leads alter column funnel drop not null;
alter table public.leads alter column payload drop not null;

-- Indexes for Make.com query performance and existing admin views
create index if not exists leads_email_idx      on public.leads(email);
create index if not exists leads_source_idx     on public.leads(source);
create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists leads_zip_idx        on public.leads(zip_code);
create index if not exists leads_user_id_idx    on public.leads(user_id);

create table if not exists public.telemetry_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_type text not null,
  cta_variant text,
  preset_id text,
  funnel text,
  zip text,
  event_timestamp timestamptz not null
);

create table if not exists public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  role text not null default 'ops_admin'
);

create index if not exists telemetry_events_created_at_idx
  on public.telemetry_events(created_at desc);
create index if not exists telemetry_events_event_type_idx
  on public.telemetry_events(event_type);

alter table public.leads enable row level security;
alter table public.telemetry_events enable row level security;
alter table public.app_admins enable row level security;

-- Retire old browser lead access policies if this schema is re-run on an older install.
drop policy if exists "leads_select_own" on public.leads;
drop policy if exists "leads_insert_authenticated" on public.leads;

-- No browser client ever reads this table directly.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'leads'
      and policyname = 'No client reads'
  ) then
    create policy "No client reads"
      on public.leads for select using (false);
  end if;
end $$;

-- API routes write with the service role key. This policy does not grant browser access.
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'leads'
      and policyname = 'Server insert only'
  ) then
    create policy "Server insert only"
      on public.leads for insert with check (true);
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'telemetry_events'
      and policyname = 'telemetry_admin_read'
  ) then
    create policy "telemetry_admin_read"
      on public.telemetry_events
      for select
      using (
        exists (
          select 1
          from public.app_admins a
          where a.user_id = auth.uid()
        )
      );
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'app_admins'
      and policyname = 'admins_self_read'
  ) then
    create policy "admins_self_read"
      on public.app_admins
      for select
      using (auth.uid() = user_id);
  end if;
end $$;

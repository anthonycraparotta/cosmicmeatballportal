-- Cosmic Meatball Portal - Supabase Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Create the lead_submissions table
create table if not exists public.lead_submissions (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  referral_source text,
  created_at timestamptz not null default timezone('utc', now())
);

-- Create unique index on email to prevent duplicates
create unique index if not exists lead_submissions_email_idx
  on public.lead_submissions (email);

-- Enable Row Level Security
alter table public.lead_submissions enable row level security;

-- Allow inserts from the anon role (public API access)
create policy "Allow inserts from authenticated clients"
  on public.lead_submissions
  for insert
  to anon
  with check (true);

-- Optional: Allow service role to read all data
create policy "Allow service role to read all"
  on public.lead_submissions
  for select
  to service_role
  using (true);

-- Add comments for documentation
comment on table public.lead_submissions is 'Stores lead submissions from the Cosmic Meatball Portal';
comment on column public.lead_submissions.id is 'Unique identifier for each submission';
comment on column public.lead_submissions.name is 'Name of the person submitting';
comment on column public.lead_submissions.email is 'Email address (unique)';
comment on column public.lead_submissions.referral_source is 'How they heard about the game (optional)';
comment on column public.lead_submissions.created_at is 'Timestamp when the submission was created';

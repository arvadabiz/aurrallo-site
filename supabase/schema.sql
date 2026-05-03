-- ─────────────────────────────────────────────────────────
-- Run this once in your Supabase project's SQL editor.
-- ─────────────────────────────────────────────────────────

-- 1. Waitlist table
create table if not exists waitlist (
  id         bigserial primary key,
  email      text unique not null,
  source     text,                          -- 'hero' | 'cta'
  created_at timestamptz default now()
);

-- 2. Row Level Security
alter table waitlist enable row level security;

-- Allow anonymous inserts (the browser anon key is used client-side)
create policy "Allow anon insert"
  on waitlist for insert
  to anon
  with check (true);

-- Block anonymous reads — only service role / dashboard can read
create policy "Deny anon select"
  on waitlist for select
  to anon
  using (false);


-- ─────────────────────────────────────────────────────────
-- 3. Database Webhook → send-welcome edge function
--
-- Set this up in the Supabase Dashboard UI:
--   Database → Webhooks → Create a new webhook
--
--   Name:    send-welcome
--   Table:   public.waitlist
--   Events:  INSERT  (only)
--   Type:    Supabase Edge Functions
--   Function: send-welcome
--
-- Alternatively, if you prefer SQL (requires pg_net extension):
-- ─────────────────────────────────────────────────────────

-- Enable pg_net (only needed for the SQL approach below)
-- create extension if not exists pg_net;

-- SQL trigger approach (optional — dashboard UI above is easier):
--
-- create or replace function notify_send_welcome()
-- returns trigger language plpgsql as $$
-- begin
--   perform net.http_post(
--     url    := current_setting('app.edge_function_url') || '/send-welcome',
--     body   := to_jsonb(NEW)::text,
--     headers := '{"Content-Type":"application/json","Authorization":"Bearer ' ||
--                current_setting('app.service_role_key') || '"}'::jsonb
--   );
--   return NEW;
-- end;
-- $$;
--
-- create trigger on_waitlist_insert
--   after insert on waitlist
--   for each row execute function notify_send_welcome();

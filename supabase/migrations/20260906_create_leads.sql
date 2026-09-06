-- ==============================================================================
-- TWISP STUDIO — LEADS DATABASE SCHEMA & ROW LEVEL SECURITY (RLS)
-- ==============================================================================
-- Run this SQL migration in your Supabase SQL Editor (https://supabase.com/dashboard)
-- to create the leads table, indexes, and access control policies.

-- 1. Create leads table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  website TEXT,
  service TEXT,
  budget TEXT,
  timeline TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')),
  notes TEXT
);

-- 2. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);

-- 3. Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_leads_updated_at ON public.leads;
CREATE TRIGGER set_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 5. Access Policies

-- Policy A: PUBLIC / ANONYMOUS USERS can submit new leads (INSERT only)
-- Public visitors cannot select, update, or delete any lead records.
DROP POLICY IF EXISTS "Public users can create leads" ON public.leads;
CREATE POLICY "Public users can create leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy B: AUTHENTICATED ADMINS can view all leads (SELECT)
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
CREATE POLICY "Authenticated users can view leads"
  ON public.leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy C: AUTHENTICATED ADMINS can update lead status and notes (UPDATE)
DROP POLICY IF EXISTS "Authenticated users can update leads" ON public.leads;
CREATE POLICY "Authenticated users can update leads"
  ON public.leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy D: AUTHENTICATED ADMINS can delete leads (DELETE)
DROP POLICY IF EXISTS "Authenticated users can delete leads" ON public.leads;
CREATE POLICY "Authenticated users can delete leads"
  ON public.leads
  FOR DELETE
  TO authenticated
  USING (true);

-- End of migration

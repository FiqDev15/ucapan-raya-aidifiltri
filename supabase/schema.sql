-- =============================================
-- Supabase SQL — Create the wishes table
-- Run this in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension (already enabled by default in Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create wishes table
CREATE TABLE IF NOT EXISTS public.wishes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username    TEXT NOT NULL CHECK (char_length(username) BETWEEN 2 AND 50),
  message     TEXT NOT NULL CHECK (char_length(message) BETWEEN 5 AND 500),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on created_at for fast ordering
CREATE INDEX IF NOT EXISTS wishes_created_at_idx ON public.wishes (created_at DESC);

-- Row-Level Security: allow public read and insert
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Policy: anyone can READ wishes
CREATE POLICY "Allow public read" ON public.wishes
  FOR SELECT USING (true);

-- Policy: anyone can INSERT wishes
CREATE POLICY "Allow public insert" ON public.wishes
  FOR INSERT WITH CHECK (true);

-- (Optional) verify
SELECT * FROM public.wishes ORDER BY created_at DESC;

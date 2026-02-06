
-- SQL to be executed in Supabase SQL Editor
-- This allows facilitators and admins to delete entries in module_responses

-- 1. Check if policy exists and drop if needed (optional)
-- DROP POLICY IF EXISTS "Enable delete for facilitators and admins" ON public.module_responses;

-- 2. Create the policy
CREATE POLICY "Enable delete for facilitators and admins" 
ON public.module_responses 
FOR DELETE 
USING ( 
  auth.role() = 'authenticated' AND (
    (auth.jwt() ->> 'role' = 'fasilitator') OR 
    (auth.jwt() ->> 'role' = 'admin') OR
    (auth.jwt() ->> 'role' = 'koordinator')
  )
);

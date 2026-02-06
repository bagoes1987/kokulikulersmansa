-- ============================================
-- SIMPLIFIED DELETE POLICY (TEMPORARY FIX)
-- Allows ALL authenticated users to delete
-- This is to test if the issue is role-based
-- ============================================

-- Drop existing DELETE policies
DROP POLICY IF EXISTS "Enable delete for facilitators and admins" ON public.module_responses;
DROP POLICY IF EXISTS "Enable delete for facilitators, admins, and coordinators" ON public.module_responses;

-- Create SIMPLE DELETE policy for testing
CREATE POLICY "Allow all authenticated to delete (TEMPORARY)"
ON public.module_responses
FOR DELETE
TO authenticated
USING (true);

-- Verify the policy was created
SELECT tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'module_responses' AND cmd = 'DELETE';

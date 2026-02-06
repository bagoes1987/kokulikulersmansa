-- ============================================
-- ADD DELETE POLICY FOR MODULE_RESPONSES
-- Allows facilitators, admins, and coordinators to delete student responses
-- ============================================

-- Drop existing DELETE policy if any
DROP POLICY IF EXISTS "Enable delete for facilitators, admins, and coordinators" ON public.module_responses;

-- Create DELETE policy with role-based access
CREATE POLICY "Enable delete for facilitators, admins, and coordinators"
ON public.module_responses
FOR DELETE
USING (
  auth.role() = 'authenticated' AND (
    (auth.jwt() ->> 'role' = 'facilitator') OR
    (auth.jwt() ->> 'role' = 'admin') OR
    (auth.jwt() ->> 'role' = 'coordinator')
  )
);

-- Verify the policy was created
SELECT tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'module_responses' AND cmd = 'DELETE';

-- ============================================
-- ADD DELETE POLICY FOR MODULE_RESPONSES
-- Allows facilitators and admins to delete student responses
-- ============================================

-- Drop existing DELETE policy if any
DROP POLICY IF EXISTS "Allow facilitators and admins to delete responses" ON module_responses;

-- Create DELETE policy
-- This allows authenticated users (facilitators/admins) to delete any response
-- You can make this more restrictive if needed
CREATE POLICY "Allow facilitators and admins to delete responses"
ON module_responses FOR DELETE
TO authenticated
USING (true);

-- Verify the policy was created
SELECT tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'module_responses' AND cmd = 'DELETE';

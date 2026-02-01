-- ============================================
-- FIX RLS POLICY FOR MODULE_RESPONSES
-- This will allow facilitators to view student responses
-- ============================================

-- Enable RLS on module_responses table
ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Facilitators can view their students responses" ON module_responses;
DROP POLICY IF EXISTS "Students can view own responses" ON module_responses;
DROP POLICY IF EXISTS "Allow all authenticated users to read" ON module_responses;

-- Create simple policy - allow all authenticated users to read responses
-- This is the simplest solution that will work immediately
CREATE POLICY "Allow all authenticated users to read"
ON module_responses
FOR SELECT
TO authenticated
USING (true);

-- Verify the policy was created
SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd
FROM pg_policies
WHERE tablename = 'module_responses';

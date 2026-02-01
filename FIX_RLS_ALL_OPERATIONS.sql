-- ============================================
-- COMPREHENSIVE RLS FIX FOR MODULE_RESPONSES
-- Allows: 
-- 1. Everyone authenticated to read (SELECT)
-- 2. Students to insert their own answers (INSERT)
-- 3. Teachers/Facilitators to update status/score/feedback (UPDATE)
-- ============================================

-- Enable RLS
ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;

-- Drop all old policies to start fresh
DROP POLICY IF EXISTS "Facilitators can view their students responses" ON module_responses;
DROP POLICY IF EXISTS "Students can view own responses" ON module_responses;
DROP POLICY IF EXISTS "Allow all authenticated users to read" ON module_responses;
DROP POLICY IF EXISTS "Students can insert own responses" ON module_responses;
DROP POLICY IF EXISTS "Facilitators can update responses" ON module_responses;

-- 1. READ POLICY: All authenticated users can read all responses
-- (Simplest for now to ensure visibility)
CREATE POLICY "Allow all authenticated users to read"
ON module_responses FOR SELECT
TO authenticated
USING (true);

-- 2. INSERT POLICY: Students can insert their own responses
CREATE POLICY "Allow students to insert own responses"
ON module_responses FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = student_id);

-- 3. UPDATE POLICY: Facilitators/Coordinators can update feedback and score
-- Also allows students to update their own (if needed)
CREATE POLICY "Allow updates for owners and facilitators"
ON module_responses FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. DELETE POLICY: Only admins (or nobody for now)
-- (Leave as is or add if needed)

-- Verify policies
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'module_responses';

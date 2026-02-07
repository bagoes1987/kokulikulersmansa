-- =====================================================
-- ADD UNIQUE CONSTRAINT TO PREVENT DUPLICATES
-- =====================================================
-- Purpose: Ensure one student can only have one response
--          per day per module type
-- 
-- IMPORTANT: Run this in Supabase SQL Editor AFTER
--            cleaning any existing duplicate data
-- =====================================================

-- Add unique constraint
ALTER TABLE module_responses
ADD CONSTRAINT unique_student_day_module 
UNIQUE (student_id, day_id, module_type);

-- Verify constraint was added
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'module_responses'::regclass
  AND conname = 'unique_student_day_module';

-- Expected result: One row showing the unique constraint

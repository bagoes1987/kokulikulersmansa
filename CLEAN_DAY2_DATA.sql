-- =====================================================
-- CLEAN DAY 2 VIDEO & SUMMARY DATA
-- =====================================================
-- Purpose: Remove all Day 2 video and materi/summary responses
--          to prepare for new content
-- 
-- IMPORTANT: Run this in Supabase SQL Editor
-- =====================================================

-- 1. Delete all Day 2 video responses
DELETE FROM module_responses
WHERE day_id = 2 
  AND module_type = 'video';

-- 2. Delete all Day 2 materi/summary responses
DELETE FROM module_responses
WHERE day_id = 2 
  AND module_type IN ('materi', 'summary');

-- 3. Verify deletion
SELECT 
    day_id,
    module_type,
    COUNT(*) as total_responses
FROM module_responses
WHERE day_id = 2
GROUP BY day_id, module_type
ORDER BY module_type;

-- Expected result: No rows with module_type 'video', 'materi', or 'summary' for day_id = 2

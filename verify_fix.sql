-- Verify the class format fix worked
-- Check Nengsi Juita's current class format
SELECT 
    id,
    raw_user_meta_data->>'full_name' as name,
    raw_user_meta_data->>'kelas' as current_class,
    raw_user_meta_data->>'mapel' as mapel
FROM auth.users
WHERE raw_user_meta_data->>'full_name' LIKE '%Nengsi%';

-- Check students in XI.3 class
SELECT id, nama, kelas
FROM students
WHERE kelas = 'XI.3'
LIMIT 10;

-- Check if DESANDRA's response is in database
SELECT mr.*, s.nama, s.kelas
FROM module_responses mr
JOIN students s ON mr.student_id = s.id
WHERE s.nama LIKE '%DESANDRA%'
ORDER BY mr.created_at DESC;

-- Check if there are ANY responses from XI.3 students
SELECT mr.id, mr.student_id, mr.day_id, mr.module_type, mr.created_at, s.nama, s.kelas
FROM module_responses mr
JOIN students s ON mr.student_id = s.id
WHERE s.kelas = 'XI.3'
ORDER BY mr.created_at DESC
LIMIT 10;

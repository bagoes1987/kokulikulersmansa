-- Check student data
SELECT id, nama, kelas FROM students WHERE nama LIKE '%DESANDRA%';

-- Check if there are any responses from this student
SELECT mr.*, s.nama, s.kelas 
FROM module_responses mr
JOIN students s ON mr.student_id = s.id
WHERE s.nama LIKE '%DESANDRA%'
ORDER BY mr.created_at DESC
LIMIT 10;

-- Check facilitator classes (using raw_user_meta_data)
SELECT raw_user_meta_data->>'full_name' as name, 
       raw_user_meta_data->>'kelas' as classes,
       raw_user_meta_data->>'mapel' as mapel
FROM auth.users 
WHERE raw_user_meta_data->>'role' = 'fasilitator'
AND (raw_user_meta_data->>'full_name' LIKE '%Nengsi%' OR raw_user_meta_data->>'full_name' LIKE '%Hedi%');

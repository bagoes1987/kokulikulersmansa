-- 1. Check all unique class formats in students table
SELECT DISTINCT kelas, COUNT(*) as student_count
FROM students
GROUP BY kelas
ORDER BY kelas;

-- 2. Check if there are students with SPACE in class format (should be fixed)
SELECT id, nama, kelas, 'STUDENT WITH SPACE' as issue
FROM students
WHERE kelas LIKE '%. %'  -- Has space after dot (e.g., "XI. 3")
ORDER BY kelas, nama;

-- 3. Check all facilitators and their classes
SELECT 
    raw_user_meta_data->>'full_name' as facilitator_name,
    raw_user_meta_data->>'kelas' as facilitator_class,
    raw_user_meta_data->>'mapel' as subject
FROM auth.users
WHERE raw_user_meta_data->>'role' = 'fasilitator'
ORDER BY raw_user_meta_data->>'kelas';

-- 4. Check all coordinators and their classes
SELECT 
    raw_user_meta_data->>'full_name' as coordinator_name,
    raw_user_meta_data->>'kelas' as coordinator_class,
    raw_user_meta_data->>'mapel' as subject
FROM auth.users
WHERE raw_user_meta_data->>'role' = 'koordinator'
ORDER BY raw_user_meta_data->>'kelas';

-- 5. Find mismatches - facilitators with classes that don't match student format
SELECT 
    raw_user_meta_data->>'full_name' as name,
    raw_user_meta_data->>'kelas' as class_with_issue,
    'fasilitator' as role
FROM auth.users
WHERE raw_user_meta_data->>'role' = 'fasilitator'
AND raw_user_meta_data->>'kelas' LIKE '%. %'  -- Has space after dot

UNION ALL

-- 6. Find mismatches - coordinators with classes that don't match student format
SELECT 
    raw_user_meta_data->>'full_name' as name,
    raw_user_meta_data->>'kelas' as class_with_issue,
    'koordinator' as role
FROM auth.users
WHERE raw_user_meta_data->>'role' = 'koordinator'
AND raw_user_meta_data->>'kelas' LIKE '%. %'  -- Has space after dot
ORDER BY role, name;

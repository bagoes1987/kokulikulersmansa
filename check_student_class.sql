-- Check the student data by ID from the response
SELECT id, nama, kelas FROM students WHERE id = 'f5d58743-2d3d-43ed-88d4-14f58b94cc42';

-- Check all students in class XI.3 (without space)
SELECT id, nama, kelas FROM students WHERE kelas = 'XI.3' LIMIT 5;

-- Check all students in class XI. 3 (with space)
SELECT id, nama, kelas FROM students WHERE kelas = 'XI. 3' LIMIT 5;

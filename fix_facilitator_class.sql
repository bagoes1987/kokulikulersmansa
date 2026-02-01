-- Fix class format for Nengsi Juita and Hedi Prawito
-- Change from "XI. 3" (with space) to "XI.3" (without space)

-- First, let's check current data
SELECT id, raw_user_meta_data->>'full_name' as name, 
       raw_user_meta_data->>'kelas' as current_class
FROM auth.users 
WHERE raw_user_meta_data->>'role' = 'fasilitator'
AND (raw_user_meta_data->>'full_name' LIKE '%Nengsi%' OR raw_user_meta_data->>'full_name' LIKE '%Hedi%');

-- Update Nengsi Juita's class
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
    raw_user_meta_data,
    '{kelas}',
    '"XI.3"'
)
WHERE raw_user_meta_data->>'role' = 'fasilitator'
AND raw_user_meta_data->>'full_name' LIKE '%Nengsi%';

-- Update Hedi Prawito's class
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
    raw_user_meta_data,
    '{kelas}',
    '"XI.3"'
)
WHERE raw_user_meta_data->>'role' = 'fasilitator'
AND raw_user_meta_data->>'full_name' LIKE '%Hedi%';

-- Verify the update
SELECT id, raw_user_meta_data->>'full_name' as name, 
       raw_user_meta_data->>'kelas' as updated_class
FROM auth.users 
WHERE raw_user_meta_data->>'role' = 'fasilitator'
AND (raw_user_meta_data->>'full_name' LIKE '%Nengsi%' OR raw_user_meta_data->>'full_name' LIKE '%Hedi%');

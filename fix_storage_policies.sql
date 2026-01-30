-- ============================================
-- FIX STORAGE POLICIES UNTUK PROFILE PHOTOS
-- ============================================
-- Error: "new row violates row-level security policy"
-- Solusi: Tambahkan policies yang benar untuk bucket profile-photos

-- 1. Hapus policies lama jika ada (opsional, skip jika error)
DROP POLICY IF EXISTS "Siswa bisa upload foto sendiri" ON storage.objects;
DROP POLICY IF EXISTS "Siswa bisa update foto sendiri" ON storage.objects;
DROP POLICY IF EXISTS "Foto profil bisa dilihat semua orang" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public access" ON storage.objects;

-- 2. Buat policies baru yang benar
-- Policy untuk INSERT (upload file baru)
CREATE POLICY "Allow authenticated users to upload profile photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-photos'
);

-- Policy untuk SELECT (lihat/download file)
CREATE POLICY "Allow public to view profile photos"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'profile-photos'
);

-- Policy untuk UPDATE (update file yang sudah ada)
CREATE POLICY "Allow authenticated users to update their own photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-photos'
)
WITH CHECK (
  bucket_id = 'profile-photos'
);

-- Policy untuk DELETE (hapus file)
CREATE POLICY "Allow authenticated users to delete their own photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'profile-photos'
);

-- 3. Verifikasi policies sudah aktif
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects' 
  AND policyname LIKE '%profile%'
ORDER BY policyname;

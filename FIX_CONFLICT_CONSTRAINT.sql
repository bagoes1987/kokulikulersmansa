-- =====================================================
-- FIX ON CONFLICT CONSTRAINT (module_responses)
-- =====================================================
-- Masalah: Fungsi upsert gagal karena tidak ada unique constraint.
-- Solusi: Hapus data duplikat yang ada, lalu tambahkan constraint.
-- =====================================================

-- 1. Identifikasi dan hapus duplikat (sisakan yang terbaru berdasarkan ID)
DELETE FROM module_responses a
USING module_responses b
WHERE a.id < b.id
  AND a.student_id = b.student_id
  AND a.day_id = b.day_id
  AND a.module_type = b.module_type;

-- 2. Hapus constraint lama jika ada (untuk menghindari error penamaan)
ALTER TABLE module_responses
DROP CONSTRAINT IF EXISTS unique_student_day_module;

-- 3. Tambahkan unique constraint baru
-- Ini diperlukan agar 'onConflict' di JavaScript bisa bekerja
ALTER TABLE module_responses
ADD CONSTRAINT unique_student_day_module 
UNIQUE (student_id, day_id, module_type);

-- 4. Verifikasi (Opsional)
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as definition
FROM pg_constraint
WHERE conrelid = 'module_responses'::regclass
  AND conname = 'unique_student_day_module';

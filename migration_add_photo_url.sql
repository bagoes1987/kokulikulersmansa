-- ============================================
-- MIGRATION: Add photo_url column to students table
-- Jalankan script ini di Supabase SQL Editor
-- ============================================

-- Add photo_url column to students table
ALTER TABLE students ADD COLUMN IF NOT EXISTS photo_url text;

-- Add comment to the column
COMMENT ON COLUMN students.photo_url IS 'URL to student profile photo stored in Supabase Storage';

-- ============================================
-- SELESAI!
-- Column photo_url sudah ditambahkan ke tabel students
-- ============================================

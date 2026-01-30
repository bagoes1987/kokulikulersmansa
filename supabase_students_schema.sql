-- ============================================
-- SCHEMA UNTUK TABEL SISWA
-- Jalankan script ini di Supabase SQL Editor
-- ============================================

-- 1. Buat tabel students untuk menyimpan data siswa
CREATE TABLE IF NOT EXISTS students (
  id uuid references auth.users on delete cascade not null primary key,
  nis text unique not null,
  nisn text unique not null,
  nama text not null,
  kelas text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Buat index untuk pencarian cepat berdasarkan NIS dan NISN
CREATE INDEX IF NOT EXISTS idx_students_nis ON students(nis);
CREATE INDEX IF NOT EXISTS idx_students_nisn ON students(nisn);
CREATE INDEX IF NOT EXISTS idx_students_kelas ON students(kelas);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- 4. Policy: Semua orang bisa melihat data siswa
CREATE POLICY "Semua orang bisa melihat data siswa"
  ON students FOR SELECT
  USING (true);

-- 5. Policy: Siswa hanya bisa update data mereka sendiri
CREATE POLICY "Siswa bisa update data sendiri"
  ON students FOR UPDATE
  USING (auth.uid() = id);

-- 6. Policy: Hanya admin yang bisa insert data siswa baru
CREATE POLICY "Admin bisa insert siswa baru"
  ON students FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- 7. Policy: Hanya admin yang bisa delete data siswa
CREATE POLICY "Admin bisa delete siswa"
  ON students FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- 8. Buat function untuk auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Buat trigger untuk auto-update timestamp
DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SELESAI! 
-- Sekarang tabel students sudah siap digunakan
-- ============================================

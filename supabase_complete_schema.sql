-- ============================================
-- SCHEMA LENGKAP UNTUK SISTEM LOGIN
-- Jalankan script ini di Supabase SQL Editor
-- ============================================

-- ============================================
-- BAGIAN 1: TABEL PROFILES
-- ============================================

-- 1. Buat tabel profiles untuk semua user (admin, guru, siswa, dll)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role text check (role in ('admin', 'guru', 'siswa', 'koordinator', 'fasilitator')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Enable Row Level Security (RLS) untuk profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Semua orang bisa melihat profiles
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

-- 4. Policy: User bisa insert profile mereka sendiri
CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

-- 5. Policy: User bisa update profile mereka sendiri
CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 6. Function untuk auto-create profile saat user baru dibuat
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'role');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Trigger untuk auto-create profile
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ============================================
-- BAGIAN 2: TABEL STUDENTS
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
-- Tabel profiles dan students sudah siap digunakan
-- ============================================

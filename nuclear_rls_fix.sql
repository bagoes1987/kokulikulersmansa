
-- NUCLEAR RLS FIX FOR MODULE_RESPONSES
-- Jalankan ini di Supabase SQL Editor untuk memperbaiki error RLS

-- 1. Aktifkan RLS
ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;

-- 2. Bersihkan Policy Lama
DROP POLICY IF EXISTS "Siswa bisa kirim jawaban" ON module_responses;
DROP POLICY IF EXISTS "Siswa bisa lihat jawaban sendiri" ON module_responses;
DROP POLICY IF EXISTS "Allow all authenticated users to read" ON module_responses;
DROP POLICY IF EXISTS "Allow students to insert own responses" ON module_responses;
DROP POLICY IF EXISTS "Allow updates for owners and facilitators" ON module_responses;
DROP POLICY IF EXISTS "Facilitators can view their students responses" ON module_responses;
DROP POLICY IF EXISTS "select_all_auth" ON module_responses;
DROP POLICY IF EXISTS "insert_own" ON module_responses;
DROP POLICY IF EXISTS "update_own_and_staff" ON module_responses;

-- 3. Policy SELECT (Baca)
-- Semua user yang login (Siswa/Guru/Admin) bisa baca semua jawaban
-- (Memudahkan sinkronisasi data antar dashboard)
CREATE POLICY "select_all_authenticated" 
ON module_responses FOR SELECT 
TO authenticated 
USING (true);

-- 4. Policy INSERT (Tambah)
-- Siswa bisa tambah data jika melampirkan student_id yang sesuai dengan Auth ID mereka
CREATE POLICY "insert_own_response" 
ON module_responses FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = student_id);

-- 5. Policy UPDATE (Ubah)
-- Siswa bisa ubah data mereka sendiri, Fasilitator bisa memberi feedback & score
CREATE POLICY "update_own_and_staff" 
ON module_responses FOR UPDATE 
TO authenticated 
USING (auth.uid() = student_id OR EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'guru', 'fasilitator', 'koordinator')
))
WITH CHECK (auth.uid() = student_id OR EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role IN ('admin', 'guru', 'fasilitator', 'koordinator')
));

-- 6. Policy DELETE (Hapus)
-- Hanya admin yang bisa hapus (untuk keamanan data)
CREATE POLICY "delete_admin_only" 
ON module_responses FOR DELETE 
TO authenticated 
USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
));

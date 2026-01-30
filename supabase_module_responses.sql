-- TABEL UNTUK MENYIMPAN JAWABAN SISWA
CREATE TABLE IF NOT EXISTS module_responses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day_id int NOT NULL, -- Contoh: 1, 2, 3
  module_type text NOT NULL, -- Contoh: 'pemantik', 'refleksi'
  answers jsonb NOT NULL, -- Array jawaban: ["Jawab 1", "Jawab 2", ...]
  feedback text, -- Feedback dari fasilitator
  status text CHECK (status IN ('submitted', 'reviewed')) DEFAULT 'submitted',
  created_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp WITH time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index agar pencarian cepat
CREATE INDEX IF NOT EXISTS idx_module_responses_student ON module_responses(student_id);
CREATE INDEX IF NOT EXISTS idx_module_responses_day_module ON module_responses(day_id, module_type);

-- RLS Policies
ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;

-- 1. Siswa bisa INSERT jawaban sendiri
CREATE POLICY "Siswa bisa kirim jawaban" 
ON module_responses FOR INSERT 
WITH CHECK (auth.uid() = student_id);

-- 2. Siswa bisa LIHAT jawaban sendiri
CREATE POLICY "Siswa bisa lihat jawaban sendiri" 
ON module_responses FOR SELECT 
USING (auth.uid() = student_id);

-- 3. Fasilitator/Admin bisa LIHAT semua jawaban (Butuh Policy Khusus jika ada role, sementara public false)
-- (Opsional: Tambahkan policy untuk role 'guru' atau 'admin' jika sudah ada setup role di table profiles)

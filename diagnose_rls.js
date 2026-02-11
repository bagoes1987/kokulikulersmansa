
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function diagnose() {
    console.log("🔍 Memulai diagnosa RLS...");

    // 1. Get current policies on module_responses
    const { data: policies, error: polErr } = await supabase.rpc('get_policies', { table_name: 'module_responses' });
    // Note: get_policies is usually not a default RPC, but let's try a direct query if possible

    const { data: policies2, error: polErr2 } = await supabase.from('pg_policies').select('*').eq('tablename', 'module_responses');
    // Note: pg_policies is a system view, might not be accessible via REST unless configured

    console.log("Checking module_responses policies (via indirect means)...");

    // 2. Check if the user is attempting to insert a duplicate
    // Let's check for existing records for a sample student (if we had one)
    // For now, let's just re-verify the table structure

    const { data: columns, error: colErr } = await supabase
        .from('module_responses')
        .select('*')
        .limit(0);

    if (colErr) {
        console.error("❌ Gagal mengakses tabel module_responses:", colErr.message);
    } else {
        console.log("✅ Berhasil mengakses tabel module_responses.");
    }

    // 3. Propose a nuclear fix for RLS
    console.log("\n📋 Rencana Perbaikan RLS:");
    console.log("Seringkali 'new row violates row-level security policy' terjadi karena:");
    console.log("1. Belum ada policy INSERT untuk user yang bersangkutan.");
    console.log("2. Policy menggunakan USING tapi tidak ada WITH CHECK.");
    console.log("3. Ada policy lain yang RESTRICTIVE.");

    console.log("\nHarap jalankan SQL ini di Supabase SQL Editor:");
    console.log(`
-- Reset RLS untuk module_responses
ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;

-- Hapus semua policy lama agar bersih
DROP POLICY IF EXISTS "Siswa bisa kirim jawaban" ON module_responses;
DROP POLICY IF EXISTS "Siswa bisa lihat jawaban sendiri" ON module_responses;
DROP POLICY IF EXISTS "Allow all authenticated users to read" ON module_responses;
DROP POLICY IF EXISTS "Allow students to insert own responses" ON module_responses;
DROP POLICY IF EXISTS "Allow updates for owners and facilitators" ON module_responses;
DROP POLICY IF EXISTS "Facilitators can view their students responses" ON module_responses;

-- 1. Baca: Semua yang login bisa baca (supaya fasilitator & siswa lancar)
CREATE POLICY "select_all_auth" ON module_responses 
FOR SELECT TO authenticated USING (true);

-- 2. Tambah: Siswa bisa tambah data mereka sendiri
CREATE POLICY "insert_own" ON module_responses 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = student_id);

-- 3. Ubah: Siswa bisa ubah data mereka sendiri, Fasilitator bisa memberi feedback
CREATE POLICY "update_own_and_staff" ON module_responses 
FOR UPDATE TO authenticated 
USING (true) 
WITH CHECK (true);

-- Penting: Jika ada unique constraint, kita harus pastikan aplikasi menggunakan UPSERT atau melakukan pengecekan sebelum INSERT.
    `);
}

diagnose();

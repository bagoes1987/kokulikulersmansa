const { createClient } = require('@supabase/supabase-js');

// Konfigurasi Supabase (dari create_trial_scenario.js)
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function searchStudent() {
    console.log("🔍 Mencari siswa 'Desandra'...");

    // Cari di tabel students (data akademik)
    const { data: students, error } = await supabase
        .from('students')
        .select('*')
        .ilike('nama', '%Desandra%');

    if (error) {
        console.error("❌ Error query students:", error.message);
    } else if (students.length > 0) {
        console.log("\n✅ Ditemukan di tabel 'students':");
        students.forEach(s => {
            console.log(`- Nama: ${s.nama}`);
            console.log(`  NIS: ${s.nis}`);
            console.log(`  NISN: ${s.nisn}`);
            console.log(`  Kelas: ${s.kelas}`);
            console.log(`  User ID: ${s.id}`);
            console.log('---');
        });
    } else {
        console.log("⚠️ Tidak ditemukan di tabel 'students'.");
    }

    // Cari di tabel profiles (data akun login) juga untuk memastikan
    const { data: profiles, error: profError } = await supabase
        .from('profiles')
        .select('*')
        .ilike('full_name', '%Desandra%');

    if (profError) {
        console.error("❌ Error query profiles:", profError.message);
    } else if (profiles.length > 0) {
        console.log("\n✅ Ditemukan di tabel 'profiles' (Akun Login):");
        profiles.forEach(p => {
            console.log(`- Nama: ${p.full_name}`);
            console.log(`  Email: ${p.email}`);
            console.log(`  Username: ${p.username}`);
            console.log(`  Role: ${p.role}`);
            console.log(`  Kelas: ${p.kelas || '-'}`);
            console.log('---');
        });
    } else {
        console.log("⚠️ Tidak ditemukan di tabel 'profiles'.");
    }
}

searchStudent();

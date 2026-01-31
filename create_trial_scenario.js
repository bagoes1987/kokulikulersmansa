const { createClient } = require('@supabase/supabase-js');

// Konfigurasi Supabase
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Data Skenario Trial
const trialData = {
    classes: ['X.TRIAL-1', 'X.TRIAL-2', 'X.TRIAL-3'],

    coordinators: [
        {
            username: 'koord_trial_A',
            nama: 'Koordinator Trial A',
            email: 'koord_trial_A@kokulikuler.id',
            password: 'trialuser123',
            managed_classes: ['X.TRIAL-1', 'X.TRIAL-2']
        },
        {
            username: 'koord_trial_B',
            nama: 'Koordinator Trial B',
            email: 'koord_trial_B@kokulikuler.id',
            password: 'trialuser123',
            managed_classes: ['X.TRIAL-3']
        }
    ],

    facilitators: [
        {
            username: 'fasil_trial_1',
            nama: 'Fasilitator Trial 1',
            email: 'fasil_trial_1@kokulikuler.id',
            password: 'trialuser123',
            kelas: 'X.TRIAL-1'
        },
        {
            username: 'fasil_trial_2',
            nama: 'Fasilitator Trial 2',
            email: 'fasil_trial_2@kokulikuler.id',
            password: 'trialuser123',
            kelas: 'X.TRIAL-2'
        },
        {
            username: 'fasil_trial_3',
            nama: 'Fasilitator Trial 3',
            email: 'fasil_trial_3@kokulikuler.id',
            password: 'trialuser123',
            kelas: 'X.TRIAL-3'
        }
    ],

    students: [
        { nama: 'Siswa Trial 1', nis: '99901', nisn: '99999901', kelas: 'X.TRIAL-1' },
        { nama: 'Siswa Trial 2', nis: '99902', nisn: '99999902', kelas: 'X.TRIAL-1' },
        { nama: 'Siswa Trial 3', nis: '99903', nisn: '99999903', kelas: 'X.TRIAL-1' },
        { nama: 'Siswa Trial 4', nis: '99904', nisn: '99999904', kelas: 'X.TRIAL-1' },
        { nama: 'Siswa Trial 5', nis: '99905', nisn: '99999905', kelas: 'X.TRIAL-1' }
    ]
};

async function createTrialAccounts() {
    console.log("🚀 DEMO: Memulai pembuatan akun skenario trial...");

    // 1. Buat Akun Koordinator
    console.log("\n👤 Membuat Koordinator...");
    for (const c of trialData.coordinators) {
        // Hapus akun lama jika ada (cleanup)
        const { data: existing } = await supabase.from('profiles').select('id').eq('email', c.email).single();
        if (existing) await supabase.auth.admin.deleteUser(existing.id);

        const { error } = await supabase.auth.admin.createUser({
            email: c.email,
            password: c.password,
            email_confirm: true,
            user_metadata: {
                full_name: c.nama,
                role: 'koordinator',
                username: c.username,
                managed_classes: c.managed_classes
            }
        });
        if (error) console.log(`❌ Gagal ${c.username}: ${error.message}`);
        else console.log(`✅ Sukses: ${c.username} (Kelas: ${c.managed_classes.join(', ')})`);
    }

    // 2. Buat Akun Fasilitator
    console.log("\n👥 Membuat Fasilitator...");
    for (const f of trialData.facilitators) {
        const { data: existing } = await supabase.from('profiles').select('id').eq('email', f.email).single();
        if (existing) await supabase.auth.admin.deleteUser(existing.id);

        const { error } = await supabase.auth.admin.createUser({
            email: f.email,
            password: f.password,
            email_confirm: true,
            user_metadata: {
                full_name: f.nama,
                role: 'fasilitator',
                username: f.username,
                kelas: f.kelas,
                mapel: 'Fasilitator Trial'
            }
        });
        if (error) console.log(`❌ Gagal ${f.username}: ${error.message}`);
        else console.log(`✅ Sukses: ${f.username} (Kelas: ${f.kelas})`);
    }

    // 3. Buat Akun Siswa
    console.log("\n🎓 Membuat Siswa (Kelas X.TRIAL-1)...");
    for (const s of trialData.students) {
        // FIX: Login page uses NISN@smansa.sch.id
        const studentEmail = `${s.nisn}@smansa.sch.id`;

        const { data: existing } = await supabase.from('students').select('id').eq('nis', s.nis).single();

        // Cleanup: Hapus user auth lama jika ada (format benar)
        const { data: existUser } = await supabase.from('profiles').select('id').eq('email', studentEmail).single();
        if (existUser) await supabase.auth.admin.deleteUser(existUser.id);

        // Cleanup: Hapus user auth lama (format SALAH dari sebelumnya: NIS@siswa.sekolah.id)
        const wrongEmail = `${s.nis}@siswa.sekolah.id`;
        const { data: wrongUser } = await supabase.from('profiles').select('id').eq('email', wrongEmail).single();
        if (wrongUser) await supabase.auth.admin.deleteUser(wrongUser.id);

        const { data: user, error } = await supabase.auth.admin.createUser({
            email: studentEmail,
            password: s.nis, // Password = NIS
            email_confirm: true,
            user_metadata: {
                full_name: s.nama,
                role: 'siswa',
                nis: s.nis,
                kelas: s.kelas
            }
        });

        if (error) {
            console.log(`❌ Gagal User ${s.nama}: ${error.message}`);
            continue;
        }

        // Insert ke tabel students (manual jaga-jaga)
        const { error: dbError } = await supabase.from('students').upsert({
            id: user.user.id,
            nis: s.nis,
            nisn: s.nisn,
            nama: s.nama,
            kelas: s.kelas
        });

        if (dbError) console.log(`❌ Gagal DB ${s.nama}: ${dbError.message}`);
        else console.log(`✅ Sukses: ${s.nama} (${s.nis})`);
    }

    console.log("\n🏁 Selesai! Semua akun trial siap digunakan.");
    console.log("Password Koordinator & Fasilitator: 'trialuser123'");
    console.log("Password Siswa: NIS (misal '99901')");
}

createTrialAccounts();

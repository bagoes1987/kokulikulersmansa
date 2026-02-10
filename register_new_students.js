const { createClient } = require('@supabase/supabase-js');

// Konfigurasi Supabase
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const newStudents = [
    {
        nama: 'Keyridho Falasarwa',
        nisn: '0091127501',
        nis: '14598',
        kelas: 'XI.7'
    },
    {
        nama: 'Zaskia Nadia Pratama',
        nisn: '0091941636',
        nis: '14599',
        kelas: 'XI.9'
    }
];

async function registerNewStudents() {
    console.log('🚀 Memulai pendaftaran siswa baru...\n');

    for (const student of newStudents) {
        const email = `${student.nisn}@smansa.sch.id`;
        const password = student.nis;

        try {
            console.log(`⏳ Memproses ${student.nama}...`);

            // 1. Buat user di Supabase Auth (admin mode)
            const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                email: email,
                password: password,
                email_confirm: true,
                user_metadata: {
                    full_name: student.nama,
                    role: 'siswa',
                    nis: student.nis,
                    nisn: student.nisn,
                    kelas: student.kelas
                }
            });

            if (authError) {
                if (authError.message.includes('already registered')) {
                    console.log(`ℹ️  Auth: ${student.nama} sudah terdaftar.`);
                } else {
                    throw authError;
                }
            }

            // Jika user baru berhasil dibuat, data.user akan ada
            // Jika sudah ada, kita perlu ambil ID-nya (tapi admin.createUser seringkali error if exists)
            // Namun script import_students_fixed.js menggunakan pola yang sama.

            const userId = authData?.user?.id;

            if (userId) {
                // 2. Insert/Update ke tabel students
                const { error: dbError } = await supabase
                    .from('students')
                    .upsert({
                        id: userId,
                        nis: student.nis,
                        nisn: student.nisn,
                        nama: student.nama,
                        kelas: student.kelas
                    });

                if (dbError) throw dbError;
                console.log(`✅ ${student.nama} berhasil didaftarkan!`);
            } else {
                console.log(`⚠️  Melewati entri database untuk ${student.nama} karena tidak ada ID user (mungkin sudah ada).`);
            }

        } catch (error) {
            console.log(`❌ Gagal mendaftarkan ${student.nama}: ${error.message}`);
        }
    }

    console.log('\n✨ Selesai.');
}

registerNewStudents();

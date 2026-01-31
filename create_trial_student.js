const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTrialStudent() {
    const nis = '98765';
    const nisn = '0812345678';
    const nama = 'Siswa Tester';
    const kelas = 'X-Ujicoba';
    const email = `${nisn}@smansa.sch.id`;
    const password = nis;

    console.log(`🚀 Membuat akun ujicoba: ${nama}...`);

    try {
        // 1. Buat user di Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true,
            user_metadata: {
                full_name: nama,
                role: 'siswa',
                nis: nis,
                nisn: nisn,
                kelas: kelas
            }
        });

        if (authError) {
            if (authError.message.includes('already registered')) {
                console.log('ℹ️ Akun auth sudah ada.');
                // Try to get the user ID
                const { data: listData } = await supabase.auth.admin.listUsers();
                const existingUser = listData.users.find(u => u.email === email);
                if (existingUser) {
                    await insertToStudentTable(existingUser.id, nis, nisn, nama, kelas);
                }
            } else {
                throw authError;
            }
        } else {
            await insertToStudentTable(authData.user.id, nis, nisn, nama, kelas);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

async function insertToStudentTable(userId, nis, nisn, nama, kelas) {
    const { error: studentError } = await supabase
        .from('students')
        .upsert({
            id: userId,
            nis: nis,
            nisn: nisn,
            nama: nama,
            kelas: kelas
        }, { onConflict: 'nisn' });

    if (studentError) {
        console.error('❌ Gagal insert ke tabel students:', studentError.message);
    } else {
        console.log('✅ Akun ujicoba siap digunakan!');
        console.log('---------------------------');
        console.log(`Username (NISN): ${nisn}`);
        console.log(`Password (NIS) : ${nis}`);
        console.log('---------------------------');
    }
}

createTrialStudent();

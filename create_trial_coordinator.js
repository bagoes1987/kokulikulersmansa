const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTrialCoordinator() {
    const username = 'koordinator';
    const password = '123';
    const email = `${username}@smansa.sch.id`;
    const nama = 'Drs. Budi Santoso (Koordinator Trial)';
    const nip = '19850101 201001 1 001';
    const mapel = 'Bahasa Indonesia';
    const kelas = 'Kelas X.1 / Fase E';

    console.log(`🚀 Membuat akun ujicoba koordinator: ${nama}...`);

    try {
        // 1. Buat user di Supabase Auth menggunakan admin API
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true,
            user_metadata: {
                full_name: nama,
                role: 'koordinator',
                nip: nip,
                mapel: mapel,
                kelas: kelas
            }
        });

        if (authError) {
            if (authError.message.includes('already registered')) {
                console.log('ℹ️ Akun auth sudah ada. Mencoba mengupdate password...');
                // Cari user ID
                const { data: listData } = await supabase.auth.admin.listUsers();
                const existingUser = listData.users.find(u => u.email === email);
                if (existingUser) {
                    const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
                        password: password,
                        user_metadata: {
                            full_name: nama,
                            role: 'koordinator',
                            nip: nip,
                            mapel: mapel,
                            kelas: kelas
                        }
                    });
                    if (updateError) throw updateError;
                    console.log('✅ Password dan metadata akun berhasil diupdate!');
                    printAccountInfo(username, password);
                }
            } else {
                throw authError;
            }
        } else {
            console.log('✅ Akun koordinator baru berhasil dibuat!');
            printAccountInfo(username, password);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

function printAccountInfo(username, password) {
    console.log('---------------------------');
    console.log(`Username : ${username}`);
    console.log(`Password : ${password}`);
    console.log('---------------------------');
    console.log('💡 Silakan login di login-koordinator.html');
}

createTrialCoordinator();

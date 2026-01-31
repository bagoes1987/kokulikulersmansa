const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const coordinators = [
    { nama: "Lucia Erviana, S.Pd., M.Pd.", username: "koor_lucia", kelas: ["X.1", "X.2", "X.3"] },
    { nama: "Ninda Ningtyas, S.Pd., M.Si.", username: "koor_ninda", kelas: ["X.4"] },
    { nama: "Vivi Amelia, S.Pd", username: "koor_vivi", kelas: ["X.5", "X.6"] },
    { nama: "Kustiani, S.Pd.", username: "koor_kustiani", kelas: ["X.7"] },
    { nama: "Aprilyan Dona, S.Pd.", username: "koor_dona", kelas: ["X.8", "X.9"] },
    { nama: "Ika Setiawati, S.Pd", username: "koor_ika", kelas: ["X.10", "XI.3"] },
    { nama: "Anastasiya Candra M, S.Pd.", username: "koor_anas", kelas: ["X.11"] },
    { nama: "Dr. Didi Franzhardi, M.Pd.", username: "koor_didi", kelas: ["XI.1", "XI.2"] },
    { nama: "Kartika Sari, S.Pd.", username: "koor_kartika", kelas: ["XI.4", "XI.5", "XI.6"] },
    { nama: "Neti Diana, M.Pd.", username: "koor_neti", kelas: ["XI.7", "XI.8", "XI.9"] },
    { nama: "Maulidiawati, M.Pd.", username: "koor_maulidia", kelas: ["XI.10"] },
    { nama: "Agung Saputra, S.Pd.", username: "koor_agung", kelas: ["XI.11"] },
    { nama: "Chodman Ariyanto, S.Pd.", username: "koor_chodman", kelas: ["XII.1", "XII.2", "XII.3"] },
    { nama: "Taufik Hidayat, S.Pd.", username: "koor_taufik", kelas: ["XII.4", "XII.5", "XII.6"] },
    { nama: "Mas’ud abid, S.Pd., M.Pd.", username: "koor_abid", kelas: ["XII.7", "XII.8"] },
    { nama: "Ade Rohmah Apriani, S.Pd.", username: "koor_ade", kelas: ["XII.9", "XII.10"] }
];

async function createAccounts() {
    console.log("🚀 Memulai pembuatan akun koordinator...");

    for (const koor of coordinators) {
        const email = `${koor.username}@kokulikuler.id`;
        const password = "kokulikuler@2026";

        const { data, error } = await supabase.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true,
            user_metadata: {
                full_name: koor.nama,
                username: koor.username,
                role: 'koordinator',
                kelas: koor.kelas,
                mapel: 'Koordinator Kokulikuler'
            }
        });

        if (error) {
            console.log(`❌ Gagal membuat akun ${koor.nama}: ${error.message}`);
        } else {
            console.log(`✅ Berhasil: ${koor.nama} (${koor.username})`);
        }
    }
    console.log("🏁 Selesai!");
}

createAccounts();

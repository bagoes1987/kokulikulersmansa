const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Data Fasilitator dari Draf_Akun_Fasilitator.md (Disederhanakan untuk skrip)
const fasilitators = [
    { no: 1, kelas: "X. 1", nama: "Sukirno, S.Pd.", username: "fasil_sukirno" },
    { no: 2, kelas: "X. 1", nama: "Ari Muchtrinai N. N, S.Pd.I.", username: "fasil_ari" },
    { no: 3, kelas: "X. 2", nama: "Handaroh, S.Pd.", username: "fasil_handaroh" },
    { no: 4, kelas: "X. 2", nama: "Fantas Jaya A, S.Pd.", username: "fasil_fantas" },
    { no: 5, kelas: "X. 3", nama: "Flortentinus Supriyanto, S.Pd.", username: "fasil_flortentinus" },
    { no: 6, kelas: "X. 3", nama: "Nelly Kurniasih, S.Pd.", username: "fasil_nelly" },
    { no: 101, kelas: "X. 3", nama: "Fika Mega Elita, S.Pd.", username: "fasil_fika" },
    { no: 7, kelas: "X. 4", nama: "Siti Anita, S.Pd.", username: "fasil_siti" },
    { no: 8, kelas: "X. 4", nama: "Latifatu Anisa, S. Pd.", username: "fasil_latifatu" },
    { no: 9, kelas: "X. 5", nama: "Atik Setianingsih, S.Pd.", username: "fasil_atik" },
    { no: 10, kelas: "X. 5", nama: "Lovelya Valentina, S.Pd.", username: "fasil_lovelya" },
    { no: 11, kelas: "X. 6", nama: "Wiwik Eko Prihatin, S.Pd., M.M.", username: "fasil_wiwik" },
    { no: 12, kelas: "X. 6", nama: "Andi Cahya Sanjaya, S.Pd.", username: "fasil_andi" },
    { no: 13, kelas: "X. 7", nama: "Azuari Dian Prasasti, S.Pd.", username: "fasil_azuari" },
    { no: 14, kelas: "X. 7", nama: "Deni Yunarti, S.Pd.", username: "fasil_deni" },
    { no: 15, kelas: "X. 8", nama: "Fajar Abdul Majid, S.Pd", username: "fasil_fajar" },
    { no: 16, kelas: "X. 8", nama: "Nora Nurhalita, S.Pd.", username: "fasil_nora" },
    { no: 17, kelas: "X. 9", nama: "Andree Prasetyo, S.Pd.", username: "fasil_andree" },
    { no: 18, kelas: "X. 9", nama: "Sindy Dwi Pertiwi, M.Pd.", username: "fasil_sindy" },
    { no: 19, kelas: "X. 10", nama: "Indah Sulmayanti, M.Pd.", username: "fasil_indah" },
    { no: 20, kelas: "X. 10", nama: "M. Hafiz Sytar, S.Kom.", username: "fasil_mhafiz" },
    { no: 21, kelas: "X. 11", nama: "Pandu Aditya, M.Pd.", username: "fasil_pandu" },
    { no: 22, kelas: "X. 11", nama: "Tiar Hajunilato, M.Pd.", username: "fasil_tiar" },
    { no: 23, kelas: "XI. 1", nama: "Try Puri anggraini, S.Pd., M.Pd.", username: "fasil_trypuri" },
    { no: 24, kelas: "XI. 1", nama: "Lia Ningrum, S.Pd.", username: "fasil_lia" },
    { no: 25, kelas: "XI. 2", nama: "Hermanto, S.Pd., M.Pd.", username: "fasil_hermanto" },
    { no: 26, kelas: "XI. 2", nama: "Santi Aryanti, S.Pd.", username: "fasil_santi" },
    { no: 27, kelas: "XI. 3", nama: "Nengsi Juita, M.Pd.Si.", username: "fasil_nengsi" },
    { no: 28, kelas: "XI. 3", nama: "Hedi Prawito, S.Pd.", username: "fasil_hedi" },
    { no: 29, kelas: "XI. 4", nama: "Anggun Saymona, S.Pd., M.Pd.", username: "fasil_anggun" },
    { no: 30, kelas: "XI. 4", nama: "Lia Kurniasari, S.Pd.", username: "fasil_liakurniasari" },
    { no: 31, kelas: "XI. 5", nama: "Nyoman Kopariyanto, S.Pd.", username: "fasil_nyoman" },
    { no: 32, kelas: "XI. 5", nama: "Etik Prasetyaningsih, S.Pd.", username: "fasil_etik" },
    { no: 33, kelas: "XI. 6", nama: "Abdul Hafiz, S.Pd.", username: "fasil_abdul" },
    { no: 34, kelas: "XI. 6", nama: "Suhaib Jawahir, S.Pd.", username: "fasil_suhaib" },
    { no: 35, kelas: "XI. 7", nama: "Singgih Sudarmawan, S.Ag.", username: "fasil_singgih" },
    { no: 36, kelas: "XI. 7", nama: "Suparmono, S.Ag.", username: "fasil_suparmono" },
    { no: 37, kelas: "XI. 8", nama: "Arif Alimudin Rasyid, S.Pd.", username: "fasil_arif" },
    { no: 38, kelas: "XI. 9", nama: "Rizki Rahmadika, S.Pd.", username: "fasil_rizki" },
    { no: 39, kelas: "XI. 10", nama: "Adventus, S.Pd.", username: "fasil_adventus" },
    { no: 40, kelas: "XI. 11", nama: "Samijo, S.Pd.", username: "fasil_samijo" },
    { no: 41, kelas: "XII. 1", nama: "Tri Tamti Nugraheni, S.Pd.", username: "fasil_tritamti" },
    { no: 42, kelas: "XII. 1", nama: "Yuni Asrina, S.Pd.", username: "fasil_yuni" },
    { no: 43, kelas: "XII. 2", nama: "Titin Sumarni, S.Pd.", username: "fasil_titin" },
    { no: 44, kelas: "XII. 2", nama: "Sukirok, S.Pd.", username: "fasil_sukirok" },
    { no: 45, kelas: "XII. 3", nama: "Nur Azizah, S.Pd.I.", username: "fasil_nurazizah" },
    { no: 46, kelas: "XII. 3", nama: "Febrianita Prasasti, S.Pd.", username: "fasil_febrianita" },
    { no: 47, kelas: "XII. 4", nama: "Atik Apriliawati, S.Pd.", username: "fasil_atikaprilia" },
    { no: 48, kelas: "XII. 4", nama: "Ferdinasari, S.pd.", username: "fasil_ferdinasari" },
    { no: 49, kelas: "XII. 5", nama: "Nur Rohmad Safarudin, M.Pd.", username: "fasil_nurrohmad" },
    { no: 50, kelas: "XII. 5", nama: "Fery Ardianto, M.Pd.", username: "fasil_fery" },
    { no: 51, kelas: "XII. 6", nama: "Ade Ervani M, S.Sn.", username: "fasil_adeervani" },
    { no: 52, kelas: "XII. 6", nama: "Dra. Hj. Endang Suwartijah", username: "fasil_endang" },
    { no: 53, kelas: "XII. 7", nama: "Ribuwati, M.Pd.", username: "fasil_ribuwati" },
    { no: 54, kelas: "XII. 7", nama: "Nasution, S.Pd.", username: "fasil_nasution" },
    { no: 55, kelas: "XII. 8", nama: "Apriana, S.Pd.", username: "fasil_apriana" },
    { no: 56, kelas: "XII. 8", nama: "Agung Subaryanto, S.Pd.", username: "fasil_agung" },
    { no: 57, kelas: "XII. 9", nama: "Ari Astuti, S.Pd.", username: "fasil_ariastuti" },
    { no: 58, kelas: "XII. 9", nama: "Erfizah, S.Pd", username: "fasil_erfizah" },
    { no: 59, kelas: "XII. 10", nama: "Muh. Zuhdi, S.Pd.", username: "fasil_muhzuhdi" },
    { no: 60, kelas: "XII. 10", nama: "Ellys Trisnowati, M.Pd.I.", username: "fasil_ellys" }
];

const admins = [
    { nama: "Administrator", username: "admin_kokulikuler2026" }
];

async function createAccounts() {
    console.log("🚀 Memulai proses pendaftaran akun...");

    // 1. Create Admins
    for (const adm of admins) {
        const email = `${adm.username}@kokulikuler.id`;
        const { error } = await supabase.auth.admin.createUser({
            email,
            password: "kokulikuler@2026",
            email_confirm: true,
            user_metadata: {
                full_name: adm.nama,
                role: 'admin',
                username: adm.username
            }
        });
        if (error) console.log(`❌ Admin ${adm.username} gagal: ${error.message}`);
        else console.log(`✅ Admin ${adm.username} berhasil`);
    }

    // 2. Create Fasilitators
    for (const fasil of fasilitators) {
        const email = `${fasil.username}@kokulikuler.id`;
        const { error } = await supabase.auth.admin.createUser({
            email,
            password: "kokulikuler@2026",
            email_confirm: true,
            user_metadata: {
                full_name: fasil.nama,
                role: 'fasilitator',
                username: fasil.username,
                kelas: fasil.kelas,
                mapel: 'Fasilitator Kokulikuler'
            }
        });
        if (error) console.log(`❌ Fasilitator ${fasil.username} gagal: ${error.message}`);
        else console.log(`✅ Fasilitator ${fasil.username} berhasil`);
    }

    console.log("🏁 Selesai!");
}

createAccounts();

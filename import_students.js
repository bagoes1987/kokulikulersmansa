// ============================================
// SCRIPT IMPORT DATA SISWA KE SUPABASE
// ============================================

const XLSX = require('xlsx');
const { createClient } = require('@supabase/supabase-js');

// Konfigurasi Supabase
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';

// PENTING: Gunakan Service Role Key untuk operasi admin
// Ganti dengan Service Role Key dari Supabase Dashboard > Settings > API
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Path ke file Excel
const excelFilePath = 'D:\\Aplikasi Web AI\\LP Kokulikuler SMAN 1 Belitang\\DAFTAR NAMA SISWA KELAS X-XII 2026.xlsx';

async function importStudents() {
    try {
        console.log('📚 Membaca file Excel...');

        // Baca file Excel
        const workbook = XLSX.readFile(excelFilePath);
        const sheetName = workbook.SheetNames[0];
        const students = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        console.log(`✅ Berhasil membaca ${students.length} data siswa\n`);

        // Tampilkan 3 data pertama sebagai preview
        console.log('📋 Preview 3 data pertama:');
        students.slice(0, 3).forEach((student, index) => {
            console.log(`${index + 1}. ${student.NAMA} - NIS: ${student.NIS} - NISN: ${student.NISN} - Kelas: ${student['KELAS ']}`);
        });
        console.log('');

        // Konfirmasi sebelum import
        console.log('⚠️  PERHATIAN: Script ini akan membuat akun untuk semua siswa!');
        console.log('📝 Setiap siswa akan mendapat:');
        console.log('   - Email: {nisn}@smansa.sch.id');
        console.log('   - Password: {nis}');
        console.log('   - Username untuk login: NISN');
        console.log('   - Password untuk login: NIS\n');

        // Proses import
        let successCount = 0;
        let errorCount = 0;
        const errors = [];

        console.log('🚀 Memulai import data...\n');

        for (let i = 0; i < students.length; i++) {
            const student = students[i];
            const nis = String(student.NIS).trim();
            const nisn = String(student.NISN).trim();
            const nama = student.NAMA.trim();
            const kelas = student['KELAS '].trim();

            // Email format: nisn@smansa.sch.id
            const email = `${nisn}@smansa.sch.id`;
            const password = nis; // Password = NIS

            try {
                // 1. Buat user di Supabase Auth
                const { data: authData, error: authError } = await supabase.auth.admin.createUser({
                    email: email,
                    password: password,
                    email_confirm: true, // Auto-confirm email
                    user_metadata: {
                        full_name: nama,
                        role: 'siswa',
                        nis: nis,
                        nisn: nisn,
                        kelas: kelas
                    }
                });

                if (authError) {
                    throw authError;
                }

                const userId = authData.user.id;

                // 2. Insert ke tabel students
                const { error: studentError } = await supabase
                    .from('students')
                    .insert({
                        id: userId,
                        nis: nis,
                        nisn: nisn,
                        nama: nama,
                        kelas: kelas
                    });

                if (studentError) {
                    throw studentError;
                }

                successCount++;
                console.log(`✅ [${i + 1}/${students.length}] ${nama} (NIS: ${nis})`);

            } catch (error) {
                errorCount++;
                errors.push({ nama, nis, error: error.message });
                console.log(`❌ [${i + 1}/${students.length}] GAGAL: ${nama} (NIS: ${nis}) - ${error.message}`);
            }

            // Delay kecil untuk menghindari rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        // Tampilkan ringkasan
        console.log('\n' + '='.repeat(50));
        console.log('📊 RINGKASAN IMPORT');
        console.log('='.repeat(50));
        console.log(`✅ Berhasil: ${successCount} siswa`);
        console.log(`❌ Gagal: ${errorCount} siswa`);
        console.log(`📝 Total: ${students.length} siswa\n`);

        if (errors.length > 0) {
            console.log('⚠️  DAFTAR ERROR:');
            errors.forEach((err, index) => {
                console.log(`${index + 1}. ${err.nama} (NIS: ${err.nis})`);
                console.log(`   Error: ${err.error}\n`);
            });
        }

        console.log('✨ Import selesai!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Jalankan import
importStudents();

// ============================================
// SCRIPT HAPUS SEMUA DATA SISWA
// ============================================

const { createClient } = require('@supabase/supabase-js');

// Konfigurasi Supabase
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function deleteAllStudents() {
    try {
        console.log('🗑️  Menghapus semua data siswa...\n');

        // 1. Ambil semua data siswa
        const { data: students, error: fetchError } = await supabase
            .from('students')
            .select('id, nama, nis');

        if (fetchError) {
            throw fetchError;
        }

        console.log(`📊 Total siswa yang akan dihapus: ${students.length}\n`);

        let deletedCount = 0;
        let errorCount = 0;

        // 2. Hapus satu per satu
        for (let i = 0; i < students.length; i++) {
            const student = students[i];

            try {
                // Hapus user dari Auth (ini akan auto-delete dari students karena cascade)
                const { error: deleteError } = await supabase.auth.admin.deleteUser(student.id);

                if (deleteError) {
                    throw deleteError;
                }

                deletedCount++;
                console.log(`✅ [${i + 1}/${students.length}] Dihapus: ${student.nama} (NIS: ${student.nis})`);

            } catch (error) {
                errorCount++;
                console.log(`❌ [${i + 1}/${students.length}] GAGAL: ${student.nama} - ${error.message}`);
            }

            // Delay kecil
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        console.log('\n' + '='.repeat(50));
        console.log('📊 RINGKASAN PENGHAPUSAN');
        console.log('='.repeat(50));
        console.log(`✅ Berhasil dihapus: ${deletedCount} siswa`);
        console.log(`❌ Gagal: ${errorCount} siswa`);
        console.log(`📝 Total: ${students.length} siswa\n`);
        console.log('✨ Penghapusan selesai!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

// Jalankan
deleteAllStudents();

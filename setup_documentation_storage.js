const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function setupStorage() {
    console.log('🚀 Menyiapkan Storage Supabase...');

    try {
        // 1. Cek apakah bucket sudah ada
        const { data: buckets, error: listError } = await supabase.storage.listBuckets();
        if (listError) throw listError;

        const exists = buckets.find(b => b.name === 'documentation');

        if (!exists) {
            console.log('📦 Membuat bucket "documentation"...');
            const { data, error } = await supabase.storage.createBucket('documentation', {
                public: true, // Kita set public agar file bisa diakses via URL langsung
                fileSizeLimit: 1048576, // 1MB limit per file (foto kita cuma ~50KB)
                allowedMimeTypes: ['image/jpeg', 'image/png']
            });
            if (error) throw error;
            console.log('✅ Bucket "documentation" berhasil dibuat.');
        } else {
            console.log('ℹ️ Bucket "documentation" sudah ada.');
        }

        console.log('\n💡 Tip: Saya telah menyetel bucket ini ke PUBLIC agar foto bisa langsung diakses.');
        console.log('Siswa sekarang bisa mengupload foto dokumentasi mereka.');

    } catch (err) {
        console.error('❌ Terjadi kesalahan:', err.message);
    }
}

setupStorage();

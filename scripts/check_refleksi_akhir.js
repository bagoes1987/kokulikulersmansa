
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkRefleksiAkhir() {
    console.log("🧐 Memeriksa data refleksi_akhir...");

    const { data: responses, error } = await supabase
        .from('module_responses')
        .select('*')
        .eq('module_type', 'refleksi_akhir')
        .eq('day_id', 3)
        .order('updated_at', { ascending: false });

    if (error) {
        console.error("❌ Error:", error.message);
        return;
    }

    console.log(`✅ Ditemukan ${responses.length} data refleksi_akhir.\n`);

    responses.forEach((r, i) => {
        console.log(`[${i + 1}] ID: ${r.id}`);
        console.log(`    Student ID: ${r.student_id}`);
        console.log(`    Status: ${r.status}`);
        console.log(`    Answers: ${JSON.stringify(r.answers)}`);
        console.log('----------------------------------------');
    });
}

checkRefleksiAkhir();

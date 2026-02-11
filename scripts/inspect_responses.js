
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function inspectResponses() {
    console.log("🧐 Memeriksa data module_responses...");

    const { data: responses, error } = await supabase
        .from('module_responses')
        .select('*')
        .eq('module_type', 'dokumentasi')
        .eq('day_id', 3)
        .order('id', { ascending: true })
        .limit(20);

    if (error) {
        console.error("❌ Error:", error.message);
        return;
    }

    console.log(`✅ Ditemukan ${responses.length} data dokumentasi.\n`);

    responses.forEach((r, i) => {
        console.log(`[${i + 1}] ID: ${r.id}`);
        console.log(`    Student ID: ${r.student_id}`);
        console.log(`    Day ID: ${r.day_id}`);
        console.log(`    Category: ${r.category}`);
        console.log(`    Answers: ${r.answers ? r.answers[0] : 'NULL'}`);
        console.log(`    Score: ${r.score || 'None'}`);
        console.log(`    Status: ${r.status}`);
        console.log(`    Bucket Check: ${r.answers && r.answers[0].includes('dokumentasi') ? 'DOKUMENTASI' : 'DOCUMENTATION/OLD'}`);
        console.log('----------------------------------------');
    });
}

inspectResponses();

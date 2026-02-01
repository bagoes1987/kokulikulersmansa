const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkDesandraStatus() {
    console.log('🔍 Checking DESANDRA\'s response status in database...');

    try {
        // 1. Get Desandra's ID
        const { data: students } = await supabase
            .from('students')
            .select('id, nama, kelas')
            .ilike('nama', '%DESANDRA%')
            .single();

        if (!students) {
            console.log('❌ Student DESANDRA not found');
            return;
        }

        console.log(`✅ Found student: ${students.nama} (${students.id}) - Class: ${students.kelas}`);

        // 2. Check her responses
        const { data: responses } = await supabase
            .from('module_responses')
            .select('*')
            .eq('student_id', students.id)
            .order('created_at', { ascending: false });

        if (!responses || responses.length === 0) {
            console.log('❌ No responses found for DESANDRA');
        } else {
            console.log(`✅ Found ${responses.length} response(s):`);
            responses.forEach((r, i) => {
                console.log(`\nResponse ${i + 1}:`);
                console.log(`  ID: ${r.id}`);
                console.log(`  Status: ${r.status}`);
                console.log(`  Score: ${r.score}`);
                console.log(`  Feedback: ${r.feedback}`);
                console.log(`  Created At: ${r.created_at}`);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkDesandraStatus();

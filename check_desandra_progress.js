const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function checkDesandraProgress() {
    console.log('🔍 Checking DESANDRA progress calculation...\n');

    try {
        // Get DESANDRA
        const { data: desandraList } = await supabase
            .from('students')
            .select('id, nama, kelas')
            .ilike('nama', '%DESANDRA%');

        const desandra = desandraList[0];
        console.log(`Student: ${desandra.nama} (${desandra.kelas})`);
        console.log(`ID: ${desandra.id}\n`);

        // Get ALL responses from DESANDRA
        const { data: responses } = await supabase
            .from('module_responses')
            .select('*')
            .eq('student_id', desandra.id)
            .order('created_at', { ascending: false });

        console.log(`Total responses: ${responses ? responses.length : 0}`);

        if (responses && responses.length > 0) {
            console.log('\nAll responses:');
            responses.forEach(r => {
                console.log(`  - Day ${r.day_id}, ${r.module_type}, Status: ${r.status}, Created: ${new Date(r.created_at).toLocaleString('id-ID')}`);
                console.log(`    Answer preview: ${JSON.stringify(r.answers).substring(0, 100)}...`);
            });
        } else {
            console.log('❌ No responses found!');
        }

        // Check what the dashboard would see
        console.log('\n=== SIMULATING DASHBOARD QUERY ===');

        // Get students in XI.3
        const { data: xi3Students } = await supabase
            .from('students')
            .select('id, nama')
            .eq('kelas', 'XI.3');

        const studentIds = xi3Students.map(s => s.id);
        console.log(`Total XI.3 students: ${xi3Students.length}`);
        console.log(`DESANDRA in list: ${studentIds.includes(desandra.id)}`);

        // Get latest 5 responses from XI.3 students
        const { data: recent } = await supabase
            .from('module_responses')
            .select('*')
            .in('student_id', studentIds)
            .order('created_at', { ascending: false })
            .limit(5);

        console.log(`\nRecent responses (limit 5): ${recent ? recent.length : 0}`);
        if (recent && recent.length > 0) {
            recent.forEach(r => {
                const student = xi3Students.find(s => s.id === r.student_id);
                console.log(`  - ${student?.nama}: Day ${r.day_id}, ${r.module_type}`);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkDesandraProgress();

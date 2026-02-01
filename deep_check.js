const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function deepCheck() {
    console.log('🔍 Deep checking DESANDRA issue...\n');

    try {
        // Get DESANDRA
        const { data: desandraList } = await supabase
            .from('students')
            .select('id, nama, kelas')
            .ilike('nama', '%DESANDRA%');

        const desandra = desandraList[0];
        console.log('DESANDRA Info:');
        console.log(`  ID: ${desandra.id}`);
        console.log(`  Name: ${desandra.nama}`);
        console.log(`  Class: ${desandra.kelas}`);

        // Get first 10 students from XI.3
        const { data: xi3Students } = await supabase
            .from('students')
            .select('id, nama, kelas')
            .eq('kelas', 'XI.3')
            .limit(10);

        console.log(`\nFirst 10 XI.3 students:`);
        const studentIds = xi3Students.map(s => s.id);
        xi3Students.forEach(s => {
            console.log(`  - ${s.nama} (${s.id})`);
        });

        console.log(`\nIs DESANDRA in the first 10? ${studentIds.includes(desandra.id) ? 'YES' : 'NO'}`);

        // Get ALL XI.3 students
        const { data: allXi3Students } = await supabase
            .from('students')
            .select('id, nama, kelas')
            .eq('kelas', 'XI.3');

        console.log(`\nTotal XI.3 students: ${allXi3Students.length}`);
        const allStudentIds = allXi3Students.map(s => s.id);
        console.log(`Is DESANDRA in ALL XI.3 students? ${allStudentIds.includes(desandra.id) ? 'YES' : 'NO'}`);

        // Get responses using ALL student IDs
        const { data: responses } = await supabase
            .from('module_responses')
            .select('id, student_id, day_id, module_type, created_at')
            .in('student_id', allStudentIds)
            .order('created_at', { ascending: false });

        console.log(`\nResponses from ALL XI.3 students: ${responses ? responses.length : 0}`);
        if (responses && responses.length > 0) {
            responses.forEach(r => {
                const student = allXi3Students.find(s => s.id === r.student_id);
                console.log(`  - ${student?.nama}: Day ${r.day_id}, ${r.module_type}`);
            });
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

deepCheck();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function verifyFix() {
    console.log('🔍 Verifying class format fix and checking student responses...\n');

    try {
        // 1. Check Nengsi Juita's current class
        console.log('1️⃣ Checking Nengsi Juita\'s class format...');
        const { data: userList } = await supabase.auth.admin.listUsers();
        const nengsi = userList.users.find(u => u.user_metadata?.full_name?.includes('Nengsi'));

        if (nengsi) {
            console.log(`   Name: ${nengsi.user_metadata.full_name}`);
            console.log(`   Class: ${nengsi.user_metadata.kelas}`);
            console.log(`   Mapel: ${nengsi.user_metadata.mapel}`);
        }

        // 2. Check students in XI.3
        console.log('\n2️⃣ Checking students in class XI.3...');
        const { data: students, error: sError } = await supabase
            .from('students')
            .select('id, nama, kelas')
            .eq('kelas', 'XI.3')
            .limit(10);

        if (students) {
            console.log(`   Found ${students.length} students in XI.3`);
            students.forEach(s => console.log(`   - ${s.nama}`));
        }

        // 3. Check DESANDRA's response
        console.log('\n3️⃣ Checking DESANDRA\'s responses...');
        const { data: desandraStudents } = await supabase
            .from('students')
            .select('id, nama, kelas')
            .ilike('nama', '%DESANDRA%');

        if (desandraStudents && desandraStudents.length > 0) {
            const desandra = desandraStudents[0];
            console.log(`   Student: ${desandra.nama} (${desandra.kelas})`);

            const { data: responses } = await supabase
                .from('module_responses')
                .select('*')
                .eq('student_id', desandra.id)
                .order('created_at', { ascending: false });

            if (responses && responses.length > 0) {
                console.log(`   Found ${responses.length} response(s):`);
                responses.forEach(r => {
                    console.log(`   - Day ${r.day_id}, ${r.module_type}, created: ${new Date(r.created_at).toLocaleString('id-ID')}`);
                });
            } else {
                console.log('   ❌ No responses found!');
            }
        }

        // 4. Check all responses from XI.3 students
        console.log('\n4️⃣ Checking all responses from XI.3 students...');
        if (students && students.length > 0) {
            const studentIds = students.map(s => s.id);
            const { data: allResponses } = await supabase
                .from('module_responses')
                .select('id, student_id, day_id, module_type, created_at')
                .in('student_id', studentIds)
                .order('created_at', { ascending: false })
                .limit(10);

            if (allResponses && allResponses.length > 0) {
                console.log(`   Found ${allResponses.length} total response(s) from XI.3 students:`);
                for (const r of allResponses) {
                    const student = students.find(s => s.id === r.student_id);
                    console.log(`   - ${student?.nama}: Day ${r.day_id}, ${r.module_type}, ${new Date(r.created_at).toLocaleString('id-ID')}`);
                }
            } else {
                console.log('   ❌ No responses found from XI.3 students!');
            }
        }

        console.log('\n✅ Verification complete!');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

verifyFix();

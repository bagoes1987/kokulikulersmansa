const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function fixAllClassFormats() {
    console.log('🔧 Starting class format fix...\n');

    try {
        // 1. Fix facilitators
        console.log('1️⃣ Fixing facilitators...');
        const { data: facilitators, error: fError } = await supabase.rpc('fix_facilitator_classes');

        if (fError) {
            console.log('   Using direct update for facilitators...');
            // Get all facilitators with space in class
            const { data: facilList } = await supabase.auth.admin.listUsers();
            const facilToFix = facilList.users.filter(u =>
                u.user_metadata?.role === 'fasilitator' &&
                u.user_metadata?.kelas?.includes('. ')
            );

            console.log(`   Found ${facilToFix.length} facilitators to fix`);

            for (const user of facilToFix) {
                const fixedClass = user.user_metadata.kelas.replace('. ', '.');
                await supabase.auth.admin.updateUserById(user.id, {
                    user_metadata: {
                        ...user.user_metadata,
                        kelas: fixedClass
                    }
                });
                console.log(`   ✅ ${user.user_metadata.full_name}: ${user.user_metadata.kelas} → ${fixedClass}`);
            }
        }

        // 2. Fix coordinators
        console.log('\n2️⃣ Fixing coordinators...');
        const { data: coordList } = await supabase.auth.admin.listUsers();
        const coordToFix = coordList.users.filter(u =>
            u.user_metadata?.role === 'koordinator' &&
            u.user_metadata?.kelas?.includes('. ')
        );

        console.log(`   Found ${coordToFix.length} coordinators to fix`);

        for (const user of coordToFix) {
            const fixedClass = user.user_metadata.kelas.replace('. ', '.');
            await supabase.auth.admin.updateUserById(user.id, {
                user_metadata: {
                    ...user.user_metadata,
                    kelas: fixedClass
                }
            });
            console.log(`   ✅ ${user.user_metadata.full_name}: ${user.user_metadata.kelas} → ${fixedClass}`);
        }

        // 3. Fix students
        console.log('\n3️⃣ Fixing students...');
        const { data: students, error: sError } = await supabase
            .from('students')
            .select('id, nama, kelas')
            .like('kelas', '%. %');

        if (students && students.length > 0) {
            console.log(`   Found ${students.length} students to fix`);

            for (const student of students) {
                const fixedClass = student.kelas.replace('. ', '.');
                await supabase
                    .from('students')
                    .update({ kelas: fixedClass })
                    .eq('id', student.id);
                console.log(`   ✅ ${student.nama}: ${student.kelas} → ${fixedClass}`);
            }
        } else {
            console.log('   No students need fixing');
        }

        console.log('\n✅ ALL CLASS FORMATS FIXED!');
        console.log('\n⚠️  IMPORTANT: All facilitators and coordinators must LOGOUT and LOGIN again!');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

fixAllClassFormats();

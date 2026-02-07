const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function checkDay2Contamination() {
    console.log('🔍 Checking Day 2 Data Contamination...\n');
    console.log('='.repeat(60));

    try {
        // 1. Get all Day 2 responses
        console.log('\n📊 DAY 2 RESPONSES:');
        console.log('-'.repeat(60));

        const { data: day2Responses, error: day2Error } = await supabase
            .from('module_responses')
            .select('id, student_id, day_id, module_type, status, created_at, answers')
            .eq('day_id', 2)
            .order('created_at', { ascending: false });

        if (day2Error) throw day2Error;

        if (!day2Responses || day2Responses.length === 0) {
            console.log('✅ No Day 2 responses found in database');
        } else {
            console.log(`⚠️  Found ${day2Responses.length} Day 2 responses:`);
            console.log('');

            // Group by module type
            const byModule = {};
            day2Responses.forEach(r => {
                if (!byModule[r.module_type]) byModule[r.module_type] = [];
                byModule[r.module_type].push(r);
            });

            for (const [moduleType, responses] of Object.entries(byModule)) {
                console.log(`  📌 ${moduleType.toUpperCase()}: ${responses.length} responses`);
                responses.forEach(r => {
                    const answerPreview = r.answers && r.answers[0]
                        ? r.answers[0].substring(0, 50) + '...'
                        : 'No answer';
                    console.log(`     - Student: ${r.student_id.substring(0, 8)}...`);
                    console.log(`       Status: ${r.status}`);
                    console.log(`       Created: ${new Date(r.created_at).toLocaleString('id-ID')}`);
                    console.log(`       Answer: ${answerPreview}`);
                    console.log('');
                });
            }
        }

        // 2. Check for duplicate responses (same student, same module, different days)
        console.log('\n🔄 CHECKING FOR DUPLICATES:');
        console.log('-'.repeat(60));

        const { data: allResponses, error: allError } = await supabase
            .from('module_responses')
            .select('student_id, day_id, module_type, created_at')
            .order('student_id', { ascending: true });

        if (allError) throw allError;

        // Find students with responses in multiple days for same module
        const studentModuleMap = {};
        allResponses.forEach(r => {
            const key = `${r.student_id}_${r.module_type}`;
            if (!studentModuleMap[key]) {
                studentModuleMap[key] = [];
            }
            studentModuleMap[key].push(r);
        });

        const duplicates = Object.entries(studentModuleMap)
            .filter(([key, responses]) => responses.length > 1)
            .filter(([key, responses]) => {
                // Check if same module exists in different days
                const days = [...new Set(responses.map(r => r.day_id))];
                return days.length > 1;
            });

        if (duplicates.length === 0) {
            console.log('✅ No duplicate responses across different days');
        } else {
            console.log(`⚠️  Found ${duplicates.length} students with duplicate responses:`);
            duplicates.forEach(([key, responses]) => {
                const [studentId, moduleType] = key.split('_');
                console.log(`\n  Student: ${studentId.substring(0, 8)}... | Module: ${moduleType}`);
                responses.forEach(r => {
                    console.log(`    - Day ${r.day_id}: ${new Date(r.created_at).toLocaleString('id-ID')}`);
                });
            });
        }

        // 3. Check Day 1 vs Day 2 comparison
        console.log('\n📈 DAY COMPARISON:');
        console.log('-'.repeat(60));

        const { data: day1Responses } = await supabase
            .from('module_responses')
            .select('module_type')
            .eq('day_id', 1);

        const day1Count = day1Responses ? day1Responses.length : 0;
        const day2Count = day2Responses ? day2Responses.length : 0;

        console.log(`Day 1 Total Responses: ${day1Count}`);
        console.log(`Day 2 Total Responses: ${day2Count}`);

        // 4. Recommendations
        console.log('\n💡 RECOMMENDATIONS:');
        console.log('-'.repeat(60));

        if (day2Count > 0) {
            console.log('⚠️  Day 2 has data that should be cleaned:');
            console.log('   1. Run CLEAN_DAY2_DATA.sql to remove all Day 2 responses');
            console.log('   2. Ask students to clear browser localStorage');
            console.log('   3. Add unique constraint to prevent duplicates');
        } else {
            console.log('✅ Day 2 is clean - ready for new content');
        }

        if (duplicates.length > 0) {
            console.log('\n⚠️  Duplicate responses detected:');
            console.log('   1. Identify which day_id is correct for each student');
            console.log('   2. Delete incorrect entries manually');
            console.log('   3. Add unique constraint: (student_id, day_id, module_type)');
        }

        console.log('\n' + '='.repeat(60));
        console.log('✅ Diagnostic complete!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error(error);
    }
}

checkDay2Contamination();

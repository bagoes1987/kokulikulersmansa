const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function checkVideoResponses() {
    console.log('🎥 Checking VIDEO responses in Day 2...\n');
    console.log('='.repeat(60));

    try {
        // Check all VIDEO responses
        const { data: allVideos, error } = await supabase
            .from('module_responses')
            .select('*')
            .eq('module_type', 'video')
            .order('day_id', { ascending: true })
            .order('created_at', { ascending: false });

        if (error) throw error;

        console.log(`\n📊 Total VIDEO responses: ${allVideos ? allVideos.length : 0}\n`);

        if (allVideos && allVideos.length > 0) {
            // Group by day
            const byDay = { 1: [], 2: [], 3: [] };
            allVideos.forEach(r => {
                if (byDay[r.day_id]) byDay[r.day_id].push(r);
            });

            for (const [day, responses] of Object.entries(byDay)) {
                if (responses.length === 0) continue;

                console.log(`\n📅 DAY ${day} - ${responses.length} video response(s):`);
                console.log('-'.repeat(60));

                responses.forEach((r, idx) => {
                    console.log(`\n  ${idx + 1}. Student ID: ${r.student_id.substring(0, 12)}...`);
                    console.log(`     Status: ${r.status}`);
                    console.log(`     Created: ${new Date(r.created_at).toLocaleString('id-ID')}`);
                    console.log(`     Score: ${r.score || 'Not graded'}`);

                    if (r.answers && r.answers[0]) {
                        const summary = r.answers[0];
                        const preview = summary.length > 100
                            ? summary.substring(0, 100) + '...'
                            : summary;
                        console.log(`     Summary: "${preview}"`);
                    } else {
                        console.log(`     Summary: [Empty]`);
                    }

                    if (r.feedback) {
                        console.log(`     Feedback: "${r.feedback}"`);
                    }
                });
            }

            // Check for duplicates (same student, different days)
            console.log('\n\n🔄 DUPLICATE CHECK:');
            console.log('-'.repeat(60));

            const studentMap = {};
            allVideos.forEach(r => {
                if (!studentMap[r.student_id]) {
                    studentMap[r.student_id] = [];
                }
                studentMap[r.student_id].push(r);
            });

            const duplicates = Object.entries(studentMap)
                .filter(([id, responses]) => responses.length > 1);

            if (duplicates.length === 0) {
                console.log('✅ No duplicate video responses found');
            } else {
                console.log(`⚠️  Found ${duplicates.length} student(s) with multiple video responses:\n`);
                duplicates.forEach(([studentId, responses]) => {
                    console.log(`  Student: ${studentId.substring(0, 12)}...`);
                    responses.forEach(r => {
                        console.log(`    - Day ${r.day_id}: ${new Date(r.created_at).toLocaleString('id-ID')}`);
                    });
                    console.log('');
                });
            }
        } else {
            console.log('✅ No video responses found in database');
        }

        console.log('\n' + '='.repeat(60));
        console.log('✅ Check complete!\n');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkVideoResponses();

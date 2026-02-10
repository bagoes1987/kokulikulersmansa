
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

const classes = ['XI.11'];

async function checkAllClasses() {
    console.log('Checking progress for ALL classes (Detailed Status)...');
    console.log('Class | Students | Total Resp | Reviewed | Submitted | Calc Progress');
    console.log('-------------------------------------------------------------------');

    for (const cls of classes) {
        // 1. Get Students
        const { count: sCount, data: students, error: sError } = await supabase
            .from('students')
            .select('id', { count: 'exact', head: false })
            .eq('kelas', cls);

        if (sError || !sCount) {
            // console.log(`${cls.padEnd(6)} | Error/NoData`);
            continue;
        }

        const ids = students.map(s => s.id);

        // 2. Get ALL Responses
        const { data: responses, error: rError } = await supabase
            .from('module_responses')
            .select('id, status')
            .in('student_id', ids);

        if (rError) {
            console.error(`Error responses ${cls}:`, rError.message);
            continue;
        }

        const rCount = responses.length;
        const reviewedCount = responses.filter(r => r.status === 'reviewed').length;
        const submittedCount = responses.filter(r => r.status === 'submitted').length;

        // Check for duplicates
        // Create a map of student_id -> Set of module_types (or count)
        // Check if any student has > 1 response of same type (simplified check: if we assume 15 types)

        let duplicateCount = 0;
        // Group by student
        const studentResponses = {};
        responses.forEach(r => {
            if (!studentResponses[r.student_id]) studentResponses[r.student_id] = [];
            studentResponses[r.student_id].push(r);
        });

        // Check each student for duplicates based on assuming module_type or something constitutes uniqueness
        // Since we didn't initially select module_type, we can't check perfectly here unless we update query.
        // BUT, if rCount > 15 * sCount, we know for sure on average.

        // 3. Calculate Progress
        const totalPossible = sCount * 15;
        // Calculate raw %
        const rawPct = (reviewedCount / totalPossible) * 100;
        const progress = Math.min(100, Math.round(rawPct));

        // Show row if there is any activity or if it matches the problematic condition
        if (progress > 5 || rCount > 0 || rawPct > 100) { // Added rawPct > 100 to condition
            if (rawPct > 100 || progress === 100) {
                console.log(`${cls.padEnd(6)} | ${String(sCount).padEnd(8)} | ${String(rCount).padEnd(10)} | ${String(reviewedCount).padEnd(8)} | ${String(submittedCount).padEnd(9)} | ${rawPct.toFixed(1)}% -> ${progress}%`);
                if (rawPct > 100) console.log(`   [!] Potential Duplicates in ${cls}`);
            } else {
                console.log(`${cls.padEnd(6)} | ${String(sCount).padEnd(8)} | ${String(rCount).padEnd(10)} | ${String(reviewedCount).padEnd(8)} | ${String(submittedCount).padEnd(9)} | ${progress}%`);
            }
        }
    }
}

checkAllClasses();


const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStudentResponseCounts() {
    console.log('Checking for students with > 15 reviewed responses...');

    // Get all reviewed responses
    const { data: responses, error } = await supabase
        .from('module_responses')
        .select('student_id, day_id, module_type')
        .eq('status', 'reviewed');

    if (error) {
        console.error('Error fetching responses:', error);
        return;
    }

    const studentCounts = {};
    const detailedMap = {};

    responses.forEach(r => {
        // Count total
        studentCounts[r.student_id] = (studentCounts[r.student_id] || 0) + 1;

        // Track unique modules
        if (!detailedMap[r.student_id]) detailedMap[r.student_id] = new Set();
        const key = `${r.day_id}-${r.module_type}`;
        detailedMap[r.student_id].add(key);
    });

    console.log(`Total records: ${responses.length}`);

    let anomalyCount = 0;
    for (const [studentId, count] of Object.entries(studentCounts)) {
        if (count > 15) {
            anomalyCount++;
            const uniqueCount = detailedMap[studentId].size;
            console.log(`Student ${studentId}: ${count} responses (Unique Modules: ${uniqueCount})`);

            // Should get student name for context
            const { data: s } = await supabase.from('students').select('nama, kelas').eq('id', studentId).single();
            if (s) console.log(`   -> ${s.nama} (${s.kelas})`);
        }
    }

    if (anomalyCount === 0) {
        console.log('No students found with > 15 reviewed responses.');
    } else {
        console.log(`Found ${anomalyCount} students with > 15 responses.`);
    }
}

checkStudentResponseCounts();

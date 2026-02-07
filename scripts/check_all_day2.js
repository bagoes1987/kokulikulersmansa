const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkAllStudentProgress() {
    console.log('Checking all students Day 2 progress...\n');

    // Get all students
    const { data: students, error: studentsError } = await supabase
        .from('students')
        .select('id, nama, kelas')
        .order('nama', { ascending: true })
        .limit(10);

    if (studentsError) {
        console.error('Error fetching students:', studentsError);
        return;
    }

    console.log(`Checking ${students.length} students...\n`);

    for (const student of students) {
        const { data: responses, error } = await supabase
            .from('module_responses')
            .select('module_type, status, day_id')
            .eq('student_id', student.id)
            .eq('day_id', 2);

        if (error) {
            console.error(`Error for ${student.nama}:`, error);
            continue;
        }

        if (responses && responses.length > 0) {
            console.log(`${student.nama} (${student.kelas}): ${responses.length} Day 2 responses`);
            responses.forEach(r => {
                console.log(`  - ${r.module_type}: ${r.status}`);
            });
        }
    }
}

checkAllStudentProgress();

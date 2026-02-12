const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkStudent(name) {
    console.log(`Checking responses for student: ${name}`);

    // Use profiles or students table depending on which one contains the names
    const { data: students, error: sError } = await supabase
        .from('students')
        .select('id, nama')
        .ilike('nama', `%${name}%`);

    if (sError) {
        console.error("Error fetching student:", sError);
        return;
    }

    if (!students || students.length === 0) {
        console.log("Student not found in 'students' table. Checking 'profiles'...");
        const { data: profiles, error: pError } = await supabase
            .from('profiles')
            .select('id, nama')
            .ilike('nama', `%${name}%`);

        if (pError || !profiles || profiles.length === 0) {
            console.log("Student not found in 'profiles' either.");
            return;
        }
        students.push(...profiles);
    }

    for (const student of students) {
        console.log(`\n--- Found Student: ${student.nama} (ID: ${student.id}) ---`);

        const { data: responses, error: rError } = await supabase
            .from('module_responses')
            .select('*')
            .eq('student_id', student.id);

        if (rError) {
            console.error("Error fetching responses:", rError);
            continue;
        }

        if (!responses || responses.length === 0) {
            console.log("No responses found for this student.");
        } else {
            console.table(responses.map(r => ({
                module_type: r.module_type,
                day_id: r.day_id,
                status: r.status,
                score: r.score,
                created_at: r.created_at
            })));
        }
    }
}

const targetName = process.argv[2] || "Nabil Ramadhan";
checkStudent(targetName);

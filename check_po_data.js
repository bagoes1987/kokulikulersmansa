
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPO() {
    console.log("Checking PO submissions for classes XI.6 and XII.1...");

    // 1. Get students for these classes
    const classes = ['XI.6', 'XII.1'];
    const { data: students, error: stError } = await supabase
        .from('students')
        .select('id, nama, kelas')
        .in('kelas', classes);

    if (stError) {
        console.error("Error fetching students:", stError);
        return;
    }

    console.log(`Found ${students.length} students in classes ${classes.join(', ')}.`);

    if (students.length === 0) {
        // Maybe class name is slightly different? Let's check all unique classes
        const { data: allClasses } = await supabase.from('students').select('kelas');
        const uniqueClasses = [...new Set(allClasses.map(s => s.kelas))];
        console.log("Unique classes in DB:", uniqueClasses);
        return;
    }

    const studentIds = students.map(s => s.id);

    // 2. Check for module_responses
    const { data: responses, error: resError } = await supabase
        .from('module_responses')
        .select('*')
        .in('student_id', studentIds)
        .eq('module_type', 'bep_analisis')
        .eq('day_id', 2);

    if (resError) {
        console.error("Error fetching responses:", resError);
        return;
    }

    console.log(`Found ${responses.length} PO responses for these students.`);

    responses.forEach(r => {
        const student = students.find(s => s.id === r.student_id);
        console.log(`- Student: ${student.nama} (${student.kelas})`);
        console.log(`  Answers: ${JSON.stringify(r.answers)}`);
    });

    // 3. Check if there are other module_responses for these students that might be PO
    const { data: allRes } = await supabase
        .from('module_responses')
        .select('module_type, day_id')
        .in('student_id', studentIds)
        .limit(10);

    console.log("Other responses found for these students (samples):", allRes);
}

checkPO();

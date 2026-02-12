const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24'
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkClassXII3() {
    console.log("Checking Class XII.3 success rate on Day 3 Documentation...");

    // 1. Get all students in XII.3
    const { data: students, error: sErr } = await supabase
        .from('students')
        .select('id, nama')
        .eq('kelas', 'XII.3');

    if (sErr) return console.error(sErr);

    const studentIds = students.map(s => s.id);
    console.log(`Total students in XII.3: ${students.length}`);

    // 2. Get their Day 3 Documentation responses
    const { data: responses, error: rErr } = await supabase
        .from('module_responses')
        .select('student_id')
        .in('student_id', studentIds)
        .eq('day_id', 3)
        .eq('module_type', 'dokumentasi');

    if (rErr) return console.error(rErr);

    console.log(`XII.3 students who submitted Day 3 Documentation: ${responses.length}`);

    const submittedIds = responses.map(r => r.student_id);
    const notSubmitted = students.filter(s => !submittedIds.includes(s.id));

    console.log("\nStudents NOT yet submitted (Top 10):");
    notSubmitted.slice(0, 10).forEach(s => console.log(`- ${s.nama}`));
}

checkClassXII3();

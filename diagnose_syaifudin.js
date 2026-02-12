const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function diagnoseStudent(name) {
    console.log(`🔍 Diagnosing student: ${name}...`);

    // 1. Find student
    const { data: students, error: sErr } = await supabase
        .from('students')
        .select('*')
        .ilike('nama', `%${name}%`);

    if (sErr) return console.error("Error students:", sErr);
    if (!students || students.length === 0) return console.log("Student not found.");

    const student = students[0];
    console.log(`✅ Found: ${student.nama} (${student.id}) Kelas: ${student.kelas}`);

    // 2. Check profile
    const { data: profile, error: pErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', student.id)
        .maybeSingle();

    if (pErr) console.error("Error profile:", pErr);
    else if (profile) console.log("✅ Profile exists.");
    else console.log("⚠️ Profile NOT found for this student ID.");

    // 3. Check Day 3 Documentation responses
    const { data: responses, error: rErr } = await supabase
        .from('module_responses')
        .select('*')
        .eq('student_id', student.id)
        .eq('day_id', 3)
        .eq('module_type', 'dokumentasi');

    if (rErr) console.error("Error responses:", rErr);
    else {
        console.log(`✅ Documentation Responses (H3): ${responses.length}`);
        responses.forEach(r => {
            console.log(`- ID: ${r.id}, Status: ${r.status}, Updated: ${r.updated_at}`);
            console.log(`  Answers: ${r.answers}`);
        });
    }

    // 4. Check other H3 responses
    const { data: allH3, error: h3Err } = await supabase
        .from('module_responses')
        .select('module_type, status')
        .eq('student_id', student.id)
        .eq('day_id', 3);

    if (h3Err) console.error("Error all H3:", h3Err);
    else {
        console.log("✅ All Day 3 Modules:");
        allH3.forEach(m => console.log(`- ${m.module_type}: ${m.status}`));
    }
}

diagnoseStudent("SYAIFUDIN ZUHRI");

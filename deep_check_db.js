const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function deepCheck(name) {
    console.log(`Deep checking database for: ${name}`);

    let allStudents = [];

    // Find in profiles
    const { data: profiles } = await supabase
        .from('profiles')
        .select('id, nama, email')
        .ilike('nama', `%${name}%`);

    if (profiles && profiles.length > 0) {
        allStudents = [...profiles];
    }

    // Find in students
    const { data: students } = await supabase
        .from('students')
        .select('id, nama')
        .ilike('nama', `%${name}%`);

    if (students && students.length > 0) {
        // Merge without duplicates based on ID
        students.forEach(s => {
            if (!allStudents.find(existing => existing.id === s.id)) {
                allStudents.push(s);
            }
        });
    }

    if (allStudents.length === 0) {
        console.log("Student not found anywhere.");
        return;
    }

    for (const student of allStudents) {
        console.log(`\n=== Student: ${student.nama} (ID: ${student.id}) ===`);

        const { data: responses, error: rErr } = await supabase
            .from('module_responses')
            .select('*')
            .eq('student_id', student.id)
            .order('day_id', { ascending: true });

        if (rErr) {
            console.error("Error fetching responses:", rErr);
            continue;
        }

        if (!responses || responses.length === 0) {
            console.log("NO RESPONSES FOUND IN module_responses.");
        } else {
            console.log(`Found ${responses.length} responses:`);
            console.table(responses.map(r => ({
                Day: r.day_id,
                Type: r.module_type,
                Status: r.status,
                Score: r.score,
                CreatedAt: r.created_at
            })));
        }
    }
}

deepCheck("Nabil Ramadhan");

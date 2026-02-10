
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPOExhaustive() {
    console.log("Exhaustive check for classes XI.6 and XII.1...");

    // 1. Check class name variations
    const { data: classList } = await supabase.from('students').select('kelas');
    const uniqueClasses = [...new Set(classList.map(s => s.kelas))];
    console.log("Unique classes in database:", uniqueClasses);

    const targetClasses = ['XI.6', 'XII.1'];
    // Check if variations exist
    const variations = uniqueClasses.filter(c =>
        c && (c.includes('XI.6') || c.includes('XII.1') || c.replace('.', '') === 'XI6' || c.replace('.', '') === 'XII1')
    );
    console.log("Class variations found:", variations);

    // 2. Get students for all variations
    const allTargets = [...new Set([...targetClasses, ...variations])];
    const { data: students, error: stError } = await supabase
        .from('students')
        .select('id, nama, kelas')
        .in('kelas', allTargets);

    if (stError) {
        console.error("Error fetching students:", stError);
        return;
    }

    console.log(`Found ${students.length} students in relevant classes.`);

    if (students.length === 0) return;

    const studentIds = students.map(s => s.id);

    // 3. Check for ANY module_responses for these students
    const { data: responses, error: resError } = await supabase
        .from('module_responses')
        .select('student_id, module_type, day_id, created_at')
        .in('student_id', studentIds);

    if (resError) {
        console.error("Error fetching responses:", resError);
        return;
    }

    console.log(`Found total ${responses.length} responses from these students.`);

    if (responses.length > 0) {
        const typeSummary = {};
        responses.forEach(r => {
            const key = `${r.module_type} (Day ${r.day_id})`;
            typeSummary[key] = (typeSummary[key] || 0) + 1;
        });
        console.log("Response summary by type:", typeSummary);

        // List some specific details
        console.log("Sample responses:");
        responses.slice(0, 5).forEach(r => {
            const st = students.find(s => s.id === r.student_id);
            console.log(`- ${st.nama} (${st.kelas}): ${r.module_type} / Day ${r.day_id} at ${r.created_at}`);
        });
    } else {
        console.log("NO responses found at all for students in these classes.");
    }

    // 4. Check if there are PO responses for ANY class to confirm the module_type
    const { data: globalPo } = await supabase
        .from('module_responses')
        .select('module_type, day_id, student_id')
        .eq('module_type', 'bep_analisis')
        .limit(5);

    console.log("Global 'bep_analisis' samples (to verify type):", globalPo);
}

checkPOExhaustive();

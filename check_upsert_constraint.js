const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkConstraints() {
    console.log("Checking constraints for 'module_responses'...");

    // We can't query information_schema directly with the anon key usually, 
    // but maybe we can try to trigger an upsert on a non-existent student to see the error.
    // Or just try to see if we can read the structure if it's open.

    // Better: Try to upsert and catch the error.
    const { data, error } = await supabase
        .from('module_responses')
        .upsert({
            student_id: '00000000-0000-0000-0000-000000000000',
            day_id: 1,
            module_type: 'test_upsert',
            status: 'test'
        }, { onConflict: 'student_id, day_id, module_type' });

    if (error) {
        console.log("UPSERT ERROR:", error.message);
        console.log("ERROR CODE:", error.code);
        console.log("ERROR HINT:", error.hint);
        console.log("ERROR DETAILS:", error.details);
    } else {
        console.log("UPSERT SUCCESS. The constraint exists.");
        // Clean up
        await supabase.from('module_responses').delete().eq('module_type', 'test_upsert');
    }
}

checkConstraints();

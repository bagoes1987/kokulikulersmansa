const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkUniqueIndexes() {
    console.log("Checking unique indexes for 'module_responses'...");

    // Attempting to use a known student ID if possible, or just seeing if we can use RPC if any exists.
    // Since we don't have SQL access via anon key for information_schema, 
    // we'll try to insert TWO identical rows. If it SUCCEEDS, then there is NO unique constraint.

    const dummyId = '00000000-0000-0000-0000-000000000001';

    console.log("Attempting first insert...");
    const res1 = await supabase
        .from('module_responses')
        .insert({
            student_id: dummyId,
            day_id: 99,
            module_type: 'test_unique',
            answers: ['test']
        });

    if (res1.error && res1.error.code === '42501') {
        console.log("RLS blocked insert. Cannot test unique constraint this way.");
        return;
    }

    console.log("Attempting second identical insert...");
    const res2 = await supabase
        .from('module_responses')
        .insert({
            student_id: dummyId,
            day_id: 99,
            module_type: 'test_unique',
            answers: ['test']
        });

    if (res2.error) {
        if (res2.error.code === '23505') {
            console.log("UNIQUE CONSTRAINT DETECTED: " + res2.error.message);
        } else {
            console.log("Error on second insert: " + res2.error.message);
        }
    } else {
        console.log("NO UNIQUE CONSTRAINT: Both inserts succeeded.");
        // Clean up
        await supabase.from('module_responses').delete().eq('module_type', 'test_unique');
    }
}

checkUniqueIndexes();

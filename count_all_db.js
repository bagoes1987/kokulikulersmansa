const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function countRecords() {
    console.log("Counting records in 'module_responses'...");
    const { count, error } = await supabase
        .from('module_responses')
        .select('*', { count: 'exact', head: true });

    if (error) {
        console.error("Error:", error);
        return;
    }

    console.log(`Total records in 'module_responses': ${count}`);

    console.log("\nCounting records in 'students'...");
    const { count: sCount, error: sErr } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true });

    if (sErr) console.error("Error students:", sErr);
    else console.log(`Total records in 'students': ${sCount}`);
}

countRecords();

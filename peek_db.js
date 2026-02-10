
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function peek() {
    console.log("Peeking into module_responses...");
    const { data, error, count } = await supabase
        .from('module_responses')
        .select('*', { count: 'exact' })
        .limit(5);

    if (error) {
        console.error("Error peeking:", error);
        return;
    }

    console.log(`Total count in table (visible to anon): ${count}`);
    console.log("Sample rows:", data);

    // Also check 'students' table count
    const { count: studentCount } = await supabase.from('students').select('*', { count: 'exact', head: true });
    console.log(`Total count in students table: ${studentCount}`);
}

peek();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDay2() {
    console.log('Checking all Day 2 responses...\n');

    const { data, error } = await supabase
        .from('module_responses')
        .select('*')
        .eq('day_id', 2)
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log(`Found ${data.length} Day 2 responses:\n`);

    data.forEach((r, i) => {
        console.log(`${i + 1}. Student ID: ${r.student_id}`);
        console.log(`   Module: ${r.module_type}`);
        console.log(`   Status: ${r.status}`);
        console.log(`   Day: ${r.day_id}`);
        console.log(`   Created: ${r.created_at}\n`);
    });
}

checkDay2();

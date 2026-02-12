const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSubmissions() {
    const { data, error, count } = await supabase
        .from('module_responses')
        .select('*', { count: 'exact' })
        .eq('day_id', 3)
        .eq('module_type', 'dokumentasi');

    if (error) console.error(error);
    else {
        console.log(`Total Day 3 Documentation Submissions: ${count}`);
        if (data.length > 0) {
            console.log("Recent 5 submissions:");
            data.slice(-5).forEach(r => {
                console.log(`- Student: ${r.student_id}, Updated: ${r.updated_at}, Status: ${r.status}`);
            });
        }
    }
}

checkSubmissions();

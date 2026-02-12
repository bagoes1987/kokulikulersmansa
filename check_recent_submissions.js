const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkRecent() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    console.log(`Checking submissions since: ${oneHourAgo}`);

    const { data, error, count } = await supabase
        .from('module_responses')
        .select('*', { count: 'exact' })
        .gte('updated_at', oneHourAgo);

    if (error) console.error(error);
    else {
        console.log(`Submissions in the last hour: ${count}`);
        data.forEach(r => {
            console.log(`- ${r.module_type} by ${r.student_id} at ${r.updated_at}`);
        });
    }
}

checkRecent();

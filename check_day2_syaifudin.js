const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24'
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkDay2(id) {
    const { data, error } = await supabase
        .from('module_responses')
        .select('*')
        .eq('student_id', id)
        .eq('day_id', 2)
        .eq('module_type', 'dokumentasi')
        .maybeSingle();

    if (error) console.error(error);
    else if (data) {
        console.log("Day 2 Dokumentasi exists.");
        console.log("Status:", data.status);
        console.log("Updated at:", data.updated_at);
    } else {
        console.log("Day 2 Dokumentasi NOT found.");
    }
}

checkDay2("d8a549d5-cdf7-4d40-90d4-aaf4d6da8026");

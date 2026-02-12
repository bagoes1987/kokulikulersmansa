const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24'
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkSyaifudinActivity(id) {
    const { data, error } = await supabase
        .from('module_responses')
        .select('module_type, status, created_at, updated_at')
        .eq('student_id', id)
        .eq('day_id', 3)
        .order('updated_at', { ascending: false });

    if (error) console.error(error);
    else {
        console.log(`Responses for SYAIFUDIN ZUHRI (Day 3):`);
        data.forEach(r => {
            console.log(`- ${r.module_type}: ${r.status} at ${r.updated_at}`);
        });
    }
}

checkSyaifudinActivity("d8a549d5-cdf7-4d40-90d4-aaf4d6da8026");

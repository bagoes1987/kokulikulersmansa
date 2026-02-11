
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function summary() {
    const { data, error } = await supabase
        .from('module_responses')
        .select('module_type, day_id, status, score, answers')
        .eq('module_type', 'dokumentasi')
        .in('day_id', [2, 3]);

    if (error) {
        console.error(error);
        return;
    }

    console.log(`=== Dokumentasi Records (Day 2 & 3): ${data.length} ===`);

    if (data.length > 0) {
        console.log("Sample 1st Record:");
        console.log(JSON.stringify(data[0], null, 2));
    }
}

summary();

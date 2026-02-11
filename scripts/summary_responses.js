
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function summary() {
    const { data, error } = await supabase
        .from('module_responses')
        .select('module_type, day_id');

    if (error) {
        console.error(error);
        return;
    }

    const counts = {};
    data.forEach(d => {
        const key = `${d.module_type} (Day ${d.day_id})`;
        counts[key] = (counts[key] || 0) + 1;
    });

    console.log("=== Response Counts ===");
    console.log(JSON.stringify(counts, null, 2));
}

summary();

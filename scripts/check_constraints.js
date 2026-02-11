
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkConstraints() {
    console.log("Checking unique constraints for module_responses...");

    const { data, error } = await supabase.rpc('get_constraints', { t_name: 'module_responses' });
    // Since RPC might not exist, let's try a different way

    const { data: raw, error: rawErr } = await supabase.from('module_responses').select('*').limit(1);

    if (rawErr) {
        console.error("Error:", rawErr.message);
    } else {
        console.log("Table columns:", Object.keys(raw[0]));
    }
}

checkConstraints();


const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkCategories() {
    console.log("Memeriksa kategori di Day 2...");
    const { data, error } = await supabase
        .from('module_responses')
        .select('id, category, answers')
        .eq('module_type', 'dokumentasi')
        .eq('day_id', 2)
        .limit(10);

    if (error) {
        console.error(error);
        return;
    }

    console.log("Sample Day 2 Records:");
    console.log(JSON.stringify(data, null, 2));
}

checkCategories();

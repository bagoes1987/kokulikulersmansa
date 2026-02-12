const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24'
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function listConstraints() {
    console.log("Fetching detailed constraint info...");

    // Use the postgres catalog via RPC if possible, but let's just try to 
    // use the 'module_responses' table to check for 'category' column existence
    const { data: cols, error: colErr } = await supabase
        .from('module_responses')
        .select('*')
        .limit(1);

    if (colErr) {
        console.error("Error fetching columns:", colErr);
        return;
    }

    console.log("Columns in module_responses:", Object.keys(cols[0] || {}));

    // If we can't use RPC, we'll try to induce errors for different column combinations
    const studentId = 'd8a549d5-cdf7-4d40-90d4-aaf4d6da8026';

    const tests = [
        'student_id,day_id,module_type',
        'student_id,day_id,module_type,category',
        'student_id, day_id, module_type', // with spaces
        'id'
    ];

    for (const test of tests) {
        console.log(`\nTesting onConflict: '${test}'`);
        const { error } = await supabase
            .from('module_responses')
            .upsert({
                student_id: studentId,
                day_id: 3,
                module_type: 'dokumentasi',
                category: 'test_inspect',
                answers: ['test']
            }, { onConflict: test });

        if (error) {
            console.log(`❌ FAILED: ${error.message}`);
        } else {
            console.log(`✅ SUCCESS!`);
        }
    }
}

listConstraints();

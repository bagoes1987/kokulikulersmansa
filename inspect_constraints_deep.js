const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24'
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectConstraints() {
    console.log("Querying constraints for 'module_responses'...");

    // We can't query information_schema directly via Supabase client usually, 
    // but we can try to use RPC if available, or just use the error message trick again.

    const { data, error } = await supabase
        .from('module_responses')
        .upsert({
            student_id: 'd8a549d5-cdf7-4d40-90d4-aaf4d6da8026',
            day_id: 3,
            module_type: 'dokumentasi',
            category: 'test',
            answers: ['test']
        }, { onConflict: 'id' }); // Conflict on ID is guaranteed to exist as we don't provide it

    console.log("Upsert with 'onConflict: id' results:");
    if (error) {
        console.log("Error:", error.message);
        console.log("Detail:", error.details);
        console.log("Hint:", error.hint);
    } else {
        console.log("Success (unexpected if id is serial)");
    }

    // Attempt to trigger error by specifying wrong columns
    const { error: error2 } = await supabase
        .from('module_responses')
        .upsert({
            student_id: 'd8a549d5-cdf7-4d40-90d4-aaf4d6da8026',
            day_id: 3,
            module_type: 'dokumentasi',
            answers: ['test']
        }, { onConflict: 'student_id,day_id,module_type,non_existent_column' });

    if (error2) {
        console.log("\nTriggered error message:");
        console.log(error2.message);
    }
}

inspectConstraints();

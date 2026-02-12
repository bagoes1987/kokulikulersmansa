const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24'
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findConstraint() {
    console.log("Trying to trigger a unique constraint violation to see the index name...");

    // Use a known student ID (Syaifudin) and a known module type he's already submitted
    const studentId = "d8a549d5-cdf7-4d40-90d4-aaf4d6da8026";
    const dayId = 3;
    const moduleType = "pemantik"; // He already submitted this

    const { data, error } = await supabase
        .from('module_responses')
        .insert({
            student_id: studentId,
            day_id: dayId,
            module_type: moduleType,
            answers: []
        });

    if (error) {
        console.log("Caught Error (expected):");
        console.log(JSON.stringify(error, null, 2));
    } else {
        console.log("No error? That's unexpected. Maybe no unique constraint exists?");
    }
}

findConstraint();

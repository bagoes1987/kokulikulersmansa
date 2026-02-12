const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24'
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function findConstraint() {
    const studentId = 'd8a549d5-cdf7-4d40-90d4-aaf4d6da8026'; // Syaifudin
    console.log("Attempting duplicate insert for student:", studentId);

    // First, let's see if there is already a row
    const { data: existing } = await supabase
        .from('module_responses')
        .select('*')
        .eq('student_id', studentId)
        .eq('day_id', 3)
        .eq('module_type', 'dokumentasi');

    console.log("\nExisting documentation rows for Syaifudin Day 3:", existing?.length || 0);
    if (existing && existing.length > 0) {
        console.log("First row found:", JSON.stringify(existing[0], null, 2));

        // Try to insert a duplicate of the first row FOUND to trigger constraint
        const { error } = await supabase
            .from('module_responses')
            .insert({
                student_id: studentId,
                day_id: 3,
                module_type: 'dokumentasi',
                category: existing[0].category, // Include category if it exists
                answers: ['duplicate test']
            });

        if (error) {
            console.log("\n❌ CONSTRAINT TRIPPED:");
            console.log("Message:", error.message);
            console.log("Detail:", error.details);
            console.log("Hint:", error.hint);
        } else {
            console.log("✅ Insert SUCCESSFUL (No constraint tripped?)");
        }
    } else {
        console.log("No existing row found to duplicate.");
    }
}

findConstraint();

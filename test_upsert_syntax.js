const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24'
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testUpsert() {
    const studentId = "d8a549d5-cdf7-4d40-90d4-aaf4d6da8026"; // Syaifudin
    const dayId = 3;
    const moduleType = "pemantik";

    console.log("Attempting upsert with 'student_id,day_id,module_type'...");
    const { data, error } = await supabase
        .from('module_responses')
        .upsert({
            student_id: studentId,
            day_id: dayId,
            module_type: moduleType,
            answers: ["Test Upsert"]
        }, {
            onConflict: 'student_id,day_id,module_type'
        });

    if (error) {
        console.error("❌ Upsert FAILED:");
        console.error(JSON.stringify(error, null, 2));
    } else {
        console.log("✅ Upsert SUCCESSFUL!");
    }
}

testUpsert();

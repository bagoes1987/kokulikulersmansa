const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function testUpdate() {
    console.log('🧪 Testing UPDATE on DESANDRA\'s response...');

    try {
        // 1. Get Desandra's Response ID
        const { data: students } = await supabase
            .from('students')
            .select('id')
            .ilike('nama', '%DESANDRA%')
            .single();

        if (!students) return;

        const { data: responses } = await supabase
            .from('module_responses')
            .select('id, status')
            .eq('student_id', students.id)
            .eq('status', 'submitted')
            .limit(1);

        if (!responses || responses.length === 0) {
            console.log('ℹ️ No submitted response found to test update.');
            return;
        }

        const resId = responses[0].id;
        console.log('📌 Testing update for ID:', resId);

        // 2. Perform Update
        const { data, error } = await supabase
            .from('module_responses')
            .update({
                status: 'reviewed',
                score: 100,
                feedback: 'Tes Berhasil (Service Role)'
            })
            .eq('id', resId)
            .select();

        if (error) throw error;

        console.log('✅ Update succesful via Service Role:', data);

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testUpdate();

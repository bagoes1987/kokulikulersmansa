const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function checkColumns() {
    console.log('🔍 Checking module_responses columns...');

    try {
        const { data: columns, error } = await supabase.rpc('get_column_info', { t_name: 'module_responses' });

        if (error) {
            // If RPC doesn't exist, try a direct query to information_schema
            console.log('Fallback: Querying information_schema...');
            const { data: schemaInfo, error: schemaError } = await supabase
                .from('module_responses')
                .select('*')
                .limit(1);

            if (schemaError) throw schemaError;

            if (schemaInfo && schemaInfo.length > 0) {
                console.log('Keys in module_responses:', Object.keys(schemaInfo[0]));
            } else {
                console.log('Table is empty, cannot infer columns from select *');
            }
        } else {
            console.log('Columns:', columns);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkColumns();

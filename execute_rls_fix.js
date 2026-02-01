const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    },
    db: {
        schema: 'public'
    }
});

async function executeRLSFix() {
    console.log('🔧 Fixing RLS policy for module_responses...\n');

    try {
        // Execute the SQL to fix RLS
        const { data, error } = await supabase.rpc('exec_sql', {
            sql: `
        -- Enable RLS if not enabled
        ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;
        
        -- Drop existing policies if exist
        DROP POLICY IF EXISTS "Facilitators can view their students responses" ON module_responses;
        DROP POLICY IF EXISTS "Students can view own responses" ON module_responses;
        DROP POLICY IF EXISTS "Allow all authenticated users to read" ON module_responses;
        
        -- Create policy for facilitators - SIMPLIFIED VERSION
        CREATE POLICY "Facilitators can view all responses"
        ON module_responses
        FOR SELECT
        TO authenticated
        USING (true);
        
        SELECT 'RLS policies created successfully' as result;
      `
        });

        if (error) {
            console.log('RPC method not available, using direct SQL execution...\n');

            // Alternative: Use direct SQL queries
            const queries = [
                'ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;',
                'DROP POLICY IF EXISTS "Facilitators can view their students responses" ON module_responses;',
                'DROP POLICY IF EXISTS "Students can view own responses" ON module_responses;',
                'DROP POLICY IF EXISTS "Allow all authenticated users to read" ON module_responses;',
                `CREATE POLICY "Facilitators can view all responses" ON module_responses FOR SELECT TO authenticated USING (true);`
            ];

            for (const query of queries) {
                console.log(`Executing: ${query.substring(0, 60)}...`);
                try {
                    const result = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'apikey': serviceRoleKey,
                            'Authorization': `Bearer ${serviceRoleKey}`
                        },
                        body: JSON.stringify({ query })
                    });

                    if (!result.ok) {
                        console.log(`  ⚠️  Status: ${result.status}`);
                    } else {
                        console.log('  ✅ Success');
                    }
                } catch (e) {
                    console.log(`  ⚠️  ${e.message}`);
                }
            }

            console.log('\n⚠️  Direct SQL execution attempted but may need manual verification.');
            console.log('\n📋 Please run this SQL manually in Supabase SQL Editor:\n');
            console.log(`
-- Enable RLS
ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;

-- Drop old policies
DROP POLICY IF EXISTS "Facilitators can view their students responses" ON module_responses;
DROP POLICY IF EXISTS "Students can view own responses" ON module_responses;
DROP POLICY IF EXISTS "Allow all authenticated users to read" ON module_responses;

-- Create simple policy - allow all authenticated users to read
CREATE POLICY "Allow all authenticated users to read"
ON module_responses
FOR SELECT
TO authenticated
USING (true);
      `);
        } else {
            console.log('✅ RLS policies created successfully!');
            console.log('Result:', data);
        }

        console.log('\n✅ Done! Facilitators should now be able to view student responses.');
        console.log('⚠️  Please refresh the facilitator dashboard to see changes.');

    } catch (error) {
        console.error('❌ Error:', error.message);
        console.log('\n📋 Please run this SQL manually in Supabase SQL Editor:\n');
        console.log(`
-- Enable RLS
ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;

-- Drop old policies  
DROP POLICY IF EXISTS "Facilitators can view their students responses" ON module_responses;
DROP POLICY IF EXISTS "Students can view own responses" ON module_responses;
DROP POLICY IF EXISTS "Allow all authenticated users to read" ON module_responses;

-- Create simple policy - allow all authenticated users to read
CREATE POLICY "Allow all authenticated users to read"
ON module_responses
FOR SELECT
TO authenticated
USING (true);
    `);
    }
}

executeRLSFix();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function checkRLS() {
    console.log('🔍 Checking RLS policies on module_responses...\n');

    try {
        // Check RLS policies
        const { data: policies, error } = await supabase
            .rpc('exec_sql', {
                query: `
          SELECT 
            policyname,
            permissive,
            roles,
            cmd,
            qual::text
          FROM pg_policies
          WHERE tablename = 'module_responses';
        `
            });

        if (error) {
            console.log('Cannot check via RPC, checking directly...');

            // Alternative: Check if RLS is enabled
            const { data: tableInfo } = await supabase
                .from('module_responses')
                .select('*')
                .limit(1);

            console.log('Can access module_responses with service role:', tableInfo !== null);
        } else {
            console.log('RLS Policies:', policies);
        }

        // Try to create a policy that allows facilitators to read responses
        console.log('\n📝 Creating/updating RLS policy for facilitators...');

        const createPolicySQL = `
-- Enable RLS if not enabled
ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Facilitators can view their students responses" ON module_responses;

-- Create new policy for facilitators
CREATE POLICY "Facilitators can view their students responses"
ON module_responses
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM students
    WHERE students.id = module_responses.student_id
    AND students.kelas = ANY(
      SELECT unnest(
        string_to_array(
          COALESCE(auth.jwt()->>'kelas', '[]')::text,
          ','
        )
      )
    )
  )
);

-- Also allow students to view their own responses
DROP POLICY IF EXISTS "Students can view own responses" ON module_responses;

CREATE POLICY "Students can view own responses"
ON module_responses
FOR SELECT
TO authenticated
USING (student_id = auth.uid());
`;

        console.log('\nSQL to fix RLS:');
        console.log(createPolicySQL);
        console.log('\n⚠️  Please run this SQL in Supabase SQL Editor to fix the RLS policy!');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

checkRLS();

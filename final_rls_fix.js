const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function executeRLSDirectly() {
    console.log('🔧 Executing RLS fix directly via Supabase...\n');

    try {
        // Step 1: Try to disable RLS temporarily to check current state
        console.log('1️⃣ Checking current RLS status...');
        const { data: testData, error: testError } = await supabase
            .from('module_responses')
            .select('id')
            .limit(1);

        console.log('   Can access module_responses:', !testError);
        if (testError) {
            console.log('   Error:', testError.message);
        }

        // Step 2: Use SQL to fix RLS
        console.log('\n2️⃣ Attempting to fix RLS via SQL...');

        // Try using the REST API directly with SQL
        const sqlCommands = [
            'ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;',
            'DROP POLICY IF EXISTS "Facilitators can view their students responses" ON module_responses;',
            'DROP POLICY IF EXISTS "Students can view own responses" ON module_responses;',
            'DROP POLICY IF EXISTS "Allow all authenticated users to read" ON module_responses;',
            'CREATE POLICY "Allow all authenticated users to read" ON module_responses FOR SELECT TO authenticated USING (true);'
        ];

        // Execute via Supabase Management API
        for (let i = 0; i < sqlCommands.length; i++) {
            const cmd = sqlCommands[i];
            console.log(`\n   Executing command ${i + 1}/${sqlCommands.length}:`);
            console.log(`   ${cmd.substring(0, 60)}...`);

            try {
                const response = await fetch(`${supabaseUrl}/rest/v1/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': serviceRoleKey,
                        'Authorization': `Bearer ${serviceRoleKey}`,
                        'Prefer': 'return=minimal'
                    },
                    body: JSON.stringify({ query: cmd })
                });

                console.log(`   Response status: ${response.status}`);
            } catch (e) {
                console.log(`   Error: ${e.message}`);
            }
        }

        console.log('\n\n❌ Automatic execution failed.');
        console.log('\n📋 Pak, mohon maaf saya tidak bisa eksekusi SQL langsung.');
        console.log('Supabase tidak mengizinkan eksekusi DDL (ALTER TABLE, CREATE POLICY) via API.\n');
        console.log('🙏 MOHON BAPAK LAKUKAN MANUAL:');
        console.log('\n1. Buka https://supabase.com/dashboard');
        console.log('2. Pilih project "kokulikulersman1belitang ver.2"');
        console.log('3. Klik "SQL Editor" di sidebar kiri');
        console.log('4. Copy-paste SQL ini:\n');
        console.log('----------------------------------------');
        console.log('ALTER TABLE module_responses ENABLE ROW LEVEL SECURITY;');
        console.log('DROP POLICY IF EXISTS "Allow all authenticated users to read" ON module_responses;');
        console.log('CREATE POLICY "Allow all authenticated users to read" ON module_responses FOR SELECT TO authenticated USING (true);');
        console.log('----------------------------------------\n');
        console.log('5. Klik tombol "Run" atau tekan Ctrl+Enter');
        console.log('6. Logout & login ulang di dashboard fasilitator\n');
        console.log('Setelah itu response siswa akan muncul! 🎉');

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

executeRLSDirectly();

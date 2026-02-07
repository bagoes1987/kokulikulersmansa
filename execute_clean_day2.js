// Script to execute CLEAN_DAY2_DATA.sql in Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://qjhpltailorcscx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqaHBsdGFpbG9yY3NjeCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM2NzU1MzQwLCJleHAiOjIwNTIzMzEzNDB9.vDhOdGXqzjhEMlXfKlJZCLIS_An-production_install-or-use-the-Tailwind-CLI-build-tool-instead-https-tailwindcss-com-docs-installation';

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanDay2Data() {
    console.log('🧹 Cleaning Day 2 Data...\n');

    try {
        // 1. Check current Day 2 data
        console.log('📊 Checking current Day 2 data...');
        const { data: beforeData, error: beforeError } = await supabase
            .from('module_responses')
            .select('*')
            .eq('day_id', 2);

        if (beforeError) throw beforeError;

        console.log(`   Found ${beforeData.length} Day 2 responses\n`);

        if (beforeData.length === 0) {
            console.log('✅ No Day 2 data to clean!');
            return;
        }

        // Show what will be deleted
        const byModule = {};
        beforeData.forEach(item => {
            if (!byModule[item.module_type]) byModule[item.module_type] = 0;
            byModule[item.module_type]++;
        });

        console.log('📋 Data to be deleted:');
        Object.keys(byModule).forEach(module => {
            console.log(`   - ${module}: ${byModule[module]} response(s)`);
        });

        // 2. Delete Day 2 video responses
        console.log('\n🗑️  Deleting Day 2 video responses...');
        const { error: videoError } = await supabase
            .from('module_responses')
            .delete()
            .eq('day_id', 2)
            .eq('module_type', 'video');

        if (videoError) throw videoError;
        console.log('   ✅ Video responses deleted');

        // 3. Delete Day 2 materi/summary responses
        console.log('🗑️  Deleting Day 2 materi/summary responses...');
        const { error: materiError } = await supabase
            .from('module_responses')
            .delete()
            .eq('day_id', 2)
            .in('module_type', ['materi', 'summary']);

        if (materiError) throw materiError;
        console.log('   ✅ Materi/summary responses deleted');

        // 4. Delete Day 2 pemantik responses
        console.log('🗑️  Deleting Day 2 pemantik responses...');
        const { error: pemantikError } = await supabase
            .from('module_responses')
            .delete()
            .eq('day_id', 2)
            .eq('module_type', 'pemantik');

        if (pemantikError) throw pemantikError;
        console.log('   ✅ Pemantik responses deleted');

        // 5. Verify deletion
        console.log('\n🔍 Verifying deletion...');
        const { data: afterData, error: afterError } = await supabase
            .from('module_responses')
            .select('*')
            .eq('day_id', 2);

        if (afterError) throw afterError;

        console.log(`   Remaining Day 2 responses: ${afterData.length}`);

        if (afterData.length === 0) {
            console.log('\n✅ All Day 2 data successfully cleaned!');
            console.log('\n⚠️  IMPORTANT: Tell users to:');
            console.log('   1. Hard refresh browser (Ctrl + Shift + R)');
            console.log('   2. Clear localStorage: localStorage.clear(); location.reload();');
        } else {
            console.log('\n⚠️  Warning: Some Day 2 data still remains:');
            afterData.forEach(item => {
                console.log(`   - ${item.module_type} (ID: ${item.id})`);
            });
        }

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }
}

cleanDay2Data();

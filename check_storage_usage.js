const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkStorage() {
    console.log("Checking storage usage for bucket 'documentation'...");

    let totalSize = 0;
    let totalFiles = 0;

    const folders = ['day1', 'day2', 'day3', 'cerita'];

    for (const folder of folders) {
        console.log(`Listing folder: ${folder}...`);
        const { data, error } = await supabase.storage.from('documentation').list(folder, { limit: 1000 });

        if (error) {
            console.error(`Error listing ${folder}:`, error.message);
            continue;
        }

        if (data) {
            totalFiles += data.length;
            const folderSize = data.reduce((sum, f) => sum + (f.metadata?.size || 0), 0);
            totalSize += folderSize;
            console.log(`- ${folder}: ${data.length} files found (first 1000), size: ${(folderSize / (1024 * 1024)).toFixed(2)} MB`);
        }
    }

    console.log(`\nEstimated Total Files: ${totalFiles} (limited by first 1000 per folder)`);
    console.log(`Estimated Total Size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);
}

checkStorage();

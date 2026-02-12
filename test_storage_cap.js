const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24'
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testUpload() {
    console.log("Attempting a test upload to bucket 'documentation' as image/jpeg...");

    const testContent = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x60, 0x00, 0x60, 0x00, 0x00, 0xFF, 0xDB, 0x00, 0x43]); // Tiny JPEG header
    const fileName = `test_cap_${Date.now()}.jpg`;

    const { data, error } = await supabase.storage
        .from('documentation')
        .upload(`tests/${fileName}`, testContent, {
            contentType: 'image/jpeg'
        });

    if (error) {
        console.error("❌ Upload FAILED:");
        console.error(JSON.stringify(error, null, 2));
    } else {
        console.log("✅ Upload SUCCESSFUL:", data.path);
        // Cleanup
        await supabase.storage.from('documentation').remove([data.path]);
    }
}

testUpload();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function updateCoord() {
    const email = 'coord_ika@kokulikuler.id';
    const newClasses = ['XI. 3']; // Sesuai format di database (spasi setelah titik)

    console.log(`🛠️ Updating Coordinator: ${email}`);

    // 1. Get User ID
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        console.log("❌ User not found!");
        return;
    }

    // 2. Update Metadata
    const { data, error } = await supabase.auth.admin.updateUserById(
        user.id,
        {
            user_metadata: {
                ...user.user_metadata,
                managed_classes: newClasses
            }
        }
    );

    if (error) {
        console.log(`❌ Update Failed: ${error.message}`);
    } else {
        console.log(`✅ Update Berhasil!`);
        console.log(`Nama: ${data.user.user_metadata.full_name}`);
        console.log(`Managed Classes: ${JSON.stringify(data.user.user_metadata.managed_classes)}`);
    }
}

updateCoord();

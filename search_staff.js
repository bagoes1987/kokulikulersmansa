const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function dumpCoordMeta() {
    console.log("🕵️ Inspecting Coordinator Metadata...");

    const { data: { users }, error } = await supabase.auth.admin.listUsers();

    // Find one coordinator
    const coord = users.find(u => u.user_metadata?.role === 'koordinator');

    if (coord) {
        console.log("Found Coordinator:", coord.email);
        console.log("Metadata:", JSON.stringify(coord.user_metadata, null, 2));
    } else {
        console.log("No coordinator found.");
    }
}

dumpCoordMeta();

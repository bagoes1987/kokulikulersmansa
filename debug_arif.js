const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTY2MDc0MiwiZXhwIjoyMDg1MjM2NzQyfQ.sJN3LkaB2nmykbItVxWWQPJExeiKBBbWZlgTLeuNo24';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function debugArif() {
    console.log("🚀 Debugging fasil_arif...");
    const email = 'fasil_arif@kokulikuler.id';
    const password = 'kokulikuler@2026';

    // 1. Try to list user by email directly (if supported by this version, checking listUsers output)
    const { data: users, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });

    if (listError) {
        console.error("List Error:", listError);
        return;
    }

    const user = users.users.find(u => u.email === email);

    if (user) {
        console.log("User found:", user.id);
        console.log("Metadata:", user.user_metadata);

        // Update password
        const { error: updateError } = await supabase.auth.admin.updateUserById(
            user.id,
            {
                password: password,
                email_confirm: true,
                user_metadata: {
                    full_name: "Arif Alimudin Rasyid, S.Pd.",
                    role: 'fasilitator',
                    username: 'fasil_arif',
                    kelas: 'XI. 8',
                    mapel: 'Fasilitator Kokulikuler'
                }
            }
        );

        if (updateError) {
            console.error("Update failed:", updateError);
        } else {
            console.log("✅ Password updated successfully.");
        }

    } else {
        console.log("User NOT found. Creating...");
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                full_name: "Arif Alimudin Rasyid, S.Pd.",
                role: 'fasilitator',
                username: 'fasil_arif',
                kelas: 'XI. 8',
                mapel: 'Fasilitator Kokulikuler'
            }
        });

        if (error) console.error("Create failed:", error);
        else console.log("✅ User created successfully.");
    }
}

debugArif();

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLastHour() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    console.log(`Checking module responses since: ${oneHourAgo}`);

    const { data: responses, error } = await supabase
        .from('module_responses')
        .select(`
            module_type,
            day_id,
            status,
            created_at,
            student_id
        `)
        .gt('created_at', oneHourAgo)
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching activity:", error);
        return;
    }

    if (!responses || responses.length === 0) {
        console.log("No activity found in the last hour.");

        // Let's broaden to 24 hours just in case
        console.log("Broadening search to last 24 hours...");
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const { data: responses2 } = await supabase
            .from('module_responses')
            .select('*')
            .gt('created_at', oneDayAgo)
            .limit(10);

        if (responses2 && responses2.length > 0) {
            console.log(`Found ${responses2.length} records in last 24h.`);
            console.table(responses2.map(r => ({
                Nama: r.student_id,
                Tipe: r.module_type,
                Status: r.status,
                Waktu: r.created_at
            })));
        } else {
            console.log("Still no activity found in the last 24 hours.");
        }
        return;
    }

    console.log(`Found ${responses.length} records in last hour.`);
    console.table(responses);
}

checkLastHour();

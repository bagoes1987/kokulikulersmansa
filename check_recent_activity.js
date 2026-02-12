const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRecentActivity() {
    console.log("Checking recent module responses activity...");

    const { data: responses, error } = await supabase
        .from('module_responses')
        .select(`
            module_type,
            day_id,
            status,
            created_at,
            student_id
        `)
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error("Error fetching activity:", error);
        return;
    }

    if (!responses || responses.length === 0) {
        console.log("No recent activity found.");
        return;
    }

    // Fetch student names
    const studentIds = [...new Set(responses.map(r => r.student_id))];
    const { data: profiles } = await supabase.from('profiles').select('id, nama').in('id', studentIds);
    const nameMap = {};
    if (profiles) profiles.forEach(p => nameMap[p.id] = p.nama);

    const tableData = responses.map(r => ({
        Nama: nameMap[r.student_id] || r.student_id,
        Tipe: r.module_type,
        Day: r.day_id,
        Status: r.status,
        Waktu: r.created_at
    }));

    console.table(tableData);
}

checkRecentActivity();

const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function listAllQuizResponses() {
    console.log("Fetching ALL records where module_type = 'kuis'...");

    // Also joining with profiles to see names if possible
    const { data: responses, error } = await supabase
        .from('module_responses')
        .select(`
            id,
            student_id,
            module_type,
            day_id,
            status,
            score,
            created_at
        `)
        .eq('module_type', 'kuis')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Error fetching responses:", error);
        return;
    }

    if (!responses || responses.length === 0) {
        console.log("No quiz responses found in the database.");
        return;
    }

    console.log(`Found ${responses.length} quiz responses.`);

    // Fetch profiles for these student_ids to map IDs to Names
    const studentIds = [...new Set(responses.map(r => r.student_id))];
    const { data: profiles } = await supabase
        .from('profiles')
        .select('id, nama')
        .in('id', studentIds);

    const nameMap = {};
    if (profiles) {
        profiles.forEach(p => nameMap[p.id] = p.nama);
    }

    const tableData = responses.map(r => ({
        Nama: nameMap[r.student_id] || `Unknown (${r.student_id})`,
        Day: r.day_id,
        Status: r.status,
        Score: r.score,
        Waktu: r.created_at
    }));

    console.table(tableData);
}

listAllQuizResponses();

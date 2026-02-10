
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function listAllClasses() {
    console.log("Listing all unique class names in students table...");
    const { data, error } = await supabase.from('students').select('kelas');
    if (error) {
        console.error(error);
        return;
    }

    const classCounts = {};
    data.forEach(s => {
        const cls = s.kelas || 'NULL';
        classCounts[cls] = (classCounts[cls] || 0) + 1;
    });

    console.log("Class List and Student Count:");
    Object.keys(classCounts).sort().forEach(cls => {
        console.log(`- ${cls}: ${classCounts[cls]} students`);
    });

    const targetClasses = ['XI.6', 'XII.1'];
    targetClasses.forEach(target => {
        const similar = Object.keys(classCounts).filter(c =>
            c !== target && (c.toLowerCase().replace(/[^a-z0-9]/g, '') === target.toLowerCase().replace(/[^a-z0-9]/g, ''))
        );
        if (similar.length > 0) {
            console.log(`Potential duplicates for ${target}:`, similar);
        } else {
            console.log(`No direct duplicates for ${target} found.`);
        }
    });

    // Check if there are any module_responses with student_id NOT in students table
    // (This would require reading module_responses which is RLS blocked for anon)
}

listAllClasses();

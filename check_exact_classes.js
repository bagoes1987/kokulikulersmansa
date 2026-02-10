
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkExactClassNames() {
    console.log("Checking exact class names for XI.6 and XII.1...");

    const { data: students, error: stError } = await supabase
        .from('students')
        .select('kelas')
        .or('kelas.ilike.XI.6%,kelas.ilike.XII.1%');

    if (stError) {
        console.error("Error:", stError);
        return;
    }

    const uniqueClasses = [...new Set(students.map(s => s.kelas))];
    uniqueClasses.forEach(cls => {
        console.log(`Class: [${cls}] (Length: ${cls ? cls.length : 0})`);
        if (cls) {
            let hex = '';
            for (let i = 0; i < cls.length; i++) {
                hex += cls.charCodeAt(i).toString(16) + ' ';
            }
            console.log(`  Hex: ${hex}`);
        }
    });

    // Also check if there are any students with role 'siswa' in profiles table 
    // to see if we should be looking there instead? No, dashboard-admin uses students table.
}

checkExactClassNames();

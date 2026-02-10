
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkModuleTypes() {
    console.log("Checking all module_types in module_responses...");
    const { data, error } = await supabase
        .from('module_responses')
        .select('module_type, day_id');

    if (error) {
        console.error("Error:", error);
        return;
    }

    const summary = {};
    data.forEach(r => {
        const key = `${r.module_type} (Day ${r.day_id})`;
        summary[key] = (summary[key] || 0) + 1;
    });

    console.log("Module type summary:", summary);
}

checkModuleTypes();


const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';

async function test() {
    const s = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Checking connectivity...");
    const { data, count, error } = await s.from('students').select('id', { count: 'exact', head: true }).limit(1);
    if (error) {
        console.error("Error:", error);
    } else {
        console.log("Success! Total students in DB:", count);
    }
}

test();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
// Using anon key for login attempt, simulating the frontend
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLogin(username) {
    const email = `${username}@kokulikuler.id`;
    const password = 'kokulikuler@2026';

    console.log(`Attempting login for ${email}...`);

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error('Login failed:', error.message);
    } else {
        console.log('Login successful!');
        console.log('User ID:', data.user.id);
        console.log('Metadata:', data.user.user_metadata);
    }
}

// Test with one of the users from the screenshot
(async () => {
    await checkLogin('fasil_fika');
    await checkLogin('fasil_arif');
})();

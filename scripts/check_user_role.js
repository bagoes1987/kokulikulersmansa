// ============================================
// DIAGNOSTIC: Check Current User Role
// Run this in browser console while logged in
// ============================================

(async function checkUserRole() {
    const { data: { user } } = await supabaseClient.auth.getUser();

    console.log('=== USER ROLE DIAGNOSTIC ===');
    console.log('User ID:', user.id);
    console.log('User Email:', user.email);
    console.log('User Metadata:', user.user_metadata);
    console.log('App Metadata:', user.app_metadata);

    // Check JWT token
    const session = await supabaseClient.auth.getSession();
    if (session.data.session) {
        const token = session.data.session.access_token;
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('JWT Payload:', payload);
        console.log('Role from JWT:', payload.role);
        console.log('Custom Claims:', payload);
    }

    // Check facilitators table
    const { data: facilData } = await supabaseClient
        .from('facilitators')
        .select('*')
        .eq('id', user.id)
        .single();

    console.log('Facilitator Data:', facilData);

    console.log('=== END DIAGNOSTIC ===');
})();

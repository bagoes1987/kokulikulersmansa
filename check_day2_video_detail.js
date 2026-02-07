// Check specific student's video responses for Day 1 and Day 2
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qjhpltailorcscx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqaHBsdGFpbG9yY3NjeCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzM2NzU1MzQwLCJleHAiOjIwNTIzMzEzNDB9.vDhOdGXqzjhEMlXfKlJZCLIS_An-production_install-or-use-the-Tailwind-CLI-build-tool-instead-https-tailwindcss-com-docs-installation';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDay2VideoDetail() {
    console.log('🔍 Checking Day 2 Video Responses in Detail...\n');

    // Get all video responses
    const { data: allVideos, error } = await supabase
        .from('module_responses')
        .select('*')
        .eq('module_type', 'video')
        .order('day_id', { ascending: true })
        .order('created_at', { ascending: true });

    if (error) {
        console.error('❌ Error:', error);
        return;
    }

    console.log(`📊 Total VIDEO responses found: ${allVideos.length}\n`);

    // Group by day
    const byDay = {};
    allVideos.forEach(video => {
        const day = video.day_id;
        if (!byDay[day]) byDay[day] = [];
        byDay[day].push(video);
    });

    // Display by day
    Object.keys(byDay).sort().forEach(day => {
        console.log(`\n📅 DAY ${day} - ${byDay[day].length} video response(s)`);
        console.log('='.repeat(60));

        byDay[day].forEach((video, index) => {
            console.log(`\n  Video #${index + 1}:`);
            console.log(`  Student ID: ${video.student_id}`);
            console.log(`  Status: ${video.status}`);
            console.log(`  Score: ${video.score || 'Not scored'}`);
            console.log(`  Feedback: ${video.feedback || 'No feedback'}`);
            console.log(`  Response Text (first 100 chars):`);
            const responseText = video.response_text || (video.answers && video.answers[0]) || 'No response';
            console.log(`  "${responseText.substring(0, 100)}..."`);
            console.log(`  Created: ${video.created_at}`);
            console.log(`  Updated: ${video.updated_at || 'Never'}`);
        });
    });

    console.log('\n' + '='.repeat(60));
    console.log('✅ Check complete!');
}

checkDay2VideoDetail();

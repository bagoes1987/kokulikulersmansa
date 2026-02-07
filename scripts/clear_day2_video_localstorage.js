// =====================================================
// CLEAR DAY 2 VIDEO DATA FROM LOCALSTORAGE
// =====================================================
// Run this in browser console to clear old Day 2 video data
// =====================================================

(function clearDay2VideoData() {
    console.log('🧹 Clearing Day 2 video data from localStorage...');

    // Get current localStorage data
    const progressKey = 'student_progress';
    const progressData = localStorage.getItem(progressKey);

    if (!progressData) {
        console.log('❌ No student_progress found in localStorage');
        return;
    }

    try {
        const progress = JSON.parse(progressData);
        console.log('📊 Current progress:', progress);

        // Clear Day 2 video status
        if (progress.day2) {
            console.log('🔍 Day 2 data before:', progress.day2);

            // Reset video module
            if (progress.day2.video !== undefined) {
                progress.day2.video = false;
                console.log('✅ Reset day2.video to false');
            }

            console.log('🔍 Day 2 data after:', progress.day2);
        }

        // Save back to localStorage
        localStorage.setItem(progressKey, JSON.stringify(progress));
        console.log('💾 Updated localStorage saved');

        // Verify
        const updated = JSON.parse(localStorage.getItem(progressKey));
        console.log('✅ Verification - Day 2 video status:', updated.day2?.video);

        console.log('🎉 Done! Please refresh the page.');

    } catch (e) {
        console.error('❌ Error:', e);
    }
})();

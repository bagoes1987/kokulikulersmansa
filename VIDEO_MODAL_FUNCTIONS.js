// ==========================================
// FITUR VIDEO PEMBELAJARAN
// ==========================================

// Video data per day
const videoContentByDay = {
    1: [
        {
            title: "Video 1: Pengenalan Jajanan Nusantara",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - ganti dengan video asli
            duration: "10 menit"
        },
        {
            title: "Video 2: Nilai Gizi dalam Jajanan",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - ganti dengan video asli
            duration: "12 menit"
        },
        {
            title: "Video 3: Kreativitas dalam Bisnis Jajanan",
            url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - ganti dengan video asli
            duration: "15 menit"
        }
    ],
    2: [
        {
            title: "Video Pembelajaran Hari 2",
            url: "https://www.youtube.com/embed/T2q2ZOsjkIs",
            duration: "Durasi video"
        }
    ],
    3: [
        // Placeholder untuk Hari 3
    ]
};

function openVideoModal() {
    const modal = document.getElementById('modalVideo');
    modal.classList.remove('hidden');
    modal.classList.add('flex');

    loadVideoContent();
    checkExistingVideoResponse();
}

function closeVideoModal() {
    const modal = document.getElementById('modalVideo');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

async function loadVideoContent() {
    const container = document.getElementById('videoDynamicItems');
    const videos = videoContentByDay[currentDay] || [];

    if (videos.length === 0) {
        container.innerHTML = `
            <div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 text-center">
                <span class="material-symbols-outlined text-amber-500 text-4xl mb-2">info</span>
                <p class="text-sm font-bold text-amber-700">Video untuk hari ini belum tersedia</p>
            </div>
        `;
        return;
    }

    // Generate video items
    let html = '';
    videos.forEach((video, index) => {
        html += `
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div class="aspect-video bg-slate-900">
                    <iframe 
                        class="w-full h-full" 
                        src="${video.url}" 
                        title="${video.title}"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
                <div class="p-4">
                    <h4 class="text-sm font-bold text-slate-800">${video.title}</h4>
                    <p class="text-xs text-slate-400 mt-1">${video.duration}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

async function checkExistingVideoResponse() {
    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) return;

        const { data, error } = await supabaseClient
            .from('module_responses')
            .select('*')
            .eq('student_id', user.id)
            .eq('day_id', currentDay)
            .eq('module_type', 'video')
            .maybeSingle();

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching video response:', error);
            return;
        }

        const summaryInput = document.getElementById('videoSummaryInput');
        const submitBtn = document.getElementById('btnSubmitVideo');
        const statusSection = document.getElementById('videoStatusSection');
        const feedbackPlaceholder = document.getElementById('videoFeedbackPlaceholder');

        if (data) {
            // Load existing response
            summaryInput.value = data.response_text || '';
            summaryInput.disabled = true;
            updateVideoWordCount();

            if (data.status === 'reviewed' && data.score) {
                // Show feedback
                statusSection.innerHTML = `
                    <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 space-y-3">
                        <p class="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Dinilai Fasilitator</p>
                        <div class="flex gap-1">
                            ${Array.from({ length: 5 }, (_, i) => `
                                <span class="material-symbols-outlined ${i < data.score ? 'text-yellow-400' : 'text-slate-300'} text-2xl">star</span>
                            `).join('')}
                        </div>
                        ${data.feedback ? `
                            <div class="bg-white p-3 rounded-xl">
                                <p class="text-[10px] font-bold text-slate-500 uppercase mb-1">Feedback:</p>
                                <p class="text-xs text-slate-700 italic">"${data.feedback}"</p>
                            </div>
                        ` : ''}
                    </div>
                `;
                statusSection.classList.remove('hidden');
                feedbackPlaceholder.classList.add('hidden');
                submitBtn.classList.add('hidden');
            } else {
                // Submitted, waiting for review
                statusSection.innerHTML = `
                    <div class="bg-yellow-50 p-4 rounded-2xl border border-yellow-100 text-center">
                        <span class="material-symbols-outlined text-yellow-500 text-3xl animate-pulse">hourglass_top</span>
                        <p class="text-xs font-bold text-yellow-700 mt-2">Menunggu penilaian fasilitator</p>
                    </div>
                `;
                statusSection.classList.remove('hidden');
                feedbackPlaceholder.classList.add('hidden');
                submitBtn.classList.add('hidden');
            }
        } else {
            // No response yet - enable input
            summaryInput.disabled = false;
            submitBtn.disabled = true;
            statusSection.classList.add('hidden');
            feedbackPlaceholder.classList.remove('hidden');
        }
    } catch (err) {
        console.error('Error in checkExistingVideoResponse:', err);
    }
}

function updateVideoWordCount() {
    const input = document.getElementById('videoSummaryInput');
    const display = document.getElementById('videoWordCountDisplay');
    const submitBtn = document.getElementById('btnSubmitVideo');

    const text = input.value.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;

    display.textContent = `${wordCount} / 50 kata`;

    if (wordCount >= 50) {
        display.className = 'text-[10px] font-bold text-emerald-500 bg-white/50 px-2 py-1 rounded-lg border border-emerald-100';
        submitBtn.disabled = false;
        submitBtn.className = 'w-full py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg shadow-red-200 active:scale-95 transition-all';
    } else {
        display.className = 'text-[10px] font-bold text-red-500 bg-white/50 px-2 py-1 rounded-lg border border-red-100';
        submitBtn.disabled = true;
        submitBtn.className = 'w-full py-4 bg-slate-300 text-white rounded-2xl font-black shadow-none transition-all cursor-not-allowed';
    }
}

async function submitVideoLog() {
    const summaryInput = document.getElementById('videoSummaryInput');
    const summary = summaryInput.value.trim();

    if (!summary || summary.split(/\s+/).length < 50) {
        alert('Ringkasan minimal 50 kata!');
        return;
    }

    const submitBtn = document.getElementById('btnSubmitVideo');
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Mengirim...';

    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { error } = await supabaseClient
            .from('module_responses')
            .insert({
                student_id: user.id,
                day_id: currentDay,
                module_type: 'video',
                response_text: summary,
                status: 'submitted',
                submitted_at: new Date().toISOString()
            });

        if (error) throw error;

        alert('✅ Ringkasan berhasil dikirim!');
        forceCompleteModule('video');
        closeVideoModal();

    } catch (err) {
        console.error('Submit Error:', err);
        alert('❌ Gagal mengirim ringkasan: ' + err.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Simpan Ringkasan & Selesai';
    }
}

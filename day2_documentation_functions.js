// ===== DAY 2: 5-CATEGORY DOCUMENTATION FUNCTIONS =====

// Global storage for selected photos
window.day2Photos = {
    makanan: null,
    minuman: null,
    stand: null,
    iklan: null,
    presentasi: null
};

// Open Day 2 documentation modal
function openDokumentasiDay2Modal() {
    const modal = document.getElementById('modal-dokumentasi-day2');
    if (modal) {
        modal.classList.remove('hidden');
        loadExistingDay2Documentation();
    }
}

// Close Day 2 documentation modal
function closeDokumentasiDay2Modal() {
    const modal = document.getElementById('modal-dokumentasi-day2');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Handle photo selection for specific category
async function handleCategoryPhoto(category, fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    // Validation: Max 10MB
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
        alert(`Ukuran file terlalu besar (${Math.round(file.size / 1024 / 1024)}MB). Maksimal 10MB.`);
        fileInput.value = '';
        return;
    }

    const uploadArea = document.getElementById(`upload-area-${category}`);
    const previewArea = document.getElementById(`preview-area-${category}`);
    const preview = document.getElementById(`preview-${category}`);
    const status = document.getElementById(`status-${category}`);

    // Show loading
    status.className = "text-xs font-bold text-blue-600 animate-pulse";
    status.textContent = "⏳ Mengoptimalkan foto...";

    try {
        // Compress image (reuse existing function)
        const compressedBlob = await compressImage(file, 600, 0.6);
        const compressedFile = new File([compressedBlob], `${category}_${Date.now()}.jpg`, { type: 'image/jpeg' });

        // Preview
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            uploadArea.classList.add('hidden');
            previewArea.classList.remove('hidden');
        };
        reader.readAsDataURL(compressedFile);

        // Store in global
        window.day2Photos[category] = compressedFile;

        // Update status
        status.className = "text-xs font-bold text-emerald-600";
        status.textContent = `✅ Siap dikirim (~${Math.round(compressedBlob.size / 1024)} KB)`;

        // Check if all 5 photos selected
        checkAllPhotosSelected();

    } catch (err) {
        console.error(err);
        status.className = "text-xs font-bold text-red-600";
        status.textContent = "❌ Gagal memproses foto.";
    }
}

// Check if all 5 photos are selected
function checkAllPhotosSelected() {
    const allSelected = Object.values(window.day2Photos).every(photo => photo !== null);
    const submitBtn = document.getElementById('btnSubmitAllDocs');
    if (submitBtn) {
        submitBtn.disabled = !allSelected;
    }
}

// Submit all 5 documentation photos
async function submitAllDocumentation() {
    const btn = document.getElementById('btnSubmitAllDocs');
    if (!btn) return;

    // Validate all photos selected
    const categories = ['makanan', 'minuman', 'stand', 'iklan', 'presentasi'];
    for (const cat of categories) {
        if (!window.day2Photos[cat]) {
            alert(`Foto ${cat} belum dipilih!`);
            return;
        }
    }

    btn.disabled = true;
    btn.innerHTML = 'Mengirim...';

    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) throw new Error('Silakan login ulang.');

        // Upload each photo and insert to database
        for (const category of categories) {
            const file = window.day2Photos[category];
            const fileName = `${user.id}/day2_${category}_${Date.now()}.jpg`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabaseClient.storage
                .from('documentation')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // 2. Get public URL
            const { data: { publicUrl } } = supabaseClient.storage
                .from('documentation')
                .getPublicUrl(fileName);

            // 3. Insert to database
            const { error: dbError } = await supabaseClient
                .from('module_responses')
                .insert({
                    student_id: user.id,
                    day_id: 2,
                    module_type: 'dokumentasi',
                    category: category,
                    answers: [publicUrl],
                    status: 'submitted'
                });

            if (dbError) throw dbError;
        }

        alert('✅ Semua dokumentasi berhasil dikirim!');

        // Reset
        window.day2Photos = {
            makanan: null,
            minuman: null,
            stand: null,
            iklan: null,
            presentasi: null
        };

        closeDokumentasiDay2Modal();
        checkAllModulesStatus();

    } catch (e) {
        console.error(e);
        alert('Gagal mengirim: ' + e.message);
        btn.disabled = false;
        btn.innerHTML = 'Kirim Semua Dokumentasi';
    }
}

// Load existing Day 2 documentation
async function loadExistingDay2Documentation() {
    try {
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (!user) return;

        const { data: responses } = await supabaseClient
            .from('module_responses')
            .select('*')
            .eq('student_id', user.id)
            .eq('day_id', 2)
            .eq('module_type', 'dokumentasi');

        if (responses && responses.length > 0) {
            const categories = ['makanan', 'minuman', 'stand', 'iklan', 'presentasi'];

            responses.forEach(r => {
                if (r.category && categories.includes(r.category)) {
                    const uploadArea = document.getElementById(`upload-area-${r.category}`);
                    const previewArea = document.getElementById(`preview-area-${r.category}`);
                    const preview = document.getElementById(`preview-${r.category}`);
                    const status = document.getElementById(`status-${r.category}`);

                    if (uploadArea) uploadArea.classList.add('hidden');
                    if (previewArea) previewArea.classList.remove('hidden');
                    if (preview && r.answers[0]) preview.src = r.answers[0];
                    if (status) {
                        status.className = "text-xs font-bold text-emerald-600";
                        status.textContent = "✅ Sudah terkirim";
                    }
                }
            });

            // Disable submit if all uploaded
            if (responses.length === 5) {
                const btn = document.getElementById('btnSubmitAllDocs');
                if (btn) {
                    btn.disabled = true;
                    btn.innerHTML = 'Semua Dokumentasi Sudah Terkirim';
                }
            }
        }
    } catch (e) {
        console.error('Error loading Day 2 documentation:', e);
    }
}

// Modify toggleModule to detect Day 2
function toggleModule(moduleType) {
    if (moduleType === 'dokumentasi' && currentDay === 2) {
        openDokumentasiDay2Modal();
    } else {
        // Original behavior for other days/modules
        alert(`Module ${moduleType} untuk hari ${currentDay} belum diimplementasi.`);
    }
}

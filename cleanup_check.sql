-- Skrip untuk memeriksa apakah ada data sisa dari modul 'laporan_akhir' yang sudah dihapus
-- Jalankan ini di SQL Editor Supabase untuk verifikasi

-- 1. Cek jumlah data 'laporan_akhir' di tabel module_responses
SELECT count(*) as sisa_laporan_akhir 
FROM module_responses 
WHERE module_type = 'laporan_akhir';

-- 2. Jika ada dan ingin dihapus, jalankan perintah berikut (HATI-HATI):
-- DELETE FROM module_responses WHERE module_type = 'laporan_akhir';

-- 3. Cek respon harian siswa untuk memastikan tidak ada referensi null/broken (opsional)
SELECT * 
FROM module_responses 
WHERE day_id NOT IN (1, 2, 3) 
LIMIT 10;

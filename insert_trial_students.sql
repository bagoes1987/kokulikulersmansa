-- Menambahkan 10 Siswa Trial untuk Kelas X.TRIAL-1
-- Password default (NIS) digunakan untuk login

INSERT INTO public.students (nama, nisn, nis, kelas)
VALUES 
    ('Siswa Trial 1', '99999901', '99901', 'X.TRIAL-1'),
    ('Siswa Trial 2', '99999902', '99902', 'X.TRIAL-1'),
    ('Siswa Trial 3', '99999903', '99903', 'X.TRIAL-1'),
    ('Siswa Trial 4', '99999904', '99904', 'X.TRIAL-1'),
    ('Siswa Trial 5', '99999905', '99905', 'X.TRIAL-1'),
    ('Siswa Trial 6', '99999906', '99906', 'X.TRIAL-1'),
    ('Siswa Trial 7', '99999907', '99907', 'X.TRIAL-1'),
    ('Siswa Trial 8', '99999908', '99908', 'X.TRIAL-1'),
    ('Siswa Trial 9', '99999909', '99909', 'X.TRIAL-1'),
    ('Siswa Trial 10', '99999910', '99910', 'X.TRIAL-1')
ON CONFLICT (nisn) DO NOTHING;

-- Pastikan Role Siswa Diaktifkan (Opsional, tergantung implementasi roles)
-- Biasanya roles ditangani via tabel profile/users, tapi ini hanya data siswa utama.

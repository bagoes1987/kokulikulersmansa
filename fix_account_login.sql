-- SCRIPT PERBAIKAN AKUN TRIAL SISWA
-- Script ini akan:
-- 1. Menghapus data siswa trial yang lama (jika ada) di tabel students.
-- 2. Membuat akun Login (Auth Users) untuk 10 Siswa Trial.
-- 3. Memasukkan data Profile Siswa ke tabel students yang terhubung dengan akun Login.

-- Enable pgcrypto untuk hashing password
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
DECLARE
    new_id uuid;
    -- Array Data Siswa: [Nama, NISN, NIS, Kelas]
    student_data text[][] := ARRAY[
        ['Siswa Trial 1', '99999901', '99901', 'X.TRIAL-1'],
        ['Siswa Trial 2', '99999902', '99902', 'X.TRIAL-1'],
        ['Siswa Trial 3', '99999903', '99903', 'X.TRIAL-1'],
        ['Siswa Trial 4', '99999904', '99904', 'X.TRIAL-1'],
        ['Siswa Trial 5', '99999905', '99905', 'X.TRIAL-1'],
        ['Siswa Trial 6', '99999906', '99906', 'X.TRIAL-1'],
        ['Siswa Trial 7', '99999907', '99907', 'X.TRIAL-1'],
        ['Siswa Trial 8', '99999908', '99908', 'X.TRIAL-1'],
        ['Siswa Trial 9', '99999909', '99909', 'X.TRIAL-1'],
        ['Siswa Trial 10', '99999910', '99910', 'X.TRIAL-1']
    ];
    s text[];
    user_email text;
    encrypted_pw text;
BEGIN
    -- Loop untuk setiap siswa
    FOREACH s SLICE 1 IN ARRAY student_data
    LOOP
        user_email := s[2] || '@smansa.sch.id'; -- Email: NISN@smansa.sch.id
        encrypted_pw := crypt(s[3], gen_salt('bf')); -- Password: NIS
        
        -- Hapus user auth lama jika ada (untuk reset bersih)
        -- Note: Menghapus auth user biasanya cascade ke public tables jika disetup demikian,
        -- tapi kita main aman delete manual public data dulu.
        DELETE FROM public.students WHERE nisn = s[2];
        
        -- Cek user auth existing, ambil ID-nya atau buat baru
        -- (Karena keterbatasan akses delete auth.users dari SQL Editor biasa kadang dibatasi,
        -- kita gunakan pendekatan upsert/check)
        
        SELECT id INTO new_id FROM auth.users WHERE email = user_email;
        
        IF new_id IS NULL THEN
            new_id := gen_random_uuid();
            
            -- Insert Auth User Baru
            INSERT INTO auth.users (id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, instance_id)
            VALUES (
                new_id, 
                'authenticated', 
                'authenticated', 
                user_email, 
                encrypted_pw, 
                now(), 
                '{"provider":"email","providers":["email"]}', 
                '{}', 
                now(), 
                now(), 
                '00000000-0000-0000-0000-000000000000'
            );
            
            -- Insert Auth Identity
            INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
            VALUES (
                gen_random_uuid(), 
                new_id, 
                jsonb_build_object('sub', new_id, 'email', user_email), 
                'email', 
                new_id, 
                now(), 
                now(), 
                now()
            );
        ELSE
            -- Jika user auth sudah ada, update passwordnya biar sesuai
            UPDATE auth.users 
            SET encrypted_password = encrypted_pw 
            WHERE id = new_id;
        END IF;

        -- Insert ke Public Students (Link dengan ID Auth)
        INSERT INTO public.students (id, nama, nisn, nis, kelas)
        VALUES (new_id, s[1], s[2], s[3], s[4]);
        
    END LOOP;
END $$;

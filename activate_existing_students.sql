-- SCRIPT AKTIVASI SEMUA AKUN SISWA (Real & Trial)
-- Script ini akan mengecek semua siswa di tabel `students`
-- dan membuatkan akun Login (Auth User) jika belum ada.
-- Password default: NIS masing-masing.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
DECLARE
    student_rec RECORD;
    new_id uuid;
    user_email text;
    encrypted_pw text;
    created_count int := 0;
BEGIN
    RAISE NOTICE 'Memulai proses aktivasi akun siswa...';

    -- Loop untuk setiap siswa yang ada di tabel students
    FOR student_rec IN SELECT * FROM public.students LOOP
        
        user_email := student_rec.nisn || '@smansa.sch.id';
        -- Password default gunakan NIS
        encrypted_pw := crypt(student_rec.nis, gen_salt('bf')); 

        -- Cek apakah user sudah punya akun di auth.users berdasarkan email
        SELECT id INTO new_id FROM auth.users WHERE email = user_email;

        -- Jika belum ada akun Auth, buatkan baru
        IF new_id IS NULL THEN
            new_id := gen_random_uuid();
            
            INSERT INTO auth.users (
                id, aud, role, email, encrypted_password, 
                email_confirmed_at, raw_app_meta_data, raw_user_meta_data, 
                created_at, updated_at, instance_id
            )
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
            
            INSERT INTO auth.identities (
                id, user_id, identity_data, provider, provider_id, 
                last_sign_in_at, created_at, updated_at
            )
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

            created_count := created_count + 1;
        END IF;

        -- Update ID di tabel students agar terhubung dengan akun Auth
        -- Gunakan ON CONFLICT atau UPDATE biasa
        -- Di sini kita update berdasarkan NISN karena ID mungkin berubah/null
        UPDATE public.students 
        SET id = new_id 
        WHERE nisn = student_rec.nisn;
        
    END LOOP;

    RAISE NOTICE 'Selesai! Jumlah akun baru diaktifkan: %', created_count;
END $$;

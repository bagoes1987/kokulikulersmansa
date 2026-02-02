-- ============================================
-- SETUP RLS POLICIES UNTUK BUCKET DOCUMENTATION
-- ============================================

-- 1. Berikan akses VIEW (SELECT) ke semua orang (Public)
DROP POLICY IF EXISTS "Public View Documentation" ON storage.objects;
CREATE POLICY "Public View Documentation"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'documentation');

-- 2. Izinkan siswa (Authenticated) untuk UPLOAD (INSERT)
DROP POLICY IF EXISTS "Authenticated Upload Documentation" ON storage.objects;
CREATE POLICY "Authenticated Upload Documentation"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'documentation');

-- 3. Izinkan siswa (Authenticated) untuk UPDATE file mereka
DROP POLICY IF EXISTS "Authenticated Update Documentation" ON storage.objects;
CREATE POLICY "Authenticated Update Documentation"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'documentation')
WITH CHECK (bucket_id = 'documentation');

-- 4. Izinkan siswa (Authenticated) untuk DELETE file mereka
DROP POLICY IF EXISTS "Authenticated Delete Documentation" ON storage.objects;
CREATE POLICY "Authenticated Delete Documentation"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'documentation');

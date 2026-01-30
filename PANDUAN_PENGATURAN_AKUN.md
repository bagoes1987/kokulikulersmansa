# Panduan Setup Fitur Pengaturan Akun

Fitur pengaturan akun telah diimplementasikan! Ikuti langkah-langkah berikut untuk mengaktifkannya:

## 1. Jalankan Database Migration

Buka **Supabase Dashboard** → **SQL Editor**, lalu jalankan script berikut:

```sql
-- Add photo_url column to students table
ALTER TABLE students ADD COLUMN IF NOT EXISTS photo_url text;

-- Add comment to the column
COMMENT ON COLUMN students.photo_url IS 'URL to student profile photo stored in Supabase Storage';
```

Script ini juga tersedia di file: `migration_add_photo_url.sql`

## 2. Buat Storage Bucket untuk Foto Profil

1. Buka **Supabase Dashboard** → **Storage**
2. Klik **New bucket**
3. Isi form:
   - **Name**: `profile-photos`
   - **Public bucket**: ✅ **CENTANG** (agar foto bisa diakses publik)
4. Klik **Create bucket**

### Konfigurasi Storage Policy (Opsional tapi Disarankan)

Untuk keamanan yang lebih baik, tambahkan policy berikut di **Storage** → **Policies**:

```sql
-- Policy: Siswa bisa upload foto mereka sendiri
CREATE POLICY "Siswa bisa upload foto sendiri"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Siswa bisa update foto mereka sendiri
CREATE POLICY "Siswa bisa update foto sendiri"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'profile-photos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Semua orang bisa melihat foto
CREATE POLICY "Foto profil bisa dilihat semua orang"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-photos');
```

## 3. Test Fitur

1. Login sebagai siswa di `login-siswa.html`
   - NISN: `00103132350`
   - NIS: `14206`

2. Di dashboard siswa, klik tombol **"Pengaturan Akun"**

3. Klik pada foto profil atau area upload

4. Pilih foto (JPEG/PNG, maksimal 2MB)

5. Klik **"Simpan Perubahan"**

6. Foto akan diupload dan ditampilkan di dashboard

## File yang Ditambahkan/Diubah

### File Baru:
- ✅ `pengaturan-akun.html` - Halaman pengaturan akun
- ✅ `migration_add_photo_url.sql` - Script database migration

### File yang Diubah:
- ✅ `dashboard-siswa.html` - Ditambahkan navigasi ke pengaturan akun dan tampilan foto upload

## Fitur yang Tersedia

✅ Upload foto profil (JPEG/PNG, max 2MB)  
✅ Preview foto sebelum upload  
✅ Validasi ukuran dan format file  
✅ Progress indicator saat upload  
✅ Foto tersimpan di Supabase Storage  
✅ Foto ditampilkan di dashboard  
✅ Fallback ke avatar dengan initial nama jika belum upload foto  

## Troubleshooting

### Error: "Bucket not found"
- Pastikan bucket `profile-photos` sudah dibuat di Supabase Storage
- Pastikan bucket di-set sebagai **public**

### Foto tidak muncul setelah upload
- Cek di Supabase Storage apakah file berhasil diupload
- Cek kolom `photo_url` di tabel `students` apakah sudah terisi
- Clear cache browser atau hard refresh (Ctrl+F5)

### Error saat upload
- Pastikan ukuran file < 2MB
- Pastikan format file JPEG atau PNG
- Cek koneksi internet

---

**Selamat! Fitur Pengaturan Akun sudah aktif! 🎉**

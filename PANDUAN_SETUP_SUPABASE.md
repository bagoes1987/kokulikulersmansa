# Panduan Setup Supabase untuk Login Siswa

## Yang Perlu Anda Lakukan di Supabase

### 1️⃣ Buat Tabel Students

1. Buka **Supabase Dashboard**: https://supabase.com/dashboard
2. Pilih project Anda: `jnsqqswpkigyzewnbvaf`
3. Klik menu **SQL Editor** di sidebar kiri
4. Klik **New Query**
5. Copy semua isi file `supabase_students_schema.sql`
6. Paste ke SQL Editor
7. Klik tombol **Run** (atau tekan Ctrl+Enter)
8. ✅ Tunggu sampai muncul pesan "Success"

### 2️⃣ Dapatkan Service Role Key

Service Role Key diperlukan untuk membuat akun siswa secara otomatis.

1. Di Supabase Dashboard, klik **Settings** (ikon gear di sidebar)
2. Klik **API**
3. Scroll ke bawah sampai bagian **Project API keys**
4. Cari yang namanya **service_role** (bukan anon!)
5. Klik tombol **Reveal** untuk melihat key-nya
6. **Copy** key tersebut (sangat panjang, dimulai dengan `eyJ...`)

⚠️ **PENTING**: Service Role Key ini sangat rahasia! Jangan share ke siapa-siapa!

### 3️⃣ Update Script Import

1. Buka file `import_students.js`
2. Cari baris ini:
   ```javascript
   const supabaseServiceKey = 'GANTI_DENGAN_SERVICE_ROLE_KEY_ANDA';
   ```
3. Ganti `GANTI_DENGAN_SERVICE_ROLE_KEY_ANDA` dengan Service Role Key yang tadi Anda copy
4. Save file

### 4️⃣ Install Dependencies

Buka terminal/command prompt di folder project, lalu jalankan:

```bash
npm install @supabase/supabase-js
```

### 5️⃣ Jalankan Import

Setelah semua siap, jalankan script import:

```bash
node import_students.js
```

Script ini akan:
- ✅ Membaca semua data siswa dari Excel
- ✅ Membuat akun untuk setiap siswa
- ✅ Email: `{nisn}@smansa.sch.id`
- ✅ Password: `{nis}`
- ✅ Menyimpan data siswa ke database

## Setelah Import Selesai

Siswa bisa login dengan:
- **Username**: NISN mereka (contoh: 103132350)
- **Password**: NIS mereka (contoh: 14206)

## Troubleshooting

### Error: "Invalid API key"
- Pastikan Service Role Key sudah benar
- Pastikan tidak ada spasi di awal/akhir key

### Error: "relation students does not exist"
- Jalankan dulu SQL schema di langkah 1

### Error: "User already exists"
- Siswa tersebut sudah pernah di-import
- Bisa diabaikan atau hapus dulu user lama di Supabase Auth

## Butuh Bantuan?

Jika ada error atau bingung, screenshot error-nya dan tanyakan ke saya! 😊

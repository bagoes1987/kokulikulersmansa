# Kokulikuler SMA Negeri 1 Belitang

Landing page untuk kegiatan kokulikuler SMA Negeri 1 Belitang. Website ini dirancang untuk memberikan informasi interaktif mengenai program "Harmonisasi Citra Rasa Jajanan Nusantara".

## Fitur Utama
- **Desain Modern**: Tata letak grid dan accordion untuk tampilan yang rapi dan responsif.
- **Koneksi Supabase**: Terintegrasi dengan database Supabase untuk manajemen pengguna (Siswa, Guru, dll).
- **Interaktif**: Menggunakan vanilla JavaScript untuk interaksi ringan dan cepat.

## Cara Deploy ke Vercel

Cara termudah untuk men-deploy website ini adalah menggunakan integrasi GitHub Vercel:

1.  Pastikan kode ini sudah ada di GitHub repository Anda.
2.  Buka [Vercel Dashboard](https://vercel.com/dashboard).
3.  Klik **"Add New..."** -> **"Project"**.
4.  Pilih repository `kokulikulersmansa` dan klik **Import**.
5.  Di bagian **Build & Development Settings**, Vercel biasanya otomatis mendeteksi ini sebagai static site. Jika tidak, kosongkan *Build Command* dan *Output Directory*.
6.  Klik **Deploy**.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbagoes1987%2Fkokulikulersmansa)

## Setup Lokal

1.  Clone repository:
    ```bash
    git clone https://github.com/bagoes1987/kokulikulersmansa.git
    ```
2.  Install dependencies (opsional, hanya untuk local server):
    ```bash
    npm install
    ```
3.  Jalankan server lokal:
    ```bash
    npm start
    ```

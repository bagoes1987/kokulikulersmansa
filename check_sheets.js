const XLSX = require('xlsx');
const filePath = 'D:\\Aplikasi Web AI\\LP Kokulikuler SMAN 1 Belitang\\DAFTAR NAMA SISWA KELAS X-XII 2026.xlsx';

try {
    const workbook = XLSX.readFile(filePath);
    console.log("Sheets found:", workbook.SheetNames);
} catch (e) {
    console.error("Error:", e.message);
}

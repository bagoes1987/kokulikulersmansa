const XLSX = require('xlsx');
const filePath = 'D:\\Aplikasi Web AI\\LP Kokulikuler SMAN 1 Belitang\\DAFTAR NAMA SISWA KELAS X-XII 2026.xlsx';
try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]).slice(0, 3);
    console.log(JSON.stringify(data, null, 2));
} catch (e) {
    console.error("Error reading file:", e.message);
}

const XLSX = require('xlsx');
const filePath = 'D:\\Aplikasi Web AI\\LP Kokulikuler SMAN 1 Belitang\\DAFTAR NAMA SISWA KELAS X-XII 2026.xlsx';

const searchNisn = '0091127501';
const searchNis = '14598';
const searchName = 'Keyridho';

try {
    const workbook = XLSX.readFile(filePath);
    let found = false;

    workbook.SheetNames.forEach(sheetName => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        const student = data.find(s => String(s.NISN).includes(searchNisn) || String(s.NIS).includes(searchNis) || String(s.NAMA).includes(searchName));

        if (student) {
            console.log(`\n✅ Ditemukan di Sheet: ${sheetName}`);
            console.log(`Nama: ${student.NAMA}`);
            console.log(`NISN: ${student.NISN}`);
            console.log(`NIS: ${student.NIS}`);
            console.log(`Kelas: ${student['KELAS '] || student.KELAS}`);
            found = true;
        }
    });

    if (!found) {
        console.log(`\n❌ Siswa dengan NISN ${searchNisn} atau NIS ${searchNis} tidak ditemukan di file Excel.`);
    }
} catch (e) {
    console.error("Error reading file:", e.message);
}

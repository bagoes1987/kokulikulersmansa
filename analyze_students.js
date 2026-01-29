const XLSX = require('xlsx');
const filePath = 'D:\\Aplikasi Web AI\\LP Kokulikuler SMAN 1 Belitang\\DAFTAR NAMA SISWA KELAS X-XII 2026.xlsx';

try {
    const workbook = XLSX.readFile(filePath);

    let stats = {
        'X': 0,
        'XI': 0,
        'XII': 0,
        'Total': 0
    };

    workbook.SheetNames.forEach(sheetName => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        // console.log(`Processing sheet: ${sheetName}, rows: ${data.length}`);

        data.forEach(row => {
            // Check based on sheet name or content. Since sheets are named "KELAS X", we can just assume all in that sheet are X?
            // Safer to check the content if available, or just map sheet to grade.
            // Let's rely on the row content "KELAS " again to be double sure, but fallback to sheet name if needed.

            let kelas = row['KELAS '] ? row['KELAS '].trim().toUpperCase() : '';

            // If column is empty, try to derive from sheet name
            if (!kelas) {
                if (sheetName.includes('X') && !sheetName.includes('XI')) kelas = 'X';
                else if (sheetName.includes('XI') && !sheetName.includes('XII')) kelas = 'XI';
                else if (sheetName.includes('XII')) kelas = 'XII';
            }

            if (kelas.startsWith('X') && !kelas.startsWith('XI')) {
                stats['X']++;
            } else if (kelas.startsWith('XI') && !kelas.startsWith('XII')) {
                stats['XI']++;
            } else if (kelas.startsWith('XII')) {
                stats['XII']++;
            }
            stats['Total']++;
        });
    });

    console.log(`Kelas X: ${stats['X']}`);
    console.log(`Kelas XI: ${stats['XI']}`);
    console.log(`Kelas XII: ${stats['XII']}`);
    console.log(`Total Semua: ${stats['Total']}`);

} catch (e) {
    console.error("Error:", e.message);
}

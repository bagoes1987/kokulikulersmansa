const XLSX = require('xlsx');

const filePath = 'D:\\Aplikasi Web AI\\LP Kokulikuler SMAN 1 Belitang\\DAFTAR NAMA SISWA KELAS X-XII 2026.xlsx';

try {
    const workbook = XLSX.readFile(filePath);

    console.log('📚 Sheet yang tersedia:');
    console.log(workbook.SheetNames);
    console.log('');

    workbook.SheetNames.forEach((sheetName, index) => {
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        console.log(`${index + 1}. Sheet: "${sheetName}"`);
        console.log(`   Total siswa: ${data.length}`);

        if (data.length > 0) {
            console.log(`   Sample data pertama:`);
            console.log(`   - NIS: ${data[0].NIS}`);
            console.log(`   - NISN: ${data[0].NISN}`);
            console.log(`   - Nama: ${data[0].NAMA}`);
            console.log(`   - Kelas: ${data[0]['KELAS ']}`);
        }
        console.log('');
    });

} catch (error) {
    console.error('Error:', error.message);
}

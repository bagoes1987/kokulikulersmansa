const XLSX = require('xlsx');

const filePath = 'D:\\Aplikasi Web AI\\LP Kokulikuler SMAN 1 Belitang\\DAFTAR NAMA SISWA KELAS X-XII 2026.xlsx';

try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets['KELAS X'];

    // Baca dengan raw: false untuk preserve format
    const data = XLSX.utils.sheet_to_json(sheet, { raw: false });

    console.log('📋 10 Data Pertama Kelas X:\n');
    console.log('NO | NIS   | NISN        | NAMA');
    console.log('---|-------|-------------|-----');

    data.slice(0, 10).forEach((row, index) => {
        const no = (index + 1).toString().padEnd(2);
        const nis = row.NIS ? row.NIS.toString().padEnd(5) : '-'.padEnd(5);
        const nisn = row.NISN ? row.NISN.toString().padEnd(11) : '-'.padEnd(11);
        const nama = row.NAMA || '-';

        console.log(`${no} | ${nis} | ${nisn} | ${nama}`);
    });

    console.log('\n📝 Detail siswa pertama:');
    console.log('NIS:', data[0].NIS);
    console.log('NISN:', data[0].NISN);
    console.log('NISN (type):', typeof data[0].NISN);
    console.log('NISN (length):', data[0].NISN ? data[0].NISN.toString().length : 0);

} catch (error) {
    console.error('Error:', error.message);
}

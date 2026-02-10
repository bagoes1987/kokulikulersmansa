
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://jnsqqswpkigyzewnbvaf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impuc3Fxc3dwa2lneXpld25idmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2NjA3NDIsImV4cCI6MjA4NTIzNjc0Mn0.RrjPnddC55Xv9CLCtG8-1RyDmEkYg_04tHeKqRE7pok';

async function checkData() {
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    console.log("--- Mencari Semua Respon Hari 2 ---");
    const { data: responses, error } = await supabase
        .from('module_responses')
        .select('module_type, student_id, answers, day_id')
        .eq('day_id', 2);

    if (error) { console.error(error); return; }
    console.log(`Ditemukan ${responses.length} respon pada hari 2.`);

    const types = new Set(responses.map(r => r.module_type));
    console.log("Tipe modul yang ada:", Array.from(types));

    // Ambil info siswa
    const sIds = responses.map(r => r.student_id);
    const { data: students } = await supabase.from('students').select('id, nama, kelas').in('id', sIds);
    const sMap = {};
    students.forEach(s => sMap[s.id] = s);

    const x9_10 = responses.filter(r => {
        const s = sMap[r.student_id];
        return s && (s.kelas === 'XI.9' || s.kelas === 'XI.10');
    });

    console.log(`\n--- Respon XI.9 & XI.10 (${x9_10.length}) ---`);
    x9_10.forEach(r => {
        const s = sMap[r.student_id];
        console.log(`[${r.module_type}] Kelas: ${s.kelas} | Nama: ${s.nama} | Ans: ${r.answers[0]}`);
    });
}

checkData();

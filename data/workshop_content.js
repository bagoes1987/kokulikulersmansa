const workshopContent = {
    day1: {
        pemantik: [
            "1. Kapan terakhir kali kamu menikmati jajanan khas Nusantara, dan apa yang membuatmu lebih memilih jajanan tersebut dibandingkan makanan modern atau camilan instan saat itu?",
            "2. Apa nama jajanan tersebut? Menurut pendapatmu, berasal dari daerah mana makanan tersebut?",
            "3. Apa bahan utama pembuat makanan tersebut? Apakah bahannya mudah didapatkan, dan berapa harganya sekarang?",
            "4. Apa kandungan gizi dari makanan tersebut? Menurutmu, bahan mana yang memberikan manfaat bagi tubuh dan bahan mana yang jika dikonsumsi berlebih justru berisiko bagi kesehatan? Mengapa?",
            "5. Jika jajanan tersebut akan kamu jual di bazar dengan label 'Cita Rasa Jajanan Nusantara - Sehat, Bergizi & Kekinian', inovasi apa yang harus kamu lakukan pada bahan atau cara pengolahannya agar orang tertarik membeli namun tetap mendapatkan manfaat kesehatan?"
        ],
        materi: [
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-emerald-500 mb-2">info</span>
                    <h4 class="text-lg font-black text-slate-800 uppercase text-center w-full">BAGIAN I : PENGERTIAN DAN RUANG LINGKUP JAJANAN NUSANTARA</h4>
                </div>
                <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Jajanan Nusantara adalah makanan dan minuman tradisional khas Indonesia yang umumnya dikonsumsi sebagai makanan selingan. Jajanan ini dibuat dari bahan-bahan lokal yang mudah diperoleh di lingkungan sekitar masyarakat, seperti beras, ketan, singkong, ubi, kelapa, gula aren, dan berbagai hasil pertanian lainnya. Proses pembuatannya dilakukan secara sederhana dengan teknik tradisional yang diwariskan secara turun-temurun.</p>
                    <p>Jajanan Nusantara (sering disebut Jajanan Pasar) adalah berbagai jenis penganan atau camilan tradisional khas Indonesia yang pada awalnya diperjualbelikan di pasar-pasar tradisional. Secara terminologi, jajanan ini merupakan produk kuliner skala rumah tangga yang memiliki karakteristik:</p>
                    <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm">
                        <ul class="space-y-3 text-xs text-slate-700">
                            <li class="flex gap-3 items-start">
                                <span class="flex-shrink-0 size-5 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-[10px]">1</span>
                                <span><strong>Porsi kecil (sekali makan).</strong></span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="flex-shrink-0 size-5 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-[10px]">2</span>
                                <span><strong>Harga terjangkau.</strong></span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="flex-shrink-0 size-5 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-[10px]">3</span>
                                <span><strong>Menggunakan bahan baku lokal yang segar tanpa pengawet kimia.</strong></span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="flex-shrink-0 size-5 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-[10px]">4</span>
                                <span><strong>Memiliki fungsi sosial sebagai sajian tamu, pelengkap upacara adat, hingga simbol syukur.</strong></span>
                            </li>
                        </ul>
                    </div>
                    <div class="bg-amber-50 p-4 rounded-xl border-l-4 border-amber-400">
                        <p class="text-xs text-slate-700">Jajanan Nusantara tidak hanya memiliki fungsi sebagai pemenuh kebutuhan pangan, tetapi juga memiliki nilai budaya, sosial, dan ekonomi. Dalam kehidupan masyarakat, jajanan tradisional sering disajikan pada acara adat, kegiatan keagamaan, perayaan keluarga, hingga kegiatan gotong royong. Oleh karena itu, jajanan Nusantara merupakan bagian dari warisan budaya bangsa yang perlu dijaga dan dikembangkan.</p>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-amber-500 mb-2">history</span>
                    <h4 class="text-lg font-black text-slate-800 uppercase text-center w-full">BAGIAN 2: SEJARAH DAN PERKEMBANGAN JAJANAN NUSANTARA</h4>
                </div>
                <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Sejarah jajanan Nusantara tidak terlepas dari perkembangan peradaban masyarakat Indonesia. Cita rasa jajanan kita tidak lahir di ruang hampa, melainkan hasil perjalanan sejarah yang panjang:</p>
                    <div class="space-y-3">
                        <div class="relative pl-4 border-l-4 border-emerald-500 bg-emerald-50/50 p-3 rounded-r-xl">
                            <p class="font-black text-emerald-800 text-xs uppercase mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-sm">forest</span> 1. Era Kerajaan (Lokal)</p>
                            <p class="text-xs text-slate-700">Pada masa awal, masyarakat memanfaatkan bahan pangan yang tersedia di alam, seperti umbi-umbian (singkong, ubi), kelapa, dan gula aren, untuk memenuhi kebutuhan energi. Ini adalah "akar" rasa asli Nusantara. Teknik pengolahan yang digunakan masih sangat sederhana, seperti merebus, mengukus, dan membakar.</p>
                        </div>
                        <div class="relative pl-4 border-l-4 border-red-500 bg-red-50/50 p-3 rounded-r-xl">
                            <p class="font-black text-red-800 text-xs uppercase mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-sm">temple_buddhist</span> 2. Pengaruh Tionghoa (Abad ke-7)</p>
                            <p class="text-xs text-slate-700">Masuknya budaya asing memberikan pengaruh besar terhadap perkembangan jajanan Nusantara. Pengaruh Tionghoa memperkenalkan penggunaan tepung, isian kacang-kacangan, serta teknik menggoreng (istilah "Kue" berasal dari kata Bak-Kue). Beberapa jajanan yang lahir dari akulturasi budaya ini antara lain Bakpia, Onde-onde, dan Kue Ku.</p>
                        </div>
                        <div class="relative pl-4 border-l-4 border-blue-500 bg-blue-50/50 p-3 rounded-r-xl">
                            <p class="font-black text-blue-800 text-xs uppercase mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-sm">castle</span> 3. Pengaruh Eropa (Era Kolonial)</p>
                            <p class="text-xs text-slate-700">Pada masa kolonial, pengaruh bangsa Belanda membawa budaya Indo-Europeesche yang semakin memperkaya ragam jajanan Nusantara. Masyarakat mulai mengenal penggunaan mentega (butter), susu, telur, serta teknik memanggang menggunakan oven. Dari pengaruh ini lahirlah kue-kue seperti Lapis Legit, Klappertaart, dan Pastel.</p>
                        </div>
                    </div>
                    <div class="bg-amber-100 p-4 rounded-xl border-t-4 border-amber-500 shadow-sm text-center">
                        <p class="text-xs font-bold text-amber-900 italic">"Perpaduan berbagai pengaruh budaya tersebut menjadikan jajanan Nusantara memiliki keragaman rasa, bentuk, dan teknik pengolahan yang sangat kaya."</p>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-orange-500 mb-2">cooking</span>
                    <h4 class="text-lg font-black text-slate-800 uppercase text-center w-full">BAGIAN III: TEKNIK PENGOLAHAN JAJANAN TRADISIONAL DAN MODERN</h4>
                </div>
                <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Teknik pengolahan merupakan faktor penting dalam menentukan rasa, tekstur, aroma, serta kandungan gizi jajanan Nusantara.</p>
                    <div class="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                        <h5 class="font-black text-orange-800 text-sm mb-3 flex items-center gap-2"><span class="material-symbols-outlined">skillet</span> A. Teknik Pengolahan Tradisional</h5>
                        <ul class="space-y-3 text-xs text-slate-700">
                            <li><strong>Mengukus (Steaming):</strong> Teknik memasak dengan menggunakan uap air panas. Teknik ini mempertahankan kandungan gizi karena makanan tidak bersentuhan langsung dengan air. Menghasilkan tekstur lembut dan lembap. <br><span class="text-orange-600 italic">Contoh: Nagasari, Kue Talam, Putu Ayu, Bolu Kukus.</span></li>
                            <li><strong>Merebus (Boiling):</strong> Dilakukan dengan memasukkan bahan ke dalam air mendidih. Teknik ini banyak digunakan untuk jajanan berbahan dasar tepung ketan yang membutuhkan tekstur kenyal. <br><span class="text-orange-600 italic">Contoh: Klepon, Cenil, Biji Salak, Kolak.</span></li>
                            <li><strong>Membakar/Memanggang Tradisional:</strong> Teknik ini menggunakan bara api atau arang dan sering memanfaatkan daun pisang sebagai pembungkus untuk aroma karbon/smoky yang khas. <br><span class="text-orange-600 italic">Contoh: Lemper Bakar, Wingko Babat, Kue Pancong.</span></li>
                            <li><strong>Menyangrai (Pan-Toasting):</strong> Memasak bahan tanpa minyak untuk mendapatkan aroma kacang atau kelapa yang kuat dan memperpanjang daya simpan. <br><span class="text-orange-600 italic">Contoh: Kue Sagon, Enting-enting Kacang.</span></li>
                            <li><strong>Menggoreng:</strong> Teknik memasak dengan minyak panas yang menghasilkan tekstur renyah. <br><span class="text-orange-600 italic">Contoh: Pisang Goreng, Onde-onde, Pastel.</span></li>
                        </ul>
                    </div>
                    <div class="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-4">
                        <h5 class="font-black text-blue-800 text-sm mb-3 flex items-center gap-2"><span class="material-symbols-outlined">smart_toy</span> B. Teknik Pengolahan Modern (Inovasi)</h5>
                        <ul class="space-y-3 text-xs text-slate-700">
                            <li><strong>Pemanggangan Oven:</strong> Menggunakan oven listrik atau gas untuk menghasilkan kematangan merata. <br><span class="text-blue-600 italic">Contoh: Brownies Tradisional, Bolu Panggang.</span></li>
                            <li><strong>Air Fryer:</strong> Teknik modern yang menggunakan sirkulasi udara panas sehingga mengurangi penggunaan minyak secara signifikan. <br><span class="text-blue-600 italic">Contoh: Rengginang Panggang, Pastel Sehat.</span></li>
                            <li><strong>Blending dan Puree:</strong> Digunakan untuk menghaluskan bahan seperti buah dan sayuran sebagai campuran adonan untuk nutrisi tambahan. <br><span class="text-blue-600 italic">Contoh: Dadar Gulung Bayam, Klepon Ubi Ungu.</span></li>
                        </ul>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-indigo-500 mb-2">map</span>
                    <h4 class="text-lg font-black text-slate-800 uppercase text-center w-full">BAGIAN IV: JENIS DAN KARAKTERISTIK JAJANAN DAN MINUMAN NUSANTARA</h4>
                </div>
                <div class="space-y-4 text-xs font-medium text-slate-600 text-justify">
                    <div class="border border-indigo-100 rounded-2xl overflow-hidden">
                        <div class="bg-indigo-50 p-3 border-b border-indigo-100">
                            <h5 class="font-black text-indigo-800 text-sm flex items-center gap-2"><span class="material-symbols-outlined text-lg">location_on</span> A. Wilayah Sumatra</h5>
                        </div>
                        <div class="p-4 space-y-3 bg-white">
                            <div class="grid grid-cols-1 gap-2">
                                <p><strong class="text-indigo-700">Aceh:</strong> <br>🍽️ Timphan<br>Bahan utama : tepung ketan, pisang/srikaya, santan<br>☕ Kopi Aceh<br>Bahan utama : biji kopi arabika</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-indigo-700">Sumatra Utara:</strong> <br>🍽️ Bika Ambon<br>Bahan utama : tepung tapioka, telur, santan<br>☕ Bandrek<br>Bahan utama : jahe, gula aren</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-indigo-700">Sumatra Barat:</strong> <br>🍽️ Kipang Kacang<br>Bahan utama : kacang tanah, gula merah<br>☕ Teh Talua<br>Bahan utama : telur ayam, teh, gula</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-indigo-700">Riau:</strong> <br>🍽️ Bolu Kemojo<br>Bahan utama : telur, santan, tepung terigu<br>☕ Air Mata Pengantin<br>Bahan utama : nata de coco, sirup, selasih</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-indigo-700">Sumatra Selatan:</strong> <br>🍽️ Kue Srikaya<br>Bahan utama : telur, santan, gula<br>☕ Es Kacang Merah<br>Bahan utama : kacang merah, gula</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-indigo-700">Kep. Bangka Belitung:</strong> <br>🍽️ Kemplang<br>Bahan utama : ikan tenggiri, tepung tapioka<br>☕ Es Jeruk Kunci<br>Bahan utama : jeruk kunci</p>
                            </div>
                        </div>
                    </div>
                    <div class="border border-emerald-100 rounded-2xl overflow-hidden mt-4">
                        <div class="bg-emerald-50 p-3 border-b border-emerald-100">
                            <h5 class="font-black text-emerald-800 text-sm flex items-center gap-2"><span class="material-symbols-outlined text-lg">temple_hindu</span> B. Wilayah Jawa</h5>
                        </div>
                        <div class="p-4 space-y-3 bg-white">
                            <div class="grid grid-cols-1 gap-2">
                                <p><strong class="text-emerald-700">DKI Jakarta:</strong> <br>🍽️ Kue Cucur<br>Bahan utama : tepung beras, gula merah<br>☕ Bir Pletok<br>Bahan utama : jahe, serai, kayu secang</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-emerald-700">Jawa Barat:</strong> <br>🍽️ Peuyeum<br>Bahan utama : singkong, ragi<br>☕ Bandrek<br>Bahan utama : jahe, gula aren</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-emerald-700">Jawa Tengah:</strong> <br>🍽️ Getuk<br>Bahan utama : singkong, gula kelapa<br>☕ Wedang Jahe<br>Bahan utama : jahe, gula merah</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-emerald-700">DI Yogyakarta:</strong> <br>🍽️ Kipo<br>Bahan utama : tepung ketan, kelapa<br>☕ Wedang Uwuh<br>Bahan utama : jahe, kayu secang</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-emerald-700">Jawa Timur:</strong> <br>🍽️ Klepon<br>Bahan utama : tepung ketan, gula merah<br>☕ Sinom<br>Bahan utama : daun asam muda, kunyit</p>
                            </div>
                        </div>
                    </div>
                    <div class="border border-amber-100 rounded-2xl overflow-hidden mt-4">
                        <div class="bg-amber-50 p-3 border-b border-amber-100">
                            <h5 class="font-black text-amber-800 text-sm flex items-center gap-2"><span class="material-symbols-outlined text-lg">public</span> C. Wilayah Bali, Sulawesi dan Papua</h5>
                        </div>
                        <div class="p-4 space-y-3 bg-white">
                            <div class="grid grid-cols-1 gap-2">
                                <p><strong class="text-amber-700">Bali:</strong> <br>🍽️ Jaja Laklak<br>Bahan utama : tepung beras, kelapa<br>☕ Es Daluman<br>Bahan utama : cincau hijau</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-amber-700">Sulawesi Utara:</strong> <br>🍽️ Klappertaart<br>Bahan utama : kelapa, susu, telur<br>☕ Sarabba<br>Bahan utama : jahe, gula aren, santan</p>
                                <hr class="border-dashed border-slate-100">
                                <p><strong class="text-amber-700">Papua:</strong> <br>🍽️ Sagu Lempeng<br>Bahan utama : sagu<br>☕ Kopi Papua<br>Bahan utama : biji kopi</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-rose-500 mb-2">nutrition</span>
                    <h4 class="text-lg font-black text-slate-800">Bagian V: Analisis Kandungan Gizi</h4>
                </div>
                <div class="space-y-4 px-2">
                    <div class="overflow-x-auto rounded-xl border border-slate-200">
                        <table class="w-full text-left text-[9px]">
                            <thead class="bg-slate-50 border-b border-slate-200 text-slate-700">
                                <tr>
                                    <th class="p-2 font-black">Asal Wilayah/Provinsi</th>
                                    <th class="p-2 font-black">Bahan Utama</th>
                                    <th class="p-2 font-black">Kandungan Utama Zat Gizi</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-medium text-slate-600">
                                <tr><td class="p-2">Sumatra Utara (Medan)</td><td class="p-2">Kuning telur, santan, tapioka</td><td class="p-2">Energi, lemak, karbohidrat sederhana</td></tr>
                                <tr><td class="p-2">Sumatra Selatan (Palembang)</td><td class="p-2">Kuning telur, santan, gula</td><td class="p-2">Protein (telur), karbohidrat</td></tr>
                                <tr><td class="p-2">Lampung</td><td class="p-2">Kuning telur, mentega, gula</td><td class="p-2">Lemak jenuh, energi tinggi</td></tr>
                                <tr><td class="p-2">Jawa Barat</td><td class="p-2">Tepung beras, santan, kelapa</td><td class="p-2">Karbohidrat, serat (kelapa)</td></tr>
                                <tr><td class="p-2">Jawa Tengah</td><td class="p-2">Singkong, gula jawa</td><td class="p-2">Serat pangan, karbohidrat kompleks</td></tr>
                                <tr><td class="p-2">Yogyakarta</td><td class="p-2">Tepung terigu, kacang hijau</td><td class="p-2">Protein nabati, serat</td></tr>
                                <tr><td class="p-2">Jawa Timur</td><td class="p-2">Tepung beras, kelapa, gula aren</td><td class="p-2">Energi, elektrolit (gula kelapa)</td></tr>
                                <tr><td class="p-2">Bali</td><td class="p-2">Tepung beras, santan</td><td class="p-2">Karbohidrat</td></tr>
                                <tr><td class="p-2">Sulawesi Selatan</td><td class="p-2">Pisang, santan, telur</td><td class="p-2">Kalium (pisang), protein</td></tr>
                                <tr><td class="p-2">Nusa Tenggara Barat</td><td class="p-2">Ubi jalar/singkong, kelapa</td><td class="p-2">Serat, karbohidrat kompleks</td></tr>
                                <tr><td class="p-2">Papua</td><td class="p-2">Pati sagu alami</td><td class="p-2">Karbohidrat kompleks, rendah gluten</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p class="text-[10px] text-slate-500 italic bg-amber-50 p-3 rounded-xl border border-amber-100">Jajanan Nusantara berbasis umbi-umbian (singkong, ubi, sagu) cenderung lebih kaya serat dibandingkan berbasis tepung terigu.</p>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-cyan-500 mb-2">lightbulb</span>
                    <h4 class="text-lg font-black text-slate-800">Bagian VI: Strategi Inovasi</h4>
                </div>
                <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Agar jajanan tradisional lebih sehat, bergizi dan kekinian namun tetap diminati di bazar, diperlukan inovasi di dua sisi:</p>
                    <div class="space-y-3">
                        <div class="p-4 bg-white border-2 border-dashed border-slate-100 rounded-2xl shadow-sm">
                            <p class="text-xs font-black text-cyan-700 uppercase mb-2 flex items-center gap-2"><span class="material-symbols-outlined text-sm">add_moderator</span> Fortifikasi Nutrisi</p>
                            <p class="text-[11px]">Menambahkan sayuran (seperti wortel atau bayam goreng halus) ke isi panada, atau menggunakan puree pisang asli yang lebih banyak untuk Barongko sebagai pengganti pemanis buatan.</p>
                        </div>
                        <div class="p-4 bg-white border-2 border-dashed border-slate-100 rounded-2xl shadow-sm">
                            <p class="text-xs font-black text-emerald-700 uppercase mb-2 flex items-center gap-2"><span class="material-symbols-outlined text-sm">published_with_changes</span> Substitusi Bahan Lebih Sehat</p>
                            <p class="text-[11px]">Mengganti gula pasir dengan gula aren murni yang rendah indeks glikemik, atau menggunakan metode "Air Fryer" untuk jajanan yang biasanya digoreng terendam minyak (deep-fry).</p>
                        </div>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-purple-500 mb-2">storefront</span>
                    <h4 class="text-lg font-black text-slate-800">Bagian VII: Manajemen Bazar</h4>
                </div>
                <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Penjualan di bazar memerlukan perencanaan matang agar produk 'Kuliner Sehat' dilirik pengunjung:</p>
                    <ul class="space-y-2 text-xs">
                        <li class="p-3 bg-slate-50 rounded-xl flex gap-3"><span class="font-bold text-purple-600">01.</span> <strong>Unique Selling Point (USP):</strong> Berikan label jelas bahwa jajanan ini adalah versi sehat (misal: "Klepon Gula Aren Murni - Tanpa Pengawet").</li>
                        <li class="p-3 bg-slate-50 rounded-xl flex gap-3"><span class="font-bold text-purple-600">02.</span> <strong>Visual Display:</strong> Tata stand dengan tema tradisional namun modern (estetika tinggi) untuk menarik perhatian generasi muda.</li>
                        <li class="p-3 bg-slate-50 rounded-xl flex gap-3"><span class="font-bold text-purple-600">03.</span> <strong>Interaksi & Tester:</strong> Sediakan contoh kecil (tester) dan jelaskan manfaat kesehatan dari inovasi yang telah dilakukan.</li>
                    </ul>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-sky-500 mb-2">package_2</span>
                    <h4 class="text-lg font-black text-slate-800">Bagian VIII: Pengemasan & Labeling</h4>
                </div>
                <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Kemasan adalah wajah pertama produk Anda. Untuk produk kuliner sehat, kemasan harus memenuhi tiga kriteria:</p>
                    <div class="bg-sky-50 p-5 rounded-3xl border border-sky-100 space-y-4">
                        <div class="flex gap-3"><span class="text-lg">♻️</span><div><p class="font-bold text-sky-900 text-xs">Keamanan & Keberlanjutan</p><p class="text-[11px] text-sky-700">Gunakan wadah ramah lingkungan (bambu, daun, atau wadah bio-degradable) yang aman bagi makanan.</p></div></div>
                        <div class="flex gap-3"><span class="text-lg">🏷️</span><div><p class="font-bold text-sky-900 text-xs">Informasi Transparan</p><p class="text-[11px] text-sky-700">Cantumkan informasi bahan utama dan manfaat nutrisi pada label untuk meyakinkan pembeli bahwa produk memang sehat.</p></div></div>
                        <div class="flex gap-3"><span class="text-lg">🎨</span><div><p class="font-bold text-sky-900 text-xs">Design Estetik</p><p class="text-[11px] text-sky-700">Gunakan grafis yang menarik yang mencerminkan kualitas premium produk Anda.</p></div></div>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up h-full flex flex-col">
                <div class="flex flex-col items-center text-center mb-4">
                    <span class="material-symbols-outlined text-4xl text-emerald-500 mb-1">edit_document</span>
                    <h4 class="text-lg font-black text-slate-800">Bagian IX: Ringkasan Materi</h4>
                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tuliskan apa yang kamu pelajari hari ini</p>
                </div>
                <div id="materiStatusMsg" class="hidden mb-4 p-3 rounded-2xl text-[11px] font-medium border"></div>
                <div class="flex-1 flex flex-col gap-3">
                    <div class="relative flex-1">
                        <textarea id="summaryArea" oninput="updateWordCount()" class="w-full h-full min-h-[200px] bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none font-medium leading-relaxed" placeholder="Tuliskan ringkasan materi minimal 200 kata..."></textarea>
                        <div class="absolute bottom-3 right-4"><span id="wordCounter" class="text-[10px] font-bold text-slate-400 bg-white/80 backdrop-blur px-2 py-1 rounded-lg border border-slate-100">0 / 200 kata</span></div>
                    </div>
                    <div class="bg-amber-50 p-3 rounded-2xl border border-amber-100/50 flex gap-3">
                        <span class="material-symbols-outlined text-amber-500 text-lg">info</span>
                        <p class="text-[10px] text-amber-700 font-medium leading-relaxed"><b>Penting:</b> Ringkasan ini akan diperiksa oleh Fasilitator. Kamu baru dianggap menyelesaikan materi setelah mendapat review.</p>
                    </div>
                </div>
            </div>`
        ],
        video: [
            { title: "Video Pembelajaran 1", url: "https://www.youtube.com/embed/zNq-rD5FFjM" },
            { title: "Video Pembelajaran 2", url: "https://www.youtube.com/embed/E-Xiiqkuils" },
            { title: "Video Pembelajaran 3", url: "https://www.youtube.com/embed/qAHQVt7LoTA" }
        ],
        asesmen: "assessmentQuestions" // Referensi ke variabel global dari assessment_data.js
    },
    day2: {
        pemantik: [
            "1. Apa kabar kamu hari ini?",
            "2. Dengan perasaan apa kamu datang ke sekolah pagi ini?",
            "3. Hal kecil apa yang membuatmu tersenyum pagi ini?",
            "4. Ada hal kecil yang membuatmu senang hari ini?",
            "5. Ada hal yang ingin kamu ceritakan hari ini?",
            "6. Seberapa siap kamu mengikuti kegiatan kokurikuler hari ini?",
            "7. Apa yang sudah kamu persiapkan hari ini?",
            "8. Apa hal yang paling kamu ingat dari keseruan materi Citra Rasa Jajanan Nusantara kemarin?",
            "9. Kalau hari ini punya satu kata, kata apa itu?",
            "10. Kata-kata apa yang ingin kamu sampaikan untuk fasilitator di kelasmu?"
        ],
        materi: [
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-emerald-500 mb-2">calculate</span>
                    <h4 class="text-lg font-black text-slate-800 uppercase text-center w-full">BAGIAN 1: PENGERTIAN BREAK EVEN POINT (BEP)</h4>
                </div>
                <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Break Even Point (BEP) adalah posisi suatu perusahaan atau bisnis baik dalam bisnis lokal maupun internasional belum memperoleh keuntungan namun tidak juga merugi. BEP dapat diartikan juga sebuah kondisi jumlah pengeluaran yang diperlukan untuk biaya produksi sama dengan jumlah pendapatan yang diterima dari hasil penjualan sehingga perusahaan tidak mengalami laba ataupun rugi. Istilah BEP disebut juga dengan istilah titik impas.</p>
                    <div class="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 shadow-sm">
                        <p class="text-xs text-slate-700">Break even point (BEP) berguna bagi perusahaan untuk menentukan besaran jumlah produksi yang akan dihasilkan dan nilai harga jual barang. Dengan menerapkan analisa BEP, perusahaan dapat melihat laba, kerugian, harga jual, produksi, dan sebagainya yang telah dapat diprediksi sebelumnya, sehingga memudahkan pelaku bisnis untuk menentukan kebijakan perusahaan.</p>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-amber-500 mb-2">analytics</span>
                    <h4 class="text-lg font-black text-slate-800 uppercase text-center w-full">BAGIAN 2: MANFAAT ANALISIS BEP</h4>
                </div>
                <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Dengan melakukan analisis BEP, dapat diperoleh beberapa manfaat yaitu:</p>
                    <div class="bg-amber-50 p-5 rounded-2xl border border-amber-100 shadow-sm">
                        <ul class="space-y-3 text-xs text-slate-700">
                            <li class="flex gap-3 items-start">
                                <span class="flex-shrink-0 size-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-[10px]">a</span>
                                <span>Dapat mengetahui berapa jumlah penjualan minimum yang harus dipertahankan agar perusahaan tidak mengalami kerugian. Jumlah penjualan minimum artinya adalah jumlah produksi paling rendah yang harus dibuat oleh dunia usaha atau industri.</span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="flex-shrink-0 size-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-[10px]">b</span>
                                <span>Dapat menentukan berapa jumlah penjualan yang sebaiknya diperoleh agar mendapatkan keuntungan yang direncanakan.</span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="flex-shrink-0 size-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-[10px]">c</span>
                                <span>Dapat menaksir seberapa tingkat produksi yang harusnya ditetapkan agar mendapat keuntungan.</span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="flex-shrink-0 size-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-[10px]">d</span>
                                <span>Dapat menjaga dan mengukur penjualan serta tingkat produksi yang tidak lebih rendah dari BEP.</span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="flex-shrink-0 size-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-[10px]">e</span>
                                <span>Dapat menganalisis perubahan harga pokok, harga jual, dan besarnya tingkat produksi hasil penjualan.</span>
                            </li>
                            <li class="flex gap-3 items-start">
                                <span class="flex-shrink-0 size-5 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-[10px]">f</span>
                                <span>Sebagai alat perencanaan tingkat produksi dan sekaligus penjualan agar perusahaan tidak mengalami kerugian.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-orange-500 mb-2">sell</span>
                    <h4 class="text-lg font-black text-slate-800 uppercase text-center w-full">BAGIAN 3: STRATEGI MENETAPKAN HARGA JUAL MAKANAN KHAS DAERAH</h4>
                </div>
                <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Menentukan harga jual produk yang paling sesuai dan tepat tidaklah mudah untuk wirausawan yang baru memulai usahanya. Harga jual sangat berkaitan dengan tingkat penjualan dan tingkat keuntungan yang ditetapkan.</p>
                    <div class="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                        <p class="text-xs text-slate-700">Jika menetapkan harga terlalu mahal, dikhawatirkan pelanggan akan tidak jadi membeli produk. Sedangkan jika menjual produk terlalu murah, maka akan menghasilkan laba dengan tingkat yang rendah. Menentukan harga jual yang asal-asalan akan meningkatkan resiko kerugian. Oleh karena itu, ketika akan menetapkan harga jual produk perlu melakukan suatu perhitungan yang matang.</p>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-indigo-500 mb-2">checklist</span>
                    <h4 class="text-lg font-black text-slate-800 uppercase text-center w-full">BAGIAN 4: HAL YANG HARUS DIPERHATIKAN SEBELUM MENENTUKAN HARGA JUAL</h4>
                </div>
                <div class="space-y-4 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Ada beberapa hal yang harus diperhatikan sebelum menentukan harga jual suatu produk:</p>
                    <div class="space-y-3">
                        <div class="relative pl-4 border-l-4 border-indigo-500 bg-indigo-50/50 p-3 rounded-r-xl">
                            <p class="font-black text-indigo-800 text-xs uppercase mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-sm">group</span> a. Pelanggan</p>
                            <p class="text-xs text-slate-700">Pelanggan merupakan prioritas utama dalam usaha makanan khas daerah, jadi pastikan bahwa harga jual yang ditetapkan akan dapat diterima oleh pelanggan. Pelanggan akan dengan senang hati membeli produk yang ditawarkan jika harga yang diberikan terjangkau dan kualitas barang pun berbanding lurus dengan kualitas barang.</p>
                        </div>
                        <div class="relative pl-4 border-l-4 border-red-500 bg-red-50/50 p-3 rounded-r-xl">
                            <p class="font-black text-red-800 text-xs uppercase mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-sm">trending_up</span> b. Pesaing</p>
                            <p class="text-xs text-slate-700">Pastikan bahwa harga jual produk dapat bersaing dengan harga jual produk pesaing. Perhatikan tingkat keuntungan. Jangan mengambil keuntungan yang terlalu besar karena akan menyebabkan harga jual terlalu mahal. Ada baiknya menurunkan tingkat keuntungan sehingga harga yang ditawarkan dapat bersaing dengan harga yang ditetapkan dengan pesaing.</p>
                        </div>
                        <div class="relative pl-4 border-l-4 border-blue-500 bg-blue-50/50 p-3 rounded-r-xl">
                            <p class="font-black text-blue-800 text-xs uppercase mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-sm">payments</span> c. Biaya</p>
                            <p class="text-xs text-slate-700">Pastikan harga jual produk yang ditetapkan dapat menutup biaya-biaya yang telah terjadi. Ini artinya harus benar-benar jeli dan teliti dalam menghitung biaya yang terjadi, pastikan bahwa tidak ada biaya yang tidak dimasukkan dalam perhitungan. Jika saja ada biaya yang tidak terhitung, akan menyebabkan harga yang tidak tepat, sehingga akan berpengaruh terhadap tingkat keuntungan, bahkan akan menyebabkan kerugian.</p>
                        </div>
                        <div class="relative pl-4 border-l-4 border-emerald-500 bg-emerald-50/50 p-3 rounded-r-xl">
                            <p class="font-black text-emerald-800 text-xs uppercase mb-1 flex items-center gap-2"><span class="material-symbols-outlined text-sm">business_center</span> d. Kemanfaatan untuk usaha</p>
                            <p class="text-xs text-slate-700">Harga jual yang ditetapkan dinilai pantas jika harga dapat memberikan keuntungan yang diharapkan. Seandainya saja keuntungan yang diharapkan dapat tercapai, akan mempermudah dalam mengembangkan usaha yang sudah dirintis.</p>
                        </div>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-purple-500 mb-2">calculate</span>
                    <h4 class="text-lg font-black text-slate-800 uppercase text-center w-full">BAGIAN 5: KOMPONEN BEP</h4>
                </div>
                <div class="space-y-6 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    <p>Agar dapat menghitung berapa besar titik impas BEP dibutuhkan beberapa komponen. Terdapat 3 komponen BEP, yaitu:</p>
                    
                    <div class="grid grid-cols-1 gap-4">
                        <!-- Biaya Tetap -->
                        <div class="bg-purple-50 p-4 rounded-2xl border border-purple-100">
                            <h5 class="font-black text-purple-800 text-sm mb-2 flex items-center gap-2">
                                <span class="material-symbols-outlined">domain</span> Biaya Tetap (Fixed Cost)
                            </h5>
                            <p class="text-xs text-slate-700 mb-3">Biaya yang bersifat statis (tetap) pada kapasitas tertentu. Artinya, biaya ini tidak berubah jika barang yang diproduksi mengalami perubahan dalam kapasitas tertentu.</p>
                            <div class="bg-white p-2 rounded-lg border border-purple-100">
                                <p class="text-[10px] font-bold text-purple-600">Contoh:</p>
                                <p class="text-[10px] text-slate-500">Biaya penyusutan, biaya sewa gedung, dan gaji karyawan.</p>
                            </div>
                        </div>

                        <!-- Biaya Variabel -->
                        <div class="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                            <h5 class="font-black text-blue-800 text-sm mb-2 flex items-center gap-2">
                                <span class="material-symbols-outlined">bolt</span> Biaya Variabel (Variable Cost)
                            </h5>
                            <p class="text-xs text-slate-700 mb-3">Biaya yang bersifat dinamis mengikuti jumlah barang diproduksi. Semakin banyak kapasitas produksi maka biaya variabel juga akan meningkat.</p>
                            <div class="bg-white p-2 rounded-lg border border-blue-100">
                                <p class="text-[10px] font-bold text-blue-600">Contoh:</p>
                                <p class="text-[10px] text-slate-500">Biaya bahan baku, biaya listrik.</p>
                            </div>
                        </div>

                        <!-- Harga Jual -->
                        <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                            <h5 class="font-black text-emerald-800 text-sm mb-2 flex items-center gap-2">
                                <span class="material-symbols-outlined">payments</span> Harga Jual (Selling Price)
                            </h5>
                            <p class="text-xs text-slate-700">Satuan harga jual per unit barang atau jasa yang telah diproduksi dan siap dijual oleh perusahaan dengan sudah memperhitungkan berapa harga yang bisa ditentukan dengan target mendapatkan keuntungan.</p>
                        </div>
                    </div>

                    <div class="mt-6">
                        <h5 class="font-black text-slate-800 text-sm mb-3">Penentuan Harga Pokok</h5>
                        <p class="mb-4">Penentuan penghitungan harga pokok menggunakan rumus sebagai berikut:</p>
                        
                        <div class="bg-slate-800 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
                            <div class="absolute top-0 right-0 p-4 opacity-10">
                                <span class="material-symbols-outlined text-6xl">functions</span>
                            </div>
                            <p class="text-center font-black text-lg mb-4 tracking-wider border-b border-slate-600 pb-4">Harga Pokok = VC + FC/TS</p>
                            <div class="space-y-2 text-xs font-mono text-slate-300">
                                <p><strong class="text-emerald-400">VC</strong> = Variable Cost (Biaya Variabel)</p>
                                <p><strong class="text-purple-400">FC</strong> = Fixed Cost (Biaya Tetap)</p>
                                <p><strong class="text-blue-400">TS</strong> = Total Sales (Total Penjualan)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up">
                <div class="flex flex-col items-center text-center mb-6">
                    <span class="material-symbols-outlined text-5xl text-blue-600 mb-2">calculate</span>
                    <h4 class="text-lg font-black text-slate-800 uppercase text-center w-full">BAGIAN 6: CARA MENGHITUNG BREAK EVEN POINT (BEP)</h4>
                </div>
                <div class="space-y-6 text-sm text-slate-600 leading-relaxed font-medium text-justify">
                    
                    <div class="bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
                        <h5 class="font-black text-indigo-800 text-xs uppercase mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined text-sm">rule</span> Ketentuan Menghitung BEP
                        </h5>
                        <ul class="space-y-2 text-xs text-slate-700 list-disc ml-4 marker:text-indigo-400">
                            <li><b>Harga jual produk harus tetap.</b></li>
                            <li><b>Hanya menggunakan satu jenis produk.</b> Jika lebih dari satu, gunakan analisis BEP tersendiri.</li>
                            <li><b>Produksi harus stabil.</b></li>
                            <li><b>Semua biaya produksi</b> dapat diukur secara nyata (fakta) dan data yang realistik.</li>
                        </ul>
                    </div>

                    <p class="font-bold text-center text-slate-800">Terdapat dua perhitungan BEP, yaitu:</p>

                    <div class="grid grid-cols-1 gap-4">
                        <!-- BEP Unit -->
                        <div class="bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm">
                            <h5 class="font-black text-slate-800 text-sm mb-2 flex items-center gap-2">
                                <span class="size-6 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">1</span>
                                BEP Unit
                            </h5>
                            <p class="text-xs text-slate-500 mb-4">
                                Data jumlah unit produk yang harus dicapai pada titik impas. 
                                <br><span class="text-red-500">Di bawah BEP = Rugi</span>. 
                                <br><span class="text-emerald-500">Di atas BEP = Untung</span>.
                            </p>
                            
                            <div class="bg-slate-800 text-white p-4 rounded-xl text-center relative overflow-hidden mb-3">
                                <p class="font-mono text-sm font-bold tracking-wider">BEP = FC / (P - VC)</p>
                            </div>
                            
                            <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p class="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Keterangan:</p>
                                <div class="grid grid-cols-1 gap-1 text-[10px] text-slate-600 font-mono">
                                    <p><span class="font-bold text-slate-800">FC</span> : Fixed Cost (Biaya Tetap)</p>
                                    <p><span class="font-bold text-slate-800">VC</span> : Variable Cost (Biaya Variabel)</p>
                                    <p><span class="font-bold text-slate-800">P</span>  : Price per unit (Harga per unit)</p>
                                </div>
                            </div>
                        </div>

                        <!-- BEP Rupiah -->
                        <div class="bg-white p-5 rounded-2xl border-2 border-slate-100 shadow-sm">
                            <h5 class="font-black text-slate-800 text-sm mb-2 flex items-center gap-2">
                                <span class="size-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs">2</span>
                                BEP Rupiah
                            </h5>
                            <p class="text-xs text-slate-500 mb-4">
                                Data jumlah penjualan (rupiah) yang harus dicapai pada titik impas. 
                            </p>
                            
                            <div class="bg-slate-800 text-white p-4 rounded-xl text-center relative overflow-hidden mb-3">
                                <p class="font-mono text-sm font-bold tracking-wider mb-1">BEP = FC / (1 - (VC / P))</p>
                            </div>
                            
                            <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p class="text-[10px] font-bold text-slate-400 mb-1 uppercase tracking-widest">Keterangan:</p>
                                <div class="grid grid-cols-1 gap-1 text-[10px] text-slate-600 font-mono">
                                    <p><span class="font-bold text-slate-800">FC</span> : Fixed Cost (Biaya Tetap)</p>
                                    <p><span class="font-bold text-slate-800">VC</span> : Variable Cost (Biaya Variabel)</p>
                                    <p><span class="font-bold text-slate-800">P</span>  : Price per unit (Harga per unit)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
            `<div class="animate-slide-up h-full flex flex-col">
                <div class="flex flex-col items-center text-center mb-4">
                    <span class="material-symbols-outlined text-4xl text-emerald-500 mb-1">edit_document</span>
                    <h4 class="text-lg font-black text-slate-800">Bagian 7: Ringkasan Materi</h4>
                    <p class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Tuliskan apa yang kamu pelajari hari ini</p>
                </div>
                <div id="materiStatusMsg" class="hidden mb-4 p-3 rounded-2xl text-[11px] font-medium border"></div>
                <div class="flex-1 flex flex-col gap-3">
                    <div class="relative flex-1">
                        <textarea id="summaryArea" oninput="updateWordCount()" class="w-full h-full min-h-[200px] bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all resize-none font-medium leading-relaxed" placeholder="Tuliskan ringkasan materi minimal 200 kata..."></textarea>
                        <div class="absolute bottom-3 right-4"><span id="wordCounter" class="text-[10px] font-bold text-slate-400 bg-white/80 backdrop-blur px-2 py-1 rounded-lg border border-slate-100">0 / 200 kata</span></div>
                    </div>
                    <div class="bg-amber-50 p-3 rounded-2xl border border-amber-100/50 flex gap-3">
                        <span class="material-symbols-outlined text-amber-500 text-lg">info</span>
                        <p class="text-[10px] text-amber-700 font-medium leading-relaxed"><b>Penting:</b> Ringkasan ini akan diperiksa oleh Fasilitator. Kamu baru dianggap menyelesaikan materi setelah mendapat review.</p>
                    </div>
                </div>
            </div>`
        ],
        video: [],
        asesmen: []
    },
    day3: {
        pemantik: ["Materi Hari 3 Belum Tersedia"],
        materi: [
            `<div class="animate-slide-up flex flex-col items-center justify-center py-20 opacity-50">
                <span class="material-symbols-outlined text-6xl mb-4">construction</span>
                <p class="font-black text-slate-400 uppercase tracking-widest">Materi Hari 3 Belum Tersedia</p>
            </div>`
        ],
        video: [],
        asesmen: []
    }
};

window.workshopContent = workshopContent;

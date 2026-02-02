const assessmentQuestions = [
    {
        id: 1,
        question: "Apa definisi yang paling tepat mengenai Jajanan Nusantara?",
        options: ["Makanan ringan yang diimpor dari luar negeri", "Makanan instan yang dijual di minimarket modern", "Penganan tradisional asli Indonesia yang lahir dari kreativitas masyarakat mengolah sumber daya lokal", "Makanan berat yang dikonsumsi sebagai menu utama sehari-hari", "Minuman kemasan yang diproses menggunakan teknologi canggih"],
        correctIndex: 2
    },
    {
        id: 2,
        question: "Manakah di bawah ini yang bukan merupakan karakteristik umum Jajanan Nusantara?",
        options: ["Memiliki porsi kecil (bite-sized)", "Harganya relatif terjangkau", "Menggunakan bahan alami tanpa pengawet buatan", "Menggunakan bahan pengawet kimia agar tahan lama", "Sering dibungkus menggunakan daun pisang"],
        correctIndex: 3
    },
    {
        id: 3,
        question: "Bahan dasar utama yang sering digunakan dalam Jajanan Nusantara adalah...",
        options: ["Gandum dan Barley", "Keju dan Susu UHT", "Beras, Ketan, Singkong, dan Kelapa", "Daging sapi impor", "Sayuran hidroponik"],
        correctIndex: 2
    },
    {
        id: 4,
        question: "Fungsi pewarna alami dari tumbuhan dalam jajanan pasar, selain memberikan warna, juga berfungsi untuk...",
        options: ["Mengawetkan makanan", "Memberikan aroma khas (misal: pandan)", "Mengenyalkan tekstur", "Menambah rasa pedas", "Mengganti fungsi gula"],
        correctIndex: 1
    },
    {
        id: 5,
        question: "Mengapa jajanan tradisional sering disebut memiliki nilai ekonomis?",
        options: ["Karena bahan bakunya mudah didapat di lingkungan sekitar sehingga harganya terjangkau", "Karena dijual dengan harga sangat mahal di hotel berbintang", "Karena menggunakan bahan impor yang pajaknya tinggi", "Karena proses pembuatannya menggunakan mesin pabrik yang mahal", "Karena hanya bisa dibeli oleh kalangan atas"],
        correctIndex: 0
    },
    {
        id: 6,
        question: "Kapan pengaruh budaya Tionghoa mulai masuk dan mempengaruhi kuliner Nusantara secara signifikan?",
        options: ["Abad ke-19 (Era Kolonial)", "Era Kemerdekaan", "Abad ke-7", "Era Reformasi", "Zaman Prasejarah"],
        correctIndex: 2
    },
    {
        id: 7,
        question: "Teknik pengolahan makanan apa yang diperkenalkan oleh budaya Tionghoa?",
        options: ["Memanggang dengan oven", "Fermentasi keju", "Menggoreng dan penggunaan tepung", "Marinasi daging steak", "Pengasapan ikan"],
        correctIndex: 2
    },
    {
        id: 8,
        question: "Banyak istilah 'Kue' dalam bahasa Indonesia berasal dari serapan bahasa...",
        options: ["Sanskerta", "Hokkien (Bak-Kue)", "Belanda", "Portugis", "Arab"],
        correctIndex: 1
    },
    {
        id: 9,
        question: "Pengaruh budaya Eropa (Kolonial) dalam Jajanan Nusantara terlihat pada penggunaan bahan...",
        options: ["Santan dan Gula Aren", "Tepung Beras dan Ketan", "Mentega, Susu, dan Telur", "Kecap dan Tahu", "Rempah-rempah pedas"],
        correctIndex: 2
    },
    {
        id: 10,
        question: "Teknik memasak apa yang diadaptasi dari pengaruh Kolonial Eropa?",
        options: ["Mengukus (Steaming)", "Menyangrai", "Memanggang (Baking/Oven)", "Merebus", "Membakar di atas arang"],
        correctIndex: 2
    },
    {
        id: 11,
        question: "Teknik memasak menggunakan uap air panas disebut...",
        options: ["Boiling", "Frying", "Steaming (Mengukus)", "Roasting", "Toasting"],
        correctIndex: 2
    },
    {
        id: 12,
        question: "Apa kelebihan utama dari teknik mengukus (steaming)?",
        options: ["Menghasilkan tekstur yang sangat garing", "Mempertahankan kandungan gizi karena tidak bersentuhan langsung dengan air", "Memberikan aroma asap yang kuat", "Membuat makanan tahan bertahun-tahun", "Menambah kadar lemak jenuh"],
        correctIndex: 1
    },
    {
        id: 13,
        question: "Contoh jajanan yang diolah dengan teknik merebus (boiling) adalah...",
        options: ["Klepon dan Cenil", "Lemper Bakar", "Pastel", "Bolu Panggang", "Kemplang"],
        correctIndex: 0
    },
    {
        id: 14,
        question: "Teknik memasak bahan tanpa minyak untuk mendapatkan aroma kuat (misal pada kacang atau kelapa) disebut...",
        options: ["Deep Frying", "Menyangrai (Pan-Toasting)", "Blanching", "Sautéing", "Steaming"],
        correctIndex: 1
    },
    {
        id: 15,
        question: "Manakah di bawah ini yang merupakan contoh inovasi teknik pengolahan modern?",
        options: ["Membakar dengan arang batok kelapa", "Mengukus dengan dandang", "Menggunakan Air Fryer untuk mengurangi penggunaan minyak", "Menjemur di bawah sinar matahari", "Menumbuk dengan lesung batu"],
        correctIndex: 2
    },
    {
        id: 16,
        question: "Blending atau Puree sering digunakan dalam inovasi jajanan sehat untuk...",
        options: ["Mengawetkan makanan secara kimia", "Menghaluskan buah/sayur sebagai pewarna atau penambah nutrisi alami", "Mengganti tepung terigu sepenuhnya", "Membuat tekstur menjadi sangat keras", "Memisahkan minyak dari santan"],
        correctIndex: 1
    },
    {
        id: 17,
        question: "Wilayah Sumatra dikenal dengan karakteristik rasa jajanan yang...",
        options: ["Sangat manis dan ringan", "Hambar dan fokus pada tekstur", "Kuat, bersantan, dan kaya rempah", "Asam dan pedas saja", "Pahit dan berkhasiat obat"],
        correctIndex: 2
    },
    {
        id: 18,
        question: "Jajanan khas Aceh yang terbuat dari tepung ketan dengan isian srikaya/pisang adalah...",
        options: ["Timphan", "Bika Ambon", "Lapis Legit", "Lumpia", "Bakpia"],
        correctIndex: 0
    },
    {
        id: 19,
        question: "Bika Ambon adalah jajanan khas dari daerah...",
        options: ["Ambon, Maluku", "Medan, Sumatra Utara", "Padang, Sumatra Barat", "Palembang, Sumatra Selatan", "Bandung, Jawa Barat"],
        correctIndex: 1
    },
    {
        id: 20,
        question: "Bahan utama minuman 'Teh Talua' khas Sumatra Barat adalah...",
        options: ["Teh dan Jeruk Nipis", "Teh, Telur Ayam/Bebek, dan Gula", "Teh dan Santan", "Teh dan Jahe", "Teh dan Cincau"],
        correctIndex: 1
    },
    {
        id: 21,
        question: "Kemplang adalah kerupuk ikan khas dari...",
        options: ["Riau", "Lampung", "Kepulauan Bangka Belitung", "Jambi", "Bengkulu"],
        correctIndex: 2
    },
    {
        id: 22,
        question: "Ciri khas rasa jajanan dari Pulau Jawa (khususnya Jawa Tengah dan Jogja) adalah...",
        options: ["Sangat pedas", "Asin dan gurih", "Dominan manis (gula merah/Jawa)", "Masam segar", "Pahit"],
        correctIndex: 2
    },
    {
        id: 23,
        question: "'Peuyeum' adalah olahan fermentasi singkong yang berasal dari...",
        options: ["Jawa Barat", "Jawa Timur", "Betawi", "Madura", "Banten"],
        correctIndex: 0
    },
    {
        id: 24,
        question: "Minuman khas Betawi (Jakarta) yang terbuat dari jahe, serai, dan kayu secang (tanpa alkohol) adalah...",
        options: ["Bir Bintang", "Es Doger", "Bir Pletok", "Bajigur", "Sekoteng"],
        correctIndex: 2
    },
    {
        id: 25,
        question: "Getuk adalah jajanan berbahan dasar singkong yang populer di...",
        options: ["Jawa Barat", "Jawa Tengah", "Bali", "Sumatra Utara", "Kalimantan Barat"],
        correctIndex: 1
    },
    {
        id: 26,
        question: "Jajanan 'Klappertaart' yang mendapat pengaruh Belanda sangat populer di daerah...",
        options: ["Minahasa (Manado), Sulawesi Utara", "Makassar, Sulawesi Selatan", "Denpasar, Bali", "Pontianak, Kalimantan Barat", "Jayapura, Papua"],
        correctIndex: 0
    },
    {
        id: 27,
        question: "'Sagu Lempeng' merupakan makanan khas dari...",
        options: ["Maluku", "Papua", "NTT", "NTB", "Sulawesi Tenggara"],
        correctIndex: 1
    },
    {
        id: 28,
        question: "Bahan utama dari jajanan 'Jaja Laklak' khas Bali adalah...",
        options: ["Tepung Terigu", "Tepung Beras", "Tepung Jagung", "Ubi Jalar", "Kentang"],
        correctIndex: 1
    },
    {
        id: 29,
        question: "Jajanan berbasis umbi-umbian (singkong, ubi) umumnya lebih unggul daripada berbasis tepung terigu karena...",
        options: ["Lebih banyak mengandung gluten", "Lebih kaya akan serat pangan", "Lebih banyak mengandung lemak jenuh", "Lebih cepat basi", "Rasanya lebih manis"],
        correctIndex: 1
    },
    {
        id: 30,
        question: "Kandungan gizi utama pada 'Kuning Telur' yang sering dipakai pada kue-kue Palembang/Lampung adalah...",
        options: ["Serat tinggi", "Vitamin C", "Protein dan Lemak", "Karbohidrat kompleks", "Air"],
        correctIndex: 2
    },
    {
        id: 31,
        question: "Pisang merupakan sumber mineral penting, yaitu...",
        options: ["Kalium", "Natrium", "Kalsium karbonat", "Mercuri", "Timbal"],
        correctIndex: 0
    },
    {
        id: 32,
        question: "Gula aren memiliki kelebihan dibandingkan gula pasir putih, yaitu...",
        options: ["Rasanya kurang manis", "Harganya sangat murah", "Indeks Glikemik lebih rendah (lebih aman untuk gula darah)", "Berwarna putih bersih", "Tidak mengandung kalori"],
        correctIndex: 2
    },
    {
        id: 33,
        question: "Apa yang dimaksud dengan 'Fortifikasi Nutrisi' dalam inovasi jajanan?",
        options: ["Mengurangi porsi makanan", "Menambahkan nilai gizi (seperti sayur/buah) ke dalam makanan", "Mengganti kemasan menjadi plastik", "Memasak dengan suhu sangat tinggi", "Memberikan diskon harga"],
        correctIndex: 1
    },
    {
        id: 34,
        question: "Salah satu contoh inovasi substitusi bahan yang lebih sehat adalah...",
        options: ["Mengganti gula aren dengan pemanis buatan aspartam", "Mengganti pewarna daun suji dengan pewarna tekstil", "Mengganti penggorengan deep-fry dengan metode Air Fryer", "Menggunakan santan instan yang banyak pengawet", "Menambah MSG yang banyak"],
        correctIndex: 2
    },
    {
        id: 35,
        question: "Mengapa puree pisang bisa digunakan sebagai pengganti gula/pemanis?",
        options: ["Karena pisang rasanya asin", "Karena pisang memiliki rasa manis alami dan memberikan tekstur lembut", "Karena pisang mengandung pewarna merah", "Karena pisang menyerap minyak", "Karena pisang membuat kue menjadi keras"],
        correctIndex: 1
    },
    {
        id: 36,
        question: "Apa arti dari USP dalam strategi penjualan?",
        options: ["Unique Selling Point (Keunikan produk yang membedakan dari pesaing)", "Unit Sales Price (Harga satuan)", "Universal Standard Product", "Usual Selling Place", "Under Standard Procedure"],
        correctIndex: 0
    },
    {
        id: 37,
        question: "Salah satu contoh USP untuk produk inovasi jajanan sehat adalah...",
        options: ["Dijual apa adanya", "Rasa biasa saja", "Klepon Gula Aren Murni - Tanpa Pengawet & Pewarna Buatan", "Jajanan Murah Meriah Tapi Tidak Sehat", "Kue Mengandung Banyak Minyak"],
        correctIndex: 2
    },
    {
        id: 38,
        question: "Dalam menata stand bazar, 'Visual Display' yang baik bertujuan untuk...",
        options: ["Menutupi produk agar tidak terlihat", "Membuat pengunjung bingung", "Menarik perhatian pengunjung (terutama anak muda) dengan estetika", "Menyimpan stok barang di meja depan", "Mempersulit pembeli mengambil barang"],
        correctIndex: 2
    },
    {
        id: 39,
        question: "Pentingnya menyediakan 'Tester' di stand bazar adalah...",
        options: ["Agar pedagang bisa makan sendiri", "Untuk menghabiskan stok sisa kemarin", "Memberikan pengalaman langsung dan meyakinkan pembeli akan rasa produk", "Agar stand terlihat penuh", "Sebagai hiasan meja saja"],
        correctIndex: 2
    },
    {
        id: 40,
        question: "Tiga kriteria utama kemasan produk kuliner sehat adalah...",
        options: ["Mahal, Mewah, Impor", "Keamanan & Keberlanjutan, Informasi Transparan, Desain Estetik", "Plastik Tebal, Berwarna Gelap, Tanpa Label", "Sterofoam, Karet Gelang, Kertas Koran", "Transparan, Tipis, Tanpa Merk"],
        correctIndex: 1
    },
    {
        id: 41,
        question: "Contoh wadah ramah lingkungan (sustainable) adalah...",
        options: ["Kantong kresek hitam", "Styrofoam putih", "Besek bambu atau daun pisang", "Botol plastik sekali pakai", "Aluminium foil berlapis plastik"],
        correctIndex: 2
    },
    {
        id: 42,
        question: "Mengapa label 'Informasi Nilai Gizi' atau bahan utama penting dicantumkan?",
        options: ["Agar terlihat keren saja", "Untuk transparansi dan meyakinkan konsumen bahwa produk tersebut sehat", "Untuk meniru produk pabrik", "Agar harga bisa dinaikkan sembarangan", "Supaya kemasan terlihat penuh tulisan"],
        correctIndex: 1
    },
    {
        id: 43,
        question: "Jika kamu ingin membuat 'Nagasari' yang lebih modern dan sehat, inovasi apa yang paling tepat?",
        options: ["Mengganti pisang dengan permen", "Menggoreng Nagasari dengan minyak jelantah", "Menambahkan puree labu kuning ke adonan tepung untuk menambah serat & warna", "Membungkusnya dengan plastik, bukan daun pisang", "Menghilangkan santan dan menggantinya dengan air soda"],
        correctIndex: 2
    },
    {
        id: 44,
        question: "Jajanan 'Barongko' dari Makassar lazimnya dibungkus menggunakan...",
        options: ["Kulit Jagung", "Daun Pisang", "Daun Jati", "Plastik bening", "Aluminium foil"],
        correctIndex: 1
    },
    {
        id: 45,
        question: "Manakah pasangan asal daerah dan makanan yang SALAH?",
        options: ["Yogyakarta - Bakpia", "Palembang - Pempek/Srikaya", "Bali - Pie Susu/Laklak", "Papua - Bika Ambon", "Jakarta - Kerak Telor/Cucur"],
        correctIndex: 3
    },
    {
        id: 46,
        question: "Kelebihan singkong sebagai sumber karbohidrat dibandingkan nasi putih adalah...",
        options: ["Singkong lebih mahal", "Singkong indeks glikemiknya lebih tinggi", "Singkong memiliki indeks glikemik lebih rendah dan serat lebih tinggi", "Singkong tidak mengenyangkan", "Singkong sulit diolah"],
        correctIndex: 2
    },
    {
        id: 47,
        question: "Teknik 'Au Bain Marie' (Mengetim) mirip dengan teknik tradisional...",
        options: ["Membakar", "Menggoreng", "Mengukus", "Menyangrai", "Menjemur"],
        correctIndex: 2
    },
    {
        id: 48,
        question: "Dalam manajemen bazar, bagaimana cara terbaik menghadapi calon pembeli yang ragu dengan rasa 'kue sehat'?",
        options: ["Memarahi pembeli", "Mengatakan 'Beli saja dulu baru tahu rasanya'", "Menawarkan tester gratis sambil menjelaskan manfaat bahannya", "Memberikan diskon 90%", "Mengusir secara halus"],
        correctIndex: 2
    },
    {
        id: 49,
        question: "Warna hijau alami pada kue Klepon atau Dadar Gulung biasanya didapat dari...",
        options: ["Daun Suji dan Pandan", "Daun Jeruk", "Pewarna Tekstil Hijau", "Bayam Merah", "Rumput Laut"],
        correctIndex: 0
    },
    {
        id: 50,
        question: "Esensi utama dari 'Modifikasi Jajanan Tradisional' adalah...",
        options: ["Mengubah total rasa aslinya hingga tidak dikenali", "Mengganti nama makanan menjadi bahasa Inggris", "Meningkatkan nilai gizi/tampilan/daya simpan tanpa menghilangkan jati diri tradisionalnya", "Membuat makanan menjadi sangat mahal", "Menghilangkan bahan lokal dan mengganti dengan impor"],
        correctIndex: 2
    }
];

// Global export for ease of use in both creating pages and existing scripts
window.assessmentQuestions = assessmentQuestions;

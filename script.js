// Variabel global penampung grafik Chart.js agar tidak terjadi error tumpang tindih visual
let instanceChartMata = null;

// Fungsi Alur Navigasi Tampilan
function mulaiTes() {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('diagnosa-section').style.display = 'block';
}

function kembaliKeHome() {
    document.getElementById('hasil-section').style.display = 'none';
    document.getElementById('home-section').style.display = 'block';
    loadStatistik(); // Render ulang grafik berwarna di Beranda dengan data terbaru
}

// Fungsi Inti Memproses Input & Aturan Aturan Aturan Diagnosa
function hitungDiagnosa() {
    const nama = document.getElementById('namaPasien').value;
    if (!nama.trim()) {
        alert("Mohon masukkan nama lengkap pasien terlebih dahulu!");
        return;
    }

    // Mengambil nilai angka dari tiap dropdown pilhan pasien
    const e1 = parseFloat(document.getElementById('E1').value);
    const e2 = parseFloat(document.getElementById('E2').value);
    const e3 = parseFloat(document.getElementById('E3').value);
    const e4 = parseFloat(document.getElementById('E4').value);
    const e7 = parseFloat(document.getElementById('E7').value);
    const e12 = parseFloat(document.getElementById('E12').value);
    const e14 = parseFloat(document.getElementById('E14').value);
    const e22 = parseFloat(document.getElementById('E22').value);

    // Boolean status: dianggap bergejala (true) jika pasien memilih selain "Tidak" (> 0)
    const isE1 = e1 > 0;
    const isE2 = e2 > 0;
    const isE3 = e3 > 0;
    const isE4 = e4 > 0;
    const isE7 = e7 > 0;
    const isE12 = e12 > 0;
    const isE14 = e14 > 0;
    const isE22 = e22 > 0;

    let diagnosis = "Tidak Diketahui";
    let nilaiPersentase = 0;

    // MENGEVALUASI INTEGRASI ATURAN RULE (IF-THEN JURNAL + REVISI)
    if ((isE2 && isE4) || (isE3 && isE4)) {
        diagnosis = "Katarak";
        let gejalaAktif = [e4];
        if (isE2) gejalaAktif.push(e2);
        if (isE3) gejalaAktif.push(e3);
        nilaiPersentase = (gejalaAktif.reduce((a,b) => a+b, 0) / gejalaAktif.length) * 100;
    } 
    else if ((isE7 && isE12) || (isE1 && isE7)) {
        diagnosis = "Keratitis";
        let gejalaAktif = [e7];
        if (isE12) gejalaAktif.push(e12);
        if (isE1) gejalaAktif.push(e1);
        nilaiPersentase = (gejalaAktif.reduce((a,b) => a+b, 0) / gejalaAktif.length) * 100;
    } 
    else if (isE14) { // Mencakup aturan IF E14 maupun IF E14 AND E12
        diagnosis = "Hordiolum";
        let gejalaAktif = [e14];
        if (isE12) gejalaAktif.push(e12);
        nilaiPersentase = (gejalaAktif.reduce((a,b) => a+b, 0) / gejalaAktif.length) * 100;
    } 
    else if (isE22) { // Mencakup aturan IF E22 maupun IF E22 AND E1
        diagnosis = "Glaukoma";
        let gejalaAktif = [e22];
        if (isE1) gejalaAktif.push(e1);
        nilaiPersentase = (gejalaAktif.reduce((a,b) => a+b, 0) / gejalaAktif.length) * 100;
    } 
    else if (isE7) { // Mencakup aturan IF E7 dan IF E7 AND ringan
        diagnosis = "Konjungtiva";
        nilaiPersentase = e7 * 100;
    } 
    else {
        diagnosis = "Tidak ada gejala dominan terdeteksi";
        nilaiPersentase = 0;
    }

    // DATABASE TINDAKAN & CARA MENGOBATI (Berdasarkan Referensi Alodokter & Halodoc)
    const databasePengobatan = {
        "Katarak": `<ul>
                        <li><strong>Tindakan Operasi Katarak:</strong> Merupakan satu-satunya metode paling ampuh dan efektif untuk menyembuhkan katarak total. Lensa alami mata yang telah keruh diangkat dan diganti secara permanen dengan lensa buatan intraokular (IOL) jernih.</li>
                        <li><strong>Perawatan Awal Ringan:</strong> Pada katarak stadium awal, gejala penglihatan buram dapat dibantu sementara dengan pencahayaan ruangan yang lebih terang saat membaca atau menggunakan ukuran lensa kacamata terbaru.</li>
                    </ul>`,
        "Keratitis": `<ul>
                        <li><strong>Pengobatan Obat Resep Dokter:</strong> Wajib ditangani medis secepatnya menggunakan obat tetes atau obat minum antibiotik (jika infeksi bakteri), antivirus (jika infeksi virus herpes), atau antijamur.</li>
                        <li><strong>Langkah Pendukung Penting:</strong> Lepas dan stop penggunaan lensa kontak (softlens) sepenuhnya sampai mata sembuh total. Gunakan kacamata hitam pelindung untuk mengurangi rasa silau di luar ruangan, serta jangan mengucek mata.</li>
                    </ul>`,
        "Hordiolum": `<ul>
                        <li><strong>Kompres Air Hangat:</strong> Rendam kain kasa bersih di air hangat, peras basah, lalu letakkan di kelopak mata yang benjol selama 5-10 menit dilakukan rutin 3-4 kali sehari. Ini mempercepat kelenjar minyak menyumbat terbuka secara alami.</li>
                        <li><strong>Jaga Kebersihan Area Kelopak:</strong> Bersihkan mata secara higienis menggunakan sabun bayi lembut. Dilarang keras memencet, menekan, atau menusuk jarum ke benjolan bintitan karena berisiko menyebarkan infeksi parah.</li>
                        <li><strong>Salep Medis Antibiotik:</strong> Jika benjolan membesar memerah dalam beberapa hari, konsultasikan ke dokter untuk diresepkan salep antibiotik mata khusus.</li>
                    </ul>`,
        "Konjungtiva": `<ul>
                        <li><strong>Kompres Air Dingin:</strong> Redakan pembengkakan kelopak mata merah serta sensasi mengganjal perih menggunakan kompres kain lembap air dingin steril.</li>
                        <li><strong>Tetes Air Mata Buatan (Artificial Tears):</strong> Gunakan cairan pelumas tetes mata buatan bebas di apotek untuk membilas zat alergen, membersihkan kotoran mata, dan meredakan iritasi kering.</li>
                        <li><strong>Cegah Penularan:</strong> Hindari mengucek mata, rajin mencuci tangan dengan sabun, dan pisahkan penggunaan handuk muka dari anggota keluarga lain agar tidak menularkan virus.</li>
                    </ul>`,
        "Glaukoma": `<ul>
                        <li><strong>Obat Tetes Mata Glaukoma Khusus:</strong> Menggunakan obat tetes mata resep dari dokter spesialis (seperti timolol atau analog prostaglandin) secara disiplin tanpa putus guna menurunkan tekanan tinggi bola mata (TIO) dan menjaga kerusakan saraf optik.</li>
                        <li><strong>Terapi Bedah Laser & Operasi:</strong> Apabila tekanan bola mata tetap tidak turun dengan obat biasa, dokter akan merekomendasikan terapi sinar laser (trabekuloplasti) atau operasi bedah (trabekulektomi) guna menciptakan saluran pembuangan cairan mata baru. Kerusakan mata glaukoma bersifat permanen, sehingga pemantauan dokter seumur hidup sangat penting.</li>
                    </ul>`,
        "Tidak ada gejala dominan terdeteksi": `<p>Hasil kombinasi jawaban kuesioner Anda belum mengarah kuat pada lima penyakit mata utama pada sistem. Segera kunjungi dokter spesialis mata terdekat untuk melakukan tes fisik langsung secara klinis.</p>`
    };

    // Tampilkan Data Ke Layar Hasil
    document.getElementById('diagnosa-section').style.display = 'none';
    document.getElementById('hasil-section').style.display = 'block';
    
    document.getElementById('hasilNama').innerText = nama;
    document.getElementById('hasilPenyakit').innerText = diagnosis;
    document.getElementById('hasilPersentase').innerText = nilaiPersentase.toFixed(1);
    document.getElementById('hasilPengobatan').innerHTML = databasePengobatan[diagnosis];

    // Simpan hasil ke memori lokal jika berhasil mendiagnosis penyakit nyata
    if (diagnosis !== "Tidak ada gejala dominan terdeteksi") {
        simpanKeMemoriLokal(diagnosis);
    }
}

// Fungsi Menyimpan Data Pasien ke LocalStorage Browser
function simpanKeMemoriLokal(penyakit) {
    let dataSurvei = JSON.parse(localStorage.getItem('surveiMata')) || {
        "Katarak": 0, "Keratitis": 0, "Hordiolum": 0, "Konjungtiva": 0, "Glaukoma": 0
    };
    dataSurvei[penyakit] = (dataSurvei[penyakit] || 0) + 1;
    localStorage.setItem('surveiMata', JSON.stringify(dataSurvei));
}

// REVISI BARU: Menggambar Grafik Batang Berwarna-warni Menggunakan Chart.js
function loadStatistik() {
    let dataSurvei = JSON.parse(localStorage.getItem('surveiMata')) || {
        "Katarak": 0, "Keratitis": 0, "Hordiolum": 0, "Konjungtiva": 0, "Glaukoma": 0
    };

    const ctx = document.getElementById('chartStatistik').getContext('2d');
    
    // Hancurkan grafik lama jika ada agar objek canvas bersih saat digambar ulang
    if (instanceChartMata) {
        instanceChartMata.destroy();
    }

    // Membuat Inisialisasi Grafik Batang (Bar Chart) Berwarna-warni
    instanceChartMata = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(dataSurvei),
            datasets: [{
                label: 'Jumlah Pasien Mengikuti Survei',
                data: Object.values(dataSurvei),
                // REVISI: Mengatur variasi warna unik untuk tiap penyakit agar estetis
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',   // Katarak (Merah/Pink Tua)
                    'rgba(54, 162, 235, 0.8)',   // Keratitis (Biru Cerah)
                    'rgba(255, 206, 86, 0.8)',   // Hordiolum (Kuning Terang)
                    'rgba(75, 192, 192, 0.8)',   // Konjungtiva (Hijau Tosca)
                    'rgba(153, 102, 255, 0.8)'   // Glaukoma (Ungu Elegan)
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1.5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false } // Menyembunyikan kotak keterangan label di atas agar grafik bersih
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1 // Skala angka melompat bilangan bulat per 1 pasien
                    }
                }
            }
        }
    });
}

// Menjalankan fungsi muat grafik otomatis saat web pertama kali diakses
window.onload = loadStatistik;

// Fungsi Mengunduh Lembar Hasil Cetak PDF
function downloadPDF() {
    const element = document.getElementById('area-cetak');
    const nama = document.getElementById('hasilNama').innerText;
    
    const opt = {
      margin:       0.4,
      filename:     `Hasil_Diagnosa_Mata_${nama}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
}
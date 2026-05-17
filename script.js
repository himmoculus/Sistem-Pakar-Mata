// DATA KNOWLEDGE BASE DARI JURNAL PENELITIAN TEOREMA BAYES
const penyakitData = {
    'H1': { nama: 'Katarak', prior: 0.5, desc: 'Kondisi kekeruhan pada lensa mata yang menyebabkan menurunnya kemampuan penglihatan secara bertahap sampai menyerupai kabut.', solusi: 'Disarankan untuk berkonsultasi dengan spesialis mata guna perencanaan tindakan bedah mikro (operasi katarak) ekstraksi lensa.' },
    'H2': { nama: 'Keratitis', prior: 0.2, desc: 'Peradangan atau inflamasi pada kornea mata yang dipicu oleh infeksi bakteri, virus, jamur, atau cedera fisik ringan.', solusi: 'Pemberian obat tetes mata antibiotik atau antivirus steril intensif di bawah pengawasan ketat tim medis spesialis.' },
    'H3': { nama: 'Hordiolum', prior: 0.3, desc: 'Infeksi bakteri lokal pada kelenjar minyak di kelopak mata yang menimbulkan pembengkakan kecil kemerahan seperti bintitan.', solusi: 'Lakukan kompres hangat pada area kelopak mata 3-4 kali sehari selama 10 menit, hindari memencet benjolan secara paksa.' },
    'H4': { nama: 'Konjungtiva', prior: 0.2, desc: 'Inflamasi pada lapisan membran mukosa bening yang melapisi bagian putih mata, umumnya dipicu alergi atau infeksi menular.', solusi: 'Hindari mengucek mata, gunakan air mata buatan (artificial tears), dan pisahkan handuk wajah guna mencegah risiko penularan.' },
    'H5': { nama: 'Glukoma', prior: 0.1, desc: 'Kerusakan saraf optik progresif akibat peningkatan tekanan intraokular cairan internal bola mata yang berisiko memicu kebutaan permanen.', solusi: 'Segera lakukan pemeriksaan tekanan bola mata (tonometri) ke klinik untuk resep obat tetes penurun tekanan atau opsi laser.' }
};

// Pemetaan Gejala
const gejalaList = [
    { id: 'E1', teks: 'Apakah mata Anda terasa silau saat melihat paparan cahaya?' },
    { id: 'E2', teks: 'Apakah lensa internal bola mata Anda terlihat berubah menjadi keruh?' },
    { id: 'E3', teks: 'Apakah tingkat penglihatan Anda memburuk atau kabur pada siang hari?' },
    { id: 'E4', teks: 'Apakah pandangan visual mata Anda terasa berkabut atau berawan?' },
    { id: 'E7', teks: 'Apakah bagian bola mata Anda berwarna kemerahan?' },
    { id: 'E12', teks: 'Apakah mata Anda mengalami sensasi nyeri atau cenat-cenut?' },
    { id: 'E14', teks: 'Apakah terdapat benjolan kecil/pembengkakan lokal di kelopak mata?' },
    { id: 'E22', teks: 'Apakah ruang batas sudut pandang (lapang pandang) mata terasa menyempit?' }
];

// Matriks Probabilitas Kondisional P(Ei | Hj)
const conditionalProbabilities = {
    'E1':  { 'H1': 0.9, 'H2': 0.8, 'H3': 0.1, 'H4': 0.3, 'H5': 0.7 },
    'E2':  { 'H1': 0.9, 'H2': 0.1, 'H3': 0.1, 'H4': 0.1, 'H5': 0.2 },
    'E3':  { 'H1': 0.7, 'H2': 0.4, 'H3': 0.1, 'H4': 0.2, 'H5': 0.5 },
    'E4':  { 'H1': 0.9, 'H2': 0.1, 'H3': 0.1, 'H4': 0.1, 'H5': 0.2 },
    'E7':  { 'H1': 0.1, 'H2': 0.9, 'H3': 0.6, 'H4': 0.9, 'H5': 0.4 },
    'E12': { 'H1': 0.1, 'H2': 0.7, 'H3': 0.3, 'H4': 0.1, 'H5': 0.8 },
    'E14': { 'H1': 0.1, 'H2': 0.1, 'H3': 0.9, 'H4': 0.1, 'H5': 0.1 },
    'E22': { 'H1': 0.3, 'H2': 0.1, 'H3': 0.1, 'H4': 0.1, 'H5': 0.9 }
};

let currentStep = 1;
let pieChartInstance = null;

document.addEventListener("DOMContentLoaded", function() {
    renderSymptomsChecklist();
    renderRatioChart();
});

function renderSymptomsChecklist() {
    const container = document.getElementById('symptoms-list-container');
    container.innerHTML = '';
    gejalaList.forEach((item, index) => {
        container.innerHTML += `
            <label class="group flex items-center gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-blue-50/40 hover:border-blue-200 transition-all duration-200 cursor-pointer">
                <input type="checkbox" name="selected_symptoms" value="${item.id}" class="w-5 h-5 rounded-md text-halodoc-blue border-slate-300 focus:ring-halodoc-blue transition-all">
                <span class="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                    <span class="font-bold text-slate-400 mr-1">${index + 1}.</span> ${item.teks}
                </span>
            </label>
        `;
    });
}

function renderRatioChart() {
    const ctx = document.getElementById('ratioPieChart').getContext('2d');
    pieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Katarak', 'Keratitis', 'Hordiolum', 'Konjungtiva', 'Glukoma'],
            datasets: [{
                data: [55, 15, 10, 12, 8],
                backgroundColor: ['#007EBD', '#14B8A6', '#F59E0B', '#EF4444', '#6366F1'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            responsive: true,
            maintainAspectRatio: false,
            onClick: (evt, activeElements) => {
                if (activeElements.length > 0) {
                    const index = activeElements[0].index;
                    const hKeys = ['H1', 'H2', 'H3', 'H4', 'H5'];
                    showDiseaseInfo(hKeys[index]);
                }
            }
        }
    });
}

function showDiseaseInfo(id) {
    const data = penyakitData[id];
    document.getElementById('disease-placeholder').classList.add('hidden');
    const card = document.getElementById('disease-info-card');
    
    document.getElementById('info-code').innerText = id;
    document.getElementById('info-title').innerText = data.nama;
    document.getElementById('info-desc').innerText = data.desc;
    document.getElementById('info-solution').innerText = data.solusi;
    card.classList.remove('hidden');
}

function hideDiseaseInfo() {
    document.getElementById('disease-info-card').classList.add('hidden');
    document.getElementById('disease-placeholder').classList.remove('hidden');
}

function nextStep() {
    if (document.getElementById('patient-name').value.trim() === "") {
        alert("Silakan masukkan nama lengkap Anda terlebih dahulu.");
        return;
    }
    currentStep = 2;
    document.getElementById('step-1-content').classList.add('hidden');
    document.getElementById('step-2-content').classList.remove('hidden');
    
    document.getElementById('step-indicator-2').classList.replace('bg-slate-200', 'bg-halodoc-blue');
    document.getElementById('step-indicator-2').classList.replace('text-slate-500', 'text-white');
    document.getElementById('step-label-2').classList.replace('text-slate-400', 'text-slate-800');
    document.getElementById('step-label-2').classList.replace('font-medium', 'font-semibold');
    document.getElementById('step-line').classList.replace('bg-slate-200', 'bg-halodoc-blue');
}

function prevStep() {
    currentStep = 1;
    document.getElementById('step-2-content').classList.add('hidden');
    document.getElementById('step-1-content').classList.remove('hidden');
    
    document.getElementById('step-indicator-2').classList.replace('bg-halodoc-blue', 'bg-slate-200');
    document.getElementById('step-indicator-2').classList.replace('text-white', 'text-slate-500');
    document.getElementById('step-label-2').classList.replace('text-slate-800', 'text-slate-400');
    document.getElementById('step-label-2').classList.replace('font-semibold', 'font-medium');
    document.getElementById('step-line').classList.replace('bg-halodoc-blue', 'bg-slate-200');
}

function switchSection(section) {
    if(section === 'home') {
        document.getElementById('section-home').classList.remove('hidden');
        document.getElementById('section-konsultasi').classList.add('hidden');
        document.getElementById('section-hasil').classList.add('hidden');
    } else {
        document.getElementById('section-home').classList.add('hidden');
        document.getElementById('section-konsultasi').classList.remove('hidden');
        document.getElementById('section-hasil').classList.add('hidden');
    }
}

function calculateBayes(event) {
    event.preventDefault();
    const checkboxes = document.querySelectorAll('input[name="selected_symptoms"]:checked');
    const selectedEvidences = Array.from(checkboxes).map(cb => cb.value);

    if (selectedEvidences.length === 0) {
        alert("Silakan pilih minimal satu gejala yang Anda rasakan untuk mendiagnosis.");
        return;
    }

    let hasilPerkalianPembilang = {};
    let totalPenyebutSemuaHipotesis = 0;
    let traceLogHtml = '';

    for (let hKey in penyakitData) {
        let prior = penyakitData[hKey].prior;
        let perkalianKondisional = 1;
        let logStringKondisional = [];

        selectedEvidences.forEach(eKey => {
            let probKondisional = conditionalProbabilities[eKey][hKey];
            perkalianKondisional *= probKondisional;
            logStringKondisional.push(probKondisional);
        });

        let nilaiPembilang = prior * perkalianKondisional;
        hasilPerkalianPembilang[hKey] = nilaiPembilang;
        totalPenyebutSemuaHipotesis += nilaiPembilang;

        traceLogHtml += `
            <div class="py-1">
                <span class="text-halodoc-blue font-bold">${hKey} (${penyakitData[hKey].nama}):</span><br>
                Pembilang = ${prior} (Prior) &times; ${logStringKondisional.join(' &times; ')} = <b>${nilaiPembilang.toFixed(6)}</b>
            </div>
        `;
    }

    traceLogHtml += `<div class="mt-3 pt-2 border-t border-slate-200 font-bold text-slate-800">Total Penyebut (&Sigma; Pembilang j) = ${totalPenyebutSemuaHipotesis.toFixed(6)}</div>`;
    document.getElementById('calculation-steps-log').innerHTML = traceLogHtml;

    let hasilAkhirPosterior = [];
    let penyakitTertinggi = null;
    let nilaiMax = -1;

    for (let hKey in penyakitData) {
        let nilaiPosterior = totalPenyebutSemuaHipotesis > 0 ? (hasilPerkalianPembilang[hKey] / totalPenyebutSemuaHipotesis) : 0;
        let persentase = (nilaiPosterior * 100).toFixed(2);

        hasilAkhirPosterior.push({ kode: hKey, nama: penyakitData[hKey].nama, nilai: nilaiPosterior.toFixed(5), persen: persentase });

        if (nilaiPosterior > nilaiMax) {
            nilaiMax = nilaiPosterior;
            penyakitTertinggi = hKey;
        }
    }

    hasilAkhirPosterior.sort((a, b) => b.nilai - a.nilai);
    const tableBody = document.getElementById('calculation-table-body');
    tableBody.innerHTML = '';
    
    hasilAkhirPosterior.forEach(item => {
        const isWinner = item.kode === penyakitTertinggi;
        tableBody.innerHTML += `
            <tr class="${isWinner ? 'bg-blue-50/60 font-semibold' : ''}">
                <td class="p-3">${item.kode}</td>
                <td class="p-3">${item.nama} ${isWinner ? '<span class="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded ml-1">Hasil Diagnosa</span>' : ''}</td>
                <td class="p-3 text-center font-mono">${item.nilai}</td>
                <td class="p-3 text-right text-slate-900 font-bold">${item.persen}%</td>
            </tr>
        `;
    });

    const namaPasien = document.getElementById('patient-name').value;
    document.getElementById('result-patient-heading').innerText = `Hai ${namaPasien}, Analisis Sistem Menunjukkan:`;
    document.getElementById('result-disease-title').innerText = `${penyakitData[penyakitTertinggi].nama} (${penyakitTertinggi})`;
    document.getElementById('result-probability-value').innerText = `${(nilaiMax * 100).toFixed(2)}%`;
    document.getElementById('result-disease-desc').innerText = penyakitData[penyakitTertinggi].desc;
    document.getElementById('result-disease-solution').innerText = penyakitData[penyakitTertinggi].solusi;

    document.getElementById('section-konsultasi').classList.add('hidden');
    document.getElementById('section-hasil').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleCalculationTrace() {
    const panel = document.getElementById('calculation-trace-panel');
    const arrow = document.getElementById('calc-arrow-icon');
    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        arrow.classList.add('rotate-180');
        setTimeout(() => { panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);
    } else {
        panel.classList.add('hidden');
        arrow.classList.remove('rotate-180');
    }
}

function resetConsultation() {
    document.getElementById('diagnosaForm').reset();
    currentStep = 1;
    document.getElementById('step-2-content').classList.add('hidden');
    document.getElementById('step-1-content').classList.remove('hidden');
    document.getElementById('calculation-trace-panel').classList.add('hidden');
    document.getElementById('calc-arrow-icon').classList.remove('rotate-180');
    
    document.getElementById('step-indicator-2').classList.replace('bg-halodoc-blue', 'bg-slate-200');
    document.getElementById('step-indicator-2').classList.replace('text-white', 'text-slate-500');
    document.getElementById('step-label-2').classList.replace('text-slate-800', 'text-slate-400');
    document.getElementById('step-line').classList.replace('bg-halodoc-blue', 'bg-slate-200');

    switchSection('home');
}
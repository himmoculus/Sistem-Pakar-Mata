const totalDataPenyakit = 1223;

const penyakitData = {
    H1: {
        nama: 'Retinopati Diabetik',
        jumlahData: 697,
        prior: 697 / totalDataPenyakit,
        desc: 'Retinopati diabetik adalah gangguan pada retina mata yang berhubungan dengan penyakit diabetes. Kondisi ini dapat menyebabkan kerusakan pembuluh darah retina dan mengganggu penglihatan.',
        solusi: 'Disarankan melakukan pemeriksaan mata secara rutin, terutama bagi penderita diabetes, serta mengontrol kadar gula darah dan berkonsultasi dengan dokter spesialis mata.'
    },
    H2: {
        nama: 'Glaukoma',
        jumlahData: 120,
        prior: 120 / totalDataPenyakit,
        desc: 'Glaukoma adalah penyakit mata yang dapat mengganggu saraf mata dan berisiko menurunkan fungsi penglihatan apabila tidak segera ditangani.',
        solusi: 'Disarankan segera melakukan pemeriksaan ke dokter spesialis mata karena glaukoma dapat memengaruhi saraf mata dan berisiko menurunkan penglihatan.'
    },
    H3: {
        nama: 'Katarak',
        jumlahData: 146,
        prior: 146 / totalDataPenyakit,
        desc: 'Katarak adalah kondisi ketika lensa mata tampak keruh sehingga penglihatan dapat menjadi buram, berkabut, atau tidak jelas.',
        solusi: 'Disarankan melakukan pemeriksaan ke dokter spesialis mata untuk memastikan kondisi lensa mata dan menentukan penanganan yang sesuai.'
    },
    H4: {
        nama: 'Degenerasi Makula / AMD',
        jumlahData: 117,
        prior: 117 / totalDataPenyakit,
        desc: 'Degenerasi makula atau AMD adalah gangguan pada bagian pusat penglihatan mata yang umumnya berkaitan dengan usia dan dapat memengaruhi ketajaman penglihatan.',
        solusi: 'Disarankan melakukan pemeriksaan lanjutan ke dokter spesialis mata, terutama jika terdapat gangguan pada pusat penglihatan atau penglihatan mulai menurun.'
    },
    H5: {
        nama: 'Retinopati Hipertensi',
        jumlahData: 36,
        prior: 36 / totalDataPenyakit,
        desc: 'Retinopati hipertensi adalah gangguan pada retina yang berkaitan dengan tekanan darah tinggi. Kondisi ini dapat memengaruhi pembuluh darah pada retina.',
        solusi: 'Disarankan mengontrol tekanan darah dan melakukan pemeriksaan mata secara berkala untuk memantau kondisi retina.'
    },
    H6: {
        nama: 'Miopia Patologis',
        jumlahData: 107,
        prior: 107 / totalDataPenyakit,
        desc: 'Miopia patologis adalah kondisi rabun jauh berat yang dapat menyebabkan perubahan pada bagian dalam mata, termasuk retina dan pusat penglihatan.',
        solusi: 'Disarankan melakukan pemeriksaan mata secara rutin, terutama jika rabun jauh semakin berat atau terdapat gangguan penglihatan.'
    }
};

// Relasi penyakit-gejala berdasarkan dataset.
// Probabilitas dihitung dari rumus: P(Ej|Hi) = jumlah kemunculan gejala / jumlah data penyakit.
const relasiPenyakitGejala = [
    { kode: 'E5',  penyakit: 'H1', gejala: 'Retinopati diabetik ringan', jumlahMuncul: 308 },
    { kode: 'E6',  penyakit: 'H1', gejala: 'Retinopati diabetik sedang', jumlahMuncul: 398 },
    { kode: 'E7',  penyakit: 'H1', gejala: 'Retinopati diabetik berat', jumlahMuncul: 87 },
    { kode: 'E8',  penyakit: 'H1', gejala: 'Retinopati diabetik proliferatif', jumlahMuncul: 12 },
    { kode: 'E9',  penyakit: 'H1', gejala: 'Retinopati diabetik proliferatif berat', jumlahMuncul: 4 },
    { kode: 'E10', penyakit: 'H1', gejala: 'Retinopati diabetik', jumlahMuncul: 2 },

    { kode: 'E2',  penyakit: 'H2', gejala: 'Debu atau gangguan pada lensa', jumlahMuncul: 3 },
    { kode: 'E3',  penyakit: 'H2', gejala: 'Glaukoma', jumlahMuncul: 107 },
    { kode: 'E4',  penyakit: 'H2', gejala: 'Dugaan glaukoma', jumlahMuncul: 13 },

    { kode: 'E1',  penyakit: 'H3', gejala: 'Katarak', jumlahMuncul: 146 },
    { kode: 'E2',  penyakit: 'H3', gejala: 'Debu atau gangguan pada lensa', jumlahMuncul: 20 },

    { kode: 'E11', penyakit: 'H4', gejala: 'Degenerasi makula kering terkait usia', jumlahMuncul: 103 },
    { kode: 'E12', penyakit: 'H4', gejala: 'Degenerasi makula basah terkait usia', jumlahMuncul: 31 },

    { kode: 'E13', penyakit: 'H5', gejala: 'Retinopati hipertensi', jumlahMuncul: 36 },

    { kode: 'E2',  penyakit: 'H6', gejala: 'Debu atau gangguan pada lensa', jumlahMuncul: 4 },
    { kode: 'E14', penyakit: 'H6', gejala: 'Miopia patologis', jumlahMuncul: 104 },
    { kode: 'E15', penyakit: 'H6', gejala: 'Retinopati miopia', jumlahMuncul: 2 },
    { kode: 'E16', penyakit: 'H6', gejala: 'Makulopati miopia', jumlahMuncul: 1 }
].map(item => ({
    ...item,
    jumlahDataPenyakit: penyakitData[item.penyakit].jumlahData,
    probabilitas: item.jumlahMuncul / penyakitData[item.penyakit].jumlahData
}));

// Gejala yang tampil di web. Nama gejala dibuat dalam bahasa Indonesia, sedangkan probabilitas tetap dihitung dari dataset.
const gejalaWeb = [
    { id: 'G1',  kodeTampil: 'E1',  teks: 'Katarak', relationCodes: ['E1'], pertanyaan: 'Apakah terdapat katarak atau kekeruhan pada lensa mata?' },
    { id: 'G2',  kodeTampil: 'E2',  teks: 'Debu atau gangguan pada lensa', relationCodes: ['E2'], pertanyaan: 'Apakah terdapat debu, bercak, atau gangguan pada lensa mata?' },
    { id: 'G3',  kodeTampil: 'E3',  teks: 'Glaukoma', relationCodes: ['E3'], pertanyaan: 'Apakah terdapat tanda glaukoma pada hasil pemeriksaan mata?' },
    { id: 'G4',  kodeTampil: 'E4',  teks: 'Dugaan glaukoma', relationCodes: ['E4'], pertanyaan: 'Apakah terdapat dugaan glaukoma pada hasil pemeriksaan mata?' },
    { id: 'G5',  kodeTampil: 'E5',  teks: 'Retinopati diabetik ringan', relationCodes: ['E5'], pertanyaan: 'Apakah terdapat gangguan retina ringan akibat diabetes?' },
    { id: 'G6',  kodeTampil: 'E6',  teks: 'Retinopati diabetik sedang', relationCodes: ['E6'], pertanyaan: 'Apakah terdapat gangguan retina sedang akibat diabetes?' },
    { id: 'G7',  kodeTampil: 'E7',  teks: 'Retinopati diabetik berat', relationCodes: ['E7'], pertanyaan: 'Apakah terdapat gangguan retina berat akibat diabetes?' },
    { id: 'G8',  kodeTampil: 'E8',  teks: 'Retinopati diabetik proliferatif', relationCodes: ['E8'], pertanyaan: 'Apakah terdapat pertumbuhan pembuluh darah tidak normal pada retina akibat diabetes?' },
    { id: 'G9',  kodeTampil: 'E9',  teks: 'Retinopati diabetik proliferatif berat', relationCodes: ['E9'], pertanyaan: 'Apakah terdapat pertumbuhan pembuluh darah tidak normal pada retina dengan kondisi berat?' },
    { id: 'G10', kodeTampil: 'E10', teks: 'Retinopati diabetik', relationCodes: ['E10'], pertanyaan: 'Apakah terdapat tanda umum kerusakan retina akibat diabetes?' },
    { id: 'G11', kodeTampil: 'E11', teks: 'Degenerasi makula kering terkait usia', relationCodes: ['E11'], pertanyaan: 'Apakah terdapat kerusakan pusat penglihatan tipe kering yang berkaitan dengan usia?' },
    { id: 'G12', kodeTampil: 'E12', teks: 'Degenerasi makula basah terkait usia', relationCodes: ['E12'], pertanyaan: 'Apakah terdapat kerusakan pusat penglihatan tipe basah yang berkaitan dengan usia?' },
    { id: 'G13', kodeTampil: 'E13', teks: 'Retinopati hipertensi', relationCodes: ['E13'], pertanyaan: 'Apakah terdapat gangguan retina akibat tekanan darah tinggi?' },
    { id: 'G14', kodeTampil: 'E14', teks: 'Miopia patologis', relationCodes: ['E14'], pertanyaan: 'Apakah terdapat kondisi rabun jauh berat yang memengaruhi bagian dalam mata?' },
    { id: 'G15', kodeTampil: 'E15', teks: 'Retinopati miopia', relationCodes: ['E15'], pertanyaan: 'Apakah terdapat gangguan retina akibat rabun jauh berat?' },
    { id: 'G16', kodeTampil: 'E16', teks: 'Makulopati miopia', relationCodes: ['E16'], pertanyaan: 'Apakah terdapat gangguan pusat penglihatan akibat rabun jauh berat?' }
];

let currentStep = 1;
let pieChartInstance = null;
let lastDiagnosisData = null;

document.addEventListener('DOMContentLoaded', function () {
    renderSymptomsChecklist();
    renderRatioChart();
});

// ==========================================
// FUNGSI RENDER TAMPILAN
// ==========================================
function renderSymptomsChecklist() {
    const container = document.getElementById('symptoms-list-container');
    container.innerHTML = '';

    gejalaWeb.forEach((item, index) => {
        container.innerHTML += `
            <label class="group flex items-start gap-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/70 hover:bg-blue-50/60 hover:border-blue-200 transition-all duration-200 cursor-pointer">
                <input type="checkbox" name="selected_symptoms" value="${item.id}" class="mt-1 w-5 h-5 rounded-md text-halodoc-blue border-slate-300 focus:ring-halodoc-blue transition-all">
                <span class="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors leading-relaxed">
                    <span class="inline-block text-[10px] font-bold text-halodoc-blue bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full mr-2">${item.kodeTampil}</span>
                    ${index + 1}. ${item.pertanyaan || ('Apakah terdapat ' + item.teks.toLowerCase() + '?')}
                </span>
            </label>
        `;
    });
}

function renderRatioChart() {
    const canvas = document.getElementById('ratioPieChart');
    if (!canvas || typeof Chart === 'undefined') return;

    const ctx = canvas.getContext('2d');
    pieChartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.values(penyakitData).map(p => p.nama),
            datasets: [{
                data: Object.values(penyakitData).map(p => p.jumlahData),
                backgroundColor: ['#007EBD', '#14B8A6', '#F59E0B', '#EF4444', '#6366F1', '#8B5CF6'],
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
                    const hKeys = Object.keys(penyakitData);
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

// ==========================================
// NAVIGASI HALAMAN
// ==========================================
function nextStep() {
    if (document.getElementById('patient-name').value.trim() === '') {
        alert('Silakan masukkan nama lengkap terlebih dahulu.');
        return;
    }

    currentStep = 2;
    document.getElementById('step-1-content').classList.add('hidden');
    document.getElementById('step-2-content').classList.remove('hidden');
    setStepIndicator(2);
}

function prevStep() {
    currentStep = 1;
    document.getElementById('step-2-content').classList.add('hidden');
    document.getElementById('step-1-content').classList.remove('hidden');
    setStepIndicator(1);
}

function setStepIndicator(step) {
    const indicator2 = document.getElementById('step-indicator-2');
    const label2 = document.getElementById('step-label-2');
    const line = document.getElementById('step-line');

    if (step === 2) {
        indicator2.classList.remove('bg-slate-200', 'text-slate-500');
        indicator2.classList.add('bg-halodoc-blue', 'text-white');
        label2.classList.remove('text-slate-400', 'font-medium');
        label2.classList.add('text-slate-800', 'font-semibold');
        line.classList.remove('bg-slate-200');
        line.classList.add('bg-halodoc-blue');
    } else {
        indicator2.classList.remove('bg-halodoc-blue', 'text-white');
        indicator2.classList.add('bg-slate-200', 'text-slate-500');
        label2.classList.remove('text-slate-800', 'font-semibold');
        label2.classList.add('text-slate-400', 'font-medium');
        line.classList.remove('bg-halodoc-blue');
        line.classList.add('bg-slate-200');
    }
}

function switchSection(section) {
    const secHome = document.getElementById('section-home');
    const secKonsultasi = document.getElementById('section-konsultasi');
    const secHasil = document.getElementById('section-hasil');

    if (!secHome || !secKonsultasi || !secHasil) return;

    if (section === 'home') {
        secHome.classList.remove('hidden');
        secKonsultasi.classList.add('hidden');
        secHasil.classList.add('hidden');
    }

    if (section === 'konsultasi') {
        secHome.classList.add('hidden');
        secKonsultasi.classList.remove('hidden');
        secHasil.classList.add('hidden');
        currentStep = 1;
        document.getElementById('step-1-content').classList.remove('hidden');
        document.getElementById('step-2-content').classList.add('hidden');
        setStepIndicator(1);
    }
}

// ==========================================
// MESIN PERHITUNGAN TEOREMA BAYES
// Rumus Bab III:
// P(E|Hi) = jumlah probabilitas gejala cocok / jumlah gejala yang dipilih
// P(Hi|E) = [P(E|Hi) x P(Hi)] / Σ[P(E|Hk) x P(Hk)]
// ==========================================
function calculateBayes(event) {
    event.preventDefault();

    const checked = document.querySelectorAll('input[name="selected_symptoms"]:checked');
    const selectedIds = Array.from(checked).map(cb => cb.value);

    if (selectedIds.length === 0) {
        alert('Silakan pilih minimal satu gejala.');
        return;
    }

    const selectedSymptoms = gejalaWeb.filter(g => selectedIds.includes(g.id));
    const jumlahGejalaDipilih = selectedSymptoms.length;
    const selectedRelationCodes = selectedSymptoms.flatMap(g => g.relationCodes);

    const selectedSymptomText = selectedSymptoms
        .map(g => `<span class="inline-block bg-blue-50 text-halodoc-blue border border-blue-100 rounded-full px-2.5 py-1 text-xs font-semibold mr-1 mb-1">${g.kodeTampil} - ${g.teks}</span>`)
        .join('');

    document.getElementById('result-selected-symptoms').innerHTML = selectedSymptomText;

    const hasil = [];

    Object.keys(penyakitData).forEach(hKey => {
        const prior = penyakitData[hKey].prior;
        const relasiCocok = relasiPenyakitGejala.filter(rel =>
            rel.penyakit === hKey && selectedRelationCodes.includes(rel.kode)
        );
        const totalProbGejala = relasiCocok.reduce((sum, rel) => sum + rel.probabilitas, 0);
        const pEvidenceGivenHypothesis = totalProbGejala / jumlahGejalaDipilih;
        const pembilang = pEvidenceGivenHypothesis * prior;

        hasil.push({
            kode: hKey,
            nama: penyakitData[hKey].nama,
            prior,
            relasiCocok,
            totalProbGejala,
            pEvidenceGivenHypothesis,
            pembilang,
            posterior: 0
        });
    });

    const penyebut = hasil.reduce((sum, row) => sum + row.pembilang, 0);
    hasil.forEach(row => {
        row.posterior = penyebut > 0 ? row.pembilang / penyebut : 0;
    });

    const hasilUrut = [...hasil].sort((a, b) => b.posterior - a.posterior);
    const penyakitTertinggi = hasilUrut[0];

    lastDiagnosisData = {
        pasien: {
            nama: document.getElementById('patient-name').value.trim(),
            gender: document.getElementById('patient-gender').value,
            usia: document.getElementById('patient-age').value,
            riwayat: document.getElementById('patient-history').value.trim() || '-'
        },
        selectedSymptoms,
        jumlahGejalaDipilih,
        hasil,
        penyebut,
        penyakitTertinggi
    };

    renderCalculationOutput(hasil, selectedSymptoms, jumlahGejalaDipilih, penyebut, penyakitTertinggi.kode);
    renderResultSummary(penyakitTertinggi);

    document.getElementById('section-konsultasi').classList.add('hidden');
    document.getElementById('section-hasil').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderResultSummary(penyakitTertinggi) {
    const namaPasien = document.getElementById('patient-name').value.trim();
    const hasilData = penyakitData[penyakitTertinggi.kode];

    document.getElementById('result-patient-heading').innerText = `Hasil diagnosis untuk ${namaPasien}`;
    document.getElementById('result-disease-title').innerText = `${hasilData.nama} (${penyakitTertinggi.kode})`;
    document.getElementById('result-probability-value').innerText = `${formatPercent(penyakitTertinggi.posterior)}`;
    document.getElementById('result-disease-desc').innerText = hasilData.desc;
    document.getElementById('result-disease-solution').innerText = hasilData.solusi;
}

function renderCalculationOutput(hasil, selectedSymptoms, jumlahGejalaDipilih, penyebut, kodePemenang) {
    const tableBody = document.getElementById('calculation-table-body');
    tableBody.innerHTML = '';

    hasil.forEach(row => {
        const isWinner = row.kode === kodePemenang;
        const gejalaCocok = row.relasiCocok.length > 0
            ? row.relasiCocok.map(rel => `${rel.kode} ${rel.gejala} (${formatDecimal(rel.probabilitas)})`).join('<br>')
            : '-';

        tableBody.innerHTML += `
            <tr class="${isWinner ? 'bg-blue-50/70 font-semibold' : ''}">
                <td class="p-3 align-top">${row.kode}</td>
                <td class="p-3 align-top">${row.nama} ${isWinner ? '<span class="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded ml-1">Tertinggi</span>' : ''}</td>
                <td class="p-3 align-top text-xs">${gejalaCocok}</td>
                <td class="p-3 align-top text-center font-mono">${formatDecimal(row.pEvidenceGivenHypothesis)}</td>
                <td class="p-3 align-top text-center font-mono">${formatDecimal(row.prior)}</td>
                <td class="p-3 align-top text-center font-mono">${formatDecimal(row.pembilang)}</td>
                <td class="p-3 align-top text-right font-bold">${formatPercent(row.posterior)}</td>
            </tr>
        `;
    });

    document.getElementById('calculation-steps-log').innerHTML = buildManualCalculationHtml(hasil, selectedSymptoms, jumlahGejalaDipilih, penyebut, kodePemenang);
    document.getElementById('calculation-trace-panel').classList.remove('hidden');
    document.getElementById('calc-toggle-label').innerText = 'Sembunyikan Langkah Perhitungan';
}

function buildManualCalculationHtml(hasil, selectedSymptoms, jumlahGejalaDipilih, penyebut, kodePemenang) {
    const selectedList = selectedSymptoms.map(g => `${g.kodeTampil} ${g.teks}`).join(', ');
    const peSteps = hasil.map(row => {
        const terms = row.relasiCocok.length > 0
            ? row.relasiCocok.map(rel => formatDecimal(rel.probabilitas)).join(' + ')
            : '0';
        const formula = row.relasiCocok.length > 0
            ? `P(E|${row.kode}) = (${terms}) / ${jumlahGejalaDipilih} = ${formatDecimal(row.pEvidenceGivenHypothesis)}`
            : `P(E|${row.kode}) = 0 / ${jumlahGejalaDipilih} = 0`;
        const matched = row.relasiCocok.length > 0
            ? row.relasiCocok.map(rel => `${rel.kode} ${rel.gejala} = ${formatDecimal(rel.probabilitas)}`).join('; ')
            : 'Tidak ada gejala yang cocok';
        return `
            <div class="bg-white border border-slate-100 rounded-xl p-3">
                <p class="font-bold text-slate-700">${row.kode} - ${row.nama}</p>
                <p class="text-slate-500">Gejala cocok: ${matched}</p>
                <p class="font-mono text-slate-700 mt-1">${formula}</p>
            </div>
        `;
    }).join('');

    const priorDetailHtml = Object.keys(penyakitData).map(kode => {
        const item = penyakitData[kode];
        return `P(${kode}) = ${item.jumlahData} / ${totalDataPenyakit} = ${formatDecimal(item.prior)}`;
    }).join('<br>');

    const denominatorTerms = hasil.map(row => `(${formatDecimal(row.pEvidenceGivenHypothesis)} × ${formatDecimal(row.prior)})`).join(' + ');
    const posteriorSteps = hasil.map(row => {
        const isWinner = row.kode === kodePemenang;
        return `
            <div class="bg-white border ${isWinner ? 'border-blue-200 bg-blue-50/50' : 'border-slate-100'} rounded-xl p-3">
                <p class="font-bold text-slate-700">${row.kode} - ${row.nama}</p>
                <p class="font-mono text-slate-700 mt-1">P(${row.kode}|E) = (${formatDecimal(row.pEvidenceGivenHypothesis)} × ${formatDecimal(row.prior)}) / ${formatDecimal(penyebut)} = ${formatDecimal(row.posterior)} = ${formatPercent(row.posterior)}</p>
            </div>
        `;
    }).join('');

    const winner = hasil.find(row => row.kode === kodePemenang);

    return `
        <div class="space-y-5">
            <div>
                <h4 class="font-bold text-slate-700 mb-1">1. Gejala yang Dipilih</h4>
                <p>Gejala: ${selectedList}</p>
                <p>Jumlah gejala yang dipilih = <b>${jumlahGejalaDipilih}</b></p>
            </div>
            <div>
                <h4 class="font-bold text-slate-700 mb-1">2. Prior Penyakit</h4>
                <p>Prior dihitung dari jumlah data setiap penyakit pada dataset:</p>
                <p class="font-mono bg-white rounded-lg border border-slate-100 p-2 mt-1">P(Hi) = jumlah data penyakit / total data penyakit</p>
                <p class="font-mono bg-white rounded-lg border border-slate-100 p-2 mt-1">${priorDetailHtml}</p>
            </div>
            <div>
                <h4 class="font-bold text-slate-700 mb-1">3. Rumus yang Digunakan</h4>
                <p class="font-mono bg-white rounded-lg border border-slate-100 p-2 mt-1">P(E|Hi) = Σ probabilitas gejala cocok / jumlah gejala dipilih</p>
                <p class="font-mono bg-white rounded-lg border border-slate-100 p-2 mt-1">P(Hi|E) = [P(E|Hi) × P(Hi)] / Σ[P(E|Hk) × P(Hk)]</p>
            </div>
            <div>
                <h4 class="font-bold text-slate-700 mb-2">4. Menghitung P(E|Hi)</h4>
                <div class="space-y-2">${peSteps}</div>
            </div>
            <div>
                <h4 class="font-bold text-slate-700 mb-1">5. Menghitung Penyebut Bayes</h4>
                <p class="font-mono bg-white rounded-lg border border-slate-100 p-2 mt-1">Σ[P(E|Hk) × P(Hk)] = ${denominatorTerms}</p>
                <p class="font-mono bg-white rounded-lg border border-slate-100 p-2 mt-1">= ${formatDecimal(penyebut)}</p>
            </div>
            <div>
                <h4 class="font-bold text-slate-700 mb-2">6. Menghitung P(Hi|E)</h4>
                <div class="space-y-2">${posteriorSteps}</div>
            </div>
            <div class="bg-blue-50 border border-blue-100 rounded-xl p-3">
                <h4 class="font-bold text-slate-700 mb-1">7. Kesimpulan</h4>
                <p>Nilai probabilitas tertinggi adalah <b>${winner.nama}</b> dengan nilai <b>${formatPercent(winner.posterior)}</b>.</p>
            </div>
        </div>
    `;
}

function toggleCalculationTrace() {
    const panel = document.getElementById('calculation-trace-panel');
    const arrow = document.getElementById('calc-arrow-icon');
    const label = document.getElementById('calc-toggle-label');

    if (panel.classList.contains('hidden')) {
        panel.classList.remove('hidden');
        arrow.classList.add('rotate-180');
        label.innerText = 'Sembunyikan Langkah Perhitungan';
    } else {
        panel.classList.add('hidden');
        arrow.classList.remove('rotate-180');
        label.innerText = 'Lihat Langkah Perhitungan Bayes';
    }
}

function saveDiagnosisPDF() {
    if (!lastDiagnosisData) {
        alert('Belum ada hasil diagnosis yang dapat disimpan.');
        return;
    }

    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert('Fitur PDF belum siap. Pastikan perangkat terhubung internet, lalu muat ulang halaman.');
        return;
    }

    const button = document.querySelector('button[onclick="saveDiagnosisPDF()"]');
    const originalButtonText = button ? button.innerText : '';
    if (button) {
        button.disabled = true;
        button.innerText = 'Membuat PDF...';
        button.classList.add('opacity-70', 'cursor-not-allowed');
    }

    try {
        document.getElementById('calculation-trace-panel').classList.remove('hidden');
        document.getElementById('calc-toggle-label').innerText = 'Sembunyikan Langkah Perhitungan';

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const data = lastDiagnosisData;
        const pemenang = data.penyakitTertinggi;
        const hasilData = penyakitData[pemenang.kode];
        const margin = 14;
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const contentWidth = pageWidth - (margin * 2);
        let y = 14;

        const colors = {
            navy: [15, 23, 42],
            blueDark: [10, 75, 117],
            blue: [0, 126, 189],
            blueLight: [239, 246, 255],
            blueBorder: [191, 219, 254],
            slate: [51, 65, 85],
            muted: [100, 116, 139],
            light: [248, 250, 252],
            border: [226, 232, 240],
            white: [255, 255, 255],
            teal: [15, 118, 110],
            greenLight: [240, 253, 250]
        };

        function setText(color) { doc.setTextColor(color[0], color[1], color[2]); }
        function setFill(color) { doc.setFillColor(color[0], color[1], color[2]); }
        function setDraw(color) { doc.setDrawColor(color[0], color[1], color[2]); }

        function addFooter() {
            const pageNo = doc.internal.getCurrentPageInfo().pageNumber;
            setText(colors.muted);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            doc.text(`Sistem Pakar Diagnosis Penyakit Mata • Halaman ${pageNo}`, margin, pageHeight - 7);
        }

        function newPage() {
            addFooter();
            doc.addPage();
            y = 14;
        }

        function ensureSpace(height) {
            if (y + height > pageHeight - 16) {
                newPage();
            }
        }

        function wrappedLines(text, width, size = 9) {
            doc.setFontSize(size);
            return doc.splitTextToSize(String(text || '-'), width);
        }

        function addWrappedText(text, x, startY, width, size = 9, style = 'normal', color = colors.slate, lineHeight = 4.6) {
            doc.setFont('helvetica', style);
            doc.setFontSize(size);
            setText(color);
            const lines = wrappedLines(text, width, size);
            doc.text(lines, x, startY);
            return lines.length * lineHeight;
        }

        function addSectionTitle(title) {
            ensureSpace(12);
            y += 2;
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(13);
            setText(colors.navy);
            doc.text(title, margin, y);
            setDraw(colors.blue);
            doc.setLineWidth(0.6);
            doc.line(margin, y + 2.5, margin + 35, y + 2.5);
            y += 9;
        }

        function addCard(height, fill = colors.white, stroke = colors.border) {
            ensureSpace(height + 2);
            setFill(fill);
            setDraw(stroke);
            doc.setLineWidth(0.3);
            doc.roundedRect(margin, y, contentWidth, height, 4, 4, 'FD');
            const top = y;
            y += height + 4;
            return top;
        }

        function addLabel(text, x, yy) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(7.5);
            setText(colors.muted);
            doc.text(String(text).toUpperCase(), x, yy);
        }

        function addInfoRow(label, value, x, yy, width) {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8.5);
            setText(colors.slate);
            doc.text(label, x, yy);
            addWrappedText(value || '-', x + 27, yy, width - 27, 8.5, 'normal', colors.slate, 4);
        }

        function addFormulaBox(text, fill = colors.light) {
            const lines = wrappedLines(text, contentWidth - 20, 8.4);
            const h = Math.max(10, lines.length * 4.2 + 6);
            ensureSpace(h + 2);
            setFill(fill);
            setDraw(colors.border);
            doc.roundedRect(margin + 4, y, contentWidth - 8, h, 3, 3, 'FD');
            doc.setFont('courier', 'normal');
            doc.setFontSize(8.4);
            setText(colors.slate);
            doc.text(lines, margin + 8, y + 5);
            y += h + 2;
        }

        function addMiniCard(title, body, formula, isWinner = false) {
            const titleH = 5;
            const bodyLines = wrappedLines(body, contentWidth - 20, 8);
            const formulaLines = wrappedLines(formula, contentWidth - 20, 8);
            const h = 10 + titleH + (bodyLines.length * 4) + (formulaLines.length * 4) + 5;
            ensureSpace(h + 2);
            setFill(isWinner ? colors.blueLight : colors.white);
            setDraw(isWinner ? colors.blueBorder : colors.border);
            doc.roundedRect(margin, y, contentWidth, h, 4, 4, 'FD');

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            setText(colors.navy);
            doc.text(title, margin + 6, y + 6);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            setText(colors.muted);
            doc.text(bodyLines, margin + 6, y + 11);

            doc.setFont('courier', 'normal');
            doc.setFontSize(8);
            setText(colors.slate);
            doc.text(formulaLines, margin + 6, y + 11 + bodyLines.length * 4 + 4);

            y += h + 3;
        }

        function addTable(headers, rows, colWidths, options = {}) {
            const fontSize = options.fontSize || 7.4;
            const headerFill = options.headerFill || colors.light;
            const lineH = options.lineHeight || 3.8;
            const startX = margin;

            function drawHeader() {
                const headerH = 9;
                ensureSpace(headerH + 6);
                setFill(headerFill);
                setDraw(colors.border);
                doc.rect(startX, y, contentWidth, headerH, 'FD');
                let x = startX;
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(fontSize);
                setText(colors.slate);
                headers.forEach((head, i) => {
                    doc.text(String(head), x + 2, y + 5.8);
                    x += colWidths[i];
                    if (i < headers.length - 1) {
                        setDraw(colors.border);
                        doc.line(x, y, x, y + headerH);
                    }
                });
                y += headerH;
            }

            drawHeader();
            rows.forEach(row => {
                const cellLines = row.cells.map((cell, i) => wrappedLines(cell, colWidths[i] - 4, fontSize));
                const rowH = Math.max(9, Math.max(...cellLines.map(lines => lines.length)) * lineH + 5);
                if (y + rowH > pageHeight - 16) {
                    newPage();
                    drawHeader();
                }
                setFill(row.highlight ? colors.blueLight : colors.white);
                setDraw(colors.border);
                doc.rect(startX, y, contentWidth, rowH, 'FD');
                let x = startX;
                cellLines.forEach((lines, i) => {
                    doc.setFont('helvetica', row.bold ? 'bold' : 'normal');
                    doc.setFontSize(fontSize);
                    setText(colors.slate);
                    doc.text(lines, x + 2, y + 5);
                    x += colWidths[i];
                    if (i < cellLines.length - 1) {
                        setDraw(colors.border);
                        doc.line(x, y, x, y + rowH);
                    }
                });
                y += rowH;
            });
            y += 5;
        }

        // Header seperti card di web
        setFill(colors.navy);
        setDraw(colors.navy);
        doc.roundedRect(margin, y, contentWidth, 40, 6, 6, 'FD');
        setFill(colors.blue);
        doc.circle(pageWidth - 33, y + 33, 28, 'F');
        setFill([255, 255, 255]);
        doc.roundedRect(margin + 7, y + 7, 29, 7, 3.5, 3.5, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        setText(colors.blueDark);
        doc.text('TEOREMA BAYES', margin + 10, y + 11.8);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(17);
        setText(colors.white);
        doc.text('Hasil Diagnosis Sistem Pakar Mata', margin + 7, y + 22);
        addWrappedText('Laporan hasil diagnosis berdasarkan gejala yang dipilih pengguna pada sistem web.', margin + 7, y + 29, 120, 8.5, 'normal', [219, 234, 254], 4);
        y += 48;

        // Data pengguna dan hasil utama
        const cardW = (contentWidth - 8) / 2;
        const cardH = 40;
        ensureSpace(cardH + 6);
        setFill(colors.white); setDraw(colors.border);
        doc.roundedRect(margin, y, cardW, cardH, 5, 5, 'FD');
        addLabel('Data Pengguna', margin + 6, y + 8);
        addInfoRow('Nama', data.pasien.nama, margin + 6, y + 16, cardW - 12);
        addInfoRow('Gender', data.pasien.gender, margin + 6, y + 23, cardW - 12);
        addInfoRow('Usia', data.pasien.usia, margin + 6, y + 30, cardW - 12);
        addInfoRow('Riwayat', data.pasien.riwayat, margin + 6, y + 37, cardW - 12);

        setFill(colors.blueLight); setDraw(colors.blueBorder);
        doc.roundedRect(margin + cardW + 8, y, cardW, cardH, 5, 5, 'FD');
        addLabel('Hasil Utama', margin + cardW + 14, y + 8);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        setText(colors.blue);
        doc.text(`${hasilData.nama} (${pemenang.kode})`, margin + cardW + 14, y + 19);
        doc.setFontSize(20);
        setText(colors.teal);
        doc.text(formatPercent(pemenang.posterior), margin + cardW + 14, y + 31);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        setText(colors.muted);
        doc.text('Nilai probabilitas tertinggi', margin + cardW + 14, y + 36);
        y += cardH + 8;

        // Gejala dipilih
        const symptomText = data.selectedSymptoms.map((g, i) => `${i + 1}. ${g.kodeTampil} - ${g.teks}`).join('; ');
        const symptomLines = wrappedLines(symptomText, contentWidth - 12, 8.5);
        const symptomCardH = Math.max(24, symptomLines.length * 4.2 + 17);
        const sy = addCard(symptomCardH, colors.white, colors.border);
        addLabel('Gejala yang Dipilih', margin + 6, sy + 8);
        addWrappedText(symptomText, margin + 6, sy + 15, contentWidth - 12, 8.5, 'normal', colors.slate, 4.2);

        // Definisi dan solusi
        const solutionText = `Definisi: ${hasilData.desc}\n\nSolusi awal: ${hasilData.solusi}`;
        const solLines = wrappedLines(solutionText, contentWidth - 12, 8.7);
        const solCardH = Math.max(32, solLines.length * 4.4 + 17);
        const solY = addCard(solCardH, colors.greenLight, colors.blueBorder);
        addLabel('Informasi dan Solusi Awal', margin + 6, solY + 8);
        addWrappedText(solutionText, margin + 6, solY + 15, contentWidth - 12, 8.7, 'normal', colors.slate, 4.4);

        addSectionTitle('Ringkasan Hasil Perhitungan');
        const rankingRows = [...data.hasil]
            .sort((a, b) => b.posterior - a.posterior)
            .map((row, index) => ({
                cells: [String(index + 1), row.kode, row.nama, formatDecimal(row.pEvidenceGivenHypothesis), formatDecimal(row.prior), formatPercent(row.posterior)],
                highlight: row.kode === pemenang.kode,
                bold: row.kode === pemenang.kode
            }));
        addTable(['Rank', 'Kode', 'Penyakit', 'P(E|Hi)', 'Prior', 'Hasil'], rankingRows, [16, 20, 48, 32, 26, 40], { fontSize: 7.5 });

        addSectionTitle('Perhitungan Manual Lengkap');
        const priorDetailText = Object.keys(penyakitData).map(kode => {
            const item = penyakitData[kode];
            return `P(${kode}) = ${item.jumlahData}/${totalDataPenyakit} = ${formatDecimal(item.prior)}`;
        }).join('\n');
        addMiniCard('1. Gejala yang Dipilih', `Gejala: ${symptomText}`, `Jumlah gejala yang dipilih = ${data.jumlahGejalaDipilih}`);
        addMiniCard('2. Prior Penyakit', 'Prior dihitung dari jumlah data setiap penyakit pada dataset.', `P(Hi) = jumlah data penyakit / total data penyakit\n${priorDetailText}`);
        addMiniCard('3. Rumus yang Digunakan', 'Rumus ini mengikuti perhitungan Teorema Bayes yang digunakan pada laporan.', 'P(E|Hi) = jumlah probabilitas gejala cocok / jumlah gejala dipilih\nP(Hi|E) = [P(E|Hi) x P(Hi)] / jumlah [P(E|Hk) x P(Hk)]');

        addSectionTitle('4. Menghitung P(E|Hi)');
        data.hasil.forEach(row => {
            const terms = row.relasiCocok.length > 0
                ? row.relasiCocok.map(rel => formatDecimal(rel.probabilitas)).join(' + ')
                : '0';
            const matched = row.relasiCocok.length > 0
                ? row.relasiCocok.map(rel => `${rel.kode} ${rel.gejala} = ${formatDecimal(rel.probabilitas)}`).join('; ')
                : 'Tidak ada gejala yang cocok';
            const formula = row.relasiCocok.length > 0
                ? `P(E|${row.kode}) = (${terms}) / ${data.jumlahGejalaDipilih} = ${formatDecimal(row.pEvidenceGivenHypothesis)}`
                : `P(E|${row.kode}) = 0 / ${data.jumlahGejalaDipilih} = 0`;
            addMiniCard(`${row.kode} - ${row.nama}`, `Gejala cocok: ${matched}`, formula, row.kode === pemenang.kode);
        });

        addSectionTitle('5. Menghitung Penyebut Bayes');
        const denominatorTerms = data.hasil.map(row => `(${formatDecimal(row.pEvidenceGivenHypothesis)} x ${formatDecimal(row.prior)})`).join(' + ');
        addFormulaBox(`jumlah [P(E|Hk) x P(Hk)] = ${denominatorTerms}`);
        addFormulaBox(`= ${formatDecimal(data.penyebut)}`, colors.blueLight);

        addSectionTitle('6. Menghitung P(Hi|E)');
        data.hasil.forEach(row => {
            const formula = `P(${row.kode}|E) = (${formatDecimal(row.pEvidenceGivenHypothesis)} x ${formatDecimal(row.prior)}) / ${formatDecimal(data.penyebut)} = ${formatDecimal(row.posterior)} = ${formatPercent(row.posterior)}`;
            addMiniCard(`${row.kode} - ${row.nama}`, row.kode === pemenang.kode ? 'Hasil ini menjadi nilai tertinggi.' : 'Hasil perhitungan penyakit ini.', formula, row.kode === pemenang.kode);
        });

        addMiniCard('7. Kesimpulan', 'Penyakit dengan nilai probabilitas tertinggi menjadi hasil diagnosis sistem.', `Nilai probabilitas tertinggi adalah ${hasilData.nama} dengan nilai ${formatPercent(pemenang.posterior)}.`, true);

        addSectionTitle('Tabel Hasil Semua Penyakit');
        const detailRows = data.hasil.map(row => {
            const gejalaCocok = row.relasiCocok.length > 0
                ? row.relasiCocok.map(rel => `${rel.kode} ${rel.gejala} (${formatDecimal(rel.probabilitas)})`).join('; ')
                : '-';
            return {
                cells: [row.kode, row.nama, gejalaCocok, formatDecimal(row.pEvidenceGivenHypothesis), formatDecimal(row.prior), formatDecimal(row.pembilang), formatPercent(row.posterior)],
                highlight: row.kode === pemenang.kode,
                bold: row.kode === pemenang.kode
            };
        });
        addTable(['Kode', 'Penyakit', 'Gejala Cocok', 'P(E|Hi)', 'Prior', 'Pembilang', 'Hasil'], detailRows, [17, 28, 66, 20, 18, 23, 18], { fontSize: 6.7, lineHeight: 3.5 });

        const noteY = addCard(22, colors.light, colors.border);
        addLabel('Catatan', margin + 6, noteY + 8);
        addWrappedText('Hasil diagnosis ini bukan diagnosis pasti dan tetap perlu pemeriksaan dokter jika keluhan berlanjut.', margin + 6, noteY + 15, contentWidth - 12, 8.2, 'italic', colors.muted, 4);

        addFooter();
        const safeName = (data.pasien.nama || 'pengguna')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        doc.save(`hasil-diagnosis-${safeName || 'pengguna'}.pdf`);
    } catch (error) {
        console.error(error);
        alert('PDF gagal dibuat. Silakan coba lagi.');
    } finally {
        if (button) {
            button.disabled = false;
            button.innerText = originalButtonText;
            button.classList.remove('opacity-70', 'cursor-not-allowed');
        }
    }
}

function getManualCalculationLines(hasil, selectedSymptoms, jumlahGejalaDipilih, penyebut, kodePemenang) {
    const selectedList = selectedSymptoms.map(g => `${g.kodeTampil} ${g.teks}`).join(', ');
    const lines = [
        { type: 'title', text: '1. Gejala yang Dipilih' },
        { text: `Gejala: ${selectedList}` },
        { text: `Jumlah gejala yang dipilih = ${jumlahGejalaDipilih}` },
        { type: 'title', text: '2. Prior Penyakit' },
        { text: 'Prior dihitung dari jumlah data setiap penyakit pada dataset.' },
        { text: 'P(Hi) = jumlah data penyakit / total data penyakit', style: 'bold' },
        ...Object.keys(penyakitData).map(kode => ({ text: `P(${kode}) = ${penyakitData[kode].jumlahData}/${totalDataPenyakit} = ${formatDecimal(penyakitData[kode].prior)}`, style: 'bold' })),
        { type: 'title', text: '3. Rumus yang Digunakan' },
        { text: 'P(E|Hi) = jumlah probabilitas gejala cocok / jumlah gejala dipilih', style: 'bold' },
        { text: 'P(Hi|E) = [P(E|Hi) x P(Hi)] / jumlah [P(E|Hk) x P(Hk)]', style: 'bold' },
        { type: 'title', text: '4. Menghitung P(E|Hi)' }
    ];

    hasil.forEach(row => {
        const terms = row.relasiCocok.length > 0
            ? row.relasiCocok.map(rel => formatDecimal(rel.probabilitas)).join(' + ')
            : '0';
        const matched = row.relasiCocok.length > 0
            ? row.relasiCocok.map(rel => `${rel.kode} ${rel.gejala}=${formatDecimal(rel.probabilitas)}`).join('; ')
            : 'Tidak ada gejala yang cocok';
        const formula = row.relasiCocok.length > 0
            ? `P(E|${row.kode}) = (${terms}) / ${jumlahGejalaDipilih} = ${formatDecimal(row.pEvidenceGivenHypothesis)}`
            : `P(E|${row.kode}) = 0 / ${jumlahGejalaDipilih} = 0`;
        lines.push({ text: `${row.kode} - ${row.nama}: ${matched}` });
        lines.push({ text: formula, style: 'bold' });
    });

    const denominatorTerms = hasil.map(row => `(${formatDecimal(row.pEvidenceGivenHypothesis)} x ${formatDecimal(row.prior)})`).join(' + ');
    lines.push({ type: 'title', text: '5. Menghitung Penyebut Bayes' });
    lines.push({ text: `jumlah [P(E|Hk) x P(Hk)] = ${denominatorTerms}` });
    lines.push({ text: `= ${formatDecimal(penyebut)}`, style: 'bold' });

    lines.push({ type: 'title', text: '6. Menghitung P(Hi|E)' });
    hasil.forEach(row => {
        const formula = `P(${row.kode}|E) = (${formatDecimal(row.pEvidenceGivenHypothesis)} x ${formatDecimal(row.prior)}) / ${formatDecimal(penyebut)} = ${formatDecimal(row.posterior)} = ${formatPercent(row.posterior)}`;
        lines.push({ text: `${row.kode} - ${row.nama}: ${formula}`, style: row.kode === kodePemenang ? 'bold' : 'normal' });
    });

    const winner = hasil.find(row => row.kode === kodePemenang);
    lines.push({ type: 'title', text: '7. Kesimpulan' });
    lines.push({ text: `Nilai probabilitas tertinggi adalah ${winner.nama} dengan nilai ${formatPercent(winner.posterior)}.`, style: 'bold' });
    return lines;
}

function resetConsultation() {
    document.getElementById('diagnosaForm').reset();
    document.getElementById('calculation-trace-panel').classList.add('hidden');
    document.getElementById('calc-arrow-icon').classList.remove('rotate-180');
    document.getElementById('calc-toggle-label').innerText = 'Lihat Langkah Perhitungan Bayes';
    currentStep = 1;
    setStepIndicator(1);
    switchSection('konsultasi');
}

function formatDecimal(value) {
    const number = Number(value);

    if (!Number.isFinite(number)) {
        return '0';
    }

    return number
        .toFixed(6)
        .replace(/\.?0+$/, '');
}

function formatPercent(value) {
    // Ditampilkan 1 angka di belakang koma seperti di laporan.
    const percent = Number(value) * 100;
    const truncated = Math.floor(percent * 10) / 10;
    return `${truncated.toFixed(1).replace('.0', '')}%`;
}

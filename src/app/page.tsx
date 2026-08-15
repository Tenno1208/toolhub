"use client";
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  ScanLine,
  Sparkles,
  Music2,
  ShieldCheck,
  Wrench,
  CheckCircle2,
} from 'lucide-react';
import Footer from '@/components/Footer';

/* ---------------------------------------------------------
   Signature element: a measuring-ruler divider.
   Used between major sections to reinforce the "precision
   toolbench" concept — every section is a measured interval.
--------------------------------------------------------- */
function RulerDivider({ label }) {
  const ticks = Array.from({ length: 41 });
  return (
    <div className="relative w-full select-none" aria-hidden="true">
      <div className="flex items-end h-4 overflow-hidden opacity-60">
        {ticks.map((_, i) => (
          <div
            key={i}
            className="flex-1 border-l border-[#5c5540]"
            style={{ height: i % 5 === 0 ? '100%' : '45%' }}
          />
        ))}
      </div>
      {label && (
        <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#15140f] px-3 text-[10px] font-mono uppercase tracking-[0.25em] text-[#a79c87]">
          {label}
        </span>
      )}
    </div>
  );
}

/* ---------------------------------------------------------
   Signature element: brass spec plate — a riveted nameplate
   used for the version badge and the stats strip.
--------------------------------------------------------- */
function Rivet() {
  return <span className="block w-1 h-1 rounded-full bg-[#0000004d] shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]" />;
}

const tools = [
  {
    id: 'DRW-01',
    icon: FileText,
    name: 'PDF Toolkit',
    desc: 'Gabung, pisah, kompres, dan beri watermark pada dokumen PDF. Semua proses berjalan di memori browser, file tidak pernah terkirim ke server.',
    spec: 'Format: PDF · DOCX · PNG',
  },
  {
    id: 'DRW-02',
    icon: ScanLine,
    name: 'Pengenalan Teks (OCR)',
    desc: 'Ubah dokumen hasil pindaian atau foto menjadi teks yang bisa disalin dan dicari, lengkap dengan deteksi tata letak kolom.',
    spec: 'Akurasi: ±97% pada cetakan standar',
  },
  {
    id: 'DRW-03',
    icon: Sparkles,
    name: 'Asisten AI',
    desc: 'Obrolan interaktif dan generator takarir bertenaga Gemini 2.5 Flash untuk merangkum, menulis ulang, atau menjelaskan berkas Anda.',
    spec: 'Model: Gemini 2.5 Flash',
  },
  {
    id: 'DRW-04',
    icon: Music2,
    name: 'Ruang Fokus Lo-fi',
    desc: 'Pemutar ambient dengan pengatur waktu Pomodoro bawaan, dirancang untuk sesi belajar atau kerja panjang tanpa distraksi.',
    spec: 'Mode: Offline-first',
  },
];

const stats = [
  { value: '12+', label: 'Alat tersedia' },
  { value: '100%', label: 'Proses client-side' },
  { value: '0', label: 'Iklan & popup' },
  { value: 'LTS', label: 'Siklus dukungan' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#15140f] text-[#f3eee2] font-sans">

      {/* --- STATUS LINE (release info, spec-sheet style) --- */}
      <div className="w-full border-b border-[#2a271c] bg-[#181610]">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-[0.15em] text-[#a79c87]">
          <div className="flex items-center gap-2">
            <span className="text-[#c99a4e]">●</span>
            <span>Rilis Resmi</span>
            <span className="text-[#5c5540]">/</span>
            <span className="text-[#f3eee2]">ToolHub v3.0.0</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Integrasi Gemini 2.5 Flash</span>
            <span className="hidden sm:inline text-[#5c5540]">/</span>
            <span className="hidden sm:inline text-[#4f8a80]">Long-Term Support</span>
          </div>
        </div>
      </div>

      {/* --- HERO --- */}
      <section className="flex-grow max-w-6xl mx-auto px-6 pt-20 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-16 items-end">
          <div>
            <div className="inline-flex items-center gap-2 mb-8">
              <Wrench className="w-3.5 h-3.5 text-[#c99a4e]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#c99a4e]">
                Toolbench Digital
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.03] mb-8">
              Semua alat kerja Anda,
              <br />
              <span className="text-[#c99a4e]">tersusun rapi</span> di satu tempat.
            </h1>

            <p className="text-base sm:text-lg text-[#a79c87] max-w-xl leading-relaxed mb-10">
              ToolHub menghimpun manipulasi PDF, pengenalan teks berbasis AI, asisten
              obrolan, dan ruang fokus lo-fi dalam satu antarmuka. Tanpa iklan, tanpa
              kuota harian — dan berkas Anda tidak pernah meninggalkan perangkat.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/dashboard"
                className="group flex items-center justify-center gap-2 bg-[#c99a4e] text-[#15140f] px-7 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:bg-[#dcae63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c99a4e] transition-colors"
              >
                Buka Dashboard
                <ArrowRight className="w-4 h-4 stroke-[2.5] motion-safe:group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/dashboard/features"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-sm text-[#f3eee2] border border-[#3a3627] hover:border-[#c99a4e]/50 hover:bg-[#1c1a13] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c99a4e] transition-colors"
              >
                Lihat Semua Fitur
                <ArrowUpRight className="w-4 h-4 text-[#a79c87]" />
              </Link>
            </div>
          </div>

          {/* Spec plate card, hero-right */}
          <div className="border border-[#3a3627] bg-[#1c1a13] rounded-2xl p-6 relative">
            <div className="absolute top-3 left-3"><Rivet /></div>
            <div className="absolute top-3 right-3"><Rivet /></div>
            <div className="absolute bottom-3 left-3"><Rivet /></div>
            <div className="absolute bottom-3 right-3"><Rivet /></div>
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#5c5540] mb-4">
              Spesifikasi Build
            </p>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-[#2a271c] pb-2">
                <dt className="text-[#a79c87]">Versi</dt>
                <dd className="font-mono text-[#f3eee2]">3.0.0 LTS</dd>
              </div>
              <div className="flex justify-between border-b border-[#2a271c] pb-2">
                <dt className="text-[#a79c87]">Engine</dt>
                <dd className="font-mono text-[#f3eee2]">Next.js · Turbopack</dd>
              </div>
              <div className="flex justify-between border-b border-[#2a271c] pb-2">
                <dt className="text-[#a79c87]">Model AI</dt>
                <dd className="font-mono text-[#f3eee2]">Gemini 2.5 Flash</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#a79c87]">Penyimpanan</dt>
                <dd className="font-mono text-[#4f8a80]">Lokal, tidak diunggah</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto w-full px-6">
        <RulerDivider label="Sekilas Angka" />
      </div>

      {/* --- STATS STRIP --- */}
      <section className="max-w-6xl mx-auto px-6 py-14 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#2a271c] border border-[#2a271c] rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#15140f] p-6 text-center">
              <p className="text-3xl sm:text-4xl font-black text-[#c99a4e] font-mono">{s.value}</p>
              <p className="text-xs text-[#a79c87] mt-2 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto w-full px-6">
        <RulerDivider label="Isi Toolbench" />
      </div>

      {/* --- TOOL DRAWERS (features) --- */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16 w-full scroll-mt-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Empat laci, satu bengkel.</h2>
          <p className="text-[#a79c87] text-sm sm:text-base leading-relaxed">
            Setiap alat dirancang untuk berdiri sendiri — buka yang Anda butuhkan,
            tanpa memuat yang lain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="group border border-[#2a271c] bg-[#1c1a13] rounded-2xl p-7 hover:border-[#c99a4e]/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#15140f] border border-[#3a3627] flex items-center justify-center group-hover:border-[#c99a4e]/50 transition-colors">
                  <tool.icon className="w-5 h-5 text-[#c99a4e]" />
                </div>
                <span className="text-[10px] font-mono text-[#5c5540] tracking-widest pt-1">
                  {tool.id}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
              <p className="text-sm text-[#a79c87] leading-relaxed mb-5">{tool.desc}</p>
              <p className="text-[11px] font-mono text-[#4f8a80] uppercase tracking-wide border-t border-[#2a271c] pt-3">
                {tool.spec}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto w-full px-6">
        <RulerDivider label="Cara Kerja" />
      </div>

      {/* --- HOW IT WORKS / PRIVACY --- */}
      <section className="max-w-6xl mx-auto px-6 py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
        <div>
          <div className="inline-flex items-center gap-2 mb-5">
            <ShieldCheck className="w-4 h-4 text-[#4f8a80]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#4f8a80]">
              Client-side by design
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-snug">
            Berkas Anda tidak pernah singgah di server kami.
          </h2>
          <p className="text-[#a79c87] text-sm sm:text-base leading-relaxed">
            Sebagian besar aplikasi PDF mengunggah dokumen Anda ke cloud untuk
            diproses. ToolHub sengaja dibangun sebaliknya: setiap operasi berjalan
            di memori browser Anda sendiri, sehingga dokumen sensitif — rapor,
            kontrak, KTP — tetap berada di perangkat Anda dari awal sampai akhir.
          </p>
        </div>

        <ol className="space-y-5">
          {[
            'Pilih alat dari dashboard, tanpa perlu instalasi tambahan.',
            'Unggah berkas — prosesnya dijalankan langsung oleh browser Anda.',
            'Unduh hasilnya. Tidak ada salinan yang tersimpan di server manapun.',
          ].map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1c1a13] border border-[#3a3627] flex items-center justify-center text-xs font-mono text-[#c99a4e]">
                {i + 1}
              </span>
              <p className="text-sm sm:text-base text-[#e5ded0] pt-0.5">{step}</p>
            </li>
          ))}
          <li className="flex gap-4 pt-1">
            <CheckCircle2 className="w-7 h-7 flex-shrink-0 text-[#4f8a80]" />
            <p className="text-sm sm:text-base text-[#4f8a80] pt-0.5 font-medium">
              Selesai — tanpa akun, tanpa batas kuota harian.
            </p>
          </li>
        </ol>
      </section>

      {/* --- CLOSING CTA --- */}
      <section className="max-w-6xl mx-auto px-6 pb-24 pt-4 w-full">
        <div className="border border-[#3a3627] bg-[#1c1a13] rounded-2xl px-8 py-12 text-center relative overflow-hidden">
          <div className="absolute top-3 left-3"><Rivet /></div>
          <div className="absolute top-3 right-3"><Rivet /></div>
          <div className="absolute bottom-3 left-3"><Rivet /></div>
          <div className="absolute bottom-3 right-3"><Rivet /></div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Siap merapikan alur kerja Anda?</h2>
          <p className="text-[#a79c87] text-sm sm:text-base mb-8 max-w-md mx-auto">
            Masuk ke dashboard dan mulai gunakan salah satu dari 12+ alat yang tersedia — gratis, tanpa daftar kartu.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 bg-[#c99a4e] text-[#15140f] px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide hover:bg-[#dcae63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c99a4e] transition-colors"
          >
            Mulai Sekarang
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}


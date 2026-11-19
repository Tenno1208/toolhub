"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { RefreshCw, ArrowUpRight, Zap, Cpu, Layers, ShieldCheck } from 'lucide-react';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});
const sans = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const PROGRESS = 82;
const R = 118;
const CIRC = 2 * Math.PI * R;

const services = [
  { name: 'Platform Inti', status: 'Migrasi engine v4.0', state: 'progress' },
  { name: 'AI Assistant & Copilot', status: 'Pembaruan model terbaru', state: 'progress' },
  { name: 'Toolset OCR, PDF & Media', status: 'Verifikasi akhir', state: 'testing' },
  { name: 'Keamanan & Enkripsi Lokal', status: 'Siap dan aman', state: 'ready' },
];

const features = [
  { icon: Zap, title: 'Jauh lebih cepat', desc: 'Arsitektur baru memproses semuanya di browser, tanpa menunggu server.' },
  { icon: Cpu, title: 'AI generasi baru', desc: 'Analisis dokumen, generator cerdas, dan asisten yang lebih paham konteks.' },
  { icon: Layers, title: 'Tampilan baru', desc: 'Navigasi lebih ringkas dan tata letak yang nyaman dipakai seharian.' },
  { icon: ShieldCheck, title: 'Data tetap milik Anda', desc: 'Semua file diproses di perangkat Anda dan tidak pernah diunggah.' },
];

const stateColor: Record<string, string> = {
  ready: '#9FC7A8',
  testing: '#9DB7D9',
  progress: '#D8B26A',
};

const fmtTime = () =>
  new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

export default function MaintenancePage() {
  const [lastChecked, setLastChecked] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [value, setValue] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLastChecked(fmtTime());
  }, []);

  // Satu momen utama: cincin progres terisi saat halaman dimuat
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(PROGRESS);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 2200;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(eased * PROGRESS));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastChecked(fmtTime());
      setIsRefreshing(false);
    }, 700);
  };

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMove}
      className={`${sans.className} relative min-h-screen overflow-hidden text-[#F1E9DA] flex flex-col`}
      style={{
        background:
          'radial-gradient(1200px 700px at 78% 8%, #1d1830 0%, transparent 60%), radial-gradient(900px 600px at 5% 95%, #2a1f12 0%, transparent 60%), #08080d',
      }}
    >
      <style>{`
        @keyframes tk-spin { to { transform: rotate(360deg); } }
        @keyframes tk-spin-rev { to { transform: rotate(-360deg); } }
        @keyframes tk-sheen { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        @keyframes tk-pulse { 0%,100% { opacity: .35; transform: scale(1); } 50% { opacity: 1; transform: scale(1.35); } }
        .tk-gold-text {
          background: linear-gradient(100deg, #8f6f35 0%, #e9cd93 25%, #fff1cf 40%, #d8b26a 55%, #9a7a3d 80%, #e9cd93 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: tk-sheen 7s linear infinite;
        }
        .tk-ring-fill { transition: stroke-dashoffset .1s linear; }
        .tk-spot { background: radial-gradient(420px circle at var(--mx, 70%) var(--my, 20%), rgba(216,178,106,.10), transparent 65%); }
        .tk-grain { background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.5'/></svg>"); mix-blend-mode: overlay; opacity: .07; }
        @media (prefers-reduced-motion: reduce) {
          .tk-gold-text, .tk-anim { animation: none !important; }
        }
      `}</style>

      {/* Lapisan atmosfer */}
      <div className="tk-spot pointer-events-none absolute inset-0" />
      <div className="tk-grain pointer-events-none absolute inset-0" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 sm:px-12 pt-8">
        <div className="flex items-center gap-3">
          <span
            className={`${serif.className} grid h-9 w-9 place-items-center rounded-full border border-[#D8B26A]/50 text-lg italic text-[#E9CD93]`}
          >
            T
          </span>
          <span className={`${serif.className} text-xl tracking-wide text-[#F1E9DA]`}>ToolHub</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-[#bdb4a3]">
          <span className="relative flex h-2 w-2">
            <span className="tk-anim absolute inset-0 rounded-full bg-[#D8B26A]" style={{ animation: 'tk-pulse 2.4s ease-in-out infinite' }} />
            <span className="relative h-2 w-2 rounded-full bg-[#D8B26A]" />
          </span>
          Pemeliharaan terjadwal
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 sm:px-12 pt-14 sm:pt-20 pb-20">
        {/* Hero */}
        <section className="grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <h1 className={`${serif.className} text-[2.9rem] leading-[1.02] sm:text-7xl lg:text-[5.4rem] font-medium tracking-tight`}>
              Sesuatu yang lebih baik
              <br />
              sedang <span className="tk-gold-text italic">kami siapkan.</span>
            </h1>
            <p className="mt-7 max-w-md text-[15px] leading-7 text-[#a9a090]">
              ToolHub sedang pindah ke arsitektur v4.0: lebih cepat, lebih rapi, dan penuh fitur
              baru. Situs akan kembali dalam waktu dekat. Terima kasih sudah menunggu.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-gradient-to-b from-[#EDD39B] to-[#C79F52] px-6 py-3 text-sm font-bold text-[#1a1306] shadow-[0_10px_40px_-10px_rgba(216,178,106,.65)] transition hover:brightness-110 active:scale-[.97] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9CD93]"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Mengecek status…' : 'Cek status sekarang'}
              </button>
              <Link
                href="/dashboard/features"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-[#F1E9DA] transition hover:border-[#D8B26A]/60 hover:text-[#E9CD93] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9CD93]"
              >
                Baca dokumentasi
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-5 text-xs text-[#7d7566]">
              Terakhir dicek pukul {lastChecked || '…'}
            </p>
          </div>

          {/* Cincin progres */}
          <div className="relative mx-auto aspect-square w-full max-w-[380px]">
            <svg viewBox="0 0 300 300" className="h-full w-full" role="img" aria-label={`Progres pembaruan ${PROGRESS} persen`}>
              <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8f6f35" />
                  <stop offset="50%" stopColor="#F3DBA3" />
                  <stop offset="100%" stopColor="#C79F52" />
                </linearGradient>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Tanda ukur berputar pelan */}
              <g className="tk-anim" style={{ transformOrigin: '150px 150px', animation: 'tk-spin 90s linear infinite' }}>
                {Array.from({ length: 72 }).map((_, i) => {
                  const major = i % 6 === 0;
                  return (
                    <line
                      key={i}
                      x1="150" y1="4" x2="150" y2={major ? 15 : 10}
                      stroke={major ? '#D8B26A' : '#F1E9DA'}
                      strokeOpacity={major ? 0.8 : 0.22}
                      strokeWidth={major ? 1.4 : 1}
                      transform={`rotate(${i * 5} 150 150)`}
                    />
                  );
                })}
              </g>

              <circle cx="150" cy="150" r="132" fill="none" stroke="#F1E9DA" strokeOpacity=".08" />
              <circle cx="150" cy="150" r={R} fill="none" stroke="#F1E9DA" strokeOpacity=".08" strokeWidth="6" />
              <g transform="rotate(-90 150 150)">
                <circle
                  className="tk-ring-fill"
                  cx="150" cy="150" r={R}
                  fill="none" stroke="url(#goldGrad)" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - value / 100)}
                  filter="url(#glow)"
                />
              </g>
              <circle
                cx="150" cy="150" r="92" fill="none" stroke="#D8B26A" strokeOpacity=".25" strokeDasharray="2 6"
                className="tk-anim" style={{ transformOrigin: '150px 150px', animation: 'tk-spin-rev 50s linear infinite' }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className={`${serif.className} tk-gold-text text-7xl sm:text-8xl font-medium leading-none tabular-nums`}>
                {value}
                <span className="text-4xl align-top">%</span>
              </div>
              <div className="mt-3 text-sm text-[#a9a090]">Tahap 3 dari 4</div>
              <div className={`${serif.className} mt-0.5 text-lg italic text-[#E9CD93]`}>Integrasi fitur baru</div>
            </div>
          </div>
        </section>

        {/* Status layanan: daftar tipis, bukan kartu */}
        <section className="mt-24 sm:mt-32 grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <h2 className={`${serif.className} text-4xl sm:text-5xl leading-tight`}>
              Yang sedang
              <br />
              <span className="italic text-[#E9CD93]">dikerjakan</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#8f8777]">
              Empat bagian utama diperbarui bersamaan. Berikut kondisinya saat ini.
            </p>
          </div>

          <ul className="divide-y divide-white/10 border-y border-white/10">
            {services.map((s) => (
              <li key={s.name} className="flex items-center justify-between gap-6 py-5">
                <span className={`${serif.className} text-xl sm:text-2xl`}>{s.name}</span>
                <span className="flex items-center gap-2.5 text-sm text-[#bdb4a3]">
                  <span
                    className={`h-2 w-2 rounded-full ${s.state !== 'ready' ? 'tk-anim' : ''}`}
                    style={{
                      background: stateColor[s.state],
                      boxShadow: `0 0 12px ${stateColor[s.state]}`,
                      animation: s.state !== 'ready' ? 'tk-pulse 2.4s ease-in-out infinite' : undefined,
                    }}
                  />
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Fitur baru */}
        <section className="mt-24 sm:mt-32">
          <h2 className={`${serif.className} max-w-xl text-4xl sm:text-5xl leading-tight`}>
            Apa yang akan <span className="italic text-[#E9CD93]">Anda dapatkan</span>
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className={`group relative px-0 py-8 sm:px-7 border-b border-white/10 lg:border-b-0 ${i > 0 ? 'lg:border-l' : ''} ${i % 2 === 1 ? 'sm:border-l' : ''} lg:border-white/10 border-white/10 transition-colors hover:bg-white/[.025]`}
                >
                  <span className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-[#E9CD93] to-transparent transition-all duration-500 group-hover:w-full" />
                  <Icon className="h-6 w-6 text-[#D8B26A]" strokeWidth={1.4} />
                  <h3 className={`${serif.className} mt-5 text-2xl`}>{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#8f8777]">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="relative z-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 px-6 sm:px-12 py-6 text-xs text-[#6f685a] sm:flex-row">
        <span>&copy; {new Date().getFullYear()} ToolHub</span>
        <span>Halaman ini diperbarui otomatis saat pemeliharaan selesai.</span>
      </footer>
    </div>
  );
}
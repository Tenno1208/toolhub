"use client";

import React, { useState, useEffect, useRef } from 'react';

const PROGRESS = 82;

const services = [
  { name: 'Platform Inti', note: 'Migrasi engine v4.0', done: false },
  { name: 'AI Assistant', note: 'Pembaruan model', done: false },
  { name: 'Toolset (OCR, PDF, Media)', note: 'Verifikasi akhir', done: false },
  { name: 'Keamanan & Enkripsi', note: 'Siap', done: true },
];

const updates = [
  {
    title: 'Arsitektur lebih cepat',
    text: 'Semua pemrosesan dilakukan di browser Anda. Tidak perlu menunggu server.',
  },
  {
    title: 'AI yang lebih pintar',
    text: 'Model baru yang lebih paham konteks untuk analisis dokumen dan asisten interaktif.',
  },
  {
    title: 'Tampilan yang dibenahi',
    text: 'Navigasi lebih ringkas, tata letak lebih nyaman, dan konsisten di semua perangkat.',
  },
  {
    title: 'Privasi tetap utuh',
    text: 'Tidak ada file yang diunggah. Semua diproses lokal di perangkat Anda.',
  },
];

function fmtTime() {
  return new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MaintenancePage() {
  const [checked, setChecked] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChecked(fmtTime());
  }, []);

  // Animate the progress bar once when it enters the viewport
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setProgress(PROGRESS);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start: number | null = null;
          const duration = 1400;
          const step = (ts: number) => {
            if (!start) start = ts;
            const t = Math.min((ts - start) / duration, 1);
            const eased = 1 - (1 - t) * (1 - t) * (1 - t);
            setProgress(Math.round(eased * PROGRESS));
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  const handleRefresh = () => {
    setBusy(true);
    setTimeout(() => {
      setChecked(fmtTime());
      setBusy(false);
    }, 600);
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-16 px-5 sm:px-8">
      <div className="mx-auto max-w-2xl">

        {/* Status pill */}
        <div className="flex items-center gap-2 text-xs text-[var(--muted)] mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span>Pemeliharaan terjadwal &middot; v4.0</span>
        </div>

        {/* Headline */}
        <h1 className="text-[2rem] sm:text-[2.75rem] font-bold leading-[1.15] tracking-tight text-[var(--fg)]">
          ToolHub sedang <br className="hidden sm:inline" />
          ditingkatkan.
        </h1>

        <p className="mt-5 text-[15px] leading-7 text-[var(--muted)] max-w-lg">
          Kami sedang memindahkan seluruh platform ke arsitektur baru yang lebih cepat
          dan andal. Situs akan kembali dalam waktu dekat.
        </p>

        {/* CTA row */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={busy}
            className="cursor-pointer text-sm font-semibold text-[#111] bg-[var(--fg)] rounded-lg px-5 py-2.5 hover:bg-white transition-colors active:scale-[.97] disabled:opacity-50"
          >
            {busy ? 'Mengecek…' : 'Cek status'}
          </button>
          <span className="text-xs text-[var(--muted)]">
            Dicek pukul {checked || '—'}
          </span>
        </div>

        {/* Progress section */}
        <section ref={barRef} className="mt-16 sm:mt-20">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-sm font-semibold text-[var(--fg)]">Progres keseluruhan</h2>
            <span className="text-2xl font-bold tabular-nums text-[var(--accent)]">
              {progress}%
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-[var(--muted)]">
            Tahap 3 dari 4 — Integrasi fitur dan pengujian akhir
          </p>
        </section>

        {/* Services list */}
        <section className="mt-14">
          <h2 className="text-sm font-semibold text-[var(--fg)] mb-4">Status layanan</h2>
          <div className="border-t border-[var(--border)]">
            {services.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between py-3.5 border-b border-[var(--border)]"
              >
                <span className="text-sm text-[var(--fg)]">{s.name}</span>
                <span className="flex items-center gap-2 text-xs text-[var(--muted)]">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      s.done ? 'bg-emerald-500' : 'bg-[var(--accent)] animate-pulse'
                    }`}
                  />
                  {s.note}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* What's new */}
        <section className="mt-14">
          <h2 className="text-sm font-semibold text-[var(--fg)] mb-6">Yang akan hadir</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
            {updates.map((u) => (
              <div key={u.title}>
                <h3 className="text-sm font-medium text-[var(--fg)]">{u.title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[var(--muted)]">{u.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[var(--muted)]">
          <span>&copy; {new Date().getFullYear()} ToolHub</span>
          <span>Halaman ini diperbarui otomatis saat pemeliharaan selesai.</span>
        </footer>
      </div>
    </div>
  );
}

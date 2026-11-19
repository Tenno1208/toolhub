"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { Lock, X } from 'lucide-react';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});
const sans = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function Navbar() {
  const [showNotice, setShowNotice] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Tutup modal dengan tombol Escape, kunci scroll saat terbuka
  useEffect(() => {
    if (!showNotice) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowNotice(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [showNotice]);

  return (
    <>
      <style>{`
        @keyframes nv-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes nv-rise { from { opacity: 0; transform: translateY(14px) scale(.98); } to { opacity: 1; transform: none; } }
        @keyframes nv-pulse { 0%,100% { opacity: .35; transform: scale(1); } 50% { opacity: 1; transform: scale(1.35); } }
        @keyframes nv-sheen { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        .nv-gold-text {
          background: linear-gradient(100deg, #8f6f35 0%, #e9cd93 25%, #fff1cf 40%, #d8b26a 55%, #9a7a3d 80%, #e9cd93 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .nv-link { position: relative; }
        .nv-link::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 1px;
          background: linear-gradient(90deg, transparent, #E9CD93, transparent);
          transform: scaleX(0); transition: transform .35s ease;
        }
        .nv-link:hover::after { transform: scaleX(1); }
        @media (prefers-reduced-motion: reduce) {
          .nv-anim { animation: none !important; }
        }
      `}</style>

      <nav
        className={`${sans.className} fixed top-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? 'bg-[#08080d]/80 backdrop-blur-xl border-b border-[#D8B26A]/15 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-5 sm:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9CD93] rounded-full"
          >
            <span className="relative block h-9 w-9 overflow-hidden rounded-full border border-[#D8B26A]/50 p-[2px] transition-all duration-500 group-hover:border-[#E9CD93] group-hover:shadow-[0_0_24px_-4px_rgba(216,178,106,.7)]">
              <span className="relative block h-full w-full overflow-hidden rounded-full">
                <Image src="/logo.png" alt="Logo ToolHub" fill className="object-cover" />
              </span>
            </span>
            <span className={`${serif.className} nv-gold-text text-[1.65rem] font-medium leading-none tracking-wide`}>
              ToolHub
            </span>
          </Link>

          {/* Navigasi */}
          <div className="flex items-center gap-5 sm:gap-8">
            <Link
              href="/"
              className="nv-link text-sm font-medium text-[#bdb4a3] transition-colors hover:text-[#F1E9DA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9CD93]"
            >
              Beranda
            </Link>

            <button
              type="button"
              onClick={() => setShowNotice(true)}
              title="Dashboard ditutup sementara"
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#D8B26A]/40 bg-[#D8B26A]/[.06] px-4 py-2 text-sm font-semibold text-[#E9CD93] transition-all hover:border-[#E9CD93]/70 hover:bg-[#D8B26A]/[.12] hover:shadow-[0_0_30px_-8px_rgba(216,178,106,.6)] active:scale-[.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9CD93]"
            >
              <Lock className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-12" strokeWidth={1.8} />
              <span>Dashboard</span>
              <span className="hidden items-center gap-1.5 border-l border-[#D8B26A]/30 pl-2.5 text-xs font-medium text-[#bdb4a3] sm:inline-flex">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="nv-anim absolute inset-0 rounded-full bg-[#D8B26A]"
                    style={{ animation: 'nv-pulse 2.4s ease-in-out infinite' }}
                  />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#D8B26A]" />
                </span>
                Pemeliharaan
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Modal pemeliharaan */}
      {showNotice && (
        <div
          className={`${sans.className} nv-anim fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md`}
          style={{ animation: 'nv-fade .25s ease-out' }}
          onClick={() => setShowNotice(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="nv-title"
        >
          <div
            className="nv-anim relative w-full max-w-md overflow-hidden rounded-3xl border border-[#D8B26A]/25 p-8 shadow-[0_40px_100px_-30px_rgba(0,0,0,.9)]"
            style={{
              animation: 'nv-rise .4s cubic-bezier(.2,.8,.2,1)',
              background:
                'radial-gradient(500px 260px at 85% -10%, rgba(216,178,106,.14), transparent 65%), #0e0d14',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#E9CD93] to-transparent" />

            <button
              onClick={() => setShowNotice(false)}
              className="absolute right-4 top-4 cursor-pointer rounded-full p-2 text-[#8f8777] transition-colors hover:bg-white/5 hover:text-[#F1E9DA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E9CD93]"
              aria-label="Tutup"
            >
              <X className="h-4 w-4" />
            </button>

            <span className="grid h-12 w-12 place-items-center rounded-full border border-[#D8B26A]/40 text-[#E9CD93]">
              <Lock className="h-5 w-5" strokeWidth={1.5} />
            </span>

            <h3 id="nv-title" className={`${serif.className} mt-6 text-[2rem] font-medium leading-tight text-[#F1E9DA]`}>
              Dashboard dibuka kembali
              <br />
              <span className="italic text-[#E9CD93]">sebentar lagi.</span>
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#a9a090]">
              Dashboard dan semua alat kerja kami nonaktifkan sementara selama migrasi ke v4.0.
              Setelah pembaruan selesai, Anda bisa langsung memakainya lagi tanpa perlu login ulang.
            </p>

            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 text-xs text-[#8f8777]">
              <span className="relative flex h-2 w-2 shrink-0">
                <span
                  className="nv-anim absolute inset-0 rounded-full bg-[#D8B26A]"
                  style={{ animation: 'nv-pulse 2.4s ease-in-out infinite' }}
                />
                <span className="relative h-2 w-2 rounded-full bg-[#D8B26A]" />
              </span>
              Pembaruan sedang berjalan
            </div>

            <button
              type="button"
              onClick={() => setShowNotice(false)}
              autoFocus
              className="mt-7 w-full cursor-pointer rounded-full bg-gradient-to-b from-[#EDD39B] to-[#C79F52] px-6 py-3 text-sm font-bold text-[#1a1306] shadow-[0_10px_40px_-10px_rgba(216,178,106,.65)] transition hover:brightness-110 active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E9CD93]"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
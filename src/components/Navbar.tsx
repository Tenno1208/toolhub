"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [showNotice, setShowNotice] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!showNotice) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setShowNotice(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [showNotice]);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-[background,border-color,box-shadow] duration-300 ${
          scrolled
            ? 'bg-[#0c0c0f]/90 backdrop-blur-lg border-b border-[var(--border)] shadow-[0_1px_0_rgba(255,255,255,.03)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="relative block h-8 w-8 overflow-hidden rounded-lg border border-[var(--border)]">
              <Image src="/logo.png" alt="ToolHub" fill className="object-cover" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-[var(--fg)]">ToolHub</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hidden sm:block text-[13px] text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            >
              Beranda
            </Link>

            <button
              type="button"
              onClick={() => setShowNotice(true)}
              className="cursor-pointer text-[13px] font-medium text-[var(--accent)] border border-[var(--accent)]/25 bg-[var(--accent-dim)] rounded-lg px-3.5 py-1.5 hover:border-[var(--accent)]/50 transition-colors active:scale-[.97]"
            >
              Dashboard
              <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] align-middle" />
            </button>
          </div>
        </div>
      </nav>

      {showNotice && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowNotice(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-[#141418] border border-[var(--border)] p-7 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent-dim)] border border-[var(--accent)]/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--fg)]">Dashboard Tidak Tersedia</p>
                <p className="text-xs text-[var(--muted)]">Pemeliharaan sistem v4.0</p>
              </div>
            </div>

            <p className="text-[13px] leading-relaxed text-[var(--muted)]">
              Seluruh modul dashboard sedang dinonaktifkan selama proses pembaruan arsitektur. 
              Akses akan dibuka kembali begitu pemeliharaan selesai.
            </p>

            <div className="mt-5 pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-xs text-[var(--muted)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                Sedang dikerjakan
              </span>
              <button
                type="button"
                onClick={() => setShowNotice(false)}
                autoFocus
                className="cursor-pointer text-sm font-medium text-[var(--bg)] bg-[var(--fg)] rounded-lg px-4 py-2 hover:bg-white transition-colors active:scale-[.97]"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Lock, ShieldAlert, X } from 'lucide-react';

export default function Navbar() {
  const [showNotice, setShowNotice] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 relative rounded-xl overflow-hidden group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-md shadow-amber-500/10 border border-white/10">
              <Image 
                src="/logo.png" 
                alt="ToolHub Logo"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-amber-200">
              ToolHub
            </span>
          </Link>

          {/* Menu Navigasi Samping */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link 
              href="/" 
              className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Beranda
            </Link>

            {/* Tombol Status Dashboard (Terkunci & Maintenance) */}
            <button 
              type="button"
              onClick={() => setShowNotice(true)}
              className="relative group bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-sm shadow-amber-500/10 active:scale-95"
              title="Dashboard dinonaktifkan sementara"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Dashboard Ditutup</span>
              <span className="hidden sm:inline text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Maintenance
              </span>
            </button>
          </div>

        </div>
      </nav>

      {/* Modal Notifikasi Pemeliharaan Dashboard */}
      {showNotice && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowNotice(false)}
        >
          <div 
            className="relative w-full max-w-md p-6 sm:p-7 rounded-2xl bg-slate-900 border border-amber-500/30 shadow-2xl shadow-amber-500/10 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowNotice(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Tutup notifikasi"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Dashboard Ditutup Sementara</h3>
                <p className="text-xs text-amber-400 font-mono">Status: Pemeliharaan Skala Besar</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mohon maaf, halaman dashboard beserta seluruh modul alat kerja (tools) sedang dinonaktifkan sementara demi proses migrasi arsitektur dan pembaruan sistem besar-besaran (v4.0).
            </p>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <span>Semua akses akan dibuka kembali segera setelah pemeliharaan selesai.</span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowNotice(false)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

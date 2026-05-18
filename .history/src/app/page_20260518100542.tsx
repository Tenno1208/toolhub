"use client";
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Layout, Terminal, Sparkles, Stars } from 'lucide-react';
import Footer from '@/components/Footer'; // Import komponen Footer baru

export default function LandingPage() {
  return (
    // 🚀 FIXED: Menambahkan pt-32 agar konten awal turun ke bawah jarak aman header melayang
    <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none font-sans pt-32">
      
      {/* --- BACKGROUND AMBIENT GLOW ORNAMENTS --- */}
      <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1400px] h-[75vh] bg-gradient-to-b from-purple-500/20 via-indigo-500/5 to-transparent rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute top-[35%] left-[-15%] w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[15%] right-[-15%] w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* --- PREMIUM UPCOMING ANNOUNCEMENT BANNER (VERSION 2.0.0 TEASER) --- */}
      <div className="w-full z-20 px-4 mb-4 animate-in fade-in slide-in-from-top-3 duration-500">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-indigo-950/40 border border-purple-500/20 backdrop-blur-xl rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-xl shadow-purple-950/20">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30 rounded-xl shadow-inner">
              <Stars className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <span className="inline-block bg-purple-500 text-white font-extrabold text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md mb-1 sm:mb-0 sm:mr-2">COMING SOON</span>
              <span className="text-xs text-slate-200 font-medium tracking-wide">
                Mempersiapkan rilis akbar <strong className="text-white font-bold">ToolHub v2.0.0</strong> dengan tambahan <strong className="text-cyan-400 font-bold">10 Tools Produktivitas Baru</strong>!
              </span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-purple-400 border border-purple-500/20 bg-purple-500/5 px-2.5 py-1 rounded-md shrink-0">
            Pipeline: 92% Complete
          </div>
        </div>
      </div>

      {/* --- HERO SECTION --- */}
      <div className="flex-grow max-w-5xl mx-auto px-6 pt-12 pb-20 text-center z-10 w-full flex flex-col justify-center items-center">
        
        {/* Active Production Version Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/[0.05] text-slate-300 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-lg shadow-black/40">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-slate-500 font-medium">Production Version</span>
          <span className="w-1 h-1 rounded-full bg-slate-700"></span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 font-bold">ToolHub v1.0.0 Stable</span>
        </div>

        {/* Big Premium Luxury Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-8 text-white leading-[1.02] filter drop-shadow-sm">
          Koleksi Utilitas <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-200 to-cyan-400">
            Dalam Satu Saku.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed font-normal">
          Tingkatkan efisiensi kerja harian Anda tanpa gangguan iklan popup berlebih atau batasan limitasi kuota harian. Proses enkripsi, konversi struktur teks, hingga manajemen media berjalan 100% lokal terlindungi di dalam browser Anda.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-white via-slate-100 to-slate-200 text-slate-950 px-8 py-4 rounded-2xl font-black text-sm tracking-wide hover:scale-[1.02] active:scale-[0.99] transition-all shadow-xl shadow-white/5 cursor-pointer"
          >
            Mulai Masuk Dashboard <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
          <a 
            href="#features" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-slate-400 border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] hover:text-white transition-all backdrop-blur-sm cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-slate-600" /> Jelajahi Fitur Utama
          </a>
        </div>

        {/* --- LUXURY FEATURES DISPLAY GRID --- */}
        {/* 🚀 FIXED: Menambahkan scroll-mt-32 agar saat scroll anchor ke sini tidak tertutup header */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-36 text-left w-full scroll-mt-32">
          
          {/* Card 1: Performa */}
          <div className="group bg-slate-900/20 border border-white/[0.03] p-8 rounded-[32px] backdrop-blur-md hover:bg-slate-900/60 hover:border-purple-500/20 transition-all duration-300 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-purple-500/10 transition-colors"></div>
            <div className="bg-purple-500/10 border border-purple-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Zap className="w-5 h-5 text-purple-400 fill-purple-400/10" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight">Performa Tanpa Latensi</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Arsitektur aplikasi dibangun di atas Next.js untuk pemrosesan super cepat tanpa jeda waktu tunggu memuat muatan data antrean server eksternal.
            </p>
          </div>

          {/* Card 2: Keamanan */}
          <div className="group bg-slate-900/20 border border-white/[0.03] p-8 rounded-[32px] backdrop-blur-md hover:bg-slate-900/60 hover:border-cyan-500/20 transition-all duration-300 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors"></div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Shield className="w-5 h-5 text-cyan-400 fill-cyan-400/10" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight">Aman & Client-Side</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Privasi data sensitif Anda terlindungi penuh. Seluruh operasi kalkulasi algoritma enkripsi dan konversi diselesaikan secara privat lokal di perangkat Anda.
            </p>
          </div>

          {/* Card 3: UI/UX Minimalis */}
          <div className="group bg-slate-900/20 border border-white/[0.03] p-8 rounded-[32px] backdrop-blur-md hover:bg-slate-900/60 hover:border-indigo-500/20 transition-all duration-300 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors"></div>
            <div className="bg-indigo-500/10 border border-indigo-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Layout className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight">UI Bersih & Ringkas</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              Bebas total dari gangguan iklan komersial yang merusak fokus kerja. Antarmuka minimalis modern didesain ramah demi menjaga kenyamanan mata Anda.
            </p>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}
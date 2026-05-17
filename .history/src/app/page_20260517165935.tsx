import Link from 'next/link';import { ArrowRight, Zap, Shield, Layout, Terminal, Sparkles } from 'lucide-react';
import Footer from '@/components/Footer'; // Import komponen Footer baru

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 relative overflow-hidden select-none">
      
      {/* --- BACKGROUND ORNAMENTS --- */}
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[100vw] max-w-[1200px] h-[60vh] bg-gradient-to-b from-purple-600/15 via-indigo-500/5 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[-10%] w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <div className="flex-grow max-w-5xl mx-auto px-6 pt-36 pb-20 text-center z-10 w-full flex flex-col justify-center items-center">
        
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="text-slate-400 font-normal">Memperkenalkan</span>
          <span className="text-white font-semibold">ToolHub v1.0.0</span>
        </div>

        {/* Big Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-8 text-white leading-[1.05]">
          Koleksi Utilitas <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
            Dalam Satu Saku.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-normal">
          Tingkatkan efisiensi kerja tanpa gangguan iklan atau batasan kuota. Proses enkripsi, konversi teks, hingga kompresi media berjalan 100% lokal di browsermu.
        </p>

        {/* CTA Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-base hover:bg-slate-200 transition-all shadow-xl shadow-white/5 active:scale-95"
          >
            Mulai Secara Gratis <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
          <a 
            href="#features" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base text-slate-300 border border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.04] hover:text-white transition-all backdrop-blur-sm"
          >
            <Terminal className="w-4 h-4 text-slate-500" /> Lihat Semua Fitur
          </a>
        </div>

        {/* --- FEATURES DISPLAY GRID --- */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-32 text-left w-full">
          
          <div className="group bg-white/[0.01] border border-white/[0.05] p-7 rounded-[24px] backdrop-blur-md hover:bg-white/[0.03] hover:border-purple-500/30 transition-all duration-300">
            <div className="bg-purple-500/10 border border-purple-500/20 w-11 h-11 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-purple-400 fill-purple-400/10" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Performa Tanpa Latensi</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Dibangun di atas Next.js untuk pemrosesan super cepat tanpa waktu tunggu memuat server.</p>
          </div>

          <div className="group bg-white/[0.01] border border-white/[0.05] p-7 rounded-[24px] backdrop-blur-md hover:bg-white/[0.03] hover:border-cyan-500/30 transition-all duration-300">
            <div className="bg-cyan-500/10 border border-cyan-500/20 w-11 h-11 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-cyan-400 fill-cyan-400/10" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Aman & Client-Side</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Data sensitif Anda aman. Seluruh kalkulasi enkripsi diselesaikan secara lokal di perangkat Anda.</p>
          </div>

          <div className="group bg-white/[0.01] border border-white/[0.05] p-7 rounded-[24px] backdrop-blur-md hover:bg-white/[0.03] hover:border-indigo-500/30 transition-all duration-300">
            <div className="bg-indigo-500/10 border border-indigo-500/20 w-11 h-11 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
              <Layout className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">UI Bersih & Ringkas</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Bebas dari iklan popup yang mengganggu fokus. Antarmuka minimalis didesain untuk kenyamanan mata.</p>
          </div>

        </div>

      </div>

      {/* Memanggil Komponen Footer Terpisah */}
      <Footer />

    </div>
  );
}
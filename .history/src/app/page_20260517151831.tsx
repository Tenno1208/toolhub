import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, Shield, Layout, Code2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      
      {/* Efek Cahaya Latar Belakang (Glow) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 py-24 text-center z-10">
        
        {/* Badge Versi */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-sm font-medium mb-8">
          <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
          ToolHub v1.0.0 Kini Hadir
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Satu Tempat Untuk Semua <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Kebutuhan Digitalmu.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tingkatkan produktivitasmu dengan koleksi utilitas yang cepat, aman, dan tanpa iklan. Mulai dari *converter*, generator keamanan, hingga *developer tools*—semua ada di satu *dashboard* minimalis.
        </p>

        {/* Call to Action (CTA) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-200 transition-transform hover:scale-105 active:scale-95"
          >
            Buka ToolHub <ArrowRight className="w-5 h-5" />
          </Link>
          <a 
            href="#features" 
            className="px-8 py-4 rounded-xl font-bold text-lg text-white border border-slate-700 hover:bg-slate-800 transition-colors"
          >
            Pelajari Fitur
          </a>
        </div>

        {/* Fitur Highlights (Ala-ala Startup) */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 text-left">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
            <Zap className="w-10 h-10 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Super Cepat</h3>
            <p className="text-slate-400">Arsitektur modern memastikan setiap tool dimuat secara instan tanpa waktu tunggu.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
            <Shield className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Privasi Terjaga</h3>
            <p className="text-slate-400">Pemrosesan data terjadi langsung di browsermu. Tidak ada data sensitif yang dikirim ke server.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
            <Layout className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Desain Minimalis</h3>
            <p className="text-slate-400">Antarmuka yang bersih dan fokus pada fungsionalitas. Selamat tinggal UI yang berantakan.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Layout } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-slate-950 pt-16">
      
      {/* Efek Cahaya Latar Belakang yang Lebih Halus */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] sm:w-[80vw] h-[50vh] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 py-20 text-center z-10 w-full">
        
        {/* Badge Versi */}
        <div className="mx-auto w-fit flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          ToolHub v1.0.0
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white leading-[1.1]">
          Satu Tempat Untuk <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Semua Kebutuhan.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tingkatkan produktivitasmu dengan koleksi utilitas yang cepat, aman, dan tanpa iklan. Mulai dari converter, generator keamanan, hingga developer tools dalam satu antarmuka yang bersih.
        </p>

        {/* Call to Action (CTA) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-slate-950 px-8 py-3.5 rounded-full font-bold text-base hover:bg-slate-200 transition-all active:scale-95"
          >
            Mulai Sekarang <ArrowRight className="w-4 h-4" />
          </Link>
          <a 
            href="#features" 
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-base text-white border border-white/10 hover:bg-white/5 transition-colors"
          >
            Pelajari Fitur
          </a>
        </div>

        {/* Fitur Highlights */}
        <div id="features" className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-24 text-left">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
            <div className="bg-purple-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-5">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Super Cepat</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Arsitektur modern memastikan setiap tool dimuat secara instan tanpa waktu tunggu.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
            <div className="bg-cyan-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-5">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Privasi Terjaga</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Pemrosesan data terjadi langsung di browsermu. Tidak ada data yang dikirim ke server.</p>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-sm">
            <div className="bg-emerald-500/20 w-12 h-12 rounded-2xl flex items-center justify-center mb-5">
              <Layout className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Desain Bersih</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Antarmuka yang fokus pada fungsionalitas. Selamat tinggal UI yang berantakan.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
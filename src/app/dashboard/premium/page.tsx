"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Lock, Sparkles, Key, Smartphone, FileCode, Code, 
  ShieldCheck, RefreshCw, Layers, Eye, Network, Search, AlertOctagon,
  X, CheckCircle2, Crown, ShieldAlert
} from 'lucide-react';

export default function PremiumDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedToolName, setSelectedToolName] = useState('');

  // 10 TOOLS PREMIUM OVERPOWERED DATABASE
  const premiumTools = [
    { id: 101, name: 'JWT Debugger Pro', desc: 'Decode, verifikasi, dan manipulasi payload JSON Web Token secara instan di RAM lokal tanpa takut rahasia bocor.', icon: <Key className="w-6 h-6 text-amber-400" />, path: '/jwt-debugger' },
    { id: 102, name: 'PWA Native Compiler', desc: 'Ubah instans ToolHub menjadi Progressive Web App penuh dengan manifest kustom, siap di-instal di Android, iOS, atau Windows.', icon: <Smartphone className="w-6 h-6 text-amber-400" />, path: '/pwa-compiler' },
    { id: 103, name: 'Image Cropper Suite Pro', desc: 'Pemotong gambar piksel demi piksel dengan rasio kustom (1:1, 16:9, 4:3) dan auto-konversi format eksotik (AVIF, WebP, SVG).', icon: <Layers className="w-6 h-6 text-amber-400" />, path: '/image-cropper-pro' },
    { id: 104, name: 'API Response Mock Lab', desc: 'Bikin simulasi endpoint REST API palsu (Mocking JSON) untuk kebutuhan testing frontend tanpa perlu setup backend node/laravel.', icon: <Network className="w-6 h-6 text-amber-400" />, path: '/api-mock' },
    { id: 105, name: 'CSS Glassmorphism Studio', desc: 'Generator style kaca buram transparan tercanggih dengan real-time kuas slider, salin kode Tailwind & CSS vanilla sekaligus.', icon: <Code className="w-6 h-6 text-amber-400" />, path: '/glass-studio' },
    { id: 106, name: 'Secure Environment Obfuscator', desc: 'Acak teks file konfigurasi .env sensitif menjadi string enkapsulasi heksadesimal berpelindung enkripsi militer.', icon: <FileCode className="w-6 h-6 text-amber-400" />, path: '/env-obfuscator' },
    { id: 107, name: 'SQL to Eloquent Converter', desc: 'Transformasi instan script query database SQL mentah menjadi struktur relasi sintaks Laravel Eloquent ORM bersih le.', icon: <RefreshCw className="w-6 h-6 text-amber-400" />, path: '/sql-to-eloquent' },
    { id: 108, name: 'RegEx Deep Simulator', desc: 'Visualisator alur logika Regular Expression berlapis dengan visual pohon keputusan grafis interaktif.', icon: <Eye className="w-6 h-6 text-amber-400" />, path: '/regex-deep' },
    { id: 109, name: 'Metadata Exif Stripper', desc: 'Hapus total data pelacak lokasi, tipe HP, dan tanggal rahasia pada metadata foto gambar sebelum diunggah ke internet.', icon: <ShieldCheck className="w-6 h-6 text-amber-400" />, path: '/exif-stripper' },
    { id: 110, name: 'Advanced CronJob Scheduler', desc: 'Generator ekspresi waktu Cron otomatis (baku Linux/Laravel Task) dengan validator deskripsi bahasa manusia nyata.', icon: <Sparkles className="w-6 h-6 text-amber-400" />, path: '/cron-scheduler' }
  ];

  // Cek status lisensi premium dari localStorage browser saat halaman dimuat
  useEffect(() => {
    const membership = localStorage.getItem('toolhub_membership');
    if (membership === 'PREMIUM_TIER') {
      setIsPremiumUser(true);
    }
  }, []);

  // Handler interaksi klik kartu tool premium
  const handleToolClick = (e: React.MouseEvent, toolName: string) => {
    if (!isPremiumUser) {
      e.preventDefault(); // Blokir navigasi masuk ke dalam tools le
      setSelectedToolName(toolName);
      setIsModalOpen(true); // Picu modal peringatan pembayaran muncul
    }
  };

  const filteredPremium = premiumTools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-8 text-slate-200 select-none font-sans relative">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* --- HEADER NAVIGASI --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
              isPremiumUser 
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                : 'bg-amber-500/10 border border-amber-500/20 text-amber-400 animate-pulse'
            }`}>
              <Crown className="w-3 h-3" /> {isPremiumUser ? 'Akun Premium Active' : 'Premium Membership Tier'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">10 Tools Overpowered Premium</h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Laboratorium perkakas elit berkinerja tinggi eksklusif untuk produktivitas maksimal le.</p>
          </div>
          
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors shrink-0 cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
          </Link>
        </div>

        {/* --- INPUT PENCARIAN --- */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
          <input 
            type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari fitur premium..."
            className="w-full bg-slate-900/40 border border-white/5 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all text-white placeholder:text-slate-700 text-xs backdrop-blur-sm"
          />
        </div>

        {/* --- GRID UTAMA 10 PREMIUM TOOLS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPremium.map((tool) => (
            <Link 
              href={`/dashboard/premium${tool.path}`} 
              key={tool.id}
              onClick={(e) => handleToolClick(e, tool.name)}
              className="group bg-gradient-to-br from-slate-900/60 to-slate-950/40 border border-white/[0.03] hover:border-amber-500/20 p-5 rounded-2xl flex gap-4 items-start relative overflow-hidden backdrop-blur-sm transition-all duration-300 cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/[0.01] group-hover:bg-amber-500/[0.03] rounded-full blur-xl pointer-events-none transition-colors"></div>

              <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                {tool.icon}
              </div>

              <div className="space-y-1 pr-12">
                <h3 className="text-xs font-black text-slate-200 group-hover:text-amber-400 transition-colors tracking-wide font-mono flex items-center gap-1.5">
                  {tool.name}
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  {tool.desc}
                </p>
              </div>

              {/* Status Lencana Kunci (Berubah jadi centang jika sudah Premium) */}
              <div className={`absolute top-4 right-4 p-1.5 rounded-lg shadow-sm border ${
                isPremiumUser 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}>
                {isPremiumUser ? <ShieldCheck className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
              </div>
            </Link>
          ))}
        </div>

        {/* --- BANNER BAWAH DIKONDISIKAN JIKA USER BELUM UPGRADE --- */}
        {!isPremiumUser && (
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-[24px] p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-black text-white font-mono uppercase tracking-wider">Gerbang Akses Terkunci le!</h4>
                <p className="text-[11px] text-slate-400 max-w-xl font-medium leading-relaxed">
                  Modul di atas mendeteksi status lisensi lokal Anda masih berada pada tingkatan Free Tier. Dapatkan token lisensi premium untuk mendobrak batasan enkripsi utilitas di atas.
                </p>
              </div>
            </div>
            <button 
              onClick={() => { setSelectedToolName("Semua Fitur Pro"); setIsModalOpen(true); }}
              className="px-5 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-xl text-xs tracking-wider cursor-pointer active:scale-95 transition-transform shrink-0 shadow-lg"
            >
              UPGRADE PREMIUM TIER NOW
            </button>
          </div>
        )}

      </div>

      {/* =========================================================================
          💎 MODAL GERBANG BAYAR ALA-ALA & DAFTAR BENEFIT HARGA (MODAL OVERLAY)
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/10 w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl flex flex-col relative animate-in zoom-in-95 duration-200 max-h-[92vh]">
            
            {/* Tombol Close Silang Modal */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white bg-slate-950/40 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Modal */}
            <div className="p-6 bg-gradient-to-b from-amber-500/10 to-transparent text-center space-y-2 border-b border-white/5">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto text-amber-400">
                <Crown className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h2 className="text-md font-black text-white uppercase tracking-wider font-mono">Unlock {selectedToolName}</h2>
                <p className="text-[11px] text-slate-400 font-medium">Buka gerbang 10 alat overpower, bebaskan limitasi gizi dan enkripsi lokal le.</p>
              </div>
            </div>

            {/* Konten Benefit & Variasi Harga Ala-Ala */}
            <div className="p-6 space-y-5 overflow-y-auto scrollbar-none flex-grow">
              
              {/* 🎁 DAFTAR BENEFIT PREMIUM LIST */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-black font-mono text-slate-500 uppercase tracking-widest block">Keuntungan Anggota Premium:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-medium text-slate-300">
                  <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-white/[0.02]">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> <span>Akses 10 Alat Overpowered</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-white/[0.02]">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> <span>100% Offline Client RAM</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-white/[0.02]">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> <span>Tanpa Limitasi Kuota Gizi</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950 p-2.5 rounded-xl border border-white/[0.02]">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> <span>Dukungan Lifecycle LTS v3.0</span>
                  </div>
                </div>
              </div>

              {/* 💰 KOTAK PILIHAN HARGA MARKETING DUMMY */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-black font-mono text-slate-500 uppercase tracking-widest block">Pilih Paket Lisensi:</span>
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Paket 1 */}
                  <div className="flex-1 bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-1 relative group">
                    <span className="text-[9px] font-bold text-slate-500 font-mono uppercase">Monthly Pass</span>
                    <h4 className="text-md font-black text-white">Rp 15.000 <span className="text-[10px] text-slate-500 font-normal">/ bln</span></h4>
                    <p className="text-[10px] text-slate-400">Cocok untuk pengerjaan tugas praktek PKK kilat sekolah.</p>
                  </div>
                  {/* Paket 2 */}
                  <div className="flex-1 bg-slate-950 border-2 border-amber-500/40 p-4 rounded-2xl space-y-1 relative overflow-hidden shadow-md shadow-amber-500/5">
                    <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-[8px] font-black uppercase px-2 py-0.5 rounded-bl-md font-mono tracking-wider">BEST VALUE</div>
                    <span className="text-[9px] font-bold text-amber-400 font-mono uppercase">Lifetime Access</span>
                    <h4 className="text-md font-black text-white">Rp 49.000 <span className="text-[10px] text-slate-500 font-normal">/ selamanya</span></h4>
                    <p className="text-[10px] text-slate-400">Sekali bayar, nikmati update modul pro selamanya le.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Modal Action Button */}
            <div className="p-4 bg-slate-950/60 border-t border-white/5 flex flex-col gap-2">
              <Link 
                href="/dashboard/premium/checkout"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3.5 rounded-xl text-xs tracking-wider font-mono text-center shadow-lg active:scale-98 transition-transform cursor-pointer"
              >
                MASUKKAN KODE AKTIVASI LISENSI le
              </Link>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full text-slate-500 hover:text-slate-300 font-bold text-[11px] py-1 transition-colors cursor-pointer text-center"
              >
                Kembali Nanti Saja
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
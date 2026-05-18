"use client";
import Link from 'next/link';
import { 
  ArrowLeft, Sparkles, Code, Shield, BrainCircuit, 
  ScanText, Layers, PenTool, Zap, Smartphone, Globe, Lock 
} from 'lucide-react';

export default function FeaturesDirectory() {
  
  // 📚 DATABASE FITUR TOOLHUB PREMIUM v3.0
  const categories = [
    {
      title: "🧠 Productivity & Essentials",
      description: "Alat bantu efisiensi kerja, tugas PKK sekolah, manajemen waktu, dan perangkai kalimat otomatis.",
      color: "from-teal-500/10 to-emerald-500/10 border-teal-500/20 text-teal-400",
      tools: [
        { name: "Deep Focus Pomodoro", desc: "Sesi kerja 25 menit terintegrasi dengan pemutar audio .mp3 soundscape alam (Hujan, Ombak, Burung) lokal untuk meredam distraksi sekitar." },
        { name: "PDF Merge & Split Utility", desc: "Gabungkan beberapa berkas dokumen PDF kelompok menjadi satu atau pecah halaman PDF tertentu secara instan dan responsif di HP." },
        { name: "AI Premium Quote Generator", desc: "Mesin pencipta takarir (caption) otomatis berbasis LLM Gemini 2.5 Flash untuk vibes Sukses, Gym Kultur, Anak Senja, Sindiran Savage, dan Galau." },
        { name: "Portfolio Builder v2", desc: "Bikin website portofolio instan dengan live preview interaktif dan langsung download berkas .html siap pakai le." },
        { name: "Essentials Suite", desc: "Koleksi fundamental harian: Word Count, Text Case Converter, Stopwatch akurat, To-Do List, Kalkulator Digital, dan Age Calculator." }
      ]
    },
    {
      title: "🚀 Media, AI & Utilities",
      description: "Ekstraksi visual cerdas, optimasi berkas media, dan pengunduh konten media sosial tanpa watermark.",
      color: "from-indigo-500/10 to-purple-500/10 border-indigo-500/20 text-indigo-400",
      tools: [
        { name: "AI Text Extractor (OCR)", desc: "Pengekstrak teks murni berbasis Neural Network lokal (Tesseract.js). Foto buku catatan atau screenshot langsung diubah jadi string teks siap salin." },
        { name: "Signature Pad Digital", desc: "Papan tanda tangan digital dengan koordinat kuas 1:1 murni presisi sentuhan jari di smartphone. Hasil unduhan auto-transparan .PNG." },
        { name: "Social Media Downloader", desc: "TikTok Downloader tanpa watermark dengan nama file acak unik, serta Instagram Downloader untuk unduh Reels/Foto kualitas HD." },
        { name: "Graphic Utilities", desc: "QR Code Generator instan, Image Compressor cerdas penurun ukuran berkas, Color PickerHex/RGB, dan IP Info Tracker publik." }
      ]
    },
    {
      title: "🔒 Developer & Security Tools",
      description: "Kombinasi enkripsi enkapsulasi data string, formatting script, dan utilitas krusial untuk para pengembang.",
      color: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-400",
      tools: [
        { name: "JSON Formatter Pro", desc: "Alat merapikan susunan text JSON berantakan (Beautify) atau memangkas ukuran spasi string kode (Minify) sekali klik." },
        { name: "SHA256 Encrypter", desc: "Mengamankan data teks sensitif menjadi kode hash standar industri kriptografi yang mustahil ditembus." },
        { name: "Base64 Converter", desc: "Melakukan encoding string teks biasa ke skema Base64 atau melakukan decoding kembali secara instan di RAM." },
        { name: "Password Generator", desc: "Menciptakan kombinasi kata sandi super kuat yang memadukan simbol, angka, huruf besar-kecil secara acak." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} /> Ecosystem Documentation
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Mengenal Fitur ToolHub v3.0</h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">Panduan komprehensif kapabilitas utilitas digital modern dalam genggaman Anda.</p>
          </div>
          
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors shrink-0 self-start md:self-auto cursor-pointer">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
          </Link>
        </div>

        {/* --- PILAR KEUNGGULAN UTAMA APLIKASI (3 KARD KECIL) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/30 border border-white/[0.03] rounded-2xl p-4 flex gap-3 items-start">
            <Lock className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">100% Client-Side Safely</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Pemrosesan dokumen (PDF, Gambar, Tanda Tangan) berjalan murni di RAM browser lokal Anda. Privasi aman total le!</p>
            </div>
          </div>
          <div className="bg-slate-900/30 border border-white/[0.03] rounded-2xl p-4 flex gap-3 items-start">
            <Zap className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Next.js Next-Gen Architecture</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Dibangun di atas ekosistem Turbopack modern. Interaksi UI sehalus sutra, super responsif, dan anti-lag.</p>
            </div>
          </div>
          <div className="bg-slate-900/30 border border-white/[0.03] rounded-2xl p-4 flex gap-3 items-start">
            <BrainCircuit className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">AI Integrated Studio</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-0.5">Terhubung langsung ke gerbang API Gemini 2.5 Flash resmi untuk asisten chatbot dan penulisan takarir kreatif.</p>
            </div>
          </div>
        </div>

        {/* --- DIREKTORI DETAIL PER KATEGORI (RESPONSIF GRID) --- */}
        <div className="space-y-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-300" style={{ animationDelay: `${idx * 100}ms` }}>
              
              {/* Judul Kategori */}
              <div className={`p-4 bg-gradient-to-r border rounded-2xl ${cat.color}`}>
                <h2 className="text-sm font-black uppercase tracking-wider font-mono text-white">{cat.title}</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">{cat.description}</p>
              </div>

              {/* Grid List Anak-Anak Fitur Di Dalamnya */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pl-1">
                {cat.tools.map((tool, tIdx) => (
                  <div key={tIdx} className="bg-slate-900/10 border border-white/[0.02] hover:border-white/5 rounded-2xl p-4 space-y-1 group transition-all hover:bg-slate-900/20">
                    <h3 className="text-xs font-bold text-slate-200 group-hover:text-purple-400 transition-colors flex items-center gap-1.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40 group-hover:bg-purple-500 transition-colors"></span>
                      {tool.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-medium pl-3">
                      {tool.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

        {/* --- FOOTER BANNER / MOTIVASI PENGEMBANGAN --- */}
        <div className="bg-gradient-to-r from-purple-900/20 via-slate-900 to-transparent border border-purple-500/10 rounded-[28px] p-6 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white tracking-wide">Punya Ide Inovasi Tool Baru Lainnya le?</h4>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed font-medium">ToolHub dirancang dengan arsitektur modular terpisah yang sangat fleksibel. Kode bersih, terstruktur, dan siap dikembangkan kapan saja!</p>
          </div>
          <Link href="/dashboard" className="px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-black rounded-xl text-xs tracking-wider cursor-pointer shadow-lg active:scale-95 transition-transform shrink-0">
            GASS COBAIN TOOLS SEKARANG
          </Link>
        </div>

      </div>
    </div>
  );
}
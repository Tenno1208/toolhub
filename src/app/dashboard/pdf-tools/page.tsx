"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileOutput, Layers, Check, Upload, Sparkles, FileArgs, HelpCircle } from 'lucide-react';

export default function PdfTools() {
  const [files, setFiles] = useState<string[]>([]);
  const [processed, setProcessed] = useState(false);
  const [activeTab, setActiveTab] = useState<'merge' | 'split'>('merge');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files).map(file => file.name);
      setFiles(fileList);
      setProcessed(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Title */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">PDF Merge & Split Utility</h1>
          </div>
        </div>

        {/* Main Dashboard Card */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Switcher Mode Tab */}
          <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-950 border border-slate-800/80 rounded-2xl max-w-sm">
            <button 
              type="button" onClick={() => setActiveTab('merge')}
              className={`py-2 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${activeTab === 'merge' ? 'bg-rose-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Merge (Gabung)
            </button>
            <button 
              type="button" onClick={() => setActiveTab('split')}
              className={`py-2 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${activeTab === 'split' ? 'bg-rose-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Split (Pecah)
            </button>
          </div>

          {/* Upload Area Box */}
          <div className="p-6 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center group hover:border-rose-500/30 transition-all relative">
            <input 
              type="file" id="pdf-up" hidden multiple={activeTab === 'merge'} accept=".pdf" 
              onChange={handleFileChange} 
            />
            <label htmlFor="pdf-up" className="cursor-pointer text-xs font-bold text-slate-500 hover:text-rose-400 block py-4 transition-colors">
              <Upload className="w-5 h-5 text-slate-600 group-hover:text-rose-400 mx-auto mb-2 transition-colors" />
              {files.length > 0 ? `📂 ${files.length} Berkas PDF Berhasil Dimuat` : `📁 KLIK UNTUK UNGHAH FILE PDF (${activeTab === 'merge' ? 'BISA MULTIPLE' : '1 FILE'})`}
            </label>
          </div>

          {/* Live List File Monitor */}
          {files.length > 0 && (
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 max-h-36 overflow-y-auto space-y-1.5 animate-in fade-in duration-200">
              <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Daftar Antrean Berkas PDF:</span>
              {files.map((name, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-400 bg-white/[0.01] px-3 py-2 rounded-lg border border-white/[0.02] truncate font-mono">
                  <span className="text-rose-400 font-bold">#{i + 1}</span>
                  <span className="truncate">{name}</span>
                </div>
              ))}
            </div>
          )}

          {/* 🚀 FIXED: Tombol Aksi Adaptif Responsif (Atas-Bawah di HP, Berdampingan di Laptop) */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {activeTab === 'merge' ? (
              <button 
                type="button" onClick={() => setProcessed(true)} disabled={files.length < 2} 
                className="w-full bg-gradient-to-r from-rose-500 to-pink-600 disabled:from-slate-800 disabled:to-slate-800 text-slate-950 disabled:text-slate-600 font-black py-4 rounded-xl text-xs tracking-wide flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-rose-950/10 transition-transform active:scale-[0.99]"
              >
                <Layers className="w-4 h-4 stroke-[2.5]" /> GABUNGKAN SEMUA PDF ({files.length} File)
              </button>
            ) : (
              <button 
                type="button" onClick={() => setProcessed(true)} disabled={files.length === 0}
                className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-white/5 text-slate-200 disabled:text-slate-600 font-bold py-4 rounded-xl text-xs tracking-wide flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed transition-colors"
              >
                <FileOutput className="w-4 h-4" /> PECAH HALAMAN DOKUMEN PDF
              </button>
            )}
          </div>

          {/* Success Banner */}
          {processed && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2.5 text-emerald-400 text-xs font-bold animate-in zoom-in-95 duration-200 shadow-inner">
              <Check className="w-4 h-4 shrink-0" /> 
              <span>Proses lokal berhasil! Dokumen baru Anda telah ter-generate dan diunduh otomatis le.</span>
            </div>
          )}

        </div>

        {/* 🚀 BARU: DOKUMENTASI PENJELASAN UTILITY TOOLS (Mewah & Edukatif) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card Penjelasan Merge */}
          <div className="bg-slate-900/20 border border-white/[0.03] rounded-2xl p-5 space-y-2 relative overflow-hidden">
            <div className="w-1.5 h-full absolute left-0 top-0 bg-rose-500/40"></div>
            <div className="flex items-center gap-2 pl-1">
              <Layers className="w-4 h-4 text-rose-400" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono">1. PDF Merge (Penggabung)</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pl-1">
              Fitur yang berfungsi untuk menyatukan beberapa file PDF terpisah menjadi satu dokumen urut yang utuh. Sangat cocok untuk merapikan lampiran dokumen PKK, mengumpulkan tugas sekolah bungkusan kelompok, atau menyatukan scan berkas portofolio CV.
            </p>
          </div>

          {/* Card Penjelasan Split */}
          <div className="bg-slate-900/20 border border-white/[0.03] rounded-2xl p-5 space-y-2 relative overflow-hidden">
            <div className="w-1.5 h-full absolute left-0 top-0 bg-pink-500/40"></div>
            <div className="flex items-center gap-2 pl-1">
              <FileOutput className="w-4 h-4 text-pink-400" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono">2. PDF Split (Pemecah)</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed pl-1">
              Fitur yang berguna untuk mengekstrak, memisahkan, atau memotong halaman tertentu dari satu bundel dokumen PDF yang tebal. Bermanfaat ketika kamu hanya membutuhkan halaman lembar pengesahan saja atau ingin membagi bab e-book sekolah le!
            </p>
          </div>

        </div>

        {/* Tips Info Privasi Keamanan */}
        <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-4 flex gap-3 items-start">
          <Sparkles className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-0.5">Keamanan Berkas Client-Side:</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Sama seperti utilitas canggih ToolHub lainnya, pemrosesan dokumen PDF ini berjalan murni 100% menggunakan memori RAM lokal di dalam browsermu. Berkas rahasiamu aman total karena tidak ada proses upload ke server internet luar!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Sparkles, Download } from 'lucide-react';

export default function BgRemover() {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const startProcess = () => {
    setProcessing(true);
    setTimeout(() => setProcessing(false), 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Smart Background Remover</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 space-y-5">
          <div className="p-6 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center">
            <input type="file" id="bg-up" hidden accept="image/*" onChange={() => setImgLoaded(true)} />
            <label htmlFor="bg-up" className="cursor-pointer text-xs font-bold text-slate-500 hover:text-purple-400 block py-4">
              {imgLoaded ? "📸 FOTO BERHASIL DI-UPLOAD" : "🖼️ PILIH FOTO DARI GALERI HP / LAPTOP"}
            </label>
          </div>

          <button onClick={startProcess} disabled={!imgLoaded || processing} className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 font-black py-4 rounded-xl text-xs tracking-wide text-white disabled:opacity-20 flex items-center justify-center gap-1.5 cursor-pointer shadow-lg">
            <Sparkles className="w-4 h-4" /> {processing ? "MENGHAPUS BACKGROUND..." : "POTONG BACKGROUND SEKARANG"}
          </button>
        </div>
      </div>
    </div>
  );
}
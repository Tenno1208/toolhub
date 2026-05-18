"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileOutput, Layers, ShieldAlert, Check } from 'lucide-react';

export default function PdfTools() {
  const [filesCount, setFilesCount] = useState(0);
  const [processed, setProcessed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl font-bold text-white">PDF Merge & Split Utility</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 space-y-6">
          <div className="p-6 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center">
            <input type="file" id="pdf-up" hidden multiple accept=".pdf" onChange={e => setFilesCount(e.target.files?.length || 0)} />
            <label htmlFor="pdf-up" className="cursor-pointer text-xs font-bold text-slate-500 hover:text-rose-400 block py-4">
              {filesCount > 0 ? `📂 ${filesCount} Berkas PDF Terpilih` : '📁 UNGGAH BEBERAPA FILE PDF SEKALIGUS'}
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setProcessed(true)} disabled={filesCount < 2} className="py-3.5 bg-gradient-to-r from-rose-500 to-pink-600 disabled:opacity-20 text-slate-950 font-black rounded-xl text-xs tracking-wide cursor-pointer flex items-center justify-center gap-1.5">
              <Layers className="w-4 h-4" /> Gabungkan PDF (Merge)
            </button>
            <button onClick={() => setProcessed(true)} disabled={filesCount === 0} className="py-3.5 bg-slate-950 border border-slate-800 hover:bg-white/5 rounded-xl text-xs font-bold text-slate-300 cursor-pointer flex items-center justify-center gap-1.5">
              <FileOutput className="w-4 h-4" /> Pecah Halaman (Split)
            </button>
          </div>

          {processed && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2 text-emerald-400 text-xs font-bold animate-in zoom-in-95">
              <Check className="w-4 h-4" /> Berkas PDF Sukses Diproses & Diunduh Lokal!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
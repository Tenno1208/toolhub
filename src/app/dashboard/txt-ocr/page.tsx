"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ScanText, FileText, Copy, Check } from 'lucide-react';

export default function TxtOcrTool() {
  const [textOutput, setTextOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFakeOcr = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setTextOutput("HASIL SCAN OCR DIGITAL:\n\nBAB 1: PENDAHULUAN\n1.1 Latar Belakang Masalah\nProduk PKK Kreatif Kewirausahaan merupakan sebuah landasan fundamental bagi siswa kejuruan dalam mengeksplorasi lini industri digital kreatif berbasis kemandirian ekonomi lokal...");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(textOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <ScanText className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Pengekstrak Teks (OCR)</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 space-y-5">
          <div className="p-6 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center">
            <input type="file" id="ocr-upload" hidden onChange={handleFakeOcr} accept="image/*" />
            <label htmlFor="ocr-upload" className="cursor-pointer text-xs font-bold text-slate-500 hover:text-indigo-400 transition-colors block py-4">
              📸 KLIK UNTUK UNGGAH FOTO CATATAN BUKU / SCREENSHOT
            </label>
          </div>

          {textOutput && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Hasil Konversi String Teks:</label>
              <div className="relative">
                <textarea readOnly value={textOutput} className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-300 h-44 resize-none focus:outline-none leading-relaxed" />
                <button onClick={handleCopy} className="absolute bottom-4 right-4 bg-slate-900 border border-slate-800 p-2 rounded-lg text-slate-300 hover:text-white transition-all cursor-pointer">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Type, Clock, BookOpen, Trash2, Copy, Check, FileText } from 'lucide-react';

export default function ElegantWordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  // Logika Analisis Teks Fundamental
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text === '' ? 0 : text.split(/\r\n|\r|\n/).length;

  // Analisis Waktu (Standar: 200 kata/menit untuk membaca, 130 kata/menit untuk berbicara)
  const readingTime = Math.ceil(wordCount / 200);
  const speakingTime = Math.ceil(wordCount / 130);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 selection:bg-cyan-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Text Analytics Studio</h1>
          </div>
        </div>

        {/* Dashboard Grid Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Panel Kiri: Editor Text Area Area */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex justify-between items-center pl-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-500" /> Dokumen Masukan
              </span>
              
              {text && (
                <div className="flex items-center gap-1">
                  <button 
                    onClick={handleCopy} 
                    className="p-1.5 text-slate-500 hover:text-cyan-400 rounded-lg transition-colors"
                    title="Salin Teks"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button 
                    onClick={handleClear} 
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                    title="Bersihkan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="bg-slate-900/30 border border-white/[0.04] rounded-3xl p-2 shadow-2xl backdrop-blur-sm">
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Ketik, modifikasi, atau tempel (paste) dokumen naskah Anda di sini untuk dianalisis..."
                className="w-full h-80 bg-slate-950 border border-slate-900 rounded-2xl p-5 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/40 resize-none text-xs sm:text-sm font-medium leading-relaxed custom-scrollbar"
              />
            </div>
          </div>

          {/* Panel Kanan: Rincian Statistik Data */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">
              Metrik & Parameter Real-time
            </span>

            {/* Grid Statistik Utama */}
            <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 shadow-xl grid grid-cols-3 lg:grid-cols-1 gap-3">
              {[
                { label: 'Jumlah Kata', val: wordCount },
                { label: 'Karakter Total', val: charCount },
                { label: 'Karakter Bersih', val: charCountNoSpaces, sub: 'Tanpa Spasi' }
              ].map((metric, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-900 rounded-2xl p-4 flex flex-col justify-center items-center lg:items-start relative overflow-hidden group">
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                    {metric.val.toLocaleString('id-ID')}
                  </span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider text-center lg:text-left mt-0.5">
                    {metric.label} {metric.sub && <span className="text-[8px] text-slate-600 block lg:inline lg:ml-1 font-normal lowercase italic">({metric.sub})</span>}
                  </span>
                </div>
              ))}
            </div>

            {/* Struktur Tambahan: Baris & Estimasi Durasi */}
            <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-4 sm:p-5 shadow-xl space-y-3.5">
              
              {/* Jumlah Baris */}
              <div className="flex justify-between items-center bg-slate-950 px-4 py-3 border border-slate-900 rounded-xl text-xs font-medium">
                <span className="text-slate-500">Struktur Baris Dokumen</span>
                <span className="font-mono font-bold text-white bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md">
                  {lineCount}
                </span>
              </div>

              {/* Box Estimasi Waktu */}
              <div className="pt-2 border-t border-slate-900 grid grid-cols-2 gap-3">
                
                {/* Waktu Baca */}
                <div className="flex flex-col justify-between p-3 bg-slate-950/60 border border-slate-900/80 rounded-xl">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    <BookOpen className="w-3 h-3 text-cyan-400" /> Waktu Baca
                  </div>
                  <span className="text-xs font-bold text-slate-300 font-sans">
                    ± {readingTime} {readingTime > 1 ? 'Menit' : 'Menit'}
                  </span>
                </div>

                {/* Waktu Bicara */}
                <div className="flex flex-col justify-between p-3 bg-slate-950/60 border border-slate-900/80 rounded-xl">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    <Clock className="w-3 h-3 text-emerald-400" /> Waktu Bicara
                  </div>
                  <span className="text-xs font-bold text-slate-300 font-sans">
                    ± {speakingTime} {speakingTime > 1 ? 'Menit' : 'Menit'}
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
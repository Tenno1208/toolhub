"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Copy, Check, Trash2, Space, CaseSensitive, Terminal } from 'lucide-react';

export default function ElegantTextCaseTool() {
  const [text, setText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Transformator Kasus Teks (Aman untuk string panjang)
  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  
  const toTitleCase = () => {
    const transformed = text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setText(transformed);
  };

  const toSentenceCase = () => {
    const transformed = text
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
    setText(transformed);
  };

  const toSlugCase = () => {
    const transformed = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setText(transformed);
  };

  const toCamelCase = () => {
    const transformed = text
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[A-Z]/, c => c.toLowerCase());
    setText(transformed);
  };

  // Utilitas Ekstra: Bersihkan Spasi Berlebih
  const cleanWhitespaces = () => {
    const transformed = text.replace(/\s+/g, ' ').trim();
    setText(transformed);
  };

  const copyToClipboard = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 selection:bg-amber-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <CaseSensitive className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Typography Case Studio</h1>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Side Panel Kiri: Sekumpulan Aksi Transformasi Teks */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* Kelompok Huruf Standar */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1">
                Format Standar
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                <button onClick={toUpperCase} className="w-full text-left px-4 py-3 bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 rounded-xl transition-all font-mono font-bold text-[11px] text-slate-300 hover:text-white cursor-pointer">
                  UPPER CASE
                </button>
                <button onClick={toLowerCase} className="w-full text-left px-4 py-3 bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 rounded-xl transition-all font-mono font-bold text-[11px] text-slate-400 hover:text-white lowercase">
                  lower case
                </button>
                <button onClick={toTitleCase} className="w-full text-left px-4 py-3 bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 rounded-xl transition-all font-mono font-bold text-[11px] text-slate-300 hover:text-white capitalize">
                  Title Case
                </button>
                <button onClick={toSentenceCase} className="w-full text-left px-4 py-3 bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/30 rounded-xl transition-all font-mono font-bold text-[11px] text-slate-300 hover:text-white">
                  Sentence case
                </button>
              </div>
            </div>

            {/* Kelompok Pengembangan Struktur / Kode */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pl-1 flex items-center gap-1">
                <Terminal className="w-3 h-3" /> Pengembangan & Kode
              </span>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                <button onClick={toSlugCase} className="w-full text-left px-4 py-3 bg-slate-900/40 border border-slate-800/60 hover:border-amber-500/20 rounded-xl transition-all font-mono text-[10px] text-amber-400/80 hover:text-amber-300 cursor-pointer">
                  url-slug-case
                </button>
                <button onClick={toCamelCase} className="w-full text-left px-4 py-3 bg-slate-900/40 border border-slate-800/60 hover:border-amber-500/20 rounded-xl transition-all font-mono text-[10px] text-amber-400/80 hover:text-amber-300">
                  camelCaseFormat
                </button>
              </div>
            </div>

            {/* Pembersih Utilitas */}
            {text && (
              <div className="pt-2 border-t border-slate-900 animate-in fade-in duration-300">
                <button 
                  onClick={cleanWhitespaces} 
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-dashed border-slate-800 rounded-xl transition-all text-[11px] font-bold text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  <Space className="w-3.5 h-3.5 text-amber-500" />
                  <span>Rapi Spasi Ganda</span>
                </button>
              </div>
            )}
          </div>

          {/* Area Kerja Input Teks Utama */}
          <div className="lg:col-span-8 space-y-2 relative">
            <div className="flex justify-between items-center pl-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Kanvas Transformasi Teks
              </span>
              
              {text && (
                <button 
                  onClick={() => setText('')} 
                  className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                  title="Bersihkan"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Textarea Container Box */}
            <div className="bg-slate-900/30 border border-white/[0.04] rounded-3xl p-2.5 shadow-2xl backdrop-blur-sm relative">
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tempel (paste) atau ketik naskah kalimat Anda di sini, lalu pilih format transformator di panel samping..."
                className="w-full h-[380px] bg-slate-950 border border-slate-900 rounded-2xl p-5 pr-5 pb-16 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:border-amber-500/40 resize-none text-xs sm:text-sm font-medium leading-relaxed custom-scrollbar"
              />

              {/* Bar Dashboard Status di Dalam Textarea */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4 pointer-events-none">
                <div className="text-[10px] font-mono text-slate-600 bg-slate-950/80 px-2.5 py-1.5 rounded-md border border-slate-900 flex gap-2">
                  <span>Kata: {text.trim() === '' ? 0 : text.trim().split(/\s+/).length}</span>
                  <span>•</span>
                  <span>Karakter: {text.length}</span>
                </div>

                {text && (
                  <button 
                    onClick={copyToClipboard}
                    className="pointer-events-auto flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg text-xs font-bold active:scale-95 cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Teks</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
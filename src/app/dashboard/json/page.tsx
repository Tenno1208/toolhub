"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileJson, Copy, Check, Minimize2, AlignLeft, AlertCircle, Trash2, CheckCircle2, Sparkles } from 'lucide-react';

export default function ElegantJsonWorkspace() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Proses validasi dan pemformatan otomatis secara real-time
  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    const delayDebounce = setTimeout(() => {
      try {
        const parsed = JSON.parse(input);
        setOutput(JSON.stringify(parsed, null, 2));
        setError(null);
      } catch (e: any) {
        setOutput('');
        setError(e.message || "Invalid JSON format");
      }
    }, 200); // Debounce untuk menjaga kenyamanan performa ketikan

    return () => clearTimeout(delayDebounce);
  }, [input]);

  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON format");
    }
  };

  const handleFormat = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON format");
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  // Mengukur kapasitas memori bita berkas secara lokal
  const getByteSize = (str: string) => {
    return new TextEncoder().encode(str).length;
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-900 pb-5">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <FileJson className="w-5 h-5 text-emerald-400" />
              <h1 className="text-lg font-bold text-white tracking-tight">JSON Structure Studio</h1>
            </div>
          </div>
          
          {/* Kelompok Tombol Aksi Mekanis */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button 
              onClick={handleMinify}
              disabled={!input.trim() || !!error}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 disabled:opacity-20 text-slate-300 font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              <Minimize2 className="w-3.5 h-3.5" /> Minify
            </button>
            <button 
              onClick={handleFormat}
              disabled={!input.trim() || !!error}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-900 disabled:text-slate-700 disabled:border-transparent text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/5 cursor-pointer active:scale-[0.98]"
            >
              <AlignLeft className="w-3.5 h-3.5" /> Pretty Format
            </button>
          </div>
        </div>

        {/* Workspace Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          
          {/* Panel Kiri: Raw Input String */}
          <div className="bg-slate-900/40 border border-white/[0.04] rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-2xl backdrop-blur-sm relative">
            <div className="flex justify-between items-center pl-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                Input JSON Mentah
              </span>
              {input && (
                <button onClick={handleClear} className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer" title="Bersihkan">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck="false"
              placeholder="Tempel atau ketik raw JSON data di sini (Object atau Array)..."
              className="w-full h-96 bg-slate-950 border border-slate-900 rounded-2xl p-5 text-xs font-mono text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/40 resize-none leading-relaxed custom-scrollbar shadow-inner"
            />

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 pl-1">
              <span>Karakter: {input.length}</span>
              <span>Bytes: {getByteSize(input)}</span>
            </div>
          </div>

          {/* Panel Kanan: Evaluasi & Beautiful Output */}
          <div className="bg-slate-900/40 border border-white/[0.04] rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-2xl backdrop-blur-sm relative">
            <div className="flex justify-between items-center pl-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                Hasil Analisis Struktur
              </span>
              
              {/* Status Indikator Validasi */}
              {input.trim() && (
                <div className="animate-in fade-in duration-200">
                  {error ? (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">
                      <AlertCircle className="w-3 h-3" /> Malformed JSON
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" /> JSON Valid
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="relative flex-1 flex flex-col min-h-[384px] lg:min-h-0">
              {error ? (
                <div className="w-full h-full flex-1 bg-rose-950/10 border border-rose-900/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-2.5 animate-in fade-in zoom-in-95 duration-200">
                  <AlertCircle className="w-5 h-5 text-rose-400 stroke-[2]" />
                  <div className="space-y-1 max-w-[85%]">
                    <p className="text-xs text-rose-300 font-bold">Kesalahan Struktur Data</p>
                    <p className="text-[11px] text-rose-400/80 font-mono break-all leading-relaxed bg-rose-950/30 p-3 border border-rose-900/30 rounded-xl">{error}</p>
                  </div>
                </div>
              ) : (
                <textarea 
                  readOnly
                  value={output}
                  placeholder="Hasil kompilasi visual JSON akan diproyeksikan di sini..."
                  className="w-full h-full flex-1 bg-slate-950 border border-slate-900 rounded-2xl p-5 pr-5 pb-16 text-xs font-mono text-emerald-400 placeholder:text-slate-800 focus:outline-none resize-none leading-relaxed custom-scrollbar select-all shadow-inner animate-in fade-in duration-200"
                />
              )}

              {output && !error && (
                <button 
                  onClick={handleCopy}
                  className="absolute bottom-4 right-4 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg text-xs font-bold active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Data Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin JSON</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="text-[10px] font-mono text-slate-600 pl-1">
              Baris Terformat: {output === '' ? 0 : output.split('\n').length}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
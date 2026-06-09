"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Hash, Copy, Check, ArrowRightLeft, FileCode, Trash2, ShieldAlert } from 'lucide-react';

type Mode = 'encode' | 'decode';

export default function AdvancedBase64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<Mode>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [fileStats, setFileStats] = useState<{ name: string; size: string } | null>(null);

  // Fungsi Encode Aman (Mendukung Emoji & Aksara Spesial)
  const safeBtoa = (str: string) => {
    try {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      }));
    } catch {
      throw new Error('Gagal melakukan encoding karakter.');
    }
  };

  // Fungsi Decode Aman
  const safeAtob = (str: string) => {
    try {
      return decodeURIComponent(atob(str).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch {
      throw new Error('Format string Base64 tidak valid.');
    }
  };

  // Live Conversion Effect
  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError('');
      return;
    }

    try {
      setError('');
      if (mode === 'encode') {
        setOutput(safeBtoa(input));
      } else {
        setOutput(safeAtob(input));
      }
    } catch (e: any) {
      setOutput('');
      setError(mode === 'decode' ? 'Format Base64 tidak valid untuk di-decode' : e.message);
    }
  }, [input, mode]);

  // Tukar Input dan Output
  const handleSwap = () => {
    setMode(prev => prev === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setFileStats(null);
  };

  // Handle Drag & Drop / Input File ke Base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileStats({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB'
    });
    setMode('encode');

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setInput(result); // Menghasilkan Data URI penuh (data:image/png;base64,...)
    };
    reader.readAsDataURL(file);
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
    setError('');
    setFileStats(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-bold text-white">Base64 Studio</h1>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button 
              onClick={() => { setMode('encode'); setFileStats(null); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${mode === 'encode' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Encoder
            </button>
            <button 
              onClick={() => { setMode('decode'); setFileStats(null); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${mode === 'decode' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              Decoder
            </button>
          </div>
        </div>

        {/* Dashboard Kerja Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch relative">
          
          {/* Panel Kiri: Input */}
          <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-xl backdrop-blur-sm relative">
            <div className="flex justify-between items-center pl-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {mode === 'encode' ? 'Teks Biasa (Plaintext)' : 'Kode Base64'}
              </span>
              {input && (
                <button onClick={handleClear} className="text-slate-500 hover:text-rose-400 transition-colors p-1" title="Bersihkan">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? "Ketik teks atau tempel emoji di sini (Otomatis dikonversi)..." : "Tempel string Base64 di sini..."}
              className="w-full h-56 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/40 resize-none leading-relaxed"
            />

            {/* Opsi Unggah File Gambar/Dokumen Kecil (Hanya muncul saat Mode Encode) */}
            {mode === 'encode' && (
              <div className="pt-2">
                <label className="flex items-center justify-center gap-2 border border-dashed border-slate-800 hover:border-purple-500/30 rounded-xl py-3 px-4 cursor-pointer bg-slate-950/20 text-xs font-medium text-slate-400 hover:text-purple-300 transition-all">
                  <FileCode className="w-4 h-4" />
                  <span>{fileStats ? `${fileStats.name} (${fileStats.size})` : 'Convert File ke Base64 (DataURI)'}</span>
                  <input type="file" onChange={handleFileUpload} className="hidden" accept="image/*,text/plain,application/json" />
                </label>
              </div>
            )}
          </div>

          {/* Tombol Swap Tengah Aksial */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
            <button 
              onClick={handleSwap}
              className="bg-slate-900 hover:bg-purple-600 border border-slate-800 text-slate-300 hover:text-white p-2.5 rounded-xl shadow-2xl transition-all hover:rotate-180 duration-300 active:scale-95"
              title="Balik Arah Konversi"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Panel Kanan: Output */}
          <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-xl backdrop-blur-sm">
            <div className="pl-1">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                {mode === 'encode' ? 'Hasil Base64' : 'Hasil Teks Biasa'}
              </span>
            </div>

            <div className="relative flex-1 flex flex-col min-h-[224px]">
              {error ? (
                <div className="w-full h-full flex-1 bg-rose-950/20 border border-rose-900/30 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  <p className="text-xs text-rose-300 font-medium">{error}</p>
                </div>
              ) : (
                <textarea 
                  value={output}
                  readOnly
                  placeholder="Menunggu input..."
                  className="w-full h-full flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-purple-300 placeholder:text-slate-700 focus:outline-none resize-none leading-relaxed select-all"
                />
              )}

              {output && !error && (
                <button 
                  onClick={handleCopy}
                  className="absolute bottom-4 right-4 flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg text-xs font-semibold active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Berhasil</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              )}
            </div>
            
            {/* Ruang penyeimbang agar tinggi box kanan kiri presisi sama */}
            {mode === 'encode' && <div className="h-[42px] hidden md:block" />}
          </div>

        </div>

      </div>
    </div>
  );
}
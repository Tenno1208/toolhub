"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Fingerprint, Copy, Check, Info, RefreshCw, Layers } from 'lucide-react';

type AlgoType = 'SHA-256' | 'SHA-512' | 'SHA-384' | 'SHA-1';
type OutputType = 'hex-lower' | 'hex-upper' | 'base64';

export default function AdvancedShaTool() {
  const [input, setInput] = useState('');
  const [salt, setSalt] = useState('');
  const [algorithm, setAlgorithm] = useState<AlgoType>('SHA-256');
  const [outputType, setOutputType] = useState<OutputType>('hex-lower');
  const [hash, setHash] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Mengukur ukuran byte teks secara presisi (termasuk emoji/unicode)
  const getByteSize = (str: string) => {
    return new TextEncoder().encode(str).length;
  };

  const generateHash = async () => {
    const finalInput = input + salt;
    
    if (!finalInput) {
      setHash('');
      return;
    }

    try {
      const msgBuffer = new TextEncoder().encode(finalInput);
      const hashBuffer = await crypto.subtle.digest(algorithm, msgBuffer);
      
      if (outputType === 'base64') {
        // Konversi buffer langsung ke Base64 string
        const bytes = new Uint8Array(hashBuffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        setHash(btoa(binary));
      } else {
        // Konversi ke Hexadecimal
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        setHash(outputType === 'hex-upper' ? hashHex.toUpperCase() : hashHex);
      }
    } catch (error) {
      console.error("Gagal melakukan enkripsi hash:", error);
      setHash('Error: Operasi hashing gagal.');
    }
  };

  // Trigger regenerasi hash saat ada modifikasi opsi atau teks input
  useEffect(() => {
    generateHash();
  }, [input, salt, algorithm, outputType]);

  const copyToClipboard = () => {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
              <Fingerprint className="w-5 h-5 text-fuchsia-400" />
              <h1 className="text-xl font-bold text-white">Crypto Hash Cryptography</h1>
            </div>
          </div>

          {/* Pemilih Algoritma */}
          <div className="flex bg-slate-900 border border-slate-800/80 p-1 rounded-xl overflow-x-auto max-w-[280px] sm:max-w-none scrollbar-none">
            {(['SHA-256', 'SHA-512', 'SHA-384', 'SHA-1'] as AlgoType[]).map((algo) => (
              <button
                key={algo}
                onClick={() => setAlgorithm(algo)}
                className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all tracking-wider shrink-0 cursor-pointer ${algorithm === algo ? 'bg-fuchsia-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
              >
                {algo}
              </button>
            ))}
          </div>
        </div>

        {/* Layout Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Sisi Kiri: Form Input & Kontrol Parameter */}
          <div className="lg:col-span-6 bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 space-y-4 shadow-xl backdrop-blur-sm flex flex-col justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-center pl-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Teks Input Utama</span>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                  <span>Chars: {input.length}</span>
                  <span>•</span>
                  <span>Bytes: {getByteSize(input)}</span>
                </div>
              </div>

              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik kata, frasa, atau teks data mentah di sini..."
                className="w-full h-36 bg-slate-950 border border-slate-800/80 rounded-2xl p-4 text-xs font-mono text-white placeholder:text-slate-700 focus:outline-none focus:border-fuchsia-500/40 resize-none leading-relaxed"
              />

              {/* Input Salt Ekstra */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-400 pl-1">
                  Salt Tambahan <span className="text-[10px] text-slate-500 font-normal">(Opsional)</span>
                </label>
                <input 
                  type="text"
                  value={salt}
                  onChange={(e) => setSalt(e.target.value)}
                  placeholder="Masukkan string penggaraman kriptografi..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-fuchsia-500/40"
                />
              </div>
            </div>

            {/* Pemilih Format Output */}
            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
              <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-500" /> Format Output:
              </span>
              <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1">
                {[
                  { id: 'hex-lower', label: 'hex' },
                  { id: 'hex-upper', label: 'HEX' },
                  { id: 'base64', label: 'b64' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setOutputType(item.id as OutputType)}
                    className={`px-2.5 py-1 text-[10px] font-mono rounded-md transition-all font-bold ${outputType === item.id ? 'bg-slate-800 text-fuchsia-400' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Output Display */}
          <div className="lg:col-span-6 bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 flex flex-col justify-between shadow-xl backdrop-blur-sm min-h-[260px] lg:min-h-0">
            <div className="space-y-3 flex-1 flex flex-col">
              <div className="pl-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 text-fuchsia-400 animate-pulse" /> Hasil Integritas Hash ({algorithm})
                </span>
              </div>

              <div className="relative flex-1 flex flex-col">
                <div className="w-full h-full flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-4 pr-4 pb-14 font-mono text-xs text-fuchsia-300 break-all select-all leading-relaxed overflow-y-auto max-h-[210px] custom-scrollbar">
                  {hash || <span className="text-slate-800 italic font-sans select-none">Menunggu entri teks input utama...</span>}
                </div>

                {hash && (
                  <button 
                    onClick={copyToClipboard}
                    className="absolute bottom-4 right-4 flex items-center justify-center gap-1.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-xl transition-all shadow-lg text-xs font-bold active:scale-95"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Berhasil</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Hash</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Info Teoretis Singkat yang Terlihat Bersih */}
            <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-start gap-2 text-[11px] text-slate-500 leading-normal pl-1">
              <Info className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
              <p>Fungsi hash kriptografi bersifat satu arah (*one-way*). Data yang diubah menjadi hash tidak dapat dikembalikan kembali menjadi teks asli.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
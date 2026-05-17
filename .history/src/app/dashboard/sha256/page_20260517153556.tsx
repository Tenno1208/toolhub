"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Fingerprint, Copy, Check } from 'lucide-react';

export default function Sha256Tool() {
  const [input, setInput] = useState('');
  const [hash, setHash] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Fungsi enkripsi lokal menggunakan Web Crypto API bawaan browser
  const generateSHA256 = async (text: string) => {
    if (!text) {
      setHash('');
      return;
    }
    const msgBuffer = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setHash(hashHex);
  };

  useEffect(() => {
    generateSHA256(input);
  }, [input]);

  const copyToClipboard = () => {
    if (!hash) return;
    navigator.clipboard.writeText(hash);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Fingerprint className="w-6 h-6 text-fuchsia-400" />
              <h1 className="text-2xl font-bold text-white">SHA256 Hash Generator</h1>
            </div>
          </div>
        </div>

        {/* Input & Output */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
            <label className="block text-sm font-medium text-slate-400 mb-2">Input Teks Utama</label>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik string atau kalimat teks yang ingin di-hash di sini..."
              className="w-full h-36 bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 resize-none font-mono text-sm"
            />
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 relative">
            <label className="block text-sm font-medium text-slate-400 mb-2">Hasil Hash (SHA-256 Hex)</label>
            <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 pr-16 text-fuchsia-300 font-mono text-sm min-h-[4.5rem] break-all select-all flex items-center">
              {hash || <span className="text-slate-700 italic font-sans">Hasil enkripsi otomatis muncul di sini...</span>}
            </div>
            
            {hash && (
              <button 
                onClick={copyToClipboard}
                className="absolute right-8 bottom-8 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-all flex items-center gap-2 text-xs font-semibold"
              >
                {isCopied ? <><Check className="w-3.5 h-3.5 text-emerald-400"/> Copied</> : <><Copy className="w-3.5 h-3.5"/> Copy</>}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
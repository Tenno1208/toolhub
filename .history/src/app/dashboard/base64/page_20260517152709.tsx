"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Hash, Copy, Check } from 'lucide-react';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleEncode = () => {
    try { setOutput(btoa(input)); } 
    catch (e) { setOutput('Error: Karakter tidak didukung untuk di-encode.'); }
  };

  const handleDecode = () => {
    try { setOutput(atob(input)); } 
    catch (e) { setOutput('Error: Format Base64 tidak valid.'); }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Tool */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Hash className="w-6 h-6 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Base64 Converter</h1>
            </div>
          </div>
        </div>

        {/* Area Kerja */}
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Input Teks / Base64</label>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik sesuatu di sini..."
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button onClick={handleEncode} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-xl transition-all">
                Encode ke Base64
              </button>
              <button onClick={handleDecode} className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl transition-all border border-slate-700">
                Decode ke Teks
              </button>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 relative">
            <label className="block text-sm font-medium text-slate-400 mb-2">Hasil</label>
            <textarea 
              value={output}
              readOnly
              placeholder="Hasil akan muncul di sini..."
              className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:outline-none resize-none"
            />
            {output && (
              <button 
                onClick={copyToClipboard}
                className="absolute bottom-8 right-8 p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-all flex items-center gap-2 text-sm"
              >
                {isCopied ? <><Check className="w-4 h-4 text-emerald-400"/> Dicopy</> : <><Copy className="w-4 h-4"/> Copy</>}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
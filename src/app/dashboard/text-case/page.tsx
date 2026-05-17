"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Settings2, Copy, Check } from 'lucide-react';

export default function TextCaseTool() {
  const [text, setText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleUpper = () => setText(text.toUpperCase());
  const handleLower = () => setText(text.toLowerCase());
  const handleTitle = () => {
    setText(text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
  };
  const handleSentence = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()));
  };

  const copyToClipboard = () => {
    if(!text) return;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Settings2 className="w-6 h-6 text-amber-400" />
              <h1 className="text-2xl font-bold text-white">Text Case Converter</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Tombol Aksi */}
          <div className="lg:col-span-1 flex flex-col gap-3">
            <button onClick={handleUpper} className="w-full text-left px-5 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all font-semibold text-white">
              UPPER CASE
            </button>
            <button onClick={handleLower} className="w-full text-left px-5 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all font-semibold text-white lowercase">
              lower case
            </button>
            <button onClick={handleTitle} className="w-full text-left px-5 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all font-semibold text-white capitalize">
              Title Case
            </button>
            <button onClick={handleSentence} className="w-full text-left px-5 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all font-semibold text-white">
              Sentence case.
            </button>
          </div>

          {/* Area Teks */}
          <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-2 relative">
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste atau ketik teks kamu di sini, lalu pilih format di samping..."
              className="w-full h-[400px] bg-slate-950 border border-slate-800 rounded-xl p-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none text-lg leading-relaxed"
            />
            
            <button 
              onClick={copyToClipboard}
              className="absolute bottom-8 right-8 p-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl shadow-lg transition-all flex items-center gap-2 font-medium"
            >
              {isCopied ? <><Check className="w-5 h-5"/> Tersalin</> : <><Copy className="w-5 h-5"/> Copy Text</>}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
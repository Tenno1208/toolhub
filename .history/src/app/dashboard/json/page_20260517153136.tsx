"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileJson, Copy, Check, Minimize2, AlignLeft, AlertCircle } from 'lucide-react';

export default function JsonTool() {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const formatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON format");
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message || "Invalid JSON format");
    }
  };

  const copyToClipboard = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Tool */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <FileJson className="w-6 h-6 text-emerald-400" />
              <h1 className="text-2xl font-bold text-white">JSON Formatter</h1>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button onClick={minifyJson} className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors text-sm font-medium">
              <Minimize2 className="w-4 h-4" /> Minify
            </button>
            <button onClick={formatJson} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-emerald-500/20">
              <AlignLeft className="w-4 h-4" /> Format (Prettify)
            </button>
          </div>
        </div>

        {/* Error Notif */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm">Gagal memproses JSON</p>
              <p className="text-xs opacity-80 mt-1 font-mono">{error}</p>
            </div>
          </div>
        )}

        {/* Editor Area */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl relative group h-[60vh] flex flex-col overflow-hidden">
          <textarea 
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(null);
            }}
            spellCheck="false"
            placeholder="Paste raw JSON array atau object di sini..."
            className="flex-grow w-full bg-transparent p-6 text-slate-300 font-mono text-sm placeholder:text-slate-600 focus:outline-none resize-none"
          />
          
          <button 
            onClick={copyToClipboard}
            className="absolute bottom-6 right-6 p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl shadow-lg border border-slate-700 transition-all flex items-center gap-2 text-sm font-medium"
          >
            {isCopied ? <><Check className="w-4 h-4 text-emerald-400"/> Copied</> : <><Copy className="w-4 h-4"/> Copy JSON</>}
          </button>
        </div>

      </div>
    </div>
  );
}
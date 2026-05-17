"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Type } from 'lucide-react';

export default function WordCountTool() {
  const [text, setText] = useState('');

  // Logika penghitungan
  const charCount = text.length;
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const lineCount = text === '' ? 0 : text.split(/\r\n|\r|\n/).length;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Tool */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Type className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Word Counter</h1>
            </div>
          </div>
        </div>

        {/* Statistik Cepat */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-white mb-1">{wordCount}</p>
            <p className="text-sm text-slate-400 uppercase tracking-wider">Kata</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-white mb-1">{charCount}</p>
            <p className="text-sm text-slate-400 uppercase tracking-wider">Karakter</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-center">
            <p className="text-4xl font-bold text-white mb-1">{lineCount}</p>
            <p className="text-sm text-slate-400 uppercase tracking-wider">Baris</p>
          </div>
        </div>

        {/* Area Teks */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-2">
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ketik atau paste dokumenmu di sini untuk mulai menghitung..."
            className="w-full h-80 bg-slate-950 border border-slate-800 rounded-xl p-6 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-y text-lg leading-relaxed"
          />
        </div>

      </div>
    </div>
  );
}
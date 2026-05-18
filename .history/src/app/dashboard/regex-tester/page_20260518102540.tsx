"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Binary, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
  const [text, setText] = useState('user@example.com');

  const testRegex = () => {
    try {
      if (!pattern || !text) return false;
      const regex = new RegExp(pattern);
      return regex.test(text);
    } catch (e) {
      return false;
    }
  };

  const isMatch = testRegex();

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Binary className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Regex Expression Tester</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Regex Pattern Parameter</label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500/50"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Test String Input</label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500/50"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className={`p-4 rounded-xl border flex items-center gap-2.5 transition-all duration-300 ${isMatch ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
            {isMatch ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
            <span className="text-xs font-medium tracking-wide">
              {isMatch ? "Pola COCOK (MATCH SUCCESS) - Teks tervalidasi dengan benar." : "Pola TIDAK COCOK (MISMATCH) - Teks tidak memenuhi kriteria regex."}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
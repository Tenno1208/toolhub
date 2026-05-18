"use client";
import { useState } from 'react';
import { Binary, CheckCircle2, XCircle } from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'); // Default regex Pola Email
  const [text, setText] = useState('user@example.com');

  // Evaluasi kecocokan pola string regex secara aman
  const testRegex = () => {
    try {
      if (!pattern || !text) return false;
      const regex = new RegExp(pattern);
      return regex.test(text);
    } catch (e) {
      return false; // Mengembalikan false jika sintaks regex salah ketik/error
    }
  };

  const isMatch = testRegex();

  return (
    <div className="p-6 max-w-2xl mx-auto bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl">
          <Binary className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Regex Expression Tester</h2>
          <p className="text-xs text-slate-400">Uji validasi kecocokan Regular Expression (*Regex Matcher*) secara instan.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Regex Pattern Parameter</label>
          <input
            type="text"
            className="w-full bg-slate-950 border border-white/[0.08] rounded-xl px-4 py-3 text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500/50"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Test String Input</label>
          <input
            type="text"
            className="w-full bg-slate-950 border border-white/[0.08] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500/50"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Status Indicator Live Panel */}
        <div className={`p-4 rounded-xl border flex items-center gap-2.5 transition-all duration-300 ${isMatch ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
          {isMatch ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0" />}
          <span className="text-xs font-medium tracking-wide">
            {isMatch ? "Pola COCOK (MATCH SUCCESS) - Ekspresi string tervalidasi dengan benar." : "Pola TIDAK COCOK (MISMATCH) - Struktur teks tidak memenuhi kriteria regex."}
          </span>
        </div>
      </div>
    </div>
  );
}
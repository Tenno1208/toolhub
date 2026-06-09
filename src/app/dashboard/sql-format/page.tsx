"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Database, Copy, Check, ArrowLeft, Sparkles, Trash2, Code2 } from 'lucide-react';

export default function ElegantSqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Logika Pemformatan SQL Kustom Berbasis RegEx (Sangat Ringan & Cepat)
  const formatSqlLogic = (rawSql: string) => {
    if (!rawSql.trim()) return '';

    let formatted = rawSql.trim()
      // 1. Ubah seluruh reserved keywords utama menjadi UPPERCASE
      .replace(/\b(select|from|where|join|left join|right join|inner join|on|group by|order by|having|limit|insert into|values|update|set|delete|create table|alter table|and|or|as|in|is|null|index|by|into)\b/gi, (match) => match.toUpperCase())
      
      // 2. Berikan baris baru (newline) sebelum reserved keywords besar
      .replace(/\b(FROM|WHERE|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN|GROUP BY|ORDER BY|HAVING|SET|VALUES|LIMIT)\b/g, '\n$1')
      
      // 3. Format koma pada seleksi kolom agar turun satu baris dengan inden 2 spasi
      .replace(/,\s*/g, ',\n  ')
      
      // 4. Berikan baris baru untuk kondisi logika AND / OR di dalam klausa WHERE
      .replace(/\b(AND|OR)\b/g, '\n  $1')
      
      // 5. Bersihkan tumpukan baris kosong yang berlebih
      .replace(/\n\s*\n/g, '\n');

    // Pastikan kueri SELECT yang bersih mengawali baris kolom dengan inden rapi
    if (formatted.startsWith('SELECT ')) {
      formatted = formatted.replace('SELECT ', 'SELECT\n  ');
    }

    return formatted;
  };

  // Live Real-time Formatting Effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setOutput(formatSqlLogic(input));
    }, 150); // Debounce tipis untuk performa pengetikan yang mulus

    return () => clearTimeout(delayDebounce);
  }, [input]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  // Menghitung jumlah kata kunci SQL yang terdeteksi untuk metadata
  const keywordCount = (input.match(/\b(select|from|where|join|group by|order by|insert|update|delete)\b/gi) || []).length;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 selection:bg-purple-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-900 pb-5">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-bold text-white tracking-tight">SQL Query Studio</h1>
            </div>
          </div>

          {input && (
            <div className="flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full animate-in fade-in duration-300">
              <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" /> Live Parser Active
            </div>
          )}
        </div>

        {/* Workspace Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
          
          {/* Panel Kiri: Raw Input */}
          <div className="bg-slate-900/40 border border-white/[0.04] rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-2xl backdrop-blur-sm">
            <div className="flex justify-between items-center pl-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-slate-500" /> Raw SQL Input
              </span>
              {input && (
                <button onClick={handleClear} className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer" title="Bersihkan">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <textarea
              className="w-full h-80 bg-slate-950 border border-slate-900 rounded-2xl p-5 text-xs font-mono text-slate-300 placeholder:text-slate-700 focus:outline-none focus:border-purple-500/40 resize-none leading-relaxed custom-scrollbar shadow-inner"
              placeholder="Tempel kueri database di sini (cth: select id, name, created_at from users where status = 'active' order by id desc)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <div className="text-[10px] font-mono text-slate-600 pl-1">
              Keywords Terdeteksi: {keywordCount}
            </div>
          </div>

          {/* Panel Kanan: Beautified Output */}
          <div className="bg-slate-900/40 border border-white/[0.04] rounded-3xl p-5 space-y-3 flex flex-col justify-between shadow-2xl backdrop-blur-sm">
            <div className="pl-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Beautified Clean Query
              </span>
            </div>

            <div className="relative flex-1 flex flex-col min-h-[320px] lg:min-h-0">
              <textarea
                readOnly
                className="w-full h-full flex-1 bg-slate-950 border border-slate-900 rounded-2xl p-5 pr-5 pb-16 text-xs font-mono text-emerald-400 placeholder:text-slate-800 focus:outline-none resize-none leading-relaxed custom-scrollbar select-all shadow-inner"
                placeholder="Hasil penataan kueri bersih akan diproyeksikan di sini..."
                value={output}
              />

              {output && (
                <button
                  onClick={handleCopy}
                  className="absolute bottom-4 right-4 flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg text-xs font-bold active:scale-95 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Kueri Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Hasil</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="text-[10px] font-mono text-slate-600 pl-1">
              Lines Output: {output === '' ? 0 : output.split('\n').length}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
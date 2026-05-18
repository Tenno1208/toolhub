"use client";
import { useState } from 'react';
import { Database, Copy, Check, FileCode } from 'lucide-react';

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const formatSql = () => {
    if (!input.trim()) return;
    
    // Algoritma regex pemformatan SQL client-side sederhana & clean
    let formatted = input.trim()
      // Ubah keywords utama menjadi UPPERCASE
      .replace(/\b(select|from|where|join|left join|right join|inner join|on|group by|order by|having|limit|insert into|values|update|set|delete|create table|alter table)\b/gi, (match) => match.toUpperCase())
      // Berikan baris baru sebelum keywords struktural utama
      .replace(/\b(FROM|WHERE|LEFT JOIN|RIGHT JOIN|INNER JOIN|GROUP BY|ORDER BY|HAVING|SET|VALUES)\b/g, '\n$1')
      // Berikan indentasi otomatis setelah koma pada klausa SELECT agar rapi berjejer ke bawah
      .replace(/,\s*/g, ',\n  ')
      // Rapikan baris baru ganda yang tidak sengaja terbentuk
      .replace(/\n\s*\n/g, '\n');

    setOutput(formatted);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl">
          <Database className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">SQL Query Formatter</h2>
          <p className="text-xs text-slate-400">Rapikan struktur syntax SQL mentah yang berantakan secara instan.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Raw SQL Query</label>
          <textarea
            className="w-full bg-slate-950 border border-white/[0.08] rounded-xl p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-purple-500/50 h-72 resize-none"
            placeholder="select id, name, email from users where role = 'admin' order by id desc;"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Beautified Output</label>
          <div className="relative h-72">
            <textarea
              readOnly
              className="w-full h-full bg-slate-950 border border-white/[0.08] rounded-xl p-4 text-xs font-mono text-emerald-400 resize-none focus:outline-none"
              placeholder="Hasil query ter-indentasi akan muncul di sini..."
              value={output}
            />
            {output && (
              <button
                onClick={handleCopy}
                className="absolute bottom-4 right-4 bg-white/5 border border-white/[0.08] hover:bg-white/10 p-2 rounded-lg text-slate-300 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={formatSql}
        disabled={!input.trim()}
        className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-20 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-purple-950/20"
      >
        <FileCode className="w-4 h-4" /> Format SQL Query
      </button>
    </div>
  );
}
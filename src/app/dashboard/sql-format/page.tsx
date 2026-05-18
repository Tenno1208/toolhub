"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Database, Copy, Check, FileCode, ArrowLeft } from 'lucide-react';

export default function SqlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const formatSql = () => {
    if (!input.trim()) return;
    
    let formatted = input.trim()
      .replace(/\b(select|from|where|join|left join|right join|inner join|on|group by|order by|having|limit|insert into|values|update|set|delete|create table|alter table)\b/gi, (match) => match.toUpperCase())
      .replace(/\b(FROM|WHERE|LEFT JOIN|RIGHT JOIN|INNER JOIN|GROUP BY|ORDER BY|HAVING|SET|VALUES)\b/g, '\n$1')
      .replace(/,\s*/g, ',\n  ')
      .replace(/\n\s*\n/g, '\n');

    setOutput(formatted);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-white">SQL Query Formatter</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Raw SQL Query</label>
              <textarea
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-purple-500/50 h-72 Richmond resize-none"
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
                  className="w-full h-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-emerald-400 Richmond resize-none focus:outline-none"
                  placeholder="Hasil query akan muncul di sini..."
                  value={output}
                />
                {output && (
                  <button
                    onClick={handleCopy}
                    className="absolute bottom-4 right-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 p-2 rounded-lg text-slate-300 transition-colors cursor-pointer"
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
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-20 flex items-center justify-center gap-2"
          >
            <FileCode className="w-4 h-4" /> Format SQL Query
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Terminal, GitBranch, Copy, Check, ArrowLeft } from 'lucide-react';

const SCENARIOS = [
  { id: 'commit', label: 'Salah ketik teks pesan commit terakhir', cmd: 'git commit --amend -m "pesan_baru_kamu"' },
  { id: 'undo', label: 'Batalkan commit terakhir (file pengerjaan tetap aman)', cmd: 'git reset --soft HEAD~1' },
  { id: 'delete-local', label: 'Hapus branch lokal secara paksa', cmd: 'git branch -D nama_branch' },
  { id: 'delete-remote', label: 'Hapus branch di remote repository (GitHub)', cmd: 'git push origin --delete nama_branch' },
  { id: 'discard', label: 'Buang seluruh perubahan lokal yang belum di-commit', cmd: 'git restore .' }
];

export default function GitGenerator() {
  const [selectedCmd, setSelectedCmd] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Git Command Generator</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Pilih Skenario Masalah Git:</label>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {SCENARIOS.map((scen) => (
              <button
                key={scen.id}
                onClick={() => setSelectedCmd(scen.cmd)}
                className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all cursor-pointer block ${selectedCmd === scen.cmd ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-inner' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-white/10 hover:text-slate-200'}`}
              >
                {scen.label}
              </button>
            ))}
          </div>

          {selectedCmd && (
            <div className="pt-4 border-t border-white/5 animate-in fade-in duration-200">
              <label className="block text-xs font-medium text-slate-400 mb-2">Baris Perintah Git:</label>
              <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4 font-mono text-xs text-indigo-400 overflow-x-auto">
                <span>{selectedCmd}</span>
                <button
                  onClick={handleCopy}
                  className="bg-slate-900 border border-slate-800 hover:bg-slate-800 p-2 rounded-lg text-slate-300 transition-colors cursor-pointer shrink-0"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
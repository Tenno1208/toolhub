"use client";
import { useState } from 'react';
import { Terminal, GitBranch, Copy, Check } from 'lucide-react';

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
    <div className="p-6 max-w-2xl mx-auto bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
          <GitBranch className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Git Command Generator</h2>
          <p className="text-xs text-slate-400">Pilih skenario masalah Git kamu untuk men-generate solusi baris komando instan.</p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Pilih Skenario Masalah Git:</label>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {SCENARIOS.map((scen) => (
            <button
              key={scen.id}
              onClick={() => setSelectedCmd(scen.cmd)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all cursor-pointer block ${selectedCmd === scen.cmd ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-inner' : 'bg-slate-950 border-white/[0.03] text-slate-400 hover:border-white/10 hover:text-slate-200'}`}
            >
              {scen.label}
            </button>
          ))}
        </div>

        {selectedCmd && (
          <div className="pt-4 border-t border-white/5 animate-in fade-in duration-200">
            <label className="block text-xs font-medium text-slate-400 mb-2">Baris Perintah Git (Copy-Paste Ready):</label>
            <div className="relative bg-slate-950 border border-white/[0.08] rounded-xl p-4 flex items-center justify-between gap-4 font-mono text-xs text-indigo-400 overflow-x-auto">
              <span>{selectedCmd}</span>
              <button
                onClick={handleCopy}
                className="bg-white/5 border border-white/[0.08] hover:bg-white/10 p-2 rounded-lg text-slate-300 transition-colors cursor-pointer shrink-0"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
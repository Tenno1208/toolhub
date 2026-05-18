"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Wallet } from 'lucide-react';

export default function BudgetPlanner() {
  const [salary, setSalary] = useState('');
  const [calc, setCalc] = useState<{ needs: number, wants: number, savings: number } | null>(null);

  const processBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(salary);
    if (val > 0) {
      setCalc({ needs: val * 0.5, wants: val * 0.3, savings: val * 0.2 });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">Perencana Anggaran Gaji (50/30/20)</h1>
          </div>
        </div>

        <form onSubmit={processBudget} className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 sm:p-8 space-y-5">
          <input type="number" required placeholder="Masukkan Total Gaji Bersih Bulanan (Rp)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-emerald-500/50" value={salary} onChange={e => setSalary(e.target.value)} />
          <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black py-4 rounded-xl text-xs tracking-wide cursor-pointer">BAGI POS ALOKASI DANA</button>

          {calc && (
            <div className="space-y-2 animate-in zoom-in-95">
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center"><span className="text-xs text-slate-400">🍖 50% Kebutuhan Pokok</span><span className="text-xs font-mono font-bold text-white">Rp {calc.needs.toLocaleString()}</span></div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center"><span className="text-xs text-slate-400">🎮 30% Keinginan & Hiburan</span><span className="text-xs font-mono font-bold text-amber-400">Rp {calc.wants.toLocaleString()}</span></div>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex justify-between items-center"><span className="text-xs text-slate-400">📈 20% Tabungan / Investasi</span><span className="text-xs font-mono font-bold text-emerald-400">Rp {calc.savings.toLocaleString()}</span></div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
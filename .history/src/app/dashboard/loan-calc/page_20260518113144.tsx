"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Landmark } from 'lucide-react';

export default function LoanCalculator() {
  const [loan, setLoan] = useState('');
  const [tenor, setTenor] = useState('');
  const [interest, setInterest] = useState('');
  const [monthly, setMonthly] = useState<number | null>(null);

  const calculateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    const principal = parseFloat(loan);
    const months = parseInt(tenor);
    const rate = parseFloat(interest) / 100 / 12;

    if (principal > 0 && months > 0 && rate >= 0) {
      const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      setMonthly(Math.round(emi));
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
            <Landmark className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white">Kalkulator Pinjaman</h1>
          </div>
        </div>

        <form onSubmit={calculateLoan} className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <input type="number" required placeholder="Total Pokok Hutang Pinjaman (Rp)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500/50" value={loan} onChange={e => setLoan(e.target.value)} />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" required placeholder="Tenor Jangka Waktu (Bulan)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500/50" value={tenor} onChange={e => setTenor(e.target.value)} />
            <input type="number" required placeholder="Suku Bunga Per Tahun (%)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-amber-500/50" value={interest} onChange={e => setInterest(e.target.value)} />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black py-4 rounded-xl text-xs tracking-wide cursor-pointer">HITUNG SIMULASI CICILAN</button>

          {monthly !== null && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-center">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Angsuran Tetap Bulanan:</p>
              <h2 className="text-2xl font-black text-amber-400 font-mono">Rp {monthly.toLocaleString('id-ID')} <span className="text-xs text-slate-400 font-normal">/ Bulan</span></h2>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
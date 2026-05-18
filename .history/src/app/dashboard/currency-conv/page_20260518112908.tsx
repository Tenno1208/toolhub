"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, DollarSign } from 'lucide-react';

const KURS_BASE = { USD: 16000, EUR: 17200, JPY: 105, SGD: 11800, IDR: 1 };

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurr, setFromCurr] = useState<keyof typeof KURS_BASE>('USD');
  const [toCurr, setToCurr] = useState<keyof typeof KURS_BASE>('IDR');

  const calculateConversion = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return '0';
    
    // Konversi via Rupiah Base
    const amountInIDR = val * KURS_BASE[fromCurr];
    const finalResult = amountInIDR / KURS_BASE[toCurr];
    
    return finalResult.toLocaleString('id-ID', { maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">Konversi Mata Uang</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Jumlah Nominal Uang</label>
            <input
              type="number" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-emerald-500/50"
              value={amount} onChange={e => setAmount(e.target.value)} placeholder="Masukkan angka nominal..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Dari Mata Uang</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none" value={fromCurr} onChange={e => setFromCurr(e.target.value as any)}>
                <option value="USD">USD ($) Dolar AS</option>
                <option value="EUR">EUR (€) Euro</option>
                <option value="JPY">JPY (¥) Yen Jepang</option>
                <option value="SGD">SGD ($) Dolar Singapura</option>
                <option value="IDR">IDR (Rp) Rupiah</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Ke Mata Uang</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none" value={toCurr} onChange={e => setToCurr(e.target.value as any)}>
                <option value="IDR">IDR (Rp) Rupiah</option>
                <option value="USD">USD ($) Dolar AS</option>
                <option value="EUR">EUR (€) Euro</option>
                <option value="JPY">JPY (¥) Yen Jepang</option>
                <option value="SGD">SGD ($) Dolar Singapura</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-center mt-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center justify-center gap-1"><RefreshCw className="w-3 h-3 text-emerald-400" /> Hasil Penukaran Kurs:</p>
            <h2 className="text-2xl font-black text-emerald-400 font-mono">{calculateConversion()} <span className="text-xs font-sans text-slate-400">{toCurr}</span></h2>
          </div>
        </div>
      </div>
    </div>
  );
}
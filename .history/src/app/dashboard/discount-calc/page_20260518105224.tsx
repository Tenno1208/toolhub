"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Percent } from 'lucide-react';

export default function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [saved, setSaved] = useState<number | null>(null);
  const [finalPrice, setFinalPrice] = useState<number | null>(null);

  const calculateDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(price);
    const d = parseFloat(discount);

    if (p > 0 && d >= 0 && d <= 100) {
      const cut = (p * d) / 100;
      setSaved(cut);
      setFinalPrice(p - cut);
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
            <Percent className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white">Kalkulator Diskon Belanja</h1>
          </div>
        </div>

        <form onSubmit={calculateDiscount} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Harga Asli (Rp)</label>
              <input
                type="number" required placeholder="Contoh: 150000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:bg-slate-950"
                value={price} onChange={e => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Diskon (%)</label>
              <input
                type="number" required placeholder="Contoh: 20" max="100"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 focus:bg-slate-950"
                value={discount} onChange={e => setDiscount(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black py-4 rounded-2xl text-sm transition-all active:scale-95 cursor-pointer">
            Hitung Potongan Harga
          </button>

          {finalPrice !== null && saved !== null && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 grid grid-cols-2 gap-4 text-center animate-in zoom-in-95 duration-200">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Hemat (Hemat):</p>
                <span className="text-sm font-bold text-amber-400">Rp {saved.toLocaleString()}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Harga Akhir:</p>
                <span className="text-sm font-bold text-emerald-400">Rp {finalPrice.toLocaleString()}</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
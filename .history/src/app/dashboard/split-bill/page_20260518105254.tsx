"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users } from 'lucide-react';

export default function SplitBill() {
  const [totalBill, setTotalBill] = useState('');
  const [people, setPeople] = useState('');
  const [tip, setTip] = useState('0');
  const [perPerson, setPerPerson] = useState<number | null>(null);

  const calculateSplit = (e: React.FormEvent) => {
    e.preventDefault();
    const bill = parseFloat(totalBill);
    const numPeople = parseInt(people);
    const tipPct = parseFloat(tip);

    if (bill > 0 && numPeople > 0) {
      const grossBill = bill + (bill * tipPct) / 100;
      setPerPerson(parseFloat((grossBill / numPeople).toFixed(0)));
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
            <Users className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Split Bill Instan</h1>
          </div>
        </div>

        <form onSubmit={calculateSplit} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Total Tagihan Nota (Rp)</label>
            <input
              type="number" required placeholder="Contoh: 340000"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-slate-950"
              value={totalBill} onChange={e => setTotalBill(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Jumlah Orang (Patungan)</label>
              <input
                type="number" required placeholder="Contoh: 4" min="1"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-slate-950"
                value={people} onChange={e => setPeople(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Bumbu Tip Rumah Makan (%)</label>
              <select 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 focus:bg-slate-950"
                value={tip} onChange={e => setTip(e.target.value)}
              >
                <option value="0">0% (Sederhana)</option>
                <option value="5">5% Service</option>
                <option value="10">10% Luxury Tax</option>
              </select>
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black py-4 rounded-2xl text-sm transition-all active:scale-95 cursor-pointer">
            Hitung Pembagian Bill
          </button>

          {perPerson !== null && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-center space-y-1 animate-in zoom-in-95 duration-200">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Patungan per Orang Mandiri:</p>
              <h2 className="text-2xl font-black text-cyan-400">Rp {perPerson.toLocaleString()}</h2>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
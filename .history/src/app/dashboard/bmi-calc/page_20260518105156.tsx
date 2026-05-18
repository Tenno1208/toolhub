"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Info } from 'lucide-react';

export default function BmiCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const calculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Konversi cm ke meter

    if (w > 0 && h > 0) {
      const score = w / (h * h);
      setBmi(parseFloat(score.toFixed(1)));

      if (score < 18.5) setStatus('Kurus (Underweight) 🦴');
      else if (score < 25) setStatus('Normal / Ideal (Healthy) ✨');
      else if (score < 30) setStatus('Gemuk (Overweight) ⚠️');
      else setStatus('Obesitas (Obese) 🚨');
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
            <Activity className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-white">Kalkulator BMI</h1>
          </div>
        </div>

        <form onSubmit={calculateBmi} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Berat Badan (kg)</label>
              <input
                type="number" required placeholder="Contoh: 65"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-slate-950"
                value={weight} onChange={e => setWeight(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Tinggi Badan (cm)</label>
              <input
                type="number" required placeholder="Contoh: 170"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:bg-slate-950"
                value={height} onChange={e => setHeight(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black py-4 rounded-2xl text-sm transition-all active:scale-95 cursor-pointer">
            Hitung Skor BMI
          </button>

          {bmi !== null && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-center space-y-1 animate-in zoom-in-95 duration-200">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Skor BMI Anda:</p>
              <h2 className="text-3xl font-black text-emerald-400">{bmi}</h2>
              <p className="text-sm text-slate-200 font-semibold pt-1">{status}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
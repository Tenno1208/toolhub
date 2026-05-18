"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Heart, RefreshCw, ArrowLeft } from 'lucide-react';

export default function LoveCalculator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateLove = () => {
    if (!name1 || !name2) return;
    setLoading(true);
    setScore(null);
    setTimeout(() => {
      const totalChars = (name1 + name2).toLowerCase();
      let sum = 0;
      for (let i = 0; i < totalChars.length; i++) {
        sum += totalChars.charCodeAt(i);
      }
      const finalScore = (sum % 61) + 40;
      setScore(finalScore);
      if (finalScore > 85) setMessage("Sangat COCOK! Buruan pinang ke pelaminan sebelum ditikung sepertiga malam.");
      else if (finalScore > 65) setMessage("Lumayan aman, tapi saingan kamu di instastory-nya lumayan berat, le.");
      else setMessage("Waduh, mending mundur pelan-pelan ya. Kamu cuma dianggap badut penghibur kala dia gabut.");
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400/10" />
            <h1 className="text-xl font-bold text-white">Kalkulator Jodoh Gimmick</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Nama Kamu</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500/50"
                placeholder="Contoh: Dimas"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Nama Dia</label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500/50"
                placeholder="Contoh: Ayang"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={calculateLove}
            disabled={!name1 || !name2 || loading}
            className="w-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold py-4 rounded-2xl text-sm hover:opacity-90 active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
            {loading ? "Menghitung Garis Asmara..." : "Hitung Persentase Cinta!"}
          </button>

          {score !== null && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-center p-6 rounded-2xl">
              <div className="text-4xl font-black text-rose-400 mb-2">{score}%</div>
              <p className="text-xs sm:text-sm text-slate-200 max-w-md mx-auto">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState } from 'react';
import { Heart, RefreshCw } from 'lucide-react';

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
      // Rumus algoritma gimmick kocak pakai total nilai ASCII nama
      const totalChars = (name1 + name2).toLowerCase();
      let sum = 0;
      for (let i = 0; i < totalChars.length; i++) {
        sum += totalChars.charCodeAt(i);
      }
      const finalScore = (sum % 61) + 40; // Menghasilkan angka range 40% - 100%
      setScore(finalScore);

      if (finalScore > 85) setMessage("Sangat COCOK! Buruan pinang ke pelaminan sebelum ditikung sepertiga malam.");
      else if (finalScore > 65) setMessage("Lumayan aman, tapi saingan kamu di instastory-nya lumayan berat, le.");
      else setMessage("Waduh, mending mundur pelan-pelan ya. Kamu cuma dianggap badut penghibur kala dia gabut.");
      
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-xl">
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400/10" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Kalkulator Jodoh Gimmick</h2>
          <p className="text-xs text-slate-400">Uji seberapa besar persentase kecocokan masa depanmu bersamanya.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Nama Kamu</label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500/50"
              placeholder="Contoh: Dimas"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Nama Dia</label>
            <input
              type="text"
              className="w-full bg-slate-950 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-rose-500/50"
              placeholder="Contoh: Ayang"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={calculateLove}
          disabled={!name1 || !name2 || loading}
          className="w-full bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white font-bold py-4 rounded-2xl text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {loading ? <RefreshCw className="w-4 " /> : null}
          {loading ? "Menghitung Garis Asmara..." : "Hitung Persentase Cinta!"}
        </button>

        {score !== null && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-center p-6 rounded-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="text-4xl font-black text-rose-400 mb-2">{score}%</div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md mx-auto">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
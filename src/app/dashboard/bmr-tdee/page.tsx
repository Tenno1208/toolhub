"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Flame } from 'lucide-react';

export default function BmrTdeeCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.2'); // Sedentary default
  
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);

  const calculateFitness = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (w > 0 && h > 0 && a > 0) {
      // Rumus Harris-Benedict (Mifflin-St Jeor)
      let bmrScore = 0;
      if (gender === 'male') {
        bmrScore = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmrScore = 10 * w + 6.25 * h - 5 * a - 161;
      }

      setBmr(Math.round(bmrScore));
      setTdee(Math.round(bmrScore * parseFloat(activity)));
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
            <Flame className="w-5 h-5 text-orange-400" />
            <h1 className="text-xl font-bold text-white">BMR & TDEE Fitness Calculator</h1>
          </div>
        </div>

        <form onSubmit={calculateFitness} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {['male', 'female'].map(g => (
              <button 
                key={g} type="button" onClick={() => setGender(g)}
                className={`p-3 rounded-xl font-bold text-xs capitalize border cursor-pointer ${gender === g ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
              >
                {g === 'male' ? 'Laki-Laki 🧑' : 'Perempuan 👩'}
              </button>
            ))}
            <input
              type="number" required placeholder="Umur"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 text-xs text-center text-white focus:outline-none focus:border-orange-500/50"
              value={age} onChange={e => setAge(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number" required placeholder="Berat Badan (kg)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-orange-500/50 focus:bg-slate-950"
              value={weight} onChange={e => setWeight(e.target.value)}
            />
            <input
              type="number" required placeholder="Tinggi Badan (cm)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-orange-500/50 focus:bg-slate-950"
              value={height} onChange={e => setHeight(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-2">Tingkat Aktivitas Mingguan:</label>
            <select 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-xs text-white focus:outline-none focus:border-orange-500/50"
              value={activity} onChange={e => setActivity(e.target.value)}
            >
              <option value="1.2">Jarang Olahraga / Rebahan (Sedentary)</option>
              <option value="1.375">Olahraga Ringan (1-3 Hari / Minggu)</option>
              <option value="1.55">Olahraga Sedang (3-5 Hari / Minggu)</option>
              <option value="1.725">Olahraga Berat / Gym Hardcore (6-7 Hari)</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-slate-950 font-black py-4 rounded-2xl text-sm transition-all active:scale-95 cursor-pointer">
            Kalkulasi Metabolisme Tubuh
          </button>

          {/* 🚀 FIXED: Mengubah TDEE menjadi tdee huruf kecil agar sesuai dengan state */}
          {bmr !== null && tdee !== null && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 grid grid-cols-2 gap-4 text-center animate-in zoom-in-95 duration-200">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">BMR (Kalori Basal):</p>
                <span className="text-md font-black text-slate-200">{bmr} <span className="text-[10px] font-normal text-slate-500">kcal</span></span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">TDEE (Kebutuhan Kalori):</p>
                <span className="text-md font-black text-orange-400">{tdee} <span className="text-[10px] font-normal text-slate-500">kcal</span></span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
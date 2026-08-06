"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Flame, ChevronDown } from 'lucide-react';

const ACTIVITY_OPTIONS = [
  { value: '1.2', label: 'Jarang Olahraga / Rebahan (Sedentary)' },
  { value: '1.375', label: 'Olahraga Ringan (1–3 Hari / Minggu)' },
  { value: '1.55', label: 'Olahraga Sedang (3–5 Hari / Minggu)' },
  { value: '1.725', label: 'Olahraga Berat / Gym Hardcore (6–7 Hari)' },
];

export default function BmrTdeeCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activity, setActivity] = useState('1.2');

  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);

  const calculateFitness = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (w > 0 && h > 0 && a > 0) {
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

  const bmrPct = useMemo(() => (bmr && tdee ? Math.min((bmr / tdee) * 100, 100) : null), [bmr, tdee]);

  return (
    <div className="min-h-screen bg-[#0C0A08] text-[#EDE4D9] pt-24 pb-16 px-4 sm:px-8 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        @keyframes flicker { 0%,100% { opacity: .85; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.06); } }
        .flame-flicker { animation: flicker 1.8s ease-in-out infinite; transform-origin: bottom; }
        @keyframes emberShimmer { 0% { background-position: 0 0; } 100% { background-position: 60px 0; } }
        .ember-shimmer { background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.10) 0, rgba(255,255,255,0.10) 6px, transparent 6px, transparent 14px); animation: emberShimmer 2.4s linear infinite; }
        select.forge-select { appearance: none; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none opacity-[0.05]" style={{ background: 'radial-gradient(circle at 50% 100%, #FF7A45 0%, transparent 60%)' }} />
      <div className="fixed -top-20 -left-20 w-72 h-72 bg-[#B87333]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative font-body">

        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-[#171310] border border-[#2E251C] rounded-xl hover:border-[#FF7A45]/40 hover:bg-[#1C1712] transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#9C8E7E]" />
          </Link>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#FF7A45] font-semibold mb-0.5">
              Tungku Metabolisme
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5EBDD]">
              BMR & TDEE Calculator
            </h1>
          </div>
        </div>

        <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-[#FF7A45]/40 via-[#B87333]/15 to-transparent">
          <div className="relative rounded-[27px] bg-[#120F0C] border border-[#2E251C] px-6 py-7 sm:px-9 sm:py-9">

            <form onSubmit={calculateFitness} className="space-y-5 relative z-10">

              {/* Gender & umur */}
              <div className="grid grid-cols-3 gap-2.5">
                {['male', 'female'].map((g) => (
                  <button
                    key={g} type="button" onClick={() => setGender(g)}
                    className={`p-3 rounded-xl font-semibold text-xs border transition-colors ${
                      gender === g
                        ? 'bg-[#FF7A45]/10 border-[#FF7A45]/60 text-[#FFB86B]'
                        : 'bg-[#0C0A08] border-[#2E251C] text-[#9C8E7E] hover:border-[#3E332600]'
                    }`}
                  >
                    {g === 'male' ? 'Laki-Laki' : 'Perempuan'}
                  </button>
                ))}
                <input
                  type="number" required placeholder="Umur"
                  className="w-full bg-[#0C0A08] border border-[#2E251C] rounded-xl px-3 text-xs text-center text-[#F5EBDD] placeholder:text-[#5C4E3E] focus:outline-none focus:border-[#FF7A45]/60 focus:ring-2 focus:ring-[#FF7A45]/15 transition-colors"
                  value={age} onChange={e => setAge(e.target.value)}
                />
              </div>

              {/* Berat & tinggi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="number" required placeholder="Berat Badan (kg)"
                  className="w-full bg-[#0C0A08] border border-[#2E251C] rounded-xl px-4 py-3.5 text-sm text-[#F5EBDD] placeholder:text-[#5C4E3E] focus:outline-none focus:border-[#FF7A45]/60 focus:ring-2 focus:ring-[#FF7A45]/15 transition-colors"
                  value={weight} onChange={e => setWeight(e.target.value)}
                />
                <input
                  type="number" required placeholder="Tinggi Badan (cm)"
                  className="w-full bg-[#0C0A08] border border-[#2E251C] rounded-xl px-4 py-3.5 text-sm text-[#F5EBDD] placeholder:text-[#5C4E3E] focus:outline-none focus:border-[#FF7A45]/60 focus:ring-2 focus:ring-[#FF7A45]/15 transition-colors"
                  value={height} onChange={e => setHeight(e.target.value)}
                />
              </div>

              {/* Aktivitas */}
              <div>
                <label className="block text-[10px] font-bold text-[#9C8E7E] uppercase tracking-widest pl-1 mb-2">
                  Tingkat Aktivitas Mingguan
                </label>
                <div className="relative">
                  <select
                    className="forge-select w-full bg-[#0C0A08] border border-[#2E251C] rounded-xl px-4 py-3.5 text-xs text-[#F5EBDD] focus:outline-none focus:border-[#FF7A45]/60 focus:ring-2 focus:ring-[#FF7A45]/15 transition-colors"
                    value={activity} onChange={e => setActivity(e.target.value)}
                  >
                    {ACTIVITY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-[#120F0C]">{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#9C8E7E] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#C2410C] via-[#FF7A45] to-[#FFB86B] text-[#120F0C] font-bold py-4 rounded-2xl text-sm transition-all active:scale-[0.99] hover:brightness-105 flex items-center justify-center gap-2 shadow-[0_10px_30px_-10px_rgba(255,122,69,0.4)]"
              >
                <Flame className="w-4 h-4 fill-current" /> Kalkulasi Metabolisme Tubuh
              </button>

              {bmr !== null && tdee !== null && bmrPct !== null && (
                <div className="space-y-5 pt-2">

                  {/* Tungku, elemen signature: BMR sebagai bahan bakar dasar, sisanya dari aktivitas */}
                  <div className="rounded-2xl border border-[#2E251C] bg-[#0C0A08]/60 p-5">
                    <div className="flex items-end justify-center gap-2 mb-4">
                      <Flame className="w-6 h-6 text-[#FFB86B] flame-flicker" />
                      <span className="font-display text-4xl font-bold text-[#F5EBDD] tabular-nums">{tdee}</span>
                      <span className="text-xs text-[#9C8E7E] pb-1.5">kcal / hari</span>
                    </div>

                    <div className="relative h-4 rounded-full overflow-hidden border border-[#2E251C] flex">
                      <div
                        className="h-full bg-gradient-to-r from-[#8A2E0A] to-[#C2410C] transition-all duration-700"
                        style={{ width: `${bmrPct}%` }}
                      />
                      <div
                        className="h-full bg-gradient-to-r from-[#FF7A45] to-[#FFD166] ember-shimmer transition-all duration-700"
                        style={{ width: `${100 - bmrPct}%` }}
                      />
                    </div>

                    <div className="flex justify-between mt-3 text-center">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-[#C2410C] font-bold mb-0.5">Bahan Bakar Dasar (BMR)</p>
                        <p className="font-display text-lg font-bold text-[#F5EBDD] tabular-nums">{bmr} <span className="text-[10px] font-normal text-[#9C8E7E]">kcal</span></p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-[#FFB86B] font-bold mb-0.5">Dari Aktivitas</p>
                        <p className="font-display text-lg font-bold text-[#F5EBDD] tabular-nums">{tdee - bmr} <span className="text-[10px] font-normal text-[#9C8E7E]">kcal</span></p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#5C4E3E] text-center">
                    TDEE adalah estimasi total kalori harian: kalori istirahat (BMR) ditambah kalori dari aktivitas fisikmu.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

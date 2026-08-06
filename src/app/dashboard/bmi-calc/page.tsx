"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Weight, Ruler } from 'lucide-react';

const ZONES = [
  { key: 'under', label: 'Kurus', from: 15, to: 18.5, color: '#6FA8D9' },
  { key: 'normal', label: 'Ideal', from: 18.5, to: 25, color: '#5FCB9B' },
  { key: 'over', label: 'Gemuk', from: 25, to: 30, color: '#E0B15D' },
  { key: 'obese', label: 'Obesitas', from: 30, to: 35, color: '#D9706F' },
];
const RANGE_MIN = 15;
const RANGE_MAX = 35;

export default function BmiCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBmi = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;

    if (w > 0 && h > 0) {
      const score = w / (h * h);
      setBmi(parseFloat(score.toFixed(1)));
    }
  };

  const activeZone = useMemo(() => {
    if (bmi === null) return null;
    return ZONES.find((z) => bmi < z.to) ?? ZONES[ZONES.length - 1];
  }, [bmi]);

  const markerPct = useMemo(() => {
    if (bmi === null) return null;
    const clamped = Math.min(Math.max(bmi, RANGE_MIN), RANGE_MAX);
    return ((clamped - RANGE_MIN) / (RANGE_MAX - RANGE_MIN)) * 100;
  }, [bmi]);

  return (
    <div className="min-h-screen bg-[#0A0E13] text-[#DCE3E8] pt-24 pb-16 px-4 sm:px-8 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Grid biru sangat samar, kesan lembar ukur instrumen */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#6FA8D9 1px, transparent 1px), linear-gradient(90deg, #6FA8D9 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-[#6FA8D9]/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative font-body">

        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-[#101720] border border-[#243040] rounded-xl hover:border-[#6FA8D9]/40 hover:bg-[#141E29] transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#7C8A96]" />
          </Link>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#6FA8D9] font-semibold mb-0.5">
              Instrumen Biometrik
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#EAF0F4]">
              Kalkulator BMI
            </h1>
          </div>
        </div>

        <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-[#6FA8D9]/35 via-[#243040] to-transparent">
          <div className="relative rounded-[27px] bg-[#0E141B] border border-[#1C2733] px-6 py-7 sm:px-9 sm:py-9">

            {/* Bezel corner ticks, kesan panel instrumen */}
            {['top-5 left-5', 'top-5 right-5', 'bottom-5 left-5', 'bottom-5 right-5'].map((pos, i) => (
              <div key={i} className={`absolute w-2.5 h-2.5 border-[#6FA8D9]/25 ${pos} ${
                i === 0 ? 'border-t border-l' : i === 1 ? 'border-t border-r' : i === 2 ? 'border-b border-l' : 'border-b border-r'
              }`} />
            ))}

            <form onSubmit={calculateBmi} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-[#7C8A96] mb-2">
                    <Weight className="w-3.5 h-3.5 text-[#6FA8D9]" /> Berat Badan (kg)
                  </label>
                  <input
                    type="number" required placeholder="Contoh: 65" step="0.1"
                    className="w-full bg-[#0A0E13] border border-[#243040] rounded-xl px-4 py-3 text-sm text-[#EAF0F4] placeholder:text-[#3E4A56] focus:outline-none focus:border-[#6FA8D9]/60 focus:ring-2 focus:ring-[#6FA8D9]/15 transition-colors tabular-nums"
                    value={weight} onChange={e => setWeight(e.target.value)}
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-medium text-[#7C8A96] mb-2">
                    <Ruler className="w-3.5 h-3.5 text-[#6FA8D9]" /> Tinggi Badan (cm)
                  </label>
                  <input
                    type="number" required placeholder="Contoh: 170" step="0.1"
                    className="w-full bg-[#0A0E13] border border-[#243040] rounded-xl px-4 py-3 text-sm text-[#EAF0F4] placeholder:text-[#3E4A56] focus:outline-none focus:border-[#6FA8D9]/60 focus:ring-2 focus:ring-[#6FA8D9]/15 transition-colors tabular-nums"
                    value={height} onChange={e => setHeight(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4F87C4] to-[#5FCB9B] text-[#0A0E13] font-bold py-4 rounded-2xl text-sm transition-all active:scale-[0.99] hover:brightness-105 flex items-center justify-center gap-2 shadow-[0_10px_30px_-10px_rgba(111,168,217,0.35)]"
              >
                <Activity className="w-4 h-4" /> Hitung Skor BMI
              </button>

              {bmi !== null && activeZone && markerPct !== null && (
                <div className="space-y-6 pt-2">

                  {/* Hasil angka */}
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-[#7C8A96] uppercase tracking-widest mb-1">Skor BMI Anda</p>
                    <div className="flex items-baseline justify-center gap-2">
                      <h2 className="font-display text-5xl font-bold text-[#EAF0F4] tabular-nums">{bmi}</h2>
                    </div>
                    <p className="text-sm font-semibold pt-1.5" style={{ color: activeZone.color }}>
                      {activeZone.label === 'Ideal' ? 'Normal / Ideal (Healthy)' : activeZone.label === 'Kurus' ? 'Kurus (Underweight)' : activeZone.label === 'Gemuk' ? 'Gemuk (Overweight)' : 'Obesitas (Obese)'}
                    </p>
                  </div>

                  {/* Skala biometrik, elemen signature */}
                  <div className="pt-2">
                    <div className="relative pt-8">
                      {/* Marker */}
                      <div
                        className="absolute top-0 flex flex-col items-center transition-all duration-700 ease-out"
                        style={{ left: `${markerPct}%`, transform: 'translateX(-50%)' }}
                      >
                        <span
                          className="text-[11px] font-bold font-display px-2 py-0.5 rounded-md mb-1 whitespace-nowrap tabular-nums"
                          style={{ backgroundColor: activeZone.color, color: '#0A0E13' }}
                        >
                          {bmi}
                        </span>
                        <div className="w-0.5 h-4" style={{ backgroundColor: activeZone.color }} />
                        <div
                          className="w-3 h-3 rounded-full border-2 border-[#0E141B] -mt-1"
                          style={{ backgroundColor: activeZone.color, boxShadow: `0 0 10px ${activeZone.color}90` }}
                        />
                      </div>

                      {/* Bar zona */}
                      <div className="flex w-full h-2.5 rounded-full overflow-hidden border border-[#1C2733]">
                        {ZONES.map((z) => (
                          <div
                            key={z.key}
                            style={{ width: `${((z.to - z.from) / (RANGE_MAX - RANGE_MIN)) * 100}%`, backgroundColor: z.color, opacity: activeZone.key === z.key ? 1 : 0.35 }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Label zona */}
                    <div className="flex justify-between mt-2.5">
                      {ZONES.map((z) => (
                        <span
                          key={z.key}
                          className="text-[9px] sm:text-[10px] uppercase tracking-wide font-semibold"
                          style={{ color: activeZone.key === z.key ? z.color : '#3E4A56' }}
                        >
                          {z.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        <p className="text-[11px] text-[#3E4A56] text-center mt-6">
          BMI adalah indikator umum, bukan diagnosis. Konsultasikan dengan tenaga medis untuk penilaian yang akurat.
        </p>
      </div>
    </div>
  );
}

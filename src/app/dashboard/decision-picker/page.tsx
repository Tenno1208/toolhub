"use client";
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { HelpCircle, Plus, Trash2, ArrowLeft, Sparkles } from 'lucide-react';

const SEGMENT_COLORS = ['#B08D57', '#181A26', '#7C6FD9'];

function buildWheelGradient(count: number) {
  const seg = 360 / count;
  const stops = Array.from({ length: count }, (_, i) => {
    const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
    return `${color} ${i * seg}deg ${(i + 1) * seg}deg`;
  });
  return `conic-gradient(from 0deg, ${stops.join(', ')})`;
}

export default function DecisionPicker() {
  const [options, setOptions] = useState<string[]>(['Ayam Geprek', 'Bakso Mercon', 'Sate Padang']);
  const [newOption, setNewOption] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const wheelGradient = useMemo(() => buildWheelGradient(options.length), [options.length]);

  const addOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const pickDecision = () => {
    if (options.length < 2) return;
    setIsSpinning(true);
    setResult(null);

    const idx = Math.floor(Math.random() * options.length);
    const seg = 360 / options.length;
    const targetAngle = idx * seg + seg / 2;
    const rMod = (360 - targetAngle) % 360;
    const extraSpins = 5 * 360;
    const forwardDelta = (rMod - (rotation % 360) + 360) % 360;
    const finalRotation = rotation + extraSpins + forwardDelta;

    setRotation(finalRotation);

    setTimeout(() => {
      setResult(options[idx]);
      setIsSpinning(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-[#E9E5DA] pt-24 pb-16 px-4 sm:px-8 select-none relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        @keyframes glowPulse { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
        .glow-pulse { animation: glowPulse 2.6s ease-in-out infinite; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(176,141,87,0.08), transparent 55%)' }} />
      <div className="fixed -bottom-32 -right-24 w-80 h-80 bg-[#7C6FD9]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative font-body">

        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-[#14161F] border border-[#2A2D3D] rounded-xl hover:border-[#B08D57]/50 hover:bg-[#1A1D29] transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#9C97A8]" />
          </Link>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#B08D57] font-semibold mb-0.5">
              Roda Takdir &middot; Keputusan Mutlak
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#F2ECDD]">
              Decision Picker
            </h1>
          </div>
        </div>

        <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-[#B08D57]/50 via-[#7C6FD9]/15 to-transparent">
          <div className="relative rounded-[27px] bg-[#0E1016] border border-[#2A2D3D]/70 p-5 sm:p-8 space-y-7">

            {/* Roda takdir, elemen signature */}
            <div className="flex flex-col items-center pt-2">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64">
                {/* Penunjuk */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                  <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-[#E9D9AE] drop-shadow-[0_0_6px_rgba(233,217,174,0.6)]" />
                </div>

                {/* Cincin brass */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E9D9AE] via-[#B08D57] to-[#6E5730] p-[6px] shadow-[0_0_40px_-6px_rgba(176,141,87,0.4)]">
                  <div
                    className="w-full h-full rounded-full border-2 border-[#08090D]/40"
                    style={{
                      background: wheelGradient,
                      transform: `rotate(${rotation}deg)`,
                      transition: isSpinning ? 'transform 2.4s cubic-bezier(0.17,0.67,0.1,1)' : 'none',
                    }}
                  />
                </div>

                {/* Hub tengah */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E9D9AE] to-[#B08D57] flex items-center justify-center shadow-lg border-2 border-[#08090D]/50">
                    <Sparkles className={`w-5 h-5 text-[#0E1016] ${isSpinning ? 'animate-spin' : 'glow-pulse'}`} />
                  </div>
                </div>
              </div>

              <p className="text-[10px] font-mono tracking-widest text-[#6B6578] uppercase mt-5">
                {isSpinning ? 'Membaca alur takdir...' : 'Roda menanti giliranmu'}
              </p>
            </div>

            {/* Input opsi baru */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <input
                type="text"
                className="w-full bg-[#08090D] border border-[#2A2D3D] rounded-xl px-4 py-3.5 text-sm text-[#F2ECDD] placeholder:text-[#4E4B5C] focus:outline-none focus:border-[#B08D57]/60 focus:ring-2 focus:ring-[#B08D57]/20 transition-all"
                placeholder="Masukkan pilihan baru (Misal: Bakso)..."
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addOption()}
              />
              <button
                type="button"
                onClick={addOption}
                disabled={!newOption.trim()}
                className="w-full sm:w-auto bg-gradient-to-r from-[#E9D9AE] to-[#B08D57] disabled:from-[#1A1D29] disabled:to-[#1A1D29] text-[#0E1016] disabled:text-[#4E4B5C] disabled:cursor-not-allowed font-bold px-6 py-3.5 sm:py-0 rounded-xl hover:brightness-105 active:scale-95 transition-all text-sm flex items-center justify-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Tambah
              </button>
            </div>

            {/* Daftar opsi, titik warna selaras dengan segmen roda */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-[#6B6578] uppercase tracking-widest pl-1">
                Daftar Opsi Pilihan ({options.length})
              </label>
              <div className="bg-[#08090D]/80 rounded-2xl border border-[#2A2D3D]/80 p-3 max-h-56 overflow-y-auto space-y-2">
                {options.map((opt, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#14161F]/70 border border-white/[0.02] px-4 py-3.5 rounded-xl text-xs sm:text-sm group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{
                          backgroundColor: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
                          boxShadow: `0 0 8px ${SEGMENT_COLORS[index % SEGMENT_COLORS.length]}80`,
                        }}
                      />
                      <span className="font-semibold tracking-wide text-[#F2ECDD] truncate max-w-[200px] sm:max-w-md">{opt}</span>
                    </div>
                    {options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="text-[#6B6578] hover:text-[#E8637D] p-1.5 hover:bg-[#E8637D]/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol putar */}
            <button
              type="button"
              onClick={pickDecision}
              disabled={options.length < 2 || isSpinning}
              className="w-full bg-gradient-to-r from-[#6E5730] via-[#B08D57] to-[#E9D9AE] hover:brightness-105 active:scale-[0.99] text-[#0E1016] font-black py-4 rounded-2xl text-xs sm:text-sm tracking-wide transition-all disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center gap-2 shadow-[0_10px_30px_-10px_rgba(176,141,87,0.5)]"
            >
              <HelpCircle className={`w-4 h-4 ${isSpinning ? 'animate-pulse' : ''}`} />
              {isSpinning ? 'MEMUTAR RODA TAKDIR...' : 'TENTUKAN PILIHAN SEKARANG!'}
            </button>

            {/* Hasil */}
            {result && !isSpinning && (
              <div className="relative rounded-2xl border border-[#B08D57]/40 bg-gradient-to-br from-[#1A1712] to-[#0E1016] p-6 text-center overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E9D9AE] to-transparent" />
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-[#B08D57] tracking-widest uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Keputusan Mutlak Ditemukan
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F2ECDD] tracking-wide px-2 truncate">
                  {result}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Heart, RefreshCw, ArrowLeft, Sparkles } from 'lucide-react';

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

  const displayScore = score ?? 50;
  const needleRotation = 1.8 * displayScore - 90;
  const zone = score === null ? null : score > 85 ? 'cocok' : score > 65 ? 'lumayan' : 'renggang';

  return (
    <div className="min-h-screen bg-[#210A16] text-[#F1E4D8] pt-24 pb-16 px-4 sm:px-8 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Inter:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'Playfair Display', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        @keyframes floatHeart { 0%,100% { transform: translateY(0) rotate(-4deg); } 50% { transform: translateY(-6px) rotate(4deg); } }
        .float-heart { animation: floatHeart 4s ease-in-out infinite; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .shimmer-btn { background-size: 200% 100%; animation: shimmer 3.5s linear infinite; }
      `}</style>

      {/* Latar bertekstur lembut, bintik seperti kertas surat lama */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #E8B4B8 1px, transparent 1px)",
          backgroundSize: '22px 22px',
        }}
      />
      <div className="fixed -top-24 -right-24 w-72 h-72 bg-[#C9748A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed -bottom-24 -left-24 w-72 h-72 bg-[#C9974B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative font-body">

        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/dashboard"
            className="p-2 bg-[#33101F] border border-[#5A2338] rounded-xl hover:border-[#C9974B]/50 hover:bg-[#3D1526] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#C9A6A0]" />
          </Link>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9974B] font-semibold mb-0.5">
              Ramalan Asmara &middot; Gimmick Belaka
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#F6E9DC] italic">
              Kalkulator Jodoh
            </h1>
          </div>
        </div>

        {/* Kartu utama, ala kertas surat cinta bersegel */}
        <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-[#C9974B]/50 via-[#C9748A]/20 to-transparent">
          <div className="relative rounded-[27px] bg-[#2B0F1D] border border-[#5A2338]/60 px-6 py-8 sm:px-10 sm:py-10">

            {/* Ornamen sudut */}
            {[
              'top-4 left-4 rotate-0',
              'top-4 right-4 rotate-90',
              'bottom-4 right-4 rotate-180',
              'bottom-4 left-4 -rotate-90',
            ].map((pos, i) => (
              <svg key={i} className={`absolute w-5 h-5 text-[#C9974B]/30 ${pos}`} viewBox="0 0 24 24" fill="none">
                <path d="M2 2 L2 10 M2 2 L10 2 M2 2 Q10 2 10 10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            ))}

            {/* Gauge cinta, elemen signature */}
            <div className="flex justify-center mb-6 relative z-10">
              <div className="relative w-52">
                <svg viewBox="0 0 200 110" className="w-full">
                  <path d="M20,100 A80,80 0 0,1 136.3,28.7" fill="none" stroke="#4A2333" strokeWidth="13" strokeLinecap="round" />
                  <path d="M136.3,28.7 A80,80 0 0,1 171.3,63.7" fill="none" stroke="#C9974B" strokeWidth="13" strokeLinecap="round" opacity="0.85" />
                  <path d="M171.3,63.7 A80,80 0 0,1 180,100" fill="none" stroke="#E8637D" strokeWidth="13" strokeLinecap="round" />

                  <line
                    x1="100" y1="100" x2="100" y2="24"
                    stroke="#F6E9DC"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      transform: `rotate(${needleRotation}deg)`,
                      transformOrigin: '100px 100px',
                      transition: 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                  <circle cx="100" cy="100" r="7" fill="#C9974B" stroke="#F6E9DC" strokeWidth="1.5" />
                </svg>

                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
                  <span className="font-display text-4xl font-bold text-[#F6E9DC] tabular-nums leading-none">
                    {score !== null ? `${score}%` : '—'}
                  </span>
                  {zone && (
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold mt-1 ${
                        zone === 'cocok' ? 'text-[#E8637D]' : zone === 'lumayan' ? 'text-[#C9974B]' : 'text-[#8A6470]'
                      }`}
                    >
                      {zone === 'cocok' ? 'Cocok banget' : zone === 'lumayan' ? 'Lumayan aman' : 'Agak renggang'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 relative z-10">
              <div>
                <label className="block text-xs font-medium text-[#C9A6A0] mb-2">Nama Kamu</label>
                <input
                  type="text"
                  className="w-full bg-[#210A16] border border-[#5A2338] rounded-xl px-4 py-3 text-sm text-[#F6E9DC] placeholder:text-[#6B4552] focus:outline-none focus:border-[#C9974B]/60 focus:ring-2 focus:ring-[#C9974B]/20 transition-colors"
                  placeholder="Contoh: Dimas"
                  value={name1}
                  onChange={(e) => setName1(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#C9A6A0] mb-2">Nama Dia</label>
                <input
                  type="text"
                  className="w-full bg-[#210A16] border border-[#5A2338] rounded-xl px-4 py-3 text-sm text-[#F6E9DC] placeholder:text-[#6B4552] focus:outline-none focus:border-[#C9974B]/60 focus:ring-2 focus:ring-[#C9974B]/20 transition-colors"
                  placeholder="Contoh: Ayang"
                  value={name2}
                  onChange={(e) => setName2(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={calculateLove}
              disabled={!name1 || !name2 || loading}
              className="relative z-10 w-full shimmer-btn bg-gradient-to-r from-[#C9748A] via-[#E8637D] to-[#C9974B] disabled:opacity-40 disabled:cursor-not-allowed text-[#210A16] font-bold py-4 rounded-2xl text-sm hover:brightness-105 active:scale-[0.99] flex items-center justify-center gap-2 transition-all shadow-[0_8px_30px_-8px_rgba(232,99,125,0.5)]"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Membaca garis asmara...
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4 fill-current" />
                  Baca Garis Cinta
                </>
              )}
            </button>

            {score !== null && (
              <div className="relative z-10 mt-6 rounded-2xl border border-dashed border-[#C9974B]/40 bg-[#210A16]/50 p-6 text-center">
                <Sparkles className="w-4 h-4 text-[#C9974B] mx-auto mb-2 float-heart" />
                <p className="text-xs sm:text-sm text-[#EAD9CD] max-w-md mx-auto leading-relaxed">{message}</p>
              </div>
            )}
          </div>
        </div>

        <p className="text-[11px] text-[#6B4552] text-center mt-6">
          Sekadar hiburan — jodoh yang sebenarnya tidak ditentukan oleh jumlah huruf.
        </p>
      </div>
    </div>
  );
}

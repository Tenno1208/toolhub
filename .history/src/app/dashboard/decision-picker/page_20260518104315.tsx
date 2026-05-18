"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HelpCircle, Plus, Trash2, ArrowLeft, Shuffle, Sparkles } from 'lucide-react';

export default function DecisionPicker() {
  const [options, setOptions] = useState<string[]>(['Ayam Geprek', 'Bakso Mercon', 'Sate Padang']);
  const [newOption, setNewOption] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rollingText, setRollingText] = useState('');

  // Efek animasi teks mengacak cepat ala mesin slot/rolet saat isSpinning true
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSpinning && options.length > 0) {
      interval = setInterval(() => {
        const randomOpt = options[Math.floor(Math.random() * options.length)];
        setRollingText(randomOpt);
      }, 70); // Mengacak teks setiap 70ms agar terlihat berkelebat cepat
    }
    return () => clearInterval(interval);
  }, [isSpinning, options]);

  const addOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    // Sisakan minimal 1 opsi agar state tidak kosong melompong
    if (options.length > 1) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const pickDecision = () => {
    if (options.length < 2) return;
    setIsSpinning(true);
    setResult(null);

    // Proses penundaan takdir dengan delay dramatis
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setResult(options[randomIndex]);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Panel */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white tracking-tight">Keputusan Mutlak Picker</h1>
          </div>
        </div>

        {/* Kontainer Utama */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Input Opsi Baru - Terkunci Gelap */}
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-950 transition-all"
              placeholder="Masukkan pilihan (Misal: Bakso)..."
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addOption()}
            />
            <button 
              onClick={addOption} 
              disabled={!newOption.trim()}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-slate-950 disabled:cursor-not-allowed font-black px-5 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-950/20"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Tambah
            </button>
          </div>

          {/* List Opsi dengan Scrollbar Minimalis */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Daftar Opsi Pilihan ({options.length}):</label>
            <div className="bg-slate-950/60 rounded-2xl border border-slate-800/80 p-3 max-h-52 overflow-y-auto space-y-2 scrollbar-none">
              {options.map((opt, index) => (
                <div 
                  key={index} 
                  className="flex justify-between items-center bg-slate-900/40 border border-white/[0.02] px-4 py-3 rounded-xl text-xs sm:text-sm text-slate-300 animate-in fade-in slide-in-from-left-2 duration-200 group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors"></span>
                    <span className="font-medium tracking-wide truncate max-w-[180px] sm:max-w-md">{opt}</span>
                  </div>
                  {options.length > 2 && (
                    <button 
                      onClick={() => removeOption(index)} 
                      className="text-slate-600 hover:text-rose-400 p-1 hover:bg-rose-500/10 rounded-lg transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tombol Utama Pengacak Takdir */}
          <button
            onClick={pickDecision}
            disabled={options.length < 2 || isSpinning}
            className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:scale-[1.01] active:scale-[0.99] text-white font-black py-4 rounded-2xl text-xs sm:text-sm tracking-wide transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-cyan-950/30"
          >
            <Shuffle className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
            {isSpinning ? "MENGACAK GARIS TAKDIR..." : "TENTUKAN PILIHAN SEKARANG!"}
          </button>

          {/* --- AREA WINDOW RENDER KEPUTUSAN MUTLAK --- */}
          {(isSpinning || result) && (
            <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 text-center flex flex-col items-center justify-center min-h-[140px] relative overflow-hidden shadow-inner">
              
              {/* Efek Garis Lampu Neon Minimalis di Atas Box */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-pulse"></div>

              {/* Tampilan Kondisi Saat Sedang Mengacak Berkelebat (Spinning) */}
              {isSpinning && (
                <div className="animate-pulse space-y-1">
                  <p className="text-[10px] font-mono tracking-widest text-slate-600 uppercase">Mengevaluasi Kemungkinan...</p>
                  <h3 className="text-xl sm:text-2xl font-black text-cyan-400 italic font-mono transition-all truncate max-w-xs sm:max-w-md">
                    {rollingText || "Choosing..."}
                  </h3>
                </div>
              )}

              {/* Tampilan Kondisi Hasil Akhir Sudah Keluar */}
              {result && !isSpinning && (
                <div className="animate-in zoom-in-95 duration-300 space-y-1.5">
                  <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-cyan-400 tracking-widest uppercase">
                    <Sparkles className="w-3 h-3 text-cyan-400 animate-bounce" /> Keputusan Mutlak Found
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300 filter drop-shadow tracking-wide px-2 py-1 max-w-xs sm:max-w-md truncate">
                    {result}
                  </h3>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
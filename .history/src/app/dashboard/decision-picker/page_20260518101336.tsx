"use client";
import { useState } from 'react';
import { HelpCircle, Plus, Trash2, HelpCircle as DiceIcon } from 'lucide-react';

export default function DecisionPicker() {
  const [options, setOptions] = useState<string[]>(['Ayam Geprek', 'Bakso Mercon', 'Sate Padang']);
  const [newOption, setNewOption] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const addOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const pickDecision = () => {
    if (options.length < 2) return;
    setIsSpinning(true);
    setResult(null);
    
    // Efek delay animasi rolet pura-pura gantung
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setResult(options[randomIndex]);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
          <HelpCircle className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Keputusan Mutlak Picker</h2>
          <p className="text-xs text-slate-400">Solusi instan penentu takdir bagi kamu yang pusing memilih.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-grow bg-slate-950 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50"
            placeholder="Tambah opsi keputusan baru..."
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addOption()}
          />
          <button onClick={addOption} className="bg-white text-slate-950 font-bold px-4 rounded-xl hover:bg-slate-200 transition-all text-sm flex items-center gap-1">
            <Plus className="w-4 h-4 stroke-[3]" /> Tambah
          </button>
        </div>

        <div className="bg-slate-950 rounded-2xl border border-white/[0.05] p-4 max-h-48 overflow-y-auto space-y-2">
          {options.map((opt, index) => (
            <div key={index} className="flex justify-between items-center bg-white/[0.02] border border-white/[0.03] px-3 py-2 rounded-xl text-sm text-slate-300">
              <span>{opt}</span>
              <button onClick={() => removeOption(index)} className="text-slate-600 hover:text-rose-400 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={pickDecision}
          disabled={options.length < 2 || isSpinning}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 rounded-2xl text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          {isSpinning ? "Mengacak Garis Takdir..." : "Tentukan Pilihan Sekarang!"}
        </button>

        {result && (
          <div className="bg-cyan-500/10 border border-cyan-500/20 text-center py-5 rounded-2xl animate-in zoom-in-95 duration-200">
            <p className="text-xs font-medium text-cyan-400 tracking-wider uppercase mb-1">Keputusan Mutlak:</p>
            <h3 className="text-2xl font-black text-white filter drop-shadow">{result}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
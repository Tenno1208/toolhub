"use client";
import { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, Plus, Trash2, ArrowLeft } from 'lucide-react';

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
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setResult(options[randomIndex]);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Keputusan Mutlak Picker</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-grow bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50"
              placeholder="Tambah opsi keputusan baru..."
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addOption()}
            />
            <button onClick={addOption} className="bg-white text-slate-950 font-bold px-4 rounded-xl hover:bg-slate-200 transition-all text-sm flex items-center gap-1">
              <Plus className="w-4 h-4 stroke-[3]" /> Tambah
            </button>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 max-h-48 overflow-y-auto space-y-2">
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
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 rounded-2xl text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-30"
          >
            {isSpinning ? "Mengacak Garis Takdir..." : "Tentukan Pilihan Sekarang!"}
          </button>

          {result && (
            <div className="bg-cyan-500/10 border border-cyan-500/20 text-center py-5 rounded-2xl">
              <p className="text-xs font-medium text-cyan-400 tracking-wider uppercase mb-1">Keputusan Mutlak:</p>
              <h3 className="text-2xl font-black text-white">{result}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
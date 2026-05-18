"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Droplet, Plus, RotateCcw } from 'lucide-react';

export default function WaterTracker() {
  const [water, setWater] = useState(0);
  const target = 2000; // Target harian 2 Liter (2000ml)

  const addWater = (amount: number) => {
    setWater(prev => Math.min(prev + amount, 4000));
  };

  const percentage = Math.min(Math.round((water / target) * 100), 100);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Droplet className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-bold text-white">Water Intake Tracker</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-white">{water} <span className="text-sm text-slate-500 font-normal">/ {target} ml</span></h2>
            <p className="text-xs text-slate-400">Progress Hidrasi Tubuh Anda Hari Ini: <strong>{percentage}%</strong></p>
          </div>

          {/* Progress Bar Air Meluncur */}
          <div className="w-full bg-slate-950 border border-slate-800 h-4 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-300" style={{ width: `${percentage}%` }}></div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => addWater(250)} className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs font-semibold hover:border-blue-500/40 cursor-pointer flex items-center justify-center gap-1">
              <Plus className="w-3.5 h-3.5" /> 250ml (Gelas)
            </button>
            <button onClick={() => addWater(600)} className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs font-semibold hover:border-blue-500/40 cursor-pointer flex items-center justify-center gap-1">
              <Plus className="w-3.5 h-3.5" /> 600ml (Botol)
            </button>
            <button onClick={() => setWater(0)} className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/5 cursor-pointer flex items-center justify-center gap-1">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
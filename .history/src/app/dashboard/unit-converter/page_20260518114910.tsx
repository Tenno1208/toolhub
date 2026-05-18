"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';

export default function UnitConverter() {
  const [val, setVal] = useState('1');

  const num = parseFloat(val) || 0;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-bold text-white">Universal Unit Converter</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 space-y-4 shadow-xl">
          <input type="number" placeholder="Masukkan nilai angka..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500/50" value={val} onChange={e => setVal(e.target.value)} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex justify-between text-xs"><span>Kilogram (kg) ke Pon (lbs)</span><span className="font-mono font-bold text-blue-400">{(num * 2.204).toFixed(2)} lbs</span></div>
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex justify-between text-xs"><span>Sentimeter (cm) ke Inci (inch)</span><span className="font-mono font-bold text-blue-400">{(num / 2.54).toFixed(2)} in</span></div>
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex justify-between text-xs"><span>Meter (m) ke Kaki (feet)</span><span className="font-mono font-bold text-blue-400">{(num * 3.28).toFixed(2)} ft</span></div>
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl flex justify-between text-xs"><span>Celcius (°C) ke Fahrenheit (°F)</span><span className="font-mono font-bold text-blue-400">{(num * 9/5 + 32).toFixed(1)} °F</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';

export default function UnitConverter() {
  const [val, setVal] = useState('1');

  const num = parseFloat(val) || 0;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Navigation */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Universal Unit Converter</h1>
          </div>
        </div>

        {/* Converter Card Container */}
        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 space-y-4 shadow-xl backdrop-blur-md">
          <input 
            type="number" 
            placeholder="Masukkan nilai angka..." 
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-slate-950 transition-all" 
            value={val} 
            onChange={e => setVal(e.target.value)} 
          />
          
          {/* Grid Display Satuan Hasil Konversi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            
            {/* 🚀 FIXED: Kilogram (kg) ke Gram (g) */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Kilogram (kg) ke Gram (g)</span>
              <span className="font-mono font-bold text-blue-400 text-sm">{(num * 1000).toLocaleString('id-ID')} g</span>
            </div>
            
            {/* 🚀 FIXED: Meter (m) ke Sentimeter (cm) */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Meter (m) ke Sentimeter (cm)</span>
              <span className="font-mono font-bold text-blue-400 text-sm">{(num * 100).toLocaleString('id-ID')} cm</span>
            </div>
            
            {/* Sentimeter (cm) ke Inci (inch) */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Sentimeter (cm) ke Inci (inch)</span>
              <span className="font-mono font-bold text-blue-400 text-sm">{(num / 2.54).toFixed(2)} in</span>
            </div>
            
            {/* Celcius (°C) ke Fahrenheit (°F) */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium">Celcius (°C) ke Fahrenheit (°F)</span>
              <span className="font-mono font-bold text-blue-400 text-sm">{(num * 9/5 + 32).toFixed(1)} °F</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
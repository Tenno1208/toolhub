"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator as CalcIcon } from 'lucide-react';

export default function CalculatorTool() {
  const [display, setDisplay] = useState('');

  const handleBtnClick = (val: string) => {
    if (val === 'C') setDisplay('');
    else if (val === '=') {
      try {
        // Menggunakan fungsi instan yang aman untuk kalkulator dasar
        const result = new Function(`return ${display.replace(/×/g, '*').replace(/÷/g, '/')}`)();
        setDisplay(String(result));
      } catch {
        setDisplay('Error');
      }
    } else {
      if (display === 'Error') setDisplay(val);
      else setDisplay(display + val);
    }
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    'C', '0', '=', '+'
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <CalcIcon className="w-6 h-6 text-orange-400" />
            <h1 className="text-2xl font-bold text-white">Calculator</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-right mb-6 min-h-[5rem] flex items-center justify-end overflow-x-auto">
            <span className="text-4xl font-mono text-white tracking-wide">{display || '0'}</span>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleBtnClick(btn)}
                className={`h-16 rounded-xl font-mono text-xl font-bold transition-all ${
                  btn === '=' 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : btn === 'C' 
                    ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20' 
                    : ['÷','×','-','+'].includes(btn)
                    ? 'bg-slate-800 border border-slate-700 text-orange-400 hover:bg-slate-700'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
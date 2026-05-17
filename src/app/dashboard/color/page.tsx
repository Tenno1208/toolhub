"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Palette, Copy, Check } from 'lucide-react';

export default function ColorPickerTool() {
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
  };

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl font-bold text-white">Color Picker</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-10 flex flex-col items-center">
          <div className="w-32 h-32 rounded-3xl border border-white/10 shadow-2xl mb-8 relative overflow-hidden group cursor-pointer" style={{ backgroundColor: color }}>
            <input 
              type="color" value={color} onChange={(e) => setColor(e.target.value)}
              className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            />
          </div>

          <div className="w-full space-y-4 max-w-md">
            {[
              { label: 'HEX Format', val: color.toUpperCase() },
              { label: 'RGB Format', val: `rgb(${hexToRgb(color)})` }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block mb-0.5">{item.label}</span>
                  <span className="font-mono text-base font-semibold text-white">{item.val}</span>
                </div>
                <button onClick={() => copyText(item.val)} className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-800">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
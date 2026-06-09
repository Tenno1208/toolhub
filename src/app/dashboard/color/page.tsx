"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Palette, Copy, Check, Sparkles, Sliders, Eye } from 'lucide-react';

export default function LuxuryColorPicker() {
  const [color, setColor] = useState('#6366f1');
  const [activeCopiedLabel, setActiveCopiedLabel] = useState<string | null>(null);

  // Parser Kriptografi Kode Warna
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result 
      ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
      : { r: 99, g: 102, b: 241 };
  };

  const hexToHsl = (hex: string) => {
    let { r, g, b } = hexToRgb(hex);
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setActiveCopiedLabel(label);
    setTimeout(() => setActiveCopiedLabel(null), 1800);
  };

  const { r, g, b } = hexToRgb(color);

  // Membuat baris variasi kegelapan/kecerahan warna (Shades)
  const generateShades = () => {
    return [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4];
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 selection:bg-white/10">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-900 pb-5">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-indigo-400" />
              <h1 className="text-xl font-bold text-white tracking-tight">Chroma Studio</h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-slate-500 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-full">
            <Sparkles className="w-3 h-3 text-amber-400" /> Pro Lab Mode
          </div>
        </div>

        {/* Studio Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative">
          
          {/* Efek Mesh Glow Latar Belakang (Dinamis Berubah Mengikuti Warna Terpilih) */}
          <div 
            className="absolute left-1/3 top-1/4 w-80 h-80 blur-[140px] rounded-full opacity-15 pointer-events-none transition-all duration-700 hidden lg:block"
            style={{ backgroundColor: color }}
          />

          {/* Kolom Kiri: Pemicu Lingkaran Warna Utama */}
          <div className="lg:col-span-5 bg-slate-900/40 border border-white/[0.04] rounded-3xl p-6 flex flex-col justify-center items-center text-center shadow-2xl backdrop-blur-sm relative overflow-hidden">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 block">
              Sentuh Sirkular Untuk Mengubah
            </span>

            {/* Pemicu Lingkaran Mewah */}
            <div className="relative group mb-6">
              <div 
                className="w-36 h-36 rounded-full border-4 border-slate-950 shadow-2xl transition-transform duration-500 group-hover:scale-105 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: color, boxShadow: `0 20px 40px -10px ${color}30` }}
              >
                <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-pointer scale-150"
                />
                <Eye className="w-5 h-5 text-white drop-shadow opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Tint Shades Bar */}
            <div className="w-full space-y-2 mt-4">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">
                Generasi Spektrum Turunan
              </span>
              <div className="flex h-6 rounded-lg overflow-hidden border border-slate-950 p-[2px] bg-slate-950">
                {generateShades().map((factor, idx) => {
                  const sR = Math.min(255, Math.floor(r * factor));
                  const sG = Math.min(255, Math.floor(g * factor));
                  const sB = Math.min(255, Math.floor(b * factor));
                  const hexShade = `#${sR.toString(16).padStart(2, '0')}${sG.toString(16).padStart(2, '0')}${sB.toString(16).padStart(2, '0')}`;
                  
                  return (
                    <div 
                      key={idx} 
                      onClick={() => setColor(hexShade)}
                      className="flex-1 h-full cursor-pointer transition-transform hover:scale-110 active:scale-95" 
                      style={{ backgroundColor: `rgb(${sR}, ${sG}, ${sB})` }}
                      title={`Pilih ${hexShade.toUpperCase()}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Rincian Kode Format Output */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-white/[0.04] rounded-3xl p-5 sm:p-6 space-y-4 shadow-2xl backdrop-blur-sm flex flex-col justify-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest pl-1 block mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" /> Salin Kode Saluran
            </span>

            <div className="space-y-3">
              {[
                { label: 'HEX Format', val: color.toUpperCase(), key: 'hex' },
                { label: 'RGB Format', val: `rgb(${r}, ${g}, ${b})`, key: 'rgb' },
                { label: 'HSL Format', val: hexToHsl(color), key: 'hsl' }
              ].map((item) => {
                const isThisCopied = activeCopiedLabel === item.key;
                return (
                  <div key={item.key} className="bg-slate-950 border border-slate-900 rounded-2xl p-4 flex items-center justify-between group/row hover:border-slate-800 transition-all">
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500 block mb-0.5">{item.label}</span>
                      <span className="font-mono text-xs sm:text-sm font-bold text-slate-200 tracking-wide">{item.val}</span>
                    </div>
                    
                    <button 
                      onClick={() => copyText(item.val, item.key)} 
                      className="p-2 bg-slate-900 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors border border-slate-800/80 cursor-pointer"
                      title={`Salin ${item.label}`}
                    >
                      {isThisCopied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 group-hover/row:scale-105 transition-transform" />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
} 
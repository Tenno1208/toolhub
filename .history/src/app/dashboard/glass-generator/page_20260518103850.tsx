"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Layers, Copy, Check, ArrowLeft, Sliders } from 'lucide-react';

export default function GlassGenerator() {
  const [opacity, setOpacity] = useState(0.15);
  const [blur, setBlur] = useState(12);
  const [color, setColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);

  // Fungsi konversi HEX ke RGB untuk kebutuhan background-color inline CSS
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
  };

  const rgbVal = hexToRgb(color);
  
  // Sintaks CSS murni yang di-generate
  const cssCode = `background: rgba(${rgbVal}, ${opacity});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder: 1px solid rgba(${rgbVal}, ${opacity + 0.1});\nborder-radius: 16px;`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Navigasi */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white">Glassmorphism Generator</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- PANEL KONTROL SLIDER (KIRI) --- */}
          <div className="lg:col-span-5 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-2">
              <Sliders className="w-4 h-4 text-amber-400" /> Pengaturan Gaya
            </h2>

            {/* Slider Opacity */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Transparansi (Opacity)</span>
                <span className="text-amber-400 font-mono">{opacity}</span>
              </div>
              <input 
                type="range" min="0.01" max="0.95" step="0.01" value={opacity} 
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer bg-slate-950 h-1.5 rounded-lg appearance-none"
              />
            </div>

            {/* Slider Blur */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Efek Buram (Blur)</span>
                <span className="text-amber-400 font-mono">{blur}px</span>
              </div>
              <input 
                type="range" min="0" max="40" step="1" value={blur} 
                onChange={(e) => setBlur(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer bg-slate-950 h-1.5 rounded-lg appearance-none"
              />
            </div>

            {/* Warna Dasar Tint */}
            <div>
              <label className="block text-xs text-slate-400 mb-2">Warna Kaca (Tint Color)</label>
              <div className="flex gap-3 items-center bg-slate-950 border border-slate-800 p-3 rounded-xl">
                <input 
                  type="color" value={color} 
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded-lg border border-white/10 bg-transparent cursor-pointer"
                />
                <span className="font-mono text-sm text-slate-300 uppercase">{color}</span>
              </div>
            </div>
          </div>

          {/* --- PANEL PREVIEW & CODE OUTPUT (KANAN) --- */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Box Preview dengan Background Gradasi Berwarna agar Kelihatan Efek Transparannya */}
            <div className="w-full h-52 bg-gradient-to-tr from-purple-600 via-pink-600 to-cyan-500 rounded-3xl flex items-center justify-center p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-4 left-6 text-[10px] text-white/40 font-mono uppercase tracking-widest">Live Preview Box</div>
              
              {/* Ini adalah Kotak Kaca yang Ter-generate otomatis */}
              <div 
                className="w-full h-24 max-w-sm flex items-center justify-center text-center font-bold text-white text-sm shadow-xl transition-all"
                style={{
                  background: `rgba(${rgbVal}, ${opacity})`,
                  backdropFilter: `blur(${blur}px)`,
                  WebkitBackdropFilter: `blur(${blur}px)`,
                  border: `1px solid rgba(${rgbVal}, ${opacity + 0.1})`,
                  borderRadius: '20px'
                }}
              >
                RFF707 Premium Glass 🌟
              </div>
            </div>

            {/* Output CSS Code Box */}
            <div className="relative">
              <div className="absolute top-3 left-4 text-[9px] font-mono font-bold tracking-widest uppercase text-slate-600">Generated CSS Style</div>
              <textarea
                readOnly
                value={cssCode}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 pt-9 font-mono text-xs text-cyan-400 h-40 resize-none focus:outline-none leading-relaxed"
              />
              <button
                onClick={handleCopy}
                className="absolute bottom-4 right-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
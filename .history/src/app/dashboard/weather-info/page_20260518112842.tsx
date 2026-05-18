"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CloudSun, CloudRain, Sun, Wind, Droplets, Thermometer, Sparkles } from 'lucide-react';

const REGIONS = [
  { city: 'Semarang', temp: 32, condition: 'Cerah Berawan', humidity: 75, wind: 12, icon: <CloudSun className="w-12 h-12 text-amber-400" />, tip: 'Cuaca panas lembap. Gunakan pakaian katun tipis dan siapkan sunscreen!' },
  { city: 'Jakarta', temp: 34, condition: 'Sangat Cerah', humidity: 65, wind: 15, icon: <Sun className="w-12 h-12 text-orange-400" />, tip: 'Terik matahari menyengat. Hindari jalan kaki siang bolong, minum air yang banyak!' },
  { city: 'Bandung', temp: 23, condition: 'Hujan Ringan', humidity: 85, wind: 8, icon: <CloudRain className="w-12 h-12 text-cyan-400" />, tip: 'Udara dingin bumbu gerimis. Sangat cocok pakai jaket atau hoodie favoritmu.' },
  { city: 'Surabaya', temp: 35, condition: 'Cerah Terik', humidity: 60, wind: 18, icon: <Sun className="w-12 h-12 text-amber-500" />, tip: 'Panas ekstrem le! Pakai kacamata hitam dan batasi aktivitas outdoor berat.' },
  { city: 'Tokyo', temp: 18, condition: 'Cerah Sejuk', humidity: 50, wind: 10, icon: <CloudSun className="w-12 h-12 text-indigo-400" />, tip: 'Suasana sejuk segar. Outfit kemeja lengan panjang atau cardigan sangat pas.' },
];

export default function WeatherTool() {
  const [selected, setSelected] = useState(REGIONS[0]);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white">Cek Kondisi Cuaca</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-6 space-y-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-2">Pilih Wilayah / Kota:</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {REGIONS.map((r) => (
                <button
                  key={r.city} type="button" onClick={() => setSelected(r)}
                  className={`p-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${selected.city === r.city ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  {r.city}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="mb-3">{selected.icon}</div>
            <h2 className="text-4xl font-black text-white font-mono">{selected.temp}°C</h2>
            <p className="text-sm text-slate-300 font-bold mt-1">{selected.condition}</p>

            <div className="grid grid-cols-2 gap-8 w-full mt-6 pt-6 border-t border-white/5 max-w-sm">
              <div className="flex items-center gap-2 justify-center">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <div className="text-left">
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Kelembapan</span>
                  <span className="text-xs font-mono font-bold text-slate-200">{selected.humidity}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Wind className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Kecepatan Angin</span>
                  <span className="text-xs font-mono font-bold text-slate-200">{selected.wind} km/h</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 flex gap-3 items-start">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-0.5">Rekomendasi Outfit & Aktivitas:</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">{selected.tip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
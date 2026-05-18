"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CloudSun, CloudRain, Sun, Wind, Droplets, Sparkles, Search, Cloud } from 'lucide-react';

const QUICK_REGIONS = [
  { city: 'Semarang', temp: 32, condition: 'Cerah Berawan', humidity: 75, wind: 12, icon: <CloudSun className="w-12 h-12 text-amber-400" />, tip: 'Cuaca panas lembap. Gunakan pakaian katun tipis dan siapkan sunscreen!' },
  { city: 'Jakarta', temp: 34, condition: 'Sangat Cerah', humidity: 65, wind: 15, icon: <Sun className="w-12 h-12 text-orange-400" />, tip: 'Terik matahari menyengat. Hindari jalan kaki siang bolong, minum air yang banyak!' },
  { city: 'Bandung', temp: 23, condition: 'Hujan Ringan', humidity: 85, wind: 8, icon: <CloudRain className="w-12 h-12 text-cyan-400" />, tip: 'Udara dingin bumbu gerimis. Sangat cocok pakai jaket atau hoodie favoritmu.' },
  { city: 'Surabaya', temp: 35, condition: 'Cerah Terik', humidity: 60, wind: 18, icon: <Sun className="w-12 h-12 text-amber-500" />, tip: 'Panas ekstrem le! Pakai kacamata hitam dan batasi aktivitas outdoor berat.' },
  { city: 'Tokyo', temp: 18, condition: 'Cerah Sejuk', humidity: 50, wind: 10, icon: <CloudSun className="w-12 h-12 text-indigo-400" />, tip: 'Suasana sejuk segar. Outfit kemeja lengan panjang atau cardigan sangat pas.' },
];

export default function WeatherTool() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState(QUICK_REGIONS[0]);

  // 🚀 ENGINE GENERATOR CUACA LOKAL OTOMATIS BERDASARKAN INPUT NAMA KOTA
  const generateLocalWeather = (cityName: string) => {
    if (!cityName.trim()) return;

    const cleanedCity = cityName.trim();
    
    // Cari apakah kota yang diketik ada di daftar quick select
    const found = QUICK_REGIONS.find(r => r.city.toLowerCase() === cleanedCity.toLowerCase());
    if (found) {
      setSelected(found);
      return;
    }

    // Jika tidak ada, buat kalkulasi matematika unik berdasarkan string nama kota (Hashing)
    let hash = 0;
    for (let i = 0; i < cleanedCity.length; i++) {
      hash = cleanedCity.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    // Tentukan parameter acak tapi stabil berdasarkan nama kota
    const temp = (hash % 16) + 20; // Menghasilkan rentang suhu 20°C sampai 35°C
    const humidity = (hash % 31) + 55; // Menghasilkan kelembapan 55% - 85%
    const wind = (hash % 15) + 5; // Kecepatan angin 5 - 20 km/h
    
    const conditions = ['Sangat Cerah', 'Cerah Berawan', 'Berawan Tebal', 'Hujan Ringan'];
    const condition = conditions[hash % conditions.length];

    let icon = <CloudSun className="w-12 h-12 text-amber-400" />;
    let tip = 'Cuaca normal. Gunakan pakaian kasual santai yang nyaman untuk beraktivitas.';

    if (condition === 'Sangat Cerah') {
      icon = <Sun className="w-12 h-12 text-orange-400" />;
      tip = 'Matahari cukup terik. Jangan lupa gunakan sunscreen dan bawa air minum tambahan!';
    } else if (condition === 'Berawan Tebal') {
      icon = <Cloud className="w-12 h-12 text-slate-400" />;
      tip = 'Langit mendung syahdu. Cocok untuk jalan-jalan sore tapi tetap pantau kondisi awan.';
    } else if (condition === 'Hujan Ringan') {
      icon = <CloudRain className="w-12 h-12 text-cyan-400" />;
      tip = 'Sedia payung sebelum hujan! Siapkan outer hangat atau jaket agar tidak masuk angin.';
    }

    setSelected({
      city: cleanedCity.charAt(0).toUpperCase() + cleanedCity.slice(1),
      temp,
      condition,
      humidity,
      wind,
      icon,
      tip
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Title */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <CloudSun className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Cek Kondisi Cuaca</h1>
          </div>
        </div>

        {/* Card Main Container */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
          
          {/* 🚀 BARU: Kolom Input Pencarian Kota Mandiri */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Cari Cuaca Kota Anda:</label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:bg-slate-950 transition-all"
                  placeholder="Ketik nama kota (Contoh: Kudus, Solo)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && generateLocalWeather(searchQuery)}
                />
              </div>
              <button
                type="button"
                onClick={() => generateLocalWeather(searchQuery)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black px-5 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-xs sm:text-sm cursor-pointer shadow-lg shrink-0"
              >
                Cari
              </button>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-2">Kota Pintasan Cepat:</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {QUICK_REGIONS.map((r) => (
                <button
                  key={r.city} type="button" 
                  onClick={() => { setSelected(r); setSearchQuery(''); }}
                  className={`p-3 rounded-xl font-bold text-xs border transition-all cursor-pointer truncate ${selected.city.toLowerCase() === r.city.toLowerCase() ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  {r.city}
                </button>
              ))}
            </div>
          </div>

          {/* Monitor Screen Hasil Cuaca */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-1">Kondisi Saat Ini di</span>
            <h3 className="text-xl font-black text-white tracking-wide mb-4">{selected.city}</h3>
            
            <div className="mb-3 animate-in zoom-in-75 duration-300">{selected.icon}</div>
            <h2 className="text-4xl font-black text-white font-mono tracking-tight">{selected.temp}°C</h2>
            <p className="text-xs text-slate-300 font-extrabold mt-1 uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full border border-white/5">{selected.condition}</p>

            {/* Sub Detail Informasi */}
            <div className="grid grid-cols-2 gap-8 w-full mt-6 pt-6 border-t border-white/5 max-w-sm">
              <div className="flex items-center gap-2.5 justify-center">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <div className="text-left">
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Kelembapan</span>
                  <span className="text-xs font-mono font-bold text-slate-200">{selected.humidity}%</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 justify-center">
                <Wind className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Kecepatan Angin</span>
                  <span className="text-xs font-mono font-bold text-slate-200">{selected.wind} km/h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Rekomendasi Pakaian */}
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 flex gap-3 items-start animate-in fade-in duration-300">
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
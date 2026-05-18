"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CloudSun, CloudRain, Sun, Wind, Droplets, Sparkles, Search, Cloud, RefreshCw } from 'lucide-react';

const QUICK_REGIONS = ['Semarang', 'Jakarta', 'Bandung', 'Surabaya', 'Tokyo'];

export default function WeatherTool() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState({
    city: 'Semarang',
    temp: 31,
    condition: 'Cerah Berawan',
    humidity: 70,
    wind: 12,
    icon: <CloudSun className="w-12 h-12 text-amber-400" />,
    tip: 'Cuaca normal. Gunakan pakaian kasual santai yang nyaman untuk beraktivitas.'
  });

  // 🚀 FETCH DATA REAL-TIME VIA OPEN-METEO ENGINE (FREE NO API KEY)
  const fetchRealTimeWeather = async (cityName: string) => {
    if (!cityName.trim()) return;
    setLoading(true);
    setError(null);

    try {
      // Langkah 1: Geocoding mencari Latitude & Longitude berdasarkan nama kota
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName.trim())}&count=1&language=id&format=json`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError('Kota tidak ditemukan. Coba periksa kembali ejaannya.');
        setLoading(false);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      // Langkah 2: Tembak data cuaca real-time berdasarkan koordinat tersebut
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
      const weatherData = await weatherRes.json();

      if (!weatherData.current) {
        setError('Gagal memuat data cuaca.');
        setLoading(false);
        return;
      }

      const current = weatherData.current;
      const temp = Math.round(current.temperature_2m);
      const humidity = current.relative_humidity_2m;
      const wind = Math.round(current.wind_speed_10m);
      const code = current.weather_code;

      // Pemetaan kode cuaca standar WMO internasional
      let condition = 'Cerah Berawan';
      let icon = <CloudSun className="w-12 h-12 text-amber-400" />;
      let tip = 'Cuaca kondusif. Cocok untuk aktivitas luar ruangan maupun produktivitas harian.';

      if (code === 0) {
        condition = 'Sangat Cerah';
        icon = <Sun className="w-12 h-12 text-orange-400" />;
        tip = 'Terik matahari menyengat le. Gunakan pakaian katun tipis, kacamata hitam, dan jangan lupa sunscreen!';
      } else if (code >= 1 && code <= 3) {
        condition = 'Cerah Berawan';
        icon = <CloudSun className="w-12 h-12 text-amber-400" />;
        tip = 'Cuaca cerah berawan sepoi-sepoi. Sangat ideal untuk bepergian atau nongkrong santai.';
      } else if (code >= 45 && code <= 48) {
        condition = 'Berkabut (Foggy)';
        icon = <Cloud className="w-12 h-12 text-slate-400" />;
        tip = 'Jarak pandang terbatas karena kabut. Nyalakan lampu kendaraan dan berkendara lebih hati-hati ya!';
      } else if (code >= 51 && code <= 67) {
        condition = 'Gerimis Berawan';
        icon = <CloudRain className="w-12 h-12 text-cyan-400" />;
        tip = 'Gerimis tipis mengundang romantis. Siapkan payung atau jas hujan di bagasi motor sebelum keluar.';
      } else if (code >= 71 && code <= 99) {
        condition = 'Hujan Lebat / Petir';
        icon = <CloudRain className="w-12 h-12 text-blue-500 animate-bounce" />;
        tip = 'Hujan deras disertai potensi petir. Mending rebahan di rumah, bikin tugas PKK, atau ngopi hangat dulu.';
      }

      setSelected({
        city: name,
        temp,
        condition,
        humidity,
        wind,
        icon,
        tip
      });
    } catch (err) {
      setError('Koneksi internet bermasalah atau server sibuk.');
    } finally {
      setLoading(false);
    }
  };

  // Jalankan fetch otomatis saat halaman pertama kali dibuka (Default: Semarang)
  useEffect(() => {
    fetchRealTimeWeather('Semarang');
  }, []);

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
            <h1 className="text-xl font-bold text-white tracking-tight">Cek Kondisi Cuaca Real-Time</h1>
          </div>
        </div>

        {/* Card Main Container */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Kolom Input Pencarian Kota */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Cari Cuaca Kota Aktual:</label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:bg-slate-950 transition-all"
                  placeholder="Ketik nama kota (Contoh: Semarang, Kudus, Medan)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchRealTimeWeather(searchQuery)}
                />
              </div>
              <button
                type="button"
                onClick={() => fetchRealTimeWeather(searchQuery)}
                disabled={loading}
                className="bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-40 text-slate-950 font-black px-5 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-xs sm:text-sm cursor-pointer shadow-lg shrink-0 flex items-center justify-center"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Cari"}
              </button>
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-2">Kota Pintasan Cepat:</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {QUICK_REGIONS.map((city) => (
                <button
                  key={city} type="button" 
                  onClick={() => { fetchRealTimeWeather(city); setSearchQuery(''); }}
                  className={`p-3 rounded-xl font-bold text-xs border transition-all cursor-pointer truncate ${selected.city.toLowerCase() === city.toLowerCase() ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message Handler */}
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-xl animate-in fade-in duration-200">
              ⚠️ {error}
            </div>
          )}

          {/* Monitor Screen Hasil Cuaca */}
          <div className={`bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner transition-opacity duration-300 ${loading ? 'opacity-40' : 'opacity-100'}`}>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-1">Kondisi Aktual di</span>
            <h3 className="text-xl font-black text-white tracking-wide mb-4">{selected.city}</h3>
            
            <div className="mb-3">{selected.icon}</div>
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
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Angin</span>
                  <span className="text-xs font-mono font-bold text-slate-200">{selected.wind} km/h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Banner Rekomendasi Pakaian */}
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
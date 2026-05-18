"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, CloudSun, CloudRain, Sun, Wind, Droplets, Sparkles, Search, Cloud, RefreshCw, MapPin } from 'lucide-react';

const QUICK_REGIONS = ['Semarang', 'Jakarta', 'Bandung', 'Surabaya', 'Tokyo'];

interface SuggestionType {
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
}

export default function WeatherTool() {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [selected, setSelected] = useState({
    city: 'Semarang',
    temp: 31,
    condition: 'Cerah Berawan',
    humidity: 70,
    wind: 12,
    icon: <CloudSun className="w-12 h-12 text-amber-400" />,
    tip: 'Cuaca normal. Gunakan pakaian kasual santai yang nyaman untuk beraktivitas.'
  });

  // 🚀 LIVE AUTO-SUGGESTION ENGINE (Mencari daftar kota/desa yang sesuai saat ngetik)
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery.trim())}&count=5&language=id&format=json`);
        const data = await res.json();
        if (data.results) {
          setSuggestions(data.results);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Gagal memuat rekomendasi kota.");
      }
    }, 400); // Delay 400ms biar gak spam request ke server pas ngetik cepat

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // Klik di luar dropdown untuk menutup daftar rekomendasi otomatis
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🚀 FETCH DATA CUACA BERDASARKAN KOORDINAT PASTI (DARI KLIK SUGGESTION ATAU BUTTON)
  const fetchWeatherByCoords = async (name: string, lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    setShowSuggestions(false);

    try {
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`);
      const weatherData = await weatherRes.json();

      if (!weatherData.current) {
        setError('Gagal memuat data cuaca untuk koordinat ini.');
        setLoading(false);
        return;
      }

      const current = weatherData.current;
      const temp = Math.round(current.temperature_2m);
      const humidity = current.relative_humidity_2m;
      const wind = Math.round(current.wind_speed_10m);
      const code = weatherData.current.weather_code;

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
        icon = <CloudRain className="w-12 h-12 text-blue-500" />;
        tip = 'Hujan deras disertai potensi petir. Mending rebahan di rumah, bikin tugas PKK, atau ngopi hangat dulu.';
      }

      setSelected({ city: name, temp, condition, humidity, wind, icon, tip });
    } catch (err) {
      setError('Gagal menghubungkan ke server cuaca.');
    } finally {
      setLoading(false);
    }
  };

  // Handler jika user langsung menekan tombol "Cari" tanpa klik dropdown suggestion
  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchQuery.trim())}&count=1&language=id&format=json`);
      const geoData = await geoRes.json();

      // VALIDASI: Jika kota bener-bener kosong atau typo parah gak kedaftar di dunia
      if (!geoData.results || geoData.results.length === 0) {
        setError(`Kota atau daerah "${searchQuery}" tidak ditemukan. Pastikan ejaan benar!`);
        setLoading(false);
        return;
      }

      const { name, latitude, longitude, admin1 } = geoData.results[0];
      const displayName = admin1 ? `${name}, ${admin1}` : name;
      fetchWeatherByCoords(displayName, latitude, longitude);
    } catch (err) {
      setError('Koneksi bermasalah saat memvalidasi nama kota.');
      setLoading(false);
    }
  };

  // Mengaktifkan default load pertama kali
  useEffect(() => {
    fetchWeatherByCoords('Semarang, Jawa Tengah', -6.9932, 110.4203);
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
          
          {/* Kolom Input Pencarian Kota dengan Auto-Suggest List */}
          <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Cari Wilayah / Kota / Desa:</label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-4 h-4" />
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50 focus:bg-slate-950 transition-all"
                  placeholder="Ketik nama wilayah kamu..."
                  value={searchQuery}
                  onFocus={() => setShowSuggestions(true)}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                />
              </div>
              <button
                type="button"
                onClick={handleSearchSubmit}
                disabled={loading}
                className="bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-40 text-slate-950 font-black px-5 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-xs sm:text-sm cursor-pointer shadow-lg shrink-0 flex items-center justify-center"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : "Cari"}
              </button>
            </div>

            {/* 🚀 DROPDOWN LIST AUTO-SUGGESTION LUXURY */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[76px] bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl z-30 animate-in fade-in slide-in-from-top-2 duration-200">
                {suggestions.map((item, idx) => {
                  const regionName = item.admin1 ? `${item.name}, ${item.admin1}` : item.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSearchQuery(regionName);
                        fetchWeatherByCoords(regionName, item.latitude, item.longitude);
                      }}
                      className="w-full text-left px-4 py-3 text-xs sm:text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors border-b border-white/[0.02] last:border-none flex items-center gap-2.5 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <div className="truncate">
                        <strong className="text-white font-bold">{item.name}</strong>
                        {item.admin1 && <span className="text-slate-500 text-xs"> — {item.admin1}</span>}
                        <span className="text-[10px] text-slate-600 font-mono block">{item.country} ({item.latitude.toFixed(2)}, {item.longitude.toFixed(2)})</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Shortcuts */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-2">Pintasan Cepat Kota Besar:</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {QUICK_REGIONS.map((city) => (
                <button
                  key={city} type="button" 
                  onClick={() => {
                    setSearchQuery('');
                    // Ambil koordinat statis aman untuk pintasan cepat kota besar
                    if (city === 'Semarang') fetchWeatherByCoords('Semarang, Jawa Tengah', -6.99, 110.42);
                    else if (city === 'Jakarta') fetchWeatherByCoords('Jakarta, DKI Jakarta', -6.21, 106.84);
                    else if (city === 'Bandung') fetchWeatherByCoords('Bandung, Jawa Barat', -6.91, 107.61);
                    else if (city === 'Surabaya') fetchWeatherByCoords('Surabaya, Jawa Timur', -7.25, 112.75);
                    else if (city === 'Tokyo') fetchWeatherByCoords('Tokyo, Japan', 35.69, 139.69);
                  }}
                  className={`p-3 rounded-xl font-bold text-xs border transition-all cursor-pointer truncate ${selected.city.startsWith(city) ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'}`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          {/* 🚀 BANNER VALIDASI ERROR JIKA KOTA TIDAK COCOK */}
          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold rounded-xl animate-in zoom-in-95 duration-200 shadow-inner">
              ⚠️ {error}
            </div>
          )}

          {/* Monitor Screen Display Cuaca */}
          <div className={`bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-inner transition-all duration-300 ${loading ? 'opacity-40 scale-[0.99]' : 'opacity-100'}`}>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-1">Kondisi Cuaca Aktual</span>
            <h3 className="text-sm sm:text-base font-black text-white tracking-wide mb-4 max-w-sm px-2 truncate">{selected.city}</h3>
            
            <div className="mb-3 animate-in zoom-in-95 duration-300">{selected.icon}</div>
            <h2 className="text-4xl font-black text-white font-mono tracking-tight">{selected.temp}°C</h2>
            <p className="text-xs text-slate-300 font-extrabold mt-1.5 uppercase tracking-wider bg-white/5 px-3 py-1 rounded-full border border-white/5">{selected.condition}</p>

            {/* Sub Detail Data */}
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

          {/* Banner Tips */}
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
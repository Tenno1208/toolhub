"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, Search, Calendar, Compass, RefreshCw, AlertCircle } from 'lucide-react';

interface City {
  id: string;
  lokasi: string;
}

interface Schedule {
  tanggal: string;
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export default function JadwalSholat() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<string>('1301'); // Default: Kota Jakarta
  const [cityName, setCityName] = useState<string>('KOTA JAKARTA');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Fetch jadwal sholat berdasarkan ID Kota & Tanggal Hari Ini
  const fetchSchedule = async (cityId: string) => {
    setLoading(true);
    setError('');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    try {
      const res = await fetch(`https://api.myquran.com/v2/sholat/jadwal/${cityId}/${yyyy}/${mm}/${dd}`);
      const json = await res.json();

      if (json.status && json.data?.jadwal) {
        setSchedule(json.data.jadwal);
        setCityName(json.data.lokasi);
      } else {
        setError('Gagal memuat jadwal sholat untuk daerah ini.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi jaringan.');
    } finally {
      setLoading(false);
    }
  };

  // Cari kota berdasarkan input user
  const handleSearchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const res = await fetch(`https://api.myquran.com/v2/sholat/kota/cari/${encodeURIComponent(searchQuery)}`);
      const json = await res.json();

      if (json.status && json.data && json.data.length > 0) {
        setCities(json.data);
      } else {
        setCities([]);
        setError('Kota/Kabupaten tidak ditemukan.');
      }
    } catch (err) {
      setError('Gagal mencari kota.');
    } finally {
      setSearching(false);
    }
  };

  // Initial load: Fetch jadwal default
  useEffect(() => {
    fetchSchedule(selectedCityId);
  }, [selectedCityId]);

  const prayerTimes = schedule ? [
    { name: 'Imsak', time: schedule.imsak, icon: '🌙' },
    { name: 'Subuh', time: schedule.subuh, icon: '🌅' },
    { name: 'Terbit', time: schedule.terbit, icon: '☀️' },
    { name: 'Dhuha', time: schedule.dhuha, icon: '🌤️' },
    { name: 'Dzuhur', time: schedule.dzuhur, icon: '☀️' },
    { name: 'Ashar', time: schedule.ashar, icon: '⛅' },
    { name: 'Maghrib', time: schedule.maghrib, icon: '🌆' },
    { name: 'Isya', time: schedule.isya, icon: '🌌' },
  ] : [];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Navigasi */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-emerald-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">Jadwal Sholat Digital</h1>
            </div>
          </div>
        </div>

        {/* Section Pencarian Kota & Status Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Form Cari Daerah */}
          <div className="md:col-span-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" /> Pilih Daerah
            </h2>

            <form onSubmit={handleSearchCity} className="space-y-3">
              <div className="relative">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari Kota/Kabupaten..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-4 pr-10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 text-sm"
                />
                <button 
                  type="submit" 
                  disabled={searching}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  {searching ? <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" /> : <Search className="w-4 h-4" />}
                </button>
              </div>
            </form>

            {/* Hasil Pencarian Kota */}
            {cities.length > 0 && (
              <div className="max-h-48 overflow-y-auto space-y-1 pr-1 custom-scrollbar border-t border-slate-800 pt-3">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Pilih lokasi:</p>
                {cities.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setSelectedCityId(city.id);
                      setCities([]);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      selectedCityId === city.id 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-slate-950/50 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{city.lokasi}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Banner Informasi Daerah saat ini */}
          <div className="md:col-span-2 bg-gradient-to-br from-emerald-950/40 to-slate-900/60 border border-emerald-500/20 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden">
            <div className="flex items-start justify-between relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-3">
                  <Compass className="w-3.5 h-3.5" /> Wilayah Terpilih
                </div>
                <h2 className="text-2xl font-black text-white tracking-wide uppercase">{cityName}</h2>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono justify-end">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{schedule?.tanggal || 'Hari ini'}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 relative z-10">
              Waktu disesuaikan otomatis dengan zona waktu setempat berdasarkan standar data Kemenag RI.
            </p>

            {/* Background Accent */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          </div>

        </div>

        {/* Notifikasi Error */}
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Grid Waktu Sholat */}
        {loading ? (
          <div className="flex items-center justify-center py-20 bg-slate-900/30 border border-slate-800/50 rounded-2xl">
            <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {prayerTimes.map((item, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 p-5 rounded-2xl flex flex-col justify-between h-32 transition-all hover:bg-slate-900/80 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200">
                    {item.name}
                  </span>
                  <span className="text-lg">{item.icon}</span>
                </div>
                <div>
                  <span className="text-2xl font-black font-mono text-white tracking-wider group-hover:text-emerald-400 transition-colors">
                    {item.time}
                  </span>
                  <span className="text-[10px] text-slate-500 block">WIB / WITA / WIT</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}


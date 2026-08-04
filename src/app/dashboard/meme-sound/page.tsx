"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, MapPin, Search, Calendar, Compass, RefreshCw, AlertCircle,
  Moon, Sunrise, Sun, CloudSun, Sunset, MoonStar, Clock3,
} from 'lucide-react';

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

const PRAYER_META = [
  { key: 'imsak',   name: 'Imsak',   Icon: Moon },
  { key: 'subuh',   name: 'Subuh',   Icon: Sunrise },
  { key: 'terbit',  name: 'Terbit',  Icon: Sun },
  { key: 'dhuha',   name: 'Dhuha',   Icon: CloudSun },
  { key: 'dzuhur',  name: 'Dzuhur',  Icon: Sun },
  { key: 'ashar',   name: 'Ashar',   Icon: CloudSun },
  { key: 'maghrib', name: 'Maghrib', Icon: Sunset },
  { key: 'isya',    name: 'Isya',    Icon: MoonStar },
] as const;

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
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
  const [now, setNow] = useState<Date>(new Date());

  // Jam berjalan, untuk menyorot sholat yang sedang & berikutnya
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(t);
  }, []);

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

  const handleSearchCity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    setError('');
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

  useEffect(() => {
    fetchSchedule(selectedCityId);
  }, [selectedCityId]);

  const prayerTimes = useMemo(
    () => (schedule ? PRAYER_META.map((p) => ({ ...p, time: schedule[p.key as keyof Schedule] })) : []),
    [schedule]
  );

  // Tentukan status setiap waktu sholat: lewat / sedang berjalan / berikutnya / akan datang
  const { activeIndex, nextIndex, countdown } = useMemo(() => {
    if (!prayerTimes.length) return { activeIndex: -1, nextIndex: -1, countdown: '' };
    const nowMin = now.getHours() * 60 + now.getMinutes();
    let active = -1;
    for (let i = 0; i < prayerTimes.length; i++) {
      if (toMinutes(prayerTimes[i].time) <= nowMin) active = i;
    }
    const next = active + 1 < prayerTimes.length ? active + 1 : 0;
    const nextMin = toMinutes(prayerTimes[next].time);
    let diff = nextMin - nowMin;
    if (diff <= 0) diff += 24 * 60;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    const label = h > 0 ? `${h} jam ${m} menit` : `${m} menit`;
    return { activeIndex: active, nextIndex: next, countdown: label };
  }, [prayerTimes, now]);

  return (
    <div className="min-h-screen bg-[#071512] text-[#EDE7D3] pt-24 pb-16 px-4 sm:px-8 relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        @keyframes emberPulse { 0%, 100% { opacity: .55; } 50% { opacity: 1; } }
        .ember-pulse { animation: emberPulse 3.2s ease-in-out infinite; }
      `}</style>

      {/* Motif geometris latar, sangat samar */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='84' viewBox='0 0 84 84'%3E%3Cg fill='none' stroke='%23C9A227' stroke-width='1'%3E%3Cpath d='M42 0 L84 42 L42 84 L0 42 Z'/%3E%3Cpath d='M42 12 L72 42 L42 72 L12 42 Z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="max-w-4xl mx-auto space-y-8 relative font-body">

        {/* Header */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 bg-[#0E2420] border border-[#24463d] rounded-xl hover:border-[#C9A227]/50 hover:bg-[#14322C] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#9FB3AC]" />
          </Link>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#C9A227] font-semibold mb-0.5">
              Kemenag RI &middot; Waktu Sholat
            </p>
            <h1 className="font-display text-3xl font-semibold text-[#F6EFDA] tracking-wide">
              Jadwal Sholat
            </h1>
          </div>
        </div>

        {/* Kartu sorotan: waktu berikutnya, elemen signature */}
        <div className="relative rounded-[28px] p-[1px] bg-gradient-to-br from-[#C9A227]/60 via-[#C9A227]/10 to-transparent">
          <div className="relative rounded-[27px] bg-gradient-to-br from-[#0E2420] to-[#0A1D19] border border-[#C9A227]/20 px-6 py-7 sm:px-9 sm:py-8 overflow-hidden">

            {/* Ornamen sudut ala manuskrip */}
            {[
              'top-4 left-4 rotate-0',
              'top-4 right-4 rotate-90',
              'bottom-4 right-4 rotate-180',
              'bottom-4 left-4 -rotate-90',
            ].map((pos, i) => (
              <svg key={i} className={`absolute w-6 h-6 text-[#C9A227]/40 ${pos}`} viewBox="0 0 24 24" fill="none">
                <path d="M2 2 L2 10 M2 2 L10 2 M2 2 Q10 2 10 10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            ))}

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A227]/10 border border-[#C9A227]/25 text-[#E8C468] text-[11px] font-semibold uppercase tracking-wider mb-4">
                  <Compass className="w-3.5 h-3.5" /> {cityName}
                </div>
                <p className="text-xs text-[#9FB3AC] mb-1.5">Waktu sholat berikutnya</p>
                <p className="font-display text-2xl sm:text-3xl text-[#F6EFDA] font-semibold">
                  {nextIndex >= 0 && prayerTimes[nextIndex] ? prayerTimes[nextIndex].name : '—'}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="flex items-center gap-1.5 text-[#9FB3AC] text-xs font-mono justify-start sm:justify-end mb-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A227]" />
                  <span>{schedule?.tanggal || 'Hari ini'}</span>
                </div>
                <div className="flex items-center gap-2 justify-start sm:justify-end">
                  <Clock3 className="w-5 h-5 text-[#E8C468] ember-pulse" />
                  <span className="font-display text-3xl sm:text-4xl font-bold text-[#E8C468] tracking-wide tabular-nums">
                    {nextIndex >= 0 && prayerTimes[nextIndex] ? prayerTimes[nextIndex].time : '--:--'}
                  </span>
                </div>
                <p className="text-[11px] text-[#9FB3AC] mt-1">dalam {countdown || '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pencarian daerah */}
        <div className="bg-[#0E2420]/60 border border-[#24463d] rounded-2xl p-5 backdrop-blur-sm">
          <h2 className="text-xs font-semibold text-[#C9A227] uppercase tracking-wider flex items-center gap-2 mb-4">
            <MapPin className="w-3.5 h-3.5" /> Ubah daerah
          </h2>

          <form onSubmit={handleSearchCity} className="relative max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kota atau kabupaten..."
              className="w-full bg-[#071512] border border-[#24463d] rounded-xl py-3 pl-4 pr-11 text-[#F6EFDA] placeholder:text-[#5B6E68] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/40 focus:border-[#C9A227]/50 text-sm transition-colors"
            />
            <button
              type="submit"
              disabled={searching}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9FB3AC] hover:text-[#E8C468] transition-colors"
            >
              {searching ? <RefreshCw className="w-4 h-4 animate-spin text-[#C9A227]" /> : <Search className="w-4 h-4" />}
            </button>
          </form>

          {cities.length > 0 && (
            <div className="max-h-48 overflow-y-auto grid sm:grid-cols-2 gap-1.5 mt-4 pt-4 border-t border-[#24463d]">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCityId(city.id);
                    setCities([]);
                    setSearchQuery('');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                    selectedCityId === city.id
                      ? 'bg-[#C9A227]/10 text-[#E8C468] border border-[#C9A227]/30'
                      : 'bg-[#071512]/60 text-[#B9C7C1] border border-transparent hover:border-[#24463d] hover:bg-[#0E2420]'
                  }`}
                >
                  {city.lokasi}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-[#3A1414]/40 border border-[#8C3A3A]/30 rounded-xl flex items-center gap-3 text-[#E29999] text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Grid waktu sholat, meredup untuk yang sudah lewat, menyala untuk yang akan datang */}
        {loading ? (
          <div className="flex items-center justify-center py-24 bg-[#0E2420]/40 border border-[#24463d] rounded-2xl">
            <RefreshCw className="w-7 h-7 text-[#C9A227] animate-spin" />
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {prayerTimes.map((item, idx) => {
                const isNext = idx === nextIndex;
                const isPast = activeIndex >= 0 && idx <= activeIndex && !isNext;
                return (
                  <div
                    key={item.key}
                    className={`relative p-5 rounded-2xl flex flex-col justify-between h-32 transition-all ${
                      isNext
                        ? 'bg-gradient-to-br from-[#C9A227]/15 to-[#0E2420] border border-[#C9A227]/50 shadow-[0_0_24px_-4px_rgba(201,162,39,0.35)]'
                        : isPast
                        ? 'bg-[#0A1D19]/40 border border-[#1c332e] opacity-45'
                        : 'bg-[#0E2420]/60 border border-[#24463d] hover:border-[#C9A227]/30'
                    }`}
                  >
                    {isNext && (
                      <span className="absolute -top-2 right-3 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#C9A227] text-[#071512]">
                        Berikutnya
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-semibold ${isNext ? 'text-[#E8C468]' : 'text-[#9FB3AC]'}`}>
                        {item.name}
                      </span>
                      <item.Icon className={`w-4 h-4 ${isNext ? 'text-[#E8C468]' : 'text-[#5B6E68]'}`} />
                    </div>
                    <div>
                      <span
                        className={`font-display text-2xl font-bold tracking-wide tabular-nums ${
                          isNext ? 'text-[#F6EFDA]' : 'text-[#D8D0B8]'
                        }`}
                      >
                        {item.time}
                      </span>
                      <span className="text-[10px] text-[#5B6E68] block mt-0.5">WIB / WITA / WIT</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Untaian progres hari */}
            <div className="flex items-center mt-6 px-1">
              {prayerTimes.map((item, idx) => (
                <React.Fragment key={item.key}>
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      idx <= activeIndex && idx !== nextIndex
                        ? 'bg-[#3A5A52]'
                        : idx === nextIndex
                        ? 'bg-[#E8C468] ember-pulse'
                        : 'bg-[#1c332e]'
                    }`}
                  />
                  {idx < prayerTimes.length - 1 && (
                    <div className={`h-px flex-1 ${idx < activeIndex ? 'bg-[#3A5A52]' : 'bg-[#1c332e]'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <p className="text-[11px] text-[#5B6E68] text-center pt-2">
          Waktu disesuaikan otomatis dengan zona waktu setempat berdasarkan standar data Kemenag RI.
        </p>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Hourglass, Calendar, Sparkles, Flag, Rocket, PartyPopper } from 'lucide-react';

export default function CountdownTool() {
  const [eventName, setEventName] = useState('Tahun Baru Global');
  const [targetDate, setTargetDate] = useState('2026-12-31T23:59:59');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  const [isFinished, setIsFinished] = useState(false);

  // 🚀 INOVASI 1: PRESET EVENT OTOMATIS
  const applyPreset = (name: string, dateStr: string) => {
    setEventName(name);
    setTargetDate(dateStr);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const targetTime = +new Date(targetDate);
      const currentTime = +new Date();
      const diff = targetTime - currentTime;

      if (diff > 0) {
        setIsFinished(false);
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      } else {
        setIsFinished(true);
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header Title */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Hourglass className="w-5 h-5 text-fuchsia-400 animate-spin" style={{ animationDuration: '4s' }} />
            <h1 className="text-xl font-bold text-white tracking-tight">Countdown Event Timer Pro</h1>
          </div>
        </div>

        {/* --- PANEL INPUT & SETTING EVENT (INOVASI TINGGI) --- */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[28px] p-5 sm:p-6 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5">Nama Acara / Momen:</label>
              <div className="relative">
                <Flag className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
                <input 
                  type="text" value={eventName} onChange={e => setEventName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-fuchsia-500/50 focus:bg-slate-950 transition-all"
                  placeholder="Contoh: Kelulusan Sekolah..." 
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-1.5">Tanggal & Waktu Deadline:</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-600" />
                <input 
                  type="datetime-local" value={targetDate.slice(0, 16)} onChange={e => setTargetDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-fuchsia-500/50 focus:bg-slate-950 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 🚀 INOVASI 2: TOMBOL QUICK PRESETS */}
          <div>
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-2">Pintasan Acara Populer:</span>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => applyPreset('🎉 Kelulusan Sekolah Class of 2026', '2026-06-15T08:00:00')} className="px-3 py-2 bg-slate-950 hover:bg-white/5 border border-slate-800 hover:border-slate-700 rounded-xl text-[11px] font-semibold text-slate-300 transition-all cursor-pointer">🎓 Kelulusan 2026</button>
              <button type="button" onClick={() => applyPreset('🚀 Pergantian Tahun Baru 2027', '2026-12-31T23:59:59')} className="px-3 py-2 bg-slate-950 hover:bg-white/5 border border-slate-800 hover:border-slate-700 rounded-xl text-[11px] font-semibold text-slate-300 transition-all cursor-pointer">🎆 Tahun Baru 2027</button>
              <button type="button" onClick={() => applyPreset('🌙 Hari Raya Idul Fitri 1448H', '2027-03-09T06:00:00')} className="px-3 py-2 bg-slate-950 hover:bg-white/5 border border-slate-800 hover:border-slate-700 rounded-xl text-[11px] font-semibold text-slate-300 transition-all cursor-pointer">🕌 Lebaran Idul Fitri</button>
            </div>
          </div>
        </div>

        {/* --- BOARD LIVE DISPLAY COUNTDOWN PREMIUM --- */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-6 sm:p-8 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"></div>
          
          {!isFinished ? (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-1">Menghitung Mundur Menuju</span>
                <h2 className="text-xl font-black text-white tracking-wide max-w-md mx-auto truncate px-4">{eventName}</h2>
              </div>

              {/* Grid Angka Digital Flashing */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 font-mono max-w-lg mx-auto">
                <div className="bg-slate-950/80 border border-white/[0.03] p-4 rounded-2xl shadow-inner relative group">
                  <span className="text-2xl sm:text-4xl font-black text-white block tracking-tight group-hover:scale-105 transition-transform">{timeLeft.days.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] text-slate-500 uppercase font-sans font-black tracking-wider block mt-1">Hari</span>
                </div>
                <div className="bg-slate-950/80 border border-white/[0.03] p-4 rounded-2xl shadow-inner relative group">
                  <span className="text-2xl sm:text-4xl font-black text-fuchsia-400 block tracking-tight group-hover:scale-105 transition-transform">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] text-slate-500 uppercase font-sans font-black tracking-wider block mt-1">Jam</span>
                </div>
                <div className="bg-slate-950/80 border border-white/[0.03] p-4 rounded-2xl shadow-inner relative group">
                  <span className="text-2xl sm:text-4xl font-black text-fuchsia-400 block tracking-tight group-hover:scale-105 transition-transform">{timeLeft.mins.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] text-slate-500 uppercase font-sans font-black tracking-wider block mt-1">Menit</span>
                </div>
                <div className="bg-slate-950/80 border border-white/[0.03] p-4 rounded-2xl shadow-inner relative group">
                  <span className="text-2xl sm:text-4xl font-black text-cyan-400 block tracking-tight group-hover:scale-105 transition-transform">{timeLeft.secs.toString().padStart(2, '0')}</span>
                  <span className="text-[9px] text-slate-500 uppercase font-sans font-black tracking-wider block mt-1">Detik</span>
                </div>
              </div>

              {/* Info Tambahan */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-[10px] text-slate-400 font-medium font-mono">
                <Rocket className="w-3 h-3 text-fuchsia-400" /> Target: {new Date(targetDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          ) : (
            /* 🚀 INOVASI 4: SELEBRASI HARI H TIME OUT CELEBRATION */
            <div className="py-8 space-y-3 animate-in zoom-in-95 duration-300">
              <div className="w-14 h-14 bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <PartyPopper className="w-7 h-7 text-fuchsia-400 animate-bounce" />
              </div>
              <h2 className="text-2xl font-black text-white">WAKTUNYA TELAH TIBA! 🎉</h2>
              <p className="text-xs text-fuchsia-400 font-bold uppercase tracking-widest font-mono">Momen "{eventName}" Sedang Berlangsung Saat Ini!</p>
            </div>
          )}
        </div>

        {/* Kard Quote Motivasi */}
        <div className="bg-fuchsia-500/5 border border-fuchsia-500/10 rounded-2xl p-4 flex gap-3 items-start">
          <Sparkles className="w-5 h-5 text-fuchsia-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider mb-0.5">Tips Pengingat Waktu:</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">Manfaatkan sisa detik yang ada untuk mempersiapkan target secara maksimal. Waktu berjalan linier, pastikan setiap detiknya berharga le!</p>
          </div>
        </div>

      </div>
    </div>
  );
}
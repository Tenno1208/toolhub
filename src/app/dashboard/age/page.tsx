"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Sparkles, Clock, Hourglass, Cake } from 'lucide-react';

interface AgeResult {
  years: number;
  months: number;
  days: number;
}

interface LiveStats {
  totalDays: string;
  totalHours: string;
  totalMinutes: string;
  totalSeconds: string;
}

export default function LuxuryAgeCalculator() {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<AgeResult | null>(null);
  const [liveStats, setLiveStats] = useState<LiveStats | null>(null);

  const calculateAgeStructure = (dateString: string) => {
    if (!dateString) return null;
    
    const today = new Date();
    const birthDate = new Date(dateString);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days };
  };

  // Efek ticker real-time untuk akumulasi statistik mewah di bawahnya
  useEffect(() => {
    if (!dob) {
      setLiveStats(null);
      return;
    }

    const updateLiveMetrics = () => {
      const birthTime = new Date(dob).getTime();
      const now = new Date().getTime();
      const diffMs = now - birthTime;

      if (diffMs < 0) return;

      const totalSecs = Math.floor(diffMs / 1000);
      const totalMins = Math.floor(totalSecs / 60);
      const totalHrs = Math.floor(totalMins / 60);
      const totalDays = Math.floor(totalHrs / 24);

      setLiveStats({
        totalDays: totalDays.toLocaleString('id-ID'),
        totalHours: totalHrs.toLocaleString('id-ID'),
        totalMinutes: totalMins.toLocaleString('id-ID'),
        totalSeconds: totalSecs.toLocaleString('id-ID'),
      });
    };

    // Langsung eksekusi dan pasang interval per detik
    updateLiveMetrics();
    const timer = setInterval(updateLiveMetrics, 1000);

    return () => clearInterval(timer);
  }, [dob]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDob(val);
    setAge(calculateAgeStructure(val));
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 selection:bg-emerald-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800/80 rounded-xl hover:bg-slate-800 hover:border-slate-700 transition-all">
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              <h1 className="text-lg font-bold tracking-tight text-white">Chronos Age Vault</h1>
            </div>
          </div>
          
          {dob && (
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full animate-pulse">
              <Sparkles className="w-3 h-3" /> Metrik Aktif
            </div>
          )}
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Sisi Kiri: Input Form Minimalis Elegan */}
          <div className="lg:col-span-4 bg-slate-900/20 border border-white/[0.04] rounded-3xl p-6 flex flex-col justify-center items-center shadow-2xl backdrop-blur-md relative overflow-hidden group">
            {/* Dekorasi Cahaya Gradasi Mewah */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
            
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">
              Pilih Garis Waktu Kelahiran
            </label>
            
            <div className="relative w-full">
              <input 
                type="date"
                value={dob}
                onChange={handleDateChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-center text-sm font-semibold text-white focus:outline-none focus:border-emerald-500/40 transition-all [&::-webkit-calendar-picker-indicator]:filter-[invert(0.6)] cursor-pointer shadow-inner font-mono tracking-wide"
              />
            </div>
          </div>

          {/* Sisi Kanan: Panel Output Informasi */}
          <div className="lg:col-span-8">
            {age ? (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                
                {/* Blok Utama Komparasi Usia */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { val: age.years, unit: 'Tahun' },
                    { val: age.months, unit: 'Bulan' },
                    { val: age.days, unit: 'Hari' }
                  ].map((block, idx) => (
                    <div key={idx} className="bg-slate-900/40 border border-white/[0.05] rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center relative overflow-hidden group shadow-xl">
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                      <span className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight mb-1 bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
                        {block.val}
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {block.unit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Sub Panel: Live Accumulation Stats (Detak Detik Hidup) */}
                {liveStats && (
                  <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 sm:p-6 shadow-xl space-y-4 animate-in slide-in-from-bottom-2 duration-500">
                    <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Akumulasi Waktu Berjalan
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {[
                        { label: 'Total Hari', val: liveStats.totalDays, icon: Calendar },
                        { label: 'Total Jam', val: liveStats.totalHours, icon: Hourglass },
                        { label: 'Total Menit', val: liveStats.totalMinutes, icon: Clock },
                        { label: 'Total Detik', val: liveStats.totalSeconds, icon: Cake, highlight: true }
                      ].map((stat, idx) => (
                        <div key={idx} className="bg-slate-950 border border-slate-900 rounded-xl p-3 flex flex-col justify-between">
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            {stat.label}
                          </span>
                          <span className={`text-sm font-bold font-mono tracking-wide block truncate ${stat.highlight ? 'text-emerald-400' : 'text-slate-300'}`}>
                            {stat.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[220px]">
                <Hourglass className="w-7 h-7 text-slate-800 mb-3 stroke-[1.5] animate-spin [animation-duration:6s]" />
                <p className="text-xs text-slate-600 max-w-[260px] leading-relaxed font-medium">
                  Tentukan tanggal kelahiran Anda pada panel opsi untuk membuka kalkulasi kronologi waktu.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Hourglass } from 'lucide-react';

export default function CountdownTool() {
  const [targetDate, setTargetDate] = useState('2026-12-31');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = +new Date(targetDate) - +new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Hourglass className="w-5 h-5 text-fuchsia-400" />
            <h1 className="text-xl font-bold text-white">Countdown Event Timer</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 space-y-6">
          <input type="date" value={targetDate} onChange={e => setTargetDate(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-white focus:outline-none" />
          
          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl"><span className="text-xl font-black text-white block">{timeLeft.days}</span><span className="text-[9px] text-slate-500 uppercase font-sans font-bold">Hari</span></div>
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl"><span className="text-xl font-black text-fuchsia-400 block">{timeLeft.hours}</span><span className="text-[9px] text-slate-500 uppercase font-sans font-bold">Jam</span></div>
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl"><span className="text-xl font-black text-fuchsia-400 block">{timeLeft.mins}</span><span className="text-[9px] text-slate-500 uppercase font-sans font-bold">Menit</span></div>
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl"><span className="text-xl font-black text-cyan-400 block">{timeLeft.secs}</span><span className="text-[9px] text-slate-500 uppercase font-sans font-bold">Detik</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
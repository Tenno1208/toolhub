"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, Play, Pause, RotateCcw } from 'lucide-react';

export default function PomodoroTool() {
  const [seconds, setSeconds] = useState(1500); // 25 Menit
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const fmtTime = () => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-teal-400" />
            <h1 className="text-xl font-bold text-white">Pomodoro Timer Focus</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-8 text-center space-y-6">
          <h2 className="text-6xl font-black text-white font-mono tracking-tight animate-pulse">{fmtTime()}</h2>
          <div className="flex justify-center gap-3">
            <button onClick={() => setIsActive(!isActive)} className="px-6 py-3 bg-teal-500 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1 cursor-pointer">
              {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />} {isActive ? "PAUSE" : "START WORKING"}
            </button>
            <button onClick={() => { setIsActive(false); setSeconds(1500); }} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 hover:text-white cursor-pointer"><RotateCcw className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
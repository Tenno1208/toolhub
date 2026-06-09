"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Play, Pause, RotateCcw, Flag, Timer } from 'lucide-react';

export default function ElegantStopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      // Menggunakan interval 10ms untuk menangkap centisecond secara akurat
      intervalId = setInterval(() => setTime((prev) => prev + 10), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartPause = () => setIsRunning(!isRunning);
  
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) setLaps((prev) => [time, ...prev]);
  };

  // Format milidetik ke struktur mm:ss.SS
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return {
      m: minutes.toString().padStart(2, '0'),
      s: seconds.toString().padStart(2, '0'),
      ms: centiseconds.toString().padStart(2, '0')
    };
  };

  const current = formatTime(time);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 selection:bg-blue-500/30">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <h1 className="text-lg font-bold text-white tracking-tight">Precision Chronograph</h1>
            </div>
          </div>
        </div>

        {/* Stopwatch Main Pod */}
        <div className="bg-slate-900/30 border border-white/[0.04] rounded-3xl p-8 sm:p-12 flex flex-col items-center shadow-2xl backdrop-blur-md relative overflow-hidden group">
          
          {/* Neon Dynamic Ambient Glow */}
          <div className={`absolute -top-24 w-72 h-72 blur-[100px] rounded-full transition-all duration-1000 opacity-20 pointer-events-none ${
            isRunning ? 'bg-blue-500' : time > 0 ? 'bg-rose-500' : 'bg-slate-500'
          }`} />

          {/* Chrono Display Panel */}
          <div className="font-mono flex items-baseline justify-center mb-12 tracking-tight w-full select-none relative z-10">
            <span className="text-6xl sm:text-8xl font-black text-white bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-transparent">
              {current.m}:{current.s}
            </span>
            <span className={`text-3xl sm:text-5xl font-extrabold ml-1 transition-colors duration-300 ${
              isRunning ? 'text-blue-400' : 'text-slate-500'
            }`}>
              .{current.ms}
            </span>
          </div>

          {/* Luxury Mechanical Controls */}
          <div className="flex items-center justify-center gap-6 w-full max-w-md relative z-10">
            
            {/* Tombol Kiri: Reset */}
            <button 
              onClick={handleReset} 
              disabled={time === 0}
              className="w-12 h-12 flex items-center justify-center bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:opacity-30 disabled:hover:border-slate-800 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer disabled:cursor-not-allowed active:scale-95"
              title="Reset Cronomotor"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            
            {/* Tombol Tengah Utama: Start / Pause Pod */}
            <button 
              onClick={handleStartPause} 
              className={`w-20 h-20 flex flex-col items-center justify-center rounded-full transition-all duration-300 cursor-pointer text-white shadow-2xl active:scale-95 ${
                isRunning 
                  ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-600/20 ring-4 ring-rose-950/40' 
                  : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20 ring-4 ring-blue-950/40'
              }`}
            >
              {isRunning ? (
                <Pause className="w-6 h-6 fill-current animate-pulse" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>

            {/* Tombol Kanan: Lap */}
            <button 
              onClick={handleLap} 
              disabled={!isRunning}
              className="w-12 h-12 flex items-center justify-center bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:opacity-30 disabled:hover:border-slate-800 text-slate-400 hover:text-white rounded-full transition-all cursor-pointer disabled:cursor-not-allowed active:scale-95"
              title="Split Lap Record"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Laps Architecture Record */}
        {laps.length > 0 && (
          <div className="mt-6 bg-slate-900/20 border border-white/[0.04] rounded-3xl p-5 sm:p-6 shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="flex items-center gap-2 border-b border-slate-800/60 pb-3 mb-3">
              <Timer className="w-4 h-4 text-slate-500" />
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest">Split Time Analytics</h3>
            </div>
            
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 custom-scrollbar">
              {laps.map((lapTime, idx) => {
                const lapFormatted = formatTime(lapTime);
                const isLatest = idx === 0;
                
                // Kalkulasi Delta Split (Waktu bersih durasi antar lap)
                const previousLapTime = laps[idx + 1] || 0;
                const deltaBytes = lapTime - previousLapTime;
                const deltaFormatted = formatTime(deltaBytes);

                return (
                  <div 
                    key={idx} 
                    className={`flex justify-between items-center px-4 py-3 rounded-xl transition-all border ${
                      isLatest 
                        ? 'bg-slate-950 border-slate-800/80 text-white shadow-inner' 
                        : 'bg-transparent border-transparent text-slate-400'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-xs">Lap {laps.length - idx}</span>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                        +{deltaFormatted.m}:{deltaFormatted.s}.{deltaFormatted.ms}
                      </span>
                    </div>
                    <span className="font-mono text-base font-bold tracking-wide">
                      {lapFormatted.m}:{lapFormatted.s}.
                      <span className={isLatest ? "text-blue-400" : "text-slate-500"}>
                        {lapFormatted.ms}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function StopwatchTool() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
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

  // Format ms ke mm:ss:SS
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
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">Stopwatch</h1>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col items-center">
          
          {/* Main Display */}
          <div className="font-mono flex items-end justify-center mb-12 tracking-tighter w-full">
            <span className="text-7xl sm:text-9xl font-bold text-white">{current.m}:{current.s}</span>
            <span className="text-4xl sm:text-6xl font-bold text-blue-500 mb-2 sm:mb-4">.{current.ms}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 w-full max-w-sm">
            <button 
              onClick={handleReset} 
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-colors font-semibold"
            >
              <RotateCcw className="w-5 h-5" /> Reset
            </button>
            
            <button 
              onClick={handleStartPause} 
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl transition-all shadow-lg font-bold text-white ${
                isRunning ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
              }`}
            >
              {isRunning ? <><Pause className="w-5 h-5 fill-current"/> Pause</> : <><Play className="w-5 h-5 fill-current"/> Start</>}
            </button>

            <button 
              onClick={handleLap} 
              disabled={!isRunning}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-colors font-semibold"
            >
              <Flag className="w-5 h-5" /> Lap
            </button>
          </div>

        </div>

        {/* Laps Record */}
        {laps.length > 0 && (
          <div className="mt-8 bg-slate-900/30 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-4 px-2">Catatan Waktu (Laps)</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              {laps.map((lapTime, idx) => {
                const lapFormatted = formatTime(lapTime);
                const isLatest = idx === 0;
                return (
                  <div key={idx} className={`flex justify-between items-center p-4 rounded-xl border ${isLatest ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-transparent border-transparent text-slate-400'}`}>
                    <span className="font-semibold text-sm">Lap {laps.length - idx}</span>
                    <span className="font-mono text-lg font-bold">
                      {lapFormatted.m}:{lapFormatted.s}.<span className={isLatest ? "text-blue-400" : ""}>{lapFormatted.ms}</span>
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
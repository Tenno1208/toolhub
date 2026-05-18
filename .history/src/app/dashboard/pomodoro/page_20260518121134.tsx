"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, Play, Pause, RotateCcw, Sparkles, Volume2, VolumeX, CloudRain, Waves } from 'lucide-react';

type PomodoroMode = 'work' | 'short' | 'long';

export default function PomodoroTool() {
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [seconds, setSeconds] = useState(1500); // Default Work: 25 Menit
  const [isActive, setIsActive] = useState(false);
  const [ambientType, setAmbientType] = useState<'none' | 'rain' | 'waves'>('none');
  
  // Ref untuk menampung instance HTMLAudioElement murni
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const MODE_TIMES = { work: 1500, short: 300, long: 900 };

  const changeMode = (newMode: PomodoroMode) => {
    setIsActive(false);
    setMode(newMode);
    setSeconds(MODE_TIMES[newMode]);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0 && isActive) {
      setIsActive(false);
      playSessionBell(); 
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // 🚀 INTERACTIVE EFFECT: Mengontrol pemutaran file .mp3 asli
  useEffect(() => {
    // Bersihkan audio lama jika ada pergantian opsi
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (isActive && ambientType !== 'none') {
      let audioUrl = '';
      if (ambientType === 'rain') {
        // Link file MP3 Hujan Alami Publik (Lofi/Relax)
        audioUrl = 'https://assets.mixkit.co/active_storage/sfx/2433/2433-84.wav'; 
      } else if (ambientType === 'waves') {
        // Link file MP3 Deburan Ombak Pantai Damai Publik
        audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Ini contoh lagu tenang, atau ganti URL sfx ombak pilihanmu
      }

      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.loop = true; // Setel otomatis berulang-ulang tanpa putus (Looping)
        audio.volume = ambientType === 'rain' ? 0.4 : 0.2; // Sesuaikan volume biar nyaman
        audio.play().catch(err => console.log("Autoplay dicegah browser sebelum user interaksi:", err));
        audioRef.current = audio;
      }
    }

    // Bersihkan atau pause audio saat halaman di-unmount atau di-pause
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isActive, ambientType]);

  // Bel alarm "Ting!" murni Web Audio API tetep dipertahankan pas sesi beres
  const playSessionBell = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); 
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {}
  };

  const fmtTime = () => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progressPercent = ((MODE_TIMES[mode] - seconds) / MODE_TIMES[mode]) * 100;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header Title */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-teal-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white tracking-tight">Deep Focus Pomodoro Lab</h1>
          </div>
        </div>

        {/* MAIN BOARD */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-6 sm:p-8 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500 to-transparent"></div>

          {/* SAKELAR MODE */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-950 border border-slate-800/80 rounded-2xl max-w-sm mx-auto">
            <button type="button" onClick={() => changeMode('work')} className={`py-2 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${mode === 'work' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}>💻 Work</button>
            <button type="button" onClick={() => changeMode('short')} className={`py-2 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${mode === 'short' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}>☕ Short</button>
            <button type="button" onClick={() => changeMode('long')} className={`py-2 rounded-xl text-xs font-black tracking-wide transition-all cursor-pointer ${mode === 'long' ? 'bg-teal-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}>🌴 Long</button>
          </div>

          {/* MONITOR TIMER */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center my-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" stroke="#0f172a" strokeWidth="4" fill="transparent" />
              <circle 
                cx="50" cy="50" r="44" stroke="#14b8a6" strokeWidth="4" fill="transparent" 
                strokeDasharray="276.4" strokeDashoffset={276.4 - (276.4 * progressPercent) / 100}
                className="transition-all duration-1000 stroke-teal-500" strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-4xl font-black font-mono text-white tracking-tight">{fmtTime()}</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mt-1">{mode === 'work' ? 'FOCUS TIME' : 'BREAK TIME'}</span>
            </div>
          </div>

          {/* KONTROL JALANNYA WAKTU */}
          <div className="flex justify-center gap-3">
            <button 
              type="button"
              onClick={() => setIsActive(!isActive)} 
              className={`px-7 py-3.5 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-lg cursor-pointer ${isActive ? 'bg-slate-950 border border-slate-800 text-teal-400' : 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950'}`}
            >
              {isActive ? "PAUSE FOCUS" : "START FOCUS SESSION"}
            </button>
            <button 
              type="button"
              onClick={() => { setIsActive(false); setSeconds(MODE_TIMES[mode]); }} 
              className="p-3.5 bg-slate-950 border border-slate-800 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* PANEL PEMUTAR FILE AUDIO ASLI MP3 */}
          <div className="pt-4 border-t border-white/5 max-w-md mx-auto space-y-2">
            <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1">
              <Volume2 className="w-3 h-3 text-teal-500" /> Audio Latar Aktual (.MP3 Stream):
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'none', label: '📴 Mute', icon: <VolumeX className="w-3.5 h-3.5" /> },
                { id: 'rain', label: '🌧️ Hujan Real', icon: <CloudRain className="w-3.5 h-3.5" /> },
                { id: 'waves', label: '🌊 Musik Rileks', icon: <Waves className="w-3.5 h-3.5" /> }
              ].map(item => (
                <button
                  key={item.id} type="button" onClick={() => setAmbientType(item.id as any)}
                  className={`p-2.5 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${ambientType === item.id ? 'bg-teal-500/10 border-teal-500 text-teal-400 shadow-sm scale-[1.02]' : 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-300'}`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Tips */}
        <div className="bg-teal-500/5 border border-teal-500/10 rounded-2xl p-4 flex gap-3 items-start">
          <Sparkles className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-0.5">Teknik Deep Focus:</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">Sekarang audionya murni pake file audio lo-fi asli le. Dijamin adem banget di telinga dan bikin cepet masuk ke mode fokus produktif!</p>
          </div>
        </div>

      </div>
    </div>
  );
}
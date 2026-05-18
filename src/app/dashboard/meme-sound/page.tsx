"use client";
import Link from 'next/link';
import { Volume2, Play, ArrowLeft } from 'lucide-react';

const MEME_SOUNDS = [
  { name: 'Vine Boom', freq: 80, type: 'triangle' as OscillatorType, duration: 0.4 },
  { name: 'Bruh Sound', freq: 140, type: 'sawtooth' as OscillatorType, duration: 0.3 },
  { name: 'Sad Violin', freq: 440, type: 'sine' as OscillatorType, duration: 0.8 },
  { name: '8-Bit Jump', freq: 600, type: 'square' as OscillatorType, duration: 0.15 },
];

export default function MemeSoundboard() {
  const playSynthSound = (freq: number, type: OscillatorType, duration: number) => {
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    if (freq === 80) {
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + duration);
    }

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Meme Soundboard (Synth)</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 grid grid-cols-2 gap-3">
          {MEME_SOUNDS.map((sound) => (
            <button
              key={sound.name}
              onClick={() => playSynthSound(sound.freq, sound.type, sound.duration)}
              className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 hover:bg-white/[0.02] hover:border-indigo-500/30 text-left rounded-2xl transition-all group active:scale-95 cursor-pointer"
            >
              <span className="text-sm font-bold text-slate-200 group-hover:text-white">{sound.name}</span>
              <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-all">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
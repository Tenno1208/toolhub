"use client";
import { Volume2, Play } from 'lucide-react';

const MEME_SOUNDS = [
  { name: 'Vine Boom', freq: 80, type: 'triangle' as OscillatorType, duration: 0.4 },
  { name: 'Bruh Sound', freq: 140, type: 'sawtooth' as OscillatorType, duration: 0.3 },
  { name: 'Sad Violin', freq: 440, type: 'sine' as OscillatorType, duration: 0.8 },
  { name: '8-Bit Jump', freq: 600, type: 'square' as OscillatorType, duration: 0.15 },
];

export default function MemeSoundboard() {
  const playSynthSound = (freq: number, type: OscillatorType, duration: number) => {
    // Memanfaatkan Web Audio API murni client agar aman tanpa file aset mp3 eksternal
    if (typeof window === 'undefined') return;
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Efek khusus pitch down drop untuk menyamai sound effect boom
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
    <div className="p-6 max-w-2xl mx-auto bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
          <Volume2 className="w-5 h-5 text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Soundboard Efek Meme (Synth)</h2>
          <p className="text-xs text-slate-400">Putar instan efek audio ikonik berbasis synthesizer Web Audio API lokal.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MEME_SOUNDS.map((sound) => (
          <button
            key={sound.name}
            onClick={() => playSynthSound(sound.freq, sound.type, sound.duration)}
            className="flex items-center justify-between p-4 bg-slate-950 border border-white/[0.05] hover:bg-white/[0.03] hover:border-indigo-500/30 text-left rounded-2xl transition-all duration-200 group active:scale-95 cursor-pointer"
          >
            <span className="text-sm font-bold text-slate-200 group-hover:text-white">{sound.name}</span>
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import { Volume2, Play, ArrowLeft, Sparkles } from 'lucide-react';

// Kumpulan daftar racikan audio synth meme yang diperbanyak & dioptimalkan frekuensinya
const MEME_SOUNDS = [
  { name: '🔥 Vine Boom', id: 'vine', desc: 'Lampu merah jedag-jedug' },
  { name: '🗣️ Bruh Sound', id: 'bruh', desc: 'Efek suara pasrah' },
  { name: '🎻 Sad Violin', id: 'sad', desc: 'Lagu sedih melodrama' },
  { name: '👾 8-Bit Jump', id: 'jump', desc: 'Suara lompatan retro' },
  { name: '🪙 Coin Ping', id: 'coin', desc: 'Efek dapet koin Mario' },
  { name: '🔫 Laser Beam', id: 'laser', desc: 'Tembakan fiksi ilmiah' },
  { name: '🛸 UFO Beam', id: 'ufo', desc: 'Suara penculikan alien' },
  { name: '💀 Game Over', id: 'gameover', desc: 'Kalah telak retro style' },
];

export default function MemeSoundboard() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playMemeSound = (id: string) => {
    if (typeof window === 'undefined') return;

    // 🚀 FIX AUTOPLAY POLICY: Buat atau gunakan kembali AudioContext yang sudah ada
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtxRef.current = new AudioContextClass();
    }

    const ctx = audioCtxRef.current;

    // Paksa bangunkan AudioContext jika di-suspend otomatis oleh sistem browser HP
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const now = ctx.currentTime;

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    // =========================================================================
    // 🎛️ RACIKAN MODULASI FREKUENSI AUDIO SYNTH MEME V2
    // =========================================================================
    switch (id) {
      case 'vine': // Vine Boom Menggelegar
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.5);
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
        break;

      case 'bruh': // Bruh Sound Serak Bass
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(90, now + 0.25);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
        break;

      case 'sad': // Sad Violin Vibrato
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        // Efek vibrato naik turun gelombang sedih
        osc.frequency.linearRampToValueAtTime(460, now + 0.2);
        osc.frequency.linearRampToValueAtTime(420, now + 0.4);
        osc.frequency.linearRampToValueAtTime(440, now + 0.7);
        gainNode.gain.setValueAtTime(0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
        osc.start(now);
        osc.stop(now + 0.8);
        break;

      case 'jump': // 8-Bit Retro Jump
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
        break;

      case 'coin': // Coin Ping Tinggi Cring
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // Nada B5
        setTimeout(() => {
          // Efek nada kedua melonjak khas mario bros
          try {
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'sine';
            osc2.frequency.setValueAtTime(1318.51, now + 0.08); // Nada E6
            gain2.gain.setValueAtTime(0.2, now + 0.08);
            gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
            osc2.connect(gain2);
            gain2.connect(ctx.destination);
            osc2.start(now + 0.08);
            osc2.stop(now + 0.4);
          } catch(e){}
        }, 80);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;

      case 'laser': // Laser Beam Futuristik
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
        break;

      case 'ufo': // UFO Abduction Bergetar
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        // Membentuk gelombang pitch meliuk-liuk naik turun cepat
        for (let i = 0; i < 6; i++) {
          osc.frequency.linearRampToValueAtTime(450, now + (i * 0.1));
          osc.frequency.linearRampToValueAtTime(200, now + (i * 0.1) + 0.05);
        }
        gainNode.gain.setValueAtTime(0.25, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
        break;

      case 'gameover': // Game Over Melorot Turun
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.setValueAtTime(350, now + 0.15);
        osc.frequency.setValueAtTime(300, now + 0.3);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.6);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
        break;

      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigasi Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Meme Soundboard (Synth)</h1>
          </div>
        </div>

        {/* Panel Info Tambahan */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          100% Client-Side Web Audio API (No MP3 Assets Required)
        </div>

        {/* Grid Soundboard Responsif */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {MEME_SOUNDS.map((sound) => (
            <button
              key={sound.id}
              type="button"
              onClick={() => playMemeSound(sound.id)}
              className="flex flex-col justify-between p-5 bg-slate-900/40 border border-white/[0.04] hover:bg-slate-900/80 hover:border-indigo-500/30 text-left rounded-2xl transition-all duration-200 group active:scale-95 cursor-pointer h-32 relative overflow-hidden"
            >
              <div>
                <span className="text-sm font-black text-slate-200 group-hover:text-white block tracking-wide mb-1">
                  {sound.name}
                </span>
                <span className="text-[11px] text-slate-500 group-hover:text-slate-400 font-normal leading-tight block">
                  {sound.desc}
                </span>
              </div>

              <div className="self-end p-2 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-md">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
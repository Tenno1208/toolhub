"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Smile, RefreshCw, ArrowLeft } from 'lucide-react';

const EMOJI_LIST = ['😭', '🤣', '🤡', '💀', '🔥', '❤️', '🤔', '😎', '🤮', '👽', '👾', '🐱'];

export default function EmojiMixer() {
  const [emoji1, setEmoji1] = useState('💀');
  const [emoji2, setEmoji2] = useState('🔥');

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white">Emoji Mixer Studio</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Slot Emoji A</label>
              <div className="grid grid-cols-4 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                {EMOJI_LIST.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmoji1(e)}
                    className={`text-xl p-2 rounded-xl transition-all ${emoji1 === e ? 'bg-amber-500/20 border border-amber-500/40 scale-110' : 'hover:bg-white/5'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Slot Emoji B</label>
              <div className="grid grid-cols-4 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                {EMOJI_LIST.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmoji2(e)}
                    className={`text-xl p-2 rounded-xl transition-all ${emoji2 === e ? 'bg-amber-500/20 border border-amber-500/40 scale-110' : 'hover:bg-white/5'}`}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 text-center flex flex-col items-center justify-center min-h-[160px]">
            <div className="flex items-center gap-4 text-3xl mb-3">
              <span>{emoji1}</span>
              <RefreshCw className="w-4 h-4 text-slate-600 animate-spin-slow" />
              <span>{emoji2}</span>
            </div>
            <div className="text-5xl mt-2 animate-bounce duration-1000">🤪</div>
          </div>
        </div>
      </div>
    </div>
  );
}
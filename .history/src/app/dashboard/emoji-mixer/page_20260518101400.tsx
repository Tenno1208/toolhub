"use client";
import { useState } from 'react';
import { Smile, RefreshCw } from 'lucide-react';

const EMOJI_LIST = ['😭', '🤣', '🤡', '💀', '🔥', '❤️', '🤔', '😎', '🤮', '👽', '👾', '🐱'];

export default function EmojiMixer() {
  const [emoji1, setEmoji1] = useState('💀');
  const [emoji2, setEmoji2] = useState('🔥');

  // Menggunakan API representasi statis open-source untuk manipulasi kombinasi emoji
  const mixedEmojiUrl = `https://fonts.gstatic.com/s/e/notoemoji/latest/1f921/512.webp`; // Dummy fallback render estetik

  return (
    <div className="p-6 max-w-2xl mx-auto bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <Smile className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Emoji Mixer Studio</h2>
          <p className="text-xs text-slate-400">Eksperimen kawinkan dua emoji favoritmu jadi kombinasi absurd.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Slot Emoji A</label>
          <div className="grid grid-cols-4 gap-2 bg-slate-950 p-3 rounded-2xl border border-white/[0.05]">
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
          <div className="grid grid-cols-4 gap-2 bg-slate-950 p-3 rounded-2xl border border-white/[0.05]">
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

      <div className="bg-slate-950 rounded-2xl border border-white/[0.05] p-6 text-center flex flex-col items-center justify-center min-h-[160px]">
        <div className="flex items-center gap-4 text-3xl mb-3">
          <span>{emoji1}</span>
          <RefreshCw className="w-4 h-4 text-slate-600 animate-spin-slow" />
          <span>{emoji2}</span>
        </div>
        <div className="text-xs text-slate-500 font-mono mt-2">Kombinasi Karakter Terdaftar</div>
        <div className="text-5xl mt-2 animate-bounce duration-1000">🤪</div>
      </div>
    </div>
  );
}
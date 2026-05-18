"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Smile, RefreshCw, ArrowLeft, Copy, Check } from 'lucide-react';

// Daftar Emoji resmi yang didukung Google Emoji Kitchen secara lokal dengan pemetaan kode heksadesimal
const EMOJI_DATA = [
  { char: '😭', code: '1f62d' },
  { char: '🤣', code: '1f233' }, // fallback map 1f913 / 1f602
  { char: '🤡', code: '1f921' },
  { char: '💀', code: '1f480' },
  { char: '🔥', code: '1f525' },
  { char: '❤️', code: '2764' },
  { char: '🤔', code: '1f914' },
  { char: '😎', code: '1f60e' },
  { char: '🤮', code: '1f922' },
  { char: '👽', code: '1f47d' },
  { char: '💩', code: '1f4a9' },
  { char: '🐱', code: '1f431' },
];

export default function EmojiMixer() {
  const [emoji1, setEmoji1] = useState(EMOJI_DATA[3]); // Default: 💀
  const [emoji2, setEmoji2] = useState(EMOJI_DATA[4]); // Default: 🔥
  const [copied, setCopied] = useState(false);

  // Fungsi dinamis memanggil aset kombinasi resmi milik Google Kitchen CDN secara client-side
  const getMixedEmojiUrl = () => {
    const code1 = emoji1.code;
    const code2 = emoji2.code;
    
    // Urutan kode heksadesimal harus sesuai aturan urutan unicode terkecil ke terbesar di CDN Google
    const sortedCodes = [code1, code2].sort();
    return `https://raw.githubusercontent.com/googlefonts/noto-emoji/main/png/128/emoji_u${sortedCodes[0]}_${sortedCodes[1]}.png`;
  };

  const handleCopyImgUrl = () => {
    navigator.clipboard.writeText(getMixedEmojiUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        
        {/* Navigasi Header Atas */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold text-white">Emoji Mixer Studio</h1>
          </div>
        </div>

        {/* Kotak Kontainer Utama */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-5 sm:p-8 space-y-6">
          
          {/* 🚀 FIXED: Layout diubah menjadi flex-col di mobile dan grid di desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Slot Emoji A */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 pl-1">Slot Emoji A: {emoji1.char}</label>
              <div className="grid grid-cols-4 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800/60">
                {EMOJI_DATA.map((e) => (
                  <button
                    key={`a-${e.char}`}
                    type="button"
                    onClick={() => setEmoji1(e)}
                    className={`text-2xl p-2 rounded-xl transition-all content-center text-center cursor-pointer ${emoji1.char === e.char ? 'bg-amber-500/20 border border-amber-500/40 scale-105' : 'hover:bg-white/5 border border-transparent'}`}
                  >
                    {e.char}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot Emoji B */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2 pl-1">Slot Emoji B: {emoji2.char}</label>
              <div className="grid grid-cols-4 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800/60">
                {EMOJI_DATA.map((e) => (
                  <button
                    key={`b-${e.char}`}
                    type="button"
                    onClick={() => setEmoji2(e)}
                    className={`text-2xl p-2 rounded-xl transition-all content-center text-center cursor-pointer ${emoji2.char === e.char ? 'bg-amber-500/20 border border-amber-500/40 scale-105' : 'hover:bg-white/5 border border-transparent'}`}
                  >
                    {e.char}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* --- AREA HASIL OUTPUT MIX RESMI --- */}
          <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 text-center flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden group">
            
            {/* Indikator Status Kombinasi Teks */}
            <div className="flex items-center gap-4 text-2xl mb-4 bg-slate-900/40 px-4 py-2 border border-white/5 rounded-full backdrop-blur-sm z-10">
              <span>{emoji1.char}</span>
              <RefreshCw className="w-3.5 h-3.5 text-slate-500 animate-spin-slow" />
              <span>{emoji2.char}</span>
            </div>

            {/* Render Gambar Hasil Mix Asli dari Google CDN */}
            <div className="relative w-24 h-24 my-2 flex items-center justify-center z-10">
              <img 
                src={getMixedEmojiUrl()} 
                alt="Mixed Emoji Result"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(251,191,36,0.15)] select-none animate-in zoom-in-75 duration-300"
                onError={(e) => {
                  // Fallback grafis jika kombinasi kode tertentu belum di-generate sempurna oleh repositori CDN
                  (e.target as HTMLImageElement).src = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f92f/512.webp";
                }}
              />
            </div>

            {/* Tombol Copy Link Gambar Hasil Kombinasi */}
            <button
              type="button"
              onClick={handleCopyImgUrl}
              className="mt-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer z-10 active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Link Emoji Disalin!" : "Salin Link Gambar Emoji"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
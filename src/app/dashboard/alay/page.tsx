"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Copy, Check, ArrowLeft, RefreshCw, Flame, Dumbbell, Coffee, ShieldAlert, HeartCrack, Loader2 } from 'lucide-react';

type QuoteCategory = 'motivasi' | 'gym' | 'senja' | 'savage' | 'galau';

export default function AIWordGenerator() {
  const [category, setCategory] = useState<QuoteCategory>('motivasi');
  const [output, setOutput] = useState('Pilih kategori di bawah, lalu klik tombol untuk melahirkan kata-kata berkelas berbasis AI...');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateAIQuote = async (cat: QuoteCategory) => {
    setLoading(true);
    setOutput('');

    let promptInstructions = "";
    if (cat === 'motivasi') {
      promptInstructions = "Hasilkan 1 quotes motivasi sukses, ambisi, dan kerja keras yang sangat keren, membakar semangat, dan mendalam. Tanpa tanda petik, langsung kalimatnya saja.";
    } else if (cat === 'gym') {
      promptInstructions = "Hasilkan 1 quotes motivasi gym, fitness, konsistensi angkat beban, disiplin otot, dan pembentukan mental juara yang berkelas (boleh selipkan jargon No Pain No Gain). Tanpa tanda petik.";
    } else if (cat === 'senja') {
      promptInstructions = "Hasilkan 1 kalimat takarir (caption) estetik, puitis, bertema kopi, rintik hujan, jingga senja, dan refleksi kehidupan yang syahdu. Tanpa tanda petik.";
    } else if (cat === 'savage') {
      promptInstructions = "Hasilkan 1 kalimat sindiran yang sangat savage, dingin, menusuk mental tapi berkelas (bukan toxic kasar) untuk orang yang banyak drama atau bermuka dua. Tanpa tanda petik.";
    } else if (cat === 'galau') {
      promptInstructions = "Hasilkan 1 kalimat galau, sadboy, patah hati, atau pengikhlasan melepas seseorang yang mendalam, puitis, dan bikin nyesek di dada. Tanpa tanda petik.";
    }

    try {
      // 🚀 DIUBAH: Menembak rute khusus terpisah yang anti-bentrok
      const response = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${promptInstructions} Buat dalam Bahasa Indonesia yang gaul, kekinian, santai tapi ngena.`
        })
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || `HTTP ${response.status}`);
      }

      const data = await response.json();
      
      if (data.reply) {
        setOutput(data.reply);
      } else {
        throw new Error("Format data balasan kosong.");
      }

    } catch (error: any) {
      console.error("Detail Error:", error);
      setOutput(`❌ Gagal mengambil kata-kata dari AI. Masalah: ${error.message || 'Koneksi terputus'}. Pastikan API Key di .env sudah aktif le!`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output || loading) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header Title */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white tracking-tight">AI Premium Quote & Caption Generator</h1>
          </div>
        </div>

        {/* Main Dashboard Box */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-5 sm:p-6 space-y-5 shadow-2xl">
          
          {/* Menu Kategori Vibes */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 mb-2.5">Pilih Kategori Vibes:</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'motivasi', label: '🔥 Sukses', icon: <Flame className="w-3.5 h-3.5" /> },
                { id: 'gym', label: '🏋️‍♂️ Gym', icon: <Dumbbell className="w-3.5 h-3.5" /> },
                { id: 'senja', label: '☕ Senja', icon: <Coffee className="w-3.5 h-3.5" /> },
                { id: 'savage', label: '⚡ Savage', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
                { id: 'galau', label: '💔 Galau', icon: <HeartCrack className="w-3.5 h-3.5" /> }
              ].map((item) => (
                <button
                  key={item.id} type="button" disabled={loading}
                  onClick={() => { setCategory(item.id as QuoteCategory); }}
                  className={`p-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-1.5 transition-all disabled:opacity-40 truncate ${category === item.id ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300 cursor-pointer'}`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Monitor Screen Tempat Output Teks */}
          <div className="space-y-2 pt-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Hasil Generasi Kecerdasan Buatan (AI):</label>
            <div className="relative">
              <textarea
                readOnly
                className={`w-full bg-slate-950 border border-slate-800 rounded-2xl p-5 text-sm text-purple-200 resize-none h-36 focus:outline-none leading-relaxed font-medium shadow-inner tracking-wide transition-opacity duration-200 ${loading ? 'opacity-40' : 'opacity-100'}`}
                value={loading ? "Sedang memeras otak AI untuk merangkai kalimat terbaik..." : output}
                placeholder="Kata-kata mutiara AI akan muncul di sini le..."
              />
              {output && !loading && output !== 'Pilih kategori di bawah, lalu klik tombol untuk melahirkan kata-kata berkelas berbasis AI...' && (
                <button
                  type="button" onClick={handleCopy}
                  className="absolute bottom-5 right-5 bg-slate-900 border border-slate-800 hover:border-purple-500/20 p-2.5 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer shadow-md"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {/* Tombol Eksekusi AI */}
          <button 
            type="button"
            onClick={() => { generateAIQuote(category); }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:scale-[1.01] active:scale-95 disabled:scale-100 text-white font-black py-4 rounded-xl text-xs tracking-widest cursor-pointer disabled:cursor-not-allowed shadow-lg shadow-purple-950/20 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> GENERATING VIA API ECOSYSTEM...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '12s' }} /> REGENERASI QUOTES VIA AI
              </>
            )}
          </button>

        </div>

        {/* Info Edukatif */}
        <div className="bg-purple-500/5 border border-purple-500/10 rounded-2xl p-4 flex gap-3 items-start animate-in fade-in duration-300">
          <Sparkles className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-0.5">Sistem Integrasi Route API:</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Modul ini terhubung langsung ke basis LLM AI internal ToolHub kamu. Setiap baris kalimat yang diciptakan adalah produk pemikiran orisinal detik ini juga, dijamin tidak ada duanya di internet le!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
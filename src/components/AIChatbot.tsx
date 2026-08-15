"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Bot, 
  RefreshCw, 
  Sparkles, 
  HelpCircle, 
  EyeOff, 
  Compass,
  CheckCheck
} from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPresets, setShowPresets] = useState(true);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: 'Halo! Saya AI Assistant ToolHub. Butuh bantuan seputar tools developer, media, produktivitas, atau cek Jadwal Sholat hari ini? ✨' 
    }
  ]);
  
  const presets = [
    "Cek Jadwal Sholat hari ini?",
    "Cara pakai Portfolio Builder?",
    "Download video TikTok tanpa WM?",
    "Ada tools developer apa aja?",
    "Bagaimana cara kerja AI OCR?",
    "Bikin kata-kata motivasi Gym dong!"
  ];

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen, showPresets]);

  const sendMessageToAPI = async (textToSend: string) => {
    setShowPresets(false);
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const webContext = `
        Anda adalah AI Assistant resmi untuk website "TOOLHUB TOOLS" (ekosistem toolbox utilitas digital premium, modern, dan gratis).
        Website ini memiliki 3 kategori utama dengan tools canggih yang berjalan 100% aman di sisi lokal client (RAM browser):
        
        1. Developer & Security: 
           - Base64 Converter
           - Password Generator
           - JSON Formatter (Merapikan & memvalidasi struktur data JSON)
           - SHA256 Encrypter
           - Signature Pad Digital (Membuat tanda tangan digital presisi transparan .png).
        
        2. Media & Utilities: 
           - QR Code Generator
           - Image Compressor
           - IP Info Tracker
           - Color Picker
           - TikTok Downloader (Download video HD tanpa watermark)
           - Instagram Downloader (Download reels/foto HD)
           - AI Text Extractor (Real-Time OCR berbasis AI untuk ekstraksi tulisan dari gambar/catatan).
        
        3. Productivity & Essentials: 
           - Jadwal Sholat & Imsakiyah Digital (Akurat berdasarkan GPS/lokasi kota otomatis seluruh Indonesia).
           - Portfolio Builder (Bikin web portofolio instan + live preview & download berkas HTML).
           - PDF Merge & Split Utility (Gabung dan pecah dokumen PDF cepat).
           - Word Count & Text Case Converter
           - Stopwatch, Calculator & Age Calculator
           - AI Premium Quote & Caption Generator (Generator kata mutiara/caption tema Gym, Senja, Savage, Sadboy, dan Sukses).
        
        Aturan Menjawab:
        Jawab pertanyaan pengguna dengan singkat, padat, elegan, solutif, dan ramah menggunakan Bahasa Indonesia yang santun namun modern. Arahkan pengguna ke tools yang relevan di dashboard jika mereka membutuhkannya.
      `;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: textToSend,
          context: webContext,
          history: messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            text: msg.text
          })).slice(-6)
        })
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setMessages(prev => [
        ...prev, 
        { role: 'assistant', text: 'Maaf, koneksi sedang sibuk sejenak. Silakan coba kirim kembali pesan Anda ya! 🙏' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    sendMessageToAPI(userMessage);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] font-sans select-none antialiased">
      
      {/* 1. FLOATING ACTION BUTTON */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-fuchsia-500 p-[1px] shadow-[0_10px_30px_-5px_rgba(99,102,241,0.5)] hover:shadow-[0_15px_35px_-5px_rgba(168,85,247,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <div className="w-full h-full bg-slate-950/70 group-hover:bg-slate-950/40 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-colors">
            <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform duration-300" />
            {/* Status Ping */}
            <span className="absolute top-2 right-2 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
            </span>
          </div>
        </button>
      )}

      {/* 2. LUXURY CHAT WINDOW */}
      {isOpen && (
        <div className="w-[90vw] sm:w-[400px] h-[580px] bg-slate-950/85 border border-white/10 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 ring-1 ring-white/5">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2 bg-gradient-to-tr from-violet-600/30 to-indigo-600/20 border border-violet-500/30 rounded-xl shadow-inner">
                <Bot className="w-5 h-5 text-violet-300" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-1.5">
                  ToolHub AI <span className="text-[10px] px-1.5 py-0.5 bg-violet-500/20 border border-violet-500/30 text-violet-300 rounded-md font-mono">PRO</span>
                </h3>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  Ready to assist
                </p>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-1.5">
              {!showPresets && (
                <button 
                  onClick={() => setShowPresets(true)} 
                  className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-violet-300 transition-all cursor-pointer"
                  title="Tampilkan Rekomendasi"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Area Pesan */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3.5 bg-gradient-to-b from-transparent via-slate-950/40 to-slate-950/80 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 shrink-0 text-xs shadow-sm mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs leading-relaxed break-words whitespace-pre-wrap shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-tr-none font-normal' 
                    : 'bg-slate-900/90 border border-white/[0.08] text-slate-200 rounded-tl-none shadow-black/40'
                }`}>
                  {msg.text}
                  {msg.role === 'user' && (
                    <span className="flex justify-end mt-1 text-white/60">
                      <CheckCheck className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs pl-9">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-violet-400" />
                <span className="text-[11px] font-medium tracking-wide text-slate-400">Meracik jawaban...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Preset Prompts Panel */}
          {showPresets && !loading && (
            <div className="px-4 py-3 bg-slate-900/70 border-t border-white/[0.06] backdrop-blur-md animate-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" /> Rekomendasi Pertanyaan
                </span>
                <button 
                  type="button" 
                  onClick={() => setShowPresets(false)}
                  className="text-[10px] text-slate-500 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <EyeOff className="w-3 h-3" /> Sembunyikan
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto scrollbar-none">
                {presets.map((preset, idx) => (
                  <button
                    key={idx} 
                    type="button" 
                    onClick={() => sendMessageToAPI(preset)}
                    className="text-[11px] font-medium bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-violet-600/30 hover:border-violet-500/40 rounded-xl px-3 py-1.5 transition-all duration-200 cursor-pointer text-left flex items-center gap-1.5 group"
                  >
                    {preset.includes('Sholat') ? (
                      <Compass className="w-3 h-3 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 group-hover:scale-125 transition-transform shrink-0"></span>
                    )}
                    <span className="truncate">{preset}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input Form */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-slate-950/90 border-t border-white/[0.08] flex gap-2 items-center">
            <div className="relative flex-grow">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ketik pertanyaan seputar tools atau jadwal sholat..."
                className="w-full bg-slate-900/90 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/50 transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={!input.trim() || loading}
              className="p-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-600 text-white rounded-xl shadow-lg hover:shadow-violet-500/20 transition-all cursor-pointer shrink-0 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}

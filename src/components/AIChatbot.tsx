"use client";
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, RefreshCw, Sparkles, HelpCircle, EyeOff } from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPresets, setShowPresets] = useState(true); // 🚀 INOVASI 1: State Kendali Toggle Preset
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Halo! Saya AI Assistant ToolHub Tools. Ada yang bisa saya bantu untuk produktivitas Anda hari ini? 🤖' }
  ]);
  
  const presets = [
    "Cara pakai Portfolio Builder?",
    "Download video TikTok unik?",
    "Ada tools developer apa aja?",
    "Cara pakai PDF Merge & Split?",
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
    // Optimasi: Sembunyikan panel rekomendasi otomatis setelah user mulai bertanya
    setShowPresets(false);
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const webContext = `
        Anda adalah AI Assistant resmi untuk website "TOOLHUB TOOLS" (sebuah ekosistem toolbox utilitas digital gratis, modern, dan berkilau).
        Website ini memiliki 3 kategori utama dengan tools canggih yang berjalan 100% aman di sisi lokal client (RAM browser):
        
        1. Developer & Security: 
           - Base64 Converter
           - Password Generator
           - JSON Formatter (Merapikan/minify struktur data JSON)
           - SHA256 Encrypter
           - Signature Pad Digital (Membuat tanda tangan digital presisi dengan jari tangan di HP, unduh format .png transparan).
        
        2. Media & Utilities: 
           - QR Code Generator
           - Image Compressor
           - IP Info Tracker
           - Color Picker
           - TikTok Downloader (Download video tanpa watermark dengan nama file unik)
           - Instagram Downloader (Download reels/foto HD via SaveFrom engine)
           - AI Text Extractor (Real-Time OCR berbasis neural network lokal untuk mengekstrak tulisan dari foto catatan, screenshot, atau buku cetak secara nyata).
        
        3. Productivity & Essentials: 
           - Word Count
           - Text Case
           - Stopwatch
           - To-Do List
           - Calculator
           - Age Calculator
           - Portfolio Builder (Bikin website portofolio instan dengan live preview dan langsung download berkas .html)
           - PDF Merge & Split Utility (Menggabungkan beberapa file PDF menjadi satu, atau memecah halaman dokumen PDF secara instan)
           - AI Premium Quote & Caption Generator (Pembuat kata-kata mutiara otomatis berbasis AI untuk tema Sukses, Gym/Fitness, Anak Senja, Sindiran Savage, dan Galau Sadboy).
        
        Aturan Menjawab:
        Jawablah pertanyaan user dengan singkat, padat, ramah, profesional, bernuansa teknologi modern, dan gunakan bahasa Indonesia yang joss. Jika user bertanya tentang PDF Merge, Split, OCR, atau Generator Kata, katakan dengan bangga bahwa tools tersebut SUDAH TERSEDIA dan arahkan mereka untuk menggunakannya di dashboard ToolHub le!
      `;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: textToSend,
          context: webContext,
          // 🚀 INOVASI 2: Map history secara aman agar dibaca seragam oleh API Gemini
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
      setMessages(prev => [...prev, { role: 'assistant', text: 'Maaf, jaringan saya sedang sedikit sibuk. Silakan coba kirim pesan lagi ya, Bro! 🙏' }]);
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
    <div className="fixed bottom-6 right-6 z-[999] font-sans select-none">
      
      {/* 1. TOMBOL TOGGLE CHATBOT */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/10 flex items-center justify-center group"
        >
          <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse"></span>
        </button>
      )}

      {/* 2. JENDELA CHAT */}
      {isOpen && (
        <div className="w-[88vw] sm:w-[380px] h-[520px] bg-slate-900/95 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-purple-950/40 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <Bot className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide">ToolHub AI Assistant</h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span> Online
                </p>
              </div>
            </div>
            
            {/* Nav Menu Kanan Header */}
            <div className="flex items-center gap-1">
              {/* Tombol memicu kembalinya panel rekomendasi pertanyaan jika tersembunyi */}
              {!showPresets && (
                <button 
                  onClick={() => setShowPresets(true)} 
                  className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-purple-400 transition-colors cursor-pointer"
                  title="Tampilkan Rekomendasi"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              )}
              <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Area Log Bubble Pesan */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-950/20 scrollbar-none">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed break-words whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-slate-900 border border-white/5 text-slate-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-2.5 justify-start items-center text-slate-500 text-xs pl-8 font-mono">
                <RefreshCw className="w-3 h-3 animate-spin text-purple-400" /> AI sedang berpikir...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* 🚀 INOVASI 3: PANEL PRESET PERTANYAAN ADAPTIF (BISA DITUTUP TOTAL) */}
          {showPresets && !loading && (
            <div className="px-3 pt-2.5 pb-2 bg-slate-950/60 border-t border-white/[0.04] animate-in slide-in-from-bottom-2 duration-150">
              <div className="flex items-center justify-between px-1 mb-1.5">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" /> Rekomendasi Topik:
                </span>
                <button 
                  type="button" 
                  onClick={() => setShowPresets(false)}
                  className="text-[10px] text-slate-500 hover:text-rose-400 flex items-center gap-0.5 transition-colors cursor-pointer font-bold"
                >
                  <EyeOff className="w-3 h-3" /> Sembunyikan
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-[105px] overflow-y-auto scrollbar-none">
                {presets.map((preset, idx) => (
                  <button
                    key={idx} type="button" onClick={() => sendMessageToAPI(preset)}
                    className="text-[10px] font-medium bg-slate-900/90 border border-white/5 text-purple-300 hover:text-white hover:bg-purple-600/25 rounded-lg px-2.5 py-1.5 transition-all cursor-pointer text-left flex items-center gap-1 max-w-full truncate"
                  >
                    <span className="w-1 h-1 rounded-full bg-purple-500 shrink-0"></span>
                    <span className="truncate">{preset}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form Textarea Footer */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-slate-950/80 border-t border-white/5 flex gap-2 items-center">
            <input 
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya sesuatu tentang tools ini..."
              className="flex-grow bg-slate-900 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button 
              type="submit" disabled={!input.trim() || loading}
              className="p-2.5 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-900 disabled:text-slate-700 text-white rounded-xl transition-all cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
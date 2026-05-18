"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, RefreshCw } from 'lucide-react';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Halo! Saya AI Assistant RFF707 Tools. Ada yang bisa saya bantu untuk produktivitas Anda hari ini? 🤖' }
  ]);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll ke pesan paling baru
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      // 🚀 CONTEXT KNOWLEDGE: Memberitahu AI tentang isi website kamu agar jawabannya menyesuaikan web!
      const webContext = `
        Anda adalah AI Assistant resmi untuk website "RFF707 TOOLS" (sebuah ekosistem toolbox utilitas digital gratis dan modern).
        Website ini memiliki 3 kategori utama dan tools berikut:
        1. Developer & Security: Base64 Converter, Password Generator, JSON Formatter (bisa merapikan/minify JSON), SHA256 Encrypter.
        2. Media & Utilities: QR Code Generator, Image Compressor, IP Info Tracker, Color Picker, TikTok Downloader (bisa download video tanpa watermark dengan nama file unik), Instagram Downloader (menggunakan SaveFrom engine untuk download reels/foto HD).
        3. Productivity & Essentials: Word Count, Text Case, Stopwatch, To-Do List, Calculator, Age Calculator, dan Portfolio Builder (bisa membuat website portofolio instan dengan live preview dan langsung download file .html mandiri).
        
        Jawablah pertanyaan user dengan singkat, ramah, profesional, bernuansa teknologi, dan gunakan bahasa Indonesia yang joss. Jika user bertanya cara download atau membuat portofolio, arahkan mereka ke tool yang sesuai di web ini.
      `;

      // Menggunakan API Serverless route bawaan Next.js atau nembak endpoint Gemini langsung
      // Catatan: Untuk testing cepat client-side, kita bisa fetch ke API route yang akan kita buat di Langkah 2
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          context: webContext,
          history: messages.slice(-6) // Kirim 6 riwayat pesan terakhir agar AI ingat konteks obrolan
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

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans select-none">
      
      {/* 1. TOMBOL TOGGLE CHATBOT (Bulat di Pojok Kanan Bawah) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all cursor-pointer border border-white/10 flex items-center justify-center group"
        >
          <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse"></span>
        </button>
      )}

      {/* 2. JENDELA CHAT (Akan muncul jika isOpen === true) */}
      {isOpen && (
        <div className="w-[88vw] sm:w-[380px] h-[500px] bg-slate-900/95 border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header Chat */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-purple-950/40 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <Bot className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white tracking-wide">RFF707 AI Assistant</h3>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span> Online & Active
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Area Pesan Chat (Scrollable) */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 scrollbar-none bg-slate-950/20">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-lg bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 text-xs">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-slate-900 border border-white/5 text-slate-300 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Loading Indicator */}
            {loading && (
              <div className="flex gap-2.5 justify-start items-center text-slate-500 text-xs pl-8 font-mono">
                <RefreshCw className="w-3 h-3 animate-spin text-purple-400" /> AI sedang berpikir...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form Kirim Pesan */}
          <form onSubmit={handleSendMessage} className="p-3 bg-slate-950/60 border-t border-white/5 flex gap-2 items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya sesuatu tentang tools ini..."
              className="flex-grow bg-slate-900 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <button 
              type="submit"
              disabled={!input.trim() || loading}
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
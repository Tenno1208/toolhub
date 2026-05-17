"use client";
import React, { useState, useEffect } from 'react';
import { 
  Search, Hash, Type, Lock, QrCode, FileJson, Settings2, LayoutDashboard, Clock, CheckSquare, 
  Image as ImageIcon, Fingerprint, Calculator, Globe, Calendar, Palette, DownloadCloud
} from 'lucide-react';
import Link from 'next/link';

// Data Mockup Tools
const tools = [
  { id: 1, name: 'Base64', icon: <Hash className="w-7 h-7" />, path: '/base64' },
  { id: 2, name: 'Word Count', icon: <Type className="w-7 h-7" />, path: '/word-count' },
  { id: 3, name: 'Password', icon: <Lock className="w-7 h-7" />, path: '/password' },
  { id: 4, name: 'QR Code', icon: <QrCode className="w-7 h-7" />, path: '/qr-code' },
  { id: 5, name: 'JSON Formatter', icon: <FileJson className="w-7 h-7" />, path: '/json' },
  { id: 6, name: 'Text Case', icon: <Settings2 className="w-7 h-7" />, path: '/text-case' },
  { id: 7, name: 'Stopwatch', icon: <Clock className="w-7 h-7" />, path: '/stopwatch' },
  { id: 8, name: 'To-Do', icon: <CheckSquare className="w-7 h-7" />, path: '/todo' },
  { id: 9, name: 'Image Comp', icon: <ImageIcon className="w-7 h-7" />, path: '/image-comp' },
  { id: 10, name: 'SHA256', icon: <Fingerprint className="w-7 h-7" />, path: '/sha256' },
  { id: 11, name: 'Calculator', icon: <Calculator className="w-7 h-7" />, path: '/calc' },
  { id: 12, name: 'IP Info', icon: <Globe className="w-7 h-7" />, path: '/ip-info' },
  { id: 13, name: 'Age Calc', icon: <Calendar className="w-7 h-7" />, path: '/age' },
  { id: 14, name: 'Color Picker', icon: <Palette className="w-7 h-7" />, path: '/color' },
  { id: 15, name: 'TikTok Downloader', icon: <DownloadCloud className="w-7 h-7" />, path: '/tiktok-dl' },
  { id: 16, name: 'Instagram Downloader', icon: <DownloadCloud className="w-7 h-7" />, path: '/ig-dl' },
  
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [greeting, setGreeting] = useState('Halo!');

  // Logika untuk sapaan dinamis berdasarkan waktu lokal pengguna
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 11) setGreeting('Selamat Pagi 🌤️');
    else if (hour < 15) setGreeting('Selamat Siang ☀️');
    else if (hour < 18) setGreeting('Selamat Sore 🌇');
    else setGreeting('Selamat Malam 🌙');
  }, []);

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8">
      
      {/* --- SEARCH HEADER --- */}
      <section className="max-w-6xl mx-auto flex flex-col items-center sm:items-start text-center sm:text-left mb-10 w-full">
        
        {/* Badge Sapaan Dinamis */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs sm:text-sm font-semibold mb-5 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          {greeting}
        </div>

        {/* Headline dengan Gradient */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Mau pakai <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">alat apa</span> hari ini?
        </h1>

        <div className="relative w-full max-w-xl mx-auto sm:mx-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text"
            placeholder="Cari tools..."
            className="w-full bg-slate-900/80 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-slate-500 backdrop-blur-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* --- MICRO GRID --- */}
      <main className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6 text-slate-400 pl-2">
          <LayoutDashboard className="w-4 h-4" />
          <h2 className="font-medium tracking-wide text-sm">Semua Tools</h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-6">
          {filteredTools.map((tool) => (
            <Link href={`/dashboard${tool.path}`} key={tool.id} className="block group">
              <div className="flex flex-col items-center justify-center p-4 h-full aspect-square bg-slate-900/50 border border-white/5 rounded-2xl hover:bg-slate-800/80 hover:border-purple-500/40 transition-all cursor-pointer">
                
                {/* Ikon dengan efek hover */}
                <div className="text-slate-400 mb-3 group-hover:text-purple-400 group-hover:-translate-y-1 transition-all duration-300">
                  {tool.icon}
                </div>
                
                {/* Judul Tool yang ringkas */}
                <h3 className="text-xs sm:text-sm font-semibold text-slate-300 group-hover:text-white text-center leading-tight">
                  {tool.name}
                </h3>
                
              </div>
            </Link>
          ))}
        </div>

        {/* State Kosong saat pencarian tidak ditemukan */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-sm">Alat yang kamu cari tidak ditemukan.</p>
          </div>
        )}
      </main>
    </div>
  );
}
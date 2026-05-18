"use client";
import React, { useState, useEffect } from 'react';
import { 
  Search, Hash, Type, Lock, QrCode, FileJson, Settings2, Clock, CheckSquare, 
  Image as ImageIcon, Fingerprint, Calculator, Globe, Calendar, Palette,
  Briefcase, Terminal, Wrench, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer'; // Mengimpor komponen footer terpisah

// =========================================================================
// 🛡️ NATIVE BRAND SVG ICONS FOR DASHBOARD CARD (Bypass generic icons)
// =========================================================================

const TikTokDashboardIcon = () => (
  <svg className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.62 4.2 1.07 1.15 2.52 1.84 4.05 2.05v3.63c-1.68-.05-3.32-.59-4.73-1.53a7.46 7.46 0 0 1-2.31-2.43v9.06c.03 1.14-.14 2.29-.53 3.37A7.472 7.472 0 0 1 8.01 23.8a7.34 7.34 0 0 1-5.18-1.54 7.488 7.488 0 0 1-2.73-5.59c-.06-1.46.33-2.93 1.11-4.17 1.01-1.54 2.61-2.61 4.41-2.96v3.7c-.85.16-1.65.61-2.22 1.28-.61.76-.88 1.73-.75 2.69.13 1.09.77 2.07 1.7 2.61a3.84 3.84 0 0 0 4.67-.5c.82-.84 1.19-2.03 1.12-3.2V.02h2.22z"/>
  </svg>
);

const InstagramDashboardIcon = () => (
  <svg className="w-7 h-7 text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.2)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
  </svg>
);

// =========================================================================

// Data Mockup Tools dengan Kategori dan Ikon yang Diperbarui
const tools = [
  // Kategori: Developer & Security
  { id: 1, name: 'Base64', icon: <Hash className="w-7 h-7" />, path: '/base64', category: 'Developer & Security' },
  { id: 3, name: 'Password', icon: <Lock className="w-7 h-7" />, path: '/password', category: 'Developer & Security' },
  { id: 5, name: 'JSON Formatter', icon: <FileJson className="w-7 h-7" />, path: '/json', category: 'Developer & Security' },
  { id: 10, name: 'SHA256', icon: <Fingerprint className="w-7 h-7" />, path: '/sha256', category: 'Developer & Security' },
  
  // Kategori: Media & Utilities
  { id: 4, name: 'QR Code', icon: <QrCode className="w-7 h-7" />, path: '/qr-code', category: 'Media & Utilities' },
  { id: 9, name: 'Image Comp', icon: <ImageIcon className="w-7 h-7" />, path: '/image-comp', category: 'Media & Utilities' },
  { id: 12, name: 'IP Info', icon: <Globe className="w-7 h-7" />, path: '/ip-info', category: 'Media & Utilities' },
  { id: 14, name: 'Color Picker', icon: <Palette className="w-7 h-7" />, path: '/color', category: 'Media & Utilities' },
  { id: 15, name: 'TikTok Downloader', icon: <TikTokDashboardIcon />, path: '/tiktok-dl', category: 'Media & Utilities' }, // Menggunakan Ikon Custom TikTok
  { id: 16, name: 'Instagram Downloader', icon: <InstagramDashboardIcon />, path: '/ig-dl', category: 'Media & Utilities' }, // Menggunakan Ikon Custom Instagram
  
  // Kategori: Productivity & Essentials
  { id: 2, name: 'Word Count', icon: <Type className="w-7 h-7" />, path: '/word-count', category: 'Productivity & Essentials' },
  { id: 6, name: 'Text Case', icon: <Settings2 className="w-7 h-7" />, path: '/text-case', category: 'Productivity & Essentials' },
  { id: 7, name: 'Stopwatch', icon: <Clock className="w-7 h-7" />, path: '/stopwatch', category: 'Productivity & Essentials' },
  { id: 8, name: 'To-Do', icon: <CheckSquare className="w-7 h-7" />, path: '/todo', category: 'Productivity & Essentials' },
  { id: 11, name: 'Calculator', icon: <Calculator className="w-7 h-7" />, path: '/calc', category: 'Productivity & Essentials' },
  { id: 13, name: 'Age Calc', icon: <Calendar className="w-7 h-7" />, path: '/age', category: 'Productivity & Essentials' },
  { id: 17, name: 'Portfolio Builder', icon: <Briefcase className="w-7 h-7" />, path: '/portfolio-builder', category: 'Productivity & Essentials' },
];

const categories = [
  { name: 'Developer & Security', icon: <Terminal className="w-4 h-4 text-purple-400" /> },
  { name: 'Media & Utilities', icon: <Wrench className="w-4 h-4 text-cyan-400" /> },
  { name: 'Productivity & Essentials', icon: <Briefcase className="w-4 h-4 text-indigo-400" /> },
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [greeting, setGreeting] = useState('Halo!');

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
    <div className="min-h-screen bg-slate-950 pt-24 pb-0 flex flex-col justify-between select-none">
      
      <div className="w-full px-4 sm:px-8 mb-16">
        {/* --- SEARCH HEADER (Disesuaikan dengan Nama Identitas Baru) --- */}
        <section className="max-w-6xl mx-auto flex flex-col items-center sm:items-start text-center sm:text-left mb-14 w-full">
          
          {/* Badge Branding Baru Sesuai Gambar */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs sm:text-sm font-bold mb-5 backdrop-blur-sm tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            RFF707 TOOLS ECOSYSTEM
          </div>

          {/* Subtitle / Deskripsi List Atas */}
          <p className="text-xs sm:text-sm font-mono text-slate-500 mb-2 uppercase tracking-widest">
            Portfolio Generator | TikTok Downloader | 21 Tools | AI Assistant
          </p>

          {/* Headline Utama */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            Mau pakai <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">alat apa</span> hari ini?
          </h1>

          {/* Input Search Field */}
          <div className="relative w-full max-w-xl mx-auto sm:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text"
              placeholder="Cari tools harian Anda..."
              className="w-full bg-slate-900/60 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder:text-slate-600 text-sm backdrop-blur-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </section>

        {/* --- DYNAMIC CATEGORIZED GRID --- */}
        <main className="max-w-6xl mx-auto space-y-12">
          {categories.map((cat) => {
            const categoryTools = filteredTools.filter(t => t.category === cat.name);
            if (categoryTools.length === 0) return null;

            return (
              <section key={cat.name} className="space-y-5 animate-in fade-in duration-300">
                {/* Judul Kategori */}
                <div className="flex items-center gap-2 text-slate-400 pl-1 border-l-2 border-slate-800">
                  {cat.icon}
                  <h2 className="font-bold tracking-wider text-xs uppercase text-slate-400 font-mono">{cat.name}</h2>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/[0.02] border border-white/[0.05] rounded-md text-slate-500 font-mono">
                    {categoryTools.length}
                  </span>
                </div>

                {/* Micro Grid per-Kategori */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4 sm:gap-5">
                  {categoryTools.map((tool) => (
                    <Link href={`/dashboard${tool.path}`} key={tool.id} className="block group">
                      <div className="flex flex-col items-center justify-center p-4 h-full aspect-square bg-slate-900/40 border border-white/[0.02] rounded-2xl hover:bg-slate-900/80 hover:border-purple-500/20 transition-all cursor-pointer backdrop-blur-sm shadow-sm">
                        
                        {/* Ikon dengan transisi hover bawaan */}
                        <div className="text-slate-400 mb-3 group-hover:-translate-y-1 transition-transform duration-300">
                          {tool.icon}
                        </div>
                        
                        {/* Judul Tool */}
                        <h3 className="text-xs font-semibold text-slate-400 group-hover:text-white text-center leading-tight transition-colors">
                          {tool.name}
                        </h3>
                        
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* State Kosong */}
          {filteredTools.length === 0 && (
            <div className="text-center py-20 bg-white/[0.01] border border-dashed border-white/[0.03] rounded-3xl flex flex-col items-center justify-center">
              <ShieldAlert className="w-10 h-10 text-slate-700 mb-3" />
              <p className="text-slate-500 text-sm font-medium">Alat pencarian "{searchTerm}" tidak ditemukan.</p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import { 
  Search, Hash, Type, Lock, QrCode, FileJson, Settings2, LayoutDashboard, Clock, CheckSquare
} from 'lucide-react';
import Link from 'next/link'; // Tambahkan untuk link ke halaman tool nanti

const tools = [
  { id: 1, name: 'Base64 Converter', desc: 'Encode/Decode teks ke Base64', icon: <Hash className="w-6 h-6" />, category: 'Dev', path: '/base64' },
  { id: 2, name: 'Word Counter', desc: 'Hitung jumlah kata dan karakter', icon: <Type className="w-6 h-6" />, category: 'Text', path: '/word-count' },
  { id: 3, name: 'Password Gen', desc: 'Buat password super aman', icon: <Lock className="w-6 h-6" />, category: 'Security', path: '/password-gen' },
  { id: 4, name: 'QR Generator', desc: 'Buat kode QR secara instan', icon: <QrCode className="w-6 h-6" />, category: 'Utility', path: '/qr-generator' },
  { id: 5, name: 'JSON Formatter', desc: 'Rapikan kode JSON yang berantakan', icon: <FileJson className="w-6 h-6" />, category: 'Dev', path: '/json-formatter' },
  { id: 6, name: 'Case Converter', desc: 'Ubah teks ke Uppercase/Lowercase', icon: <Settings2 className="w-6 h-6" />, category: 'Text', path: '/case-converter' },
];

export default function ToolHubHome() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-12">
      {/* --- HERO & SEARCH --- */}
      <section className="max-w-4xl mx-auto flex flex-col items-center mb-16 mt-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          Cari Tool yang Kamu Butuh
        </h1>
        <p className="text-slate-400 max-w-lg mb-10 text-lg">
          Koleksi utilitas digital serbaguna untuk mempercepat pekerjaanmu.
        </p>

        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text"
            placeholder="Cari tools (misal: Base64, Password)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-slate-600 shadow-xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      {/* --- MAIN GRID --- */}
      <main className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-slate-400">
          <LayoutDashboard className="w-5 h-5" />
          <h2 className="font-semibold uppercase tracking-widest text-sm">Semua Tools</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            // Menggunakan <Link> agar kartu bisa di-klik untuk pindah halaman
            <Link href={tool.path} key={tool.id} className="block">
              <div className="group bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:bg-slate-800 hover:border-purple-500/50 transition-all cursor-pointer relative overflow-hidden h-full">
                <div className="absolute -right-4 -top-4 w-20 h-20 bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-all"></div>
                
                <div className="mb-4 p-3 bg-slate-800 rounded-xl w-fit text-purple-400 group-hover:scale-110 group-hover:text-white group-hover:bg-purple-600 transition-all">
                  {tool.icon}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {tool.desc}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-800 px-2 py-1 rounded text-slate-400">
                    {tool.category}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
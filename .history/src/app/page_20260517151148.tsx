"use client";
import React, { useState } from 'react';
import { 
  Search, 
  Hash, 
  Type, 
  Lock, 
  QrCode, 
  FileJson, 
  Settings2, 
  LayoutDashboard,
  Clock,
  CheckSquare
} from 'lucide-react';

// Data Mockup Tools
const tools = [
  { id: 1, name: 'Base64 Converter', desc: 'Encode/Decode teks ke Base64', icon: <Hash className="w-6 h-6" />, category: 'Dev' },
  { id: 2, name: 'Word Counter', desc: 'Hitung jumlah kata dan karakter', icon: <Type className="w-6 h-6" />, category: 'Text' },
  { id: 3, name: 'Password Gen', desc: 'Buat password super aman', icon: <Lock className="w-6 h-6" />, category: 'Security' },
  { id: 4, name: 'QR Generator', desc: 'Buat kode QR secara instan', icon: <QrCode className="w-6 h-6" />, category: 'Utility' },
  { id: 5, name: 'JSON Formatter', desc: 'Rapikan kode JSON yang berantakan', icon: <FileJson className="w-6 h-6" />, category: 'Dev' },
  { id: 6, name: 'Case Converter', desc: 'Ubah teks ke Uppercase/Lowercase', icon: <Settings2 className="w-6 h-6" />, category: 'Text' },
  { id: 7, name: 'Stopwatch', desc: 'Penghitung waktu presisi', icon: <Clock className="w-6 h-6" />, category: 'Utility' },
  { id: 8, name: 'To-Do List', desc: 'Catat tugas harian kamu', icon: <CheckSquare className="w-6 h-6" />, category: 'Productivity' },
];

export default function ToolHubHome() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-12">
      {/* --- HEADER & LOGO --- */}
      <header className="max-w-6xl mx-auto flex flex-col items-center mb-16">
        <div className="flex items-center gap-4 mb-6">
          {/* Logo H ToolHub */}
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="text-white text-4xl font-bold tracking-tighter">H</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            ToolHub
          </h1>
        </div>

        <p className="text-slate-400 text-center max-w-lg mb-10 text-lg">
          Kotak perkakas digital serbaguna. Cepat, aman, dan tanpa iklan.
        </p>

        {/* --- SEARCH BAR --- */}
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
          <input 
            type="text"
            placeholder="Cari tools (misal: Base64, Password)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-slate-600 shadow-xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* --- MAIN GRID --- */}
      <main className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8 text-slate-400">
          <LayoutDashboard className="w-5 h-5" />
          <h2 className="font-semibold uppercase tracking-widest text-sm">Semua Tools</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <div 
              key={tool.id} 
              className="group bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:bg-slate-800 hover:border-purple-500/50 transition-all cursor-pointer relative overflow-hidden"
            >
              {/* Dekorasi kartu */}
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
                <span className="text-purple-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all">
                  Buka Tool →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Jika pencarian kosong */}
        {filteredTools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 italic text-lg">Oops! Tool "{searchTerm}" belum tersedia.</p>
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="max-w-6xl mx-auto mt-24 border-t border-slate-900 pt-8 pb-12 text-center">
        <p className="text-slate-600 text-sm italic">
          &copy; 2024 ToolHub Dashboard. Created with ❤️ for Developers.
        </p>
      </footer>
    </div>
  );
}
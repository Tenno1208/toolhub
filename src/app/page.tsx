"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Wrench,
  Sparkles,
  RefreshCw,
  AlertTriangle,
  Zap,
  Cpu,
  ShieldCheck,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function MaintenancePage() {
  const [lastChecked, setLastChecked] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setLastChecked(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastChecked(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setIsRefreshing(false);
    }, 700);
  };

  const services = [
    { name: 'Core Web Platform', status: 'Migrasi Engine v4.0', state: 'progress' },
    { name: 'AI Assistant & Copilot', status: 'Pembaruan Model Terbaru', state: 'progress' },
    { name: 'Client-Side Toolsets (OCR, PDF, Media)', status: 'Tahap Verifikasi Akhir', state: 'testing' },
    { name: 'Security & Enkripsi Lokal', status: 'Optimal & Aman', state: 'ready' },
  ];

  const features = [
    {
      icon: Zap,
      title: 'Performa Super Kilat',
      desc: 'Optimalisasi arsitektur 0-latency dengan pemrosesan client-side murni tanpa hambatan.',
      color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/30 text-amber-400',
    },
    {
      icon: Cpu,
      title: 'Fitur AI Generasi Baru',
      desc: 'Integrasi mesin AI cerdas untuk analisis dokumen, generator cerdas, dan produktivitas tinggi.',
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    },
    {
      icon: Layers,
      title: 'Antarmuka Baru & Bersih',
      desc: 'Tampilan lebih segar, navigasi cepat, dan layout ergonomis yang nyaman digunakan.',
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
    },
    {
      icon: ShieldCheck,
      title: 'Privasi Tingkat Tinggi',
      desc: 'Standardisasi privasi ketat: semua file dan data Anda tetap berada 100% di browser lokal Anda.',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
  ];

  return (
    <div className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Background Glow Decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-amber-600/15 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto w-full space-y-10">

        {/* Status Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold shadow-lg shadow-amber-500/5 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span>PEMELIHARAAN SISTEM &bull; MAJOR UPGRADE v4.0</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="text-center space-y-5">
          <div className="mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-purple-600/20 border border-white/10 flex items-center justify-center shadow-2xl shadow-amber-500/10 relative group">
            <div className="absolute inset-0 rounded-3xl bg-amber-500/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <Wrench className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 animate-pulse relative z-10" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Kami Sedang Melakukan <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-300 to-purple-400">
              Pembaruan Skala Besar
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
            ToolHub sedang ditingkatkan ke arsitektur generasi terbaru untuk memberikan performa yang jauh lebih cepat, fitur utilitas baru, serta pengalaman pengguna yang jauh lebih mulus. Mohon maaf atas ketidaknyamanan ini.
          </p>
        </div>

        {/* Progress Tracker Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/70 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                <Clock className="w-4 h-4" />
                <span>Status Pengerjaan Saat Ini</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                Tahap 3 dari 4: Migrasi Fitur & Integrasi Baru
              </h2>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Progres Global: <strong className="text-white">82%</strong></span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-3.5 p-0.5 overflow-hidden mb-6 border border-white/5">
            <div 
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-purple-500 h-full rounded-full transition-all duration-1000 shadow-lg shadow-amber-500/30"
              style={{ width: '82%' }}
            />
          </div>

          {/* Service Status Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {services.map((srv, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-white/5 text-xs"
              >
                <span className="text-slate-300 font-medium">{srv.name}</span>
                <span className={`inline-flex items-center gap-1.5 font-semibold ${
                  srv.state === 'ready' 
                    ? 'text-emerald-400' 
                    : srv.state === 'testing' 
                    ? 'text-blue-400' 
                    : 'text-amber-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    srv.state === 'ready' 
                      ? 'bg-emerald-400' 
                      : srv.state === 'testing' 
                      ? 'bg-blue-400 animate-pulse' 
                      : 'bg-amber-400 animate-pulse'
                  }`} />
                  {srv.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sneak Peek: What's Coming */}
        <div className="space-y-4">
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Apa Saja yang Hadir di Update Kali Ini?</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className={`p-5 rounded-2xl bg-gradient-to-b ${item.color} bg-slate-900/60 border backdrop-blur-md transition-all hover:scale-[1.01]`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl bg-slate-950/70 border border-white/10">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-white text-base">{item.title}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Controls & Reload Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-3 text-xs text-slate-400 text-center sm:text-left">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-slate-300 font-medium">Halaman ini akan diperbarui secara berkala.</p>
              <p className="text-slate-500">Pemeriksaan terakhir: {lastChecked || 'Memuat...'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Mengecek...' : 'Cek Status Sekarang'}</span>
            </button>
            <Link
              href="/dashboard/features"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-semibold text-xs sm:text-sm transition-all border border-slate-700"
            >
              <span>Dokumentasi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* Footer Minimalist Note */}
      <div className="text-center mt-12 text-xs text-slate-500 font-mono">
        <p>&copy; {new Date().getFullYear()} ToolHub Ecosystem &bull; Sistem Pemeliharaan Terjadwal</p>
      </div>
    </div>
  );
}

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, DownloadCloud, Link2, Camera, AlertCircle, ExternalLink, Sparkles } from 'lucide-react';

export default function InstagramDownloader() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleRedirectDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    // Validasi sederhana memastikan tautan yang dimasukkan benar dari Instagram
    if (!url.includes('instagram.com')) {
      setError('Tautan tidak valid. Pastikan memasukkan tautan post atau reels dari Instagram.');
      return;
    }

    setError('');
    
    // Membuka engine bypass eksternal yang stabil di tab baru dengan membawa parameter URL inputan
    const targetUrl = `https://snapinsta.app/id?url=${encodeURIComponent(url.trim())}`;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-fuchsia-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">Instagram Media Downloader</h1>
            </div>
          </div>
        </div>

        {/* Card Panel Utama */}
        <div className="bg-slate-900/50 border border-white/[0.03] rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl">
          
          <div className="mb-6">
            <h2 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Cloud Bridge Downloader
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Bypass enkripsi token Meta secara instan. Masukkan tautan foto, video, atau Reels Instagram kamu di bawah ini untuk mengunduh dengan resolusi tertinggi tanpa batasan limitasi CORS browser.
            </p>
          </div>

          <form onSubmit={handleRedirectDownload} className="space-y-4">
            <div className="relative">
              <Link2 className="absolute left-4 top-4 text-slate-600 w-5 h-5" />
              <input 
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Paste tautan instagram.com/p/... atau /reels/..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-fuchsia-500"
              />
            </div>

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-xs sm:text-sm animate-in fade-in duration-200">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={!url.trim()}
              className="w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 disabled:from-slate-900 disabled:to-slate-900 disabled:text-slate-600 text-white font-bold py-4 rounded-2xl transition-all text-sm cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-600/10 active:scale-[0.99]"
            >
              <DownloadCloud className="w-4 h-4" /> 
              <span>Mulai Unduh di Tab Baru</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </button>
          </form>

          {/* Info Banner */}
          <div className="mt-8 pt-6 border-t border-white/[0.02] text-center">
            <p className="text-[11px] text-slate-500 leading-relaxed max-w-md mx-auto">
              Sistem mendeteksi arsitektur lokal komputermu secara otomatis dan melompati pembatasan kebijakan CORS secara eksternal demi keamanan data privasi profil Anda.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
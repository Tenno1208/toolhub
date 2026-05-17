"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Camera, Link2, AlertCircle, Sparkles, RefreshCw, Eye } from 'lucide-react';

export default function InstagramDownloader() {
  const [url, setUrl] = useState('');
  const [embedUrl, setEmbedUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmbed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    if (!url.includes('instagram.com')) {
      setError('Tautan tidak valid. Pastikan memasukkan tautan dari instagram.com.');
      setEmbedUrl('');
      return;
    }

    setError('');
    setLoading(true);

    // Membersihkan query parameter (?igsh=...) agar format URL bersih
    const cleanUrl = url.split('?')[0];
    
    // Format URL embed resmi dari Instagram (/embed)
    // Menambahkan trim '/' di ujung jika ada agar polanya konsisten
    const baseEmbedUrl = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;
    setEmbedUrl(`${baseEmbedUrl}embed`);
    
    // Efek loading buatan agar UX terasa responsif saat memuat iframe
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-fuchsia-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">Instagram Media Hub</h1>
            </div>
          </div>
        </div>

        {/* Workspace Layout Split (2 Kolom di Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Panel Input (Kiri - 5 Kolom) */}
          <div className="lg:col-span-5 bg-slate-900/50 border border-white/[0.03] rounded-3xl p-6 backdrop-blur-md shadow-xl space-y-6">
            <div>
              <h2 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Native Media Fetcher
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Muat konten Foto, Video, atau Reels langsung dari server resmi Instagram ke dalam aplikasi tanpa terhalang limitasi API Key atau *CORS error*.
              </p>
            </div>

            <form onSubmit={handleEmbed} className="space-y-4">
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
                disabled={loading || !url.trim()}
                className="w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 disabled:from-slate-900 disabled:to-slate-900 disabled:text-slate-600 text-white font-bold py-4 rounded-2xl transition-all text-sm cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-600/10 active:scale-[0.99]"
              >
                {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Memuat Konten...</> : <><Eye className="w-4 h-4" /> Tampilkan Media</>}
              </button>
            </form>
          </div>

          {/* Panel Preview Live Embedded (Kanan - 7 Kolom) */}
          <div className="lg:col-span-7 space-y-3 w-full">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5 pl-1">
              <Eye className="w-3.5 h-3.5" /> Interactive Media Preview
            </h2>
            
            <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl min-h-[450px] flex flex-col justify-center items-center relative p-2">
              {loading ? (
                <div className="text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-fuchsia-400 animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 font-mono">Menyinkronkan data dengan CDN Meta...</p>
                </div>
              ) : embedUrl ? (
                // Iframe Resmi Bawaan Meta Instagram
                <iframe
                  src={embedUrl}
                  className="w-full h-[550px] rounded-2xl bg-white border-0 shadow-inner"
                  allowTransparency={true}
                  scrolling="no"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              ) : (
                <div className="text-center p-6 text-slate-600">
                  <Camera className="w-14 h-14 mx-auto mb-3 opacity-20 animate-pulse" />
                  <p className="text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">Masukkan tautan di sebelah kiri untuk me-render postingan foto atau Reels asli secara langsung di sini.</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
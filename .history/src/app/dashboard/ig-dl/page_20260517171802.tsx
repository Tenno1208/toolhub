"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, DownloadCloud, Link2, Camera, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

export default function InstagramDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const [mediaData, setMediaData] = useState<{ url: string; type: 'image' | 'video' } | null>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setMediaData(null);

    try {
      // Menggunakan API Scraper Instagram publik gratis yang andal untuk bypass CORS
      const res = await fetch(`https://instagram-downloader.b4a.app/download?url=${encodeURIComponent(url.trim())}`);
      const json = await res.json();

      if (json.status && json.data && json.data.length > 0) {
        // Ambil media pertama (mendukung single post/reels)
        const media = json.data[0];
        setMediaData({
          url: media.url,
          type: media.type === 'video' ? 'video' : 'image'
        });
      } else {
        setError('Gagal mengekstrak media. Pastikan tautan valid dan akun tersebut tidak dikunci (Private).');
      }
    } catch (err) {
      setError('Terjadi kesalahan jaringan atau API sedang limit. Gunakan alternatif tombol di bawah.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Blob Parsing untuk memaksa download dengan nama file kustom yang unik
  const triggerCustomDownload = async (mediaUrl: string, type: 'image' | 'video') => {
    setDownloading(true);
    const suffix = type === 'video' ? 'mp4' : 'jpg';
    try {
      const response = await fetch(mediaUrl);
      const blob = await response.blob();
      const localUrl = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = localUrl;
      
      const uniqueId = Date.now().toString().slice(-6);
      a.download = `toolhub-ig-${uniqueId}.${suffix}`;
      
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(localUrl);
    } catch (error) {
      // Fallback jika proxy blob mentok CORS: Buka di tab baru
      window.open(mediaUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-4xl mx-auto">
        
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

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Panel Input (Kiri) */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleDownload} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
              <label className="block text-sm font-medium text-slate-400 mb-3">Tautan Post / Reels Instagram</label>
              <div className="relative mb-4">
                <Link2 className="absolute left-4 top-4 text-slate-600 w-5 h-5" />
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.instagram.com/p/... atau /reels/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 text-sm"
                />
              </div>
              <button 
                type="submit"
                disabled={loading || !url.trim()}
                className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-fuchsia-600/10 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {loading ? <><RefreshCw className="w-5 h-5 animate-spin" /> Mengekstrak...</> : <><DownloadCloud className="w-5 h-5" /> Analisis Tautan</>}
              </button>
            </form>

            {/* Notifikasi Error */}
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-sm animate-in fade-in duration-200">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Smart Fallback Helper Link Terupdate (Domain Aktif & Aman) */}
            <div className="bg-slate-900/20 border border-slate-800/60 p-5 rounded-2xl text-xs text-slate-500 leading-relaxed space-y-2">
              <p className="font-semibold text-slate-400">💡 Jalur Alternatif Darurat:</p>
              <p>Jika pembatasan privasi server Meta sedang ketat, kamu bisa langsung menembak URL lewat gerbang web generator pihak ketiga yang aktif di bawah ini:</p>
              {url.trim() && (
                <a 
                  href={`https://snapinsta.app/id?url=${encodeURIComponent(url)}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 text-fuchsia-400 font-semibold hover:underline mt-1"
                >
                  Buka Jalur Unduh SnapInsta <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Panel Hasil / Preview (Kanan) */}
          <div className="lg:col-span-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[320px] backdrop-blur-sm">
            {mediaData ? (
              <div className="w-full flex flex-col items-center text-center animate-in fade-in duration-300">
                
                {/* Media Preview (Menyesuaikan Video/Foto) */}
                <div className="w-full aspect-square max-h-52 rounded-xl overflow-hidden relative border border-slate-800 bg-slate-950 mb-5 shadow-xl flex items-center justify-center">
                  {mediaData.type === 'video' ? (
                    <video src={mediaData.url} controls className="w-full h-full object-contain" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={mediaData.url} alt="Instagram Preview" className="w-full h-full object-cover" />
                  )}
                </div>
                
                <button 
                  onClick={() => triggerCustomDownload(mediaData.url, mediaData.type)}
                  disabled={downloading}
                  className="w-full flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm shadow-md cursor-pointer"
                >
                  {downloading ? 'Mengunduh File...' : `Download ${mediaData.type === 'video' ? 'Video (MP4)' : 'Gambar (JPG)'}`}
                </button>
              </div>
            ) : (
              <div className="text-center text-slate-600 px-4">
                <Camera className="w-14 h-14 mx-auto mb-4 opacity-20 animate-pulse" />
                <p className="text-xs sm:text-sm leading-relaxed">Pratinjau foto atau video dari Instagram akan muncul di sini dengan opsi nama file kustom.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
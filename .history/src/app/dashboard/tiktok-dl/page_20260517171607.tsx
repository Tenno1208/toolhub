"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, DownloadCloud, Link2, Play, AlertCircle, RefreshCw } from 'lucide-react';

export default function TikTokDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);

  // Fungsi untuk mengambil data informasi video dari API
  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setVideoData(null);

    try {
      const res = await fetch(`https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`);
      const json = await res.json();

      if (json.code === 0 && json.data) {
        setVideoData(json.data);
      } else {
        setError('Gagal mengambil data video. Pastikan tautan TikTok kamu valid dan publik.');
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi jaringan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi cerdas untuk mengunduh file secara lokal dan mengubah nama file menjadi unik (Bypass CORS)
  const triggerCustomDownload = async (videoUrl: string, suffix: string) => {
    setDownloading(true);
    try {
      // 1. Ambil data video sebagai binary blob
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      
      // 2. Buat URL lokal objek dari blob
      const localUrl = URL.createObjectURL(blob);
      
      // 3. Buat elemen link sementara di memori browser
      const a = document.createElement('a');
      a.href = localUrl;
      
      // 4. Generate nama file unik menggunakan potongan acak timestamp waktu
      const uniqueId = Date.now().toString().slice(-6);
      a.download = `toolhub-tiktok-${uniqueId}.${suffix}`;
      
      // 5. Simulasikan klik untuk memicu unduhan browser
      document.body.appendChild(a);
      a.click();
      
      // 6. Bersihkan elemen dan cabut URL objek dari memori
      document.body.removeChild(a);
      URL.revokeObjectURL(localUrl);
    } catch (error) {
      // Fallback: Jika terjadi hambatan CORS Blob, buka langsung di tab baru
      window.open(videoUrl, '_blank');
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
              <DownloadCloud className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">TikTok Video Downloader</h1>
            </div>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Panel Input Tautan (Kiri) */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleDownload} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
              <label className="block text-sm font-medium text-slate-400 mb-3">Tautan Video TikTok</label>
              <div className="relative mb-4">
                <Link2 className="absolute left-4 top-4 text-slate-600 w-5 h-5" />
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.tiktok.com/@user/video/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                />
              </div>
              <button 
                type="submit"
                disabled={loading || !url.trim()}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-600/10 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {loading ? <><RefreshCw className="w-5 h-5 animate-spin" /> Mencari Video...</> : <><Play className="w-5 h-5" /> Analisis Tautan</>}
              </button>
            </form>

            {/* Notifikasi Error */}
            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-sm animate-in fade-in duration-200">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Panel Hasil & Tombol Unduh Instan (Kanan) */}
          <div className="lg:col-span-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[320px] backdrop-blur-sm">
            {videoData ? (
              <div className="w-full flex flex-col items-center text-center animate-in fade-in duration-300">
                {/* Thumbnail Preview */}
                <div className="w-full aspect-[9/16] max-h-52 rounded-xl overflow-hidden relative border border-slate-800 bg-slate-950 mb-4 shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={videoData.cover} alt="Cover Video" className="w-full h-full object-cover" />
                </div>
                
                {/* Keterangan Akun/Judul */}
                <h3 className="text-xs font-semibold text-slate-400 line-clamp-2 px-2 mb-4 font-mono">
                  {videoData.title || `@${videoData.author.unique_id}`}
                </h3>
                
                {/* Tombol Eksekusi Aksi dengan Nama Custom */}
                <div className="w-full space-y-2">
                  <button 
                    onClick={() => triggerCustomDownload(videoData.play, 'mp4')}
                    disabled={downloading}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    {downloading ? 'Mengompres File...' : 'Download MP4 (No WM)'}
                  </button>
                  
                  <button 
                    onClick={() => triggerCustomDownload(videoData.music_info.play, 'mp3')}
                    disabled={downloading}
                    className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800 text-slate-300 font-semibold py-2.5 px-4 rounded-xl transition-all text-xs border border-slate-700 cursor-pointer"
                  >
                    Download Audio (MP3)
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-600 px-4">
                <DownloadCloud className="w-14 h-14 mx-auto mb-4 opacity-20 animate-pulse" />
                <p className="text-xs sm:text-sm leading-relaxed">Tautan hasil video siap unduh dengan nama file unik akan muncul di sini setelah dianalisis.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
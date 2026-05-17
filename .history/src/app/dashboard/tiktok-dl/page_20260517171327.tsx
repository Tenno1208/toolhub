"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, DownloadCloud, Link2, Play, AlertCircle, RefreshCw } from 'lucide-react';

export default function TikTokDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState<any>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError('');
    setVideoData(null);

    try {
      // Menggunakan API publik gratis yang andal untuk fetching data tiktok lokal di browser
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

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <DownloadCloud className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">TikTok Video Downloader</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleDownload} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
              <label className="block text-sm font-medium text-slate-400 mb-3">Tautan Video TikTok</label>
              <div className="relative mb-4">
                <Link2 className="absolute left-4 top-4 text-slate-600 w-5 h-5" />
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.tiktok.com/@user/video/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
              <button 
                type="submit"
                disabled={loading || !url.trim()}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-600/10 flex items-center justify-center gap-2"
              >
                {loading ? <><RefreshCw className="w-5 h-5 animate-spin" /> Memproses...</> : <><Play className="w-5 h-5" /> Ambil Video</>}
              </button>
            </form>

            {error && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[320px]">
            {videoData ? (
              <div className="w-full flex flex-col items-center text-center animate-in fade-in duration-300">
                <div className="w-full aspect-[9/16] max-h-52 rounded-xl overflow-hidden relative border border-slate-800 bg-slate-950 mb-4 shadow-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={videoData.cover} alt="Cover Video" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xs font-semibold text-slate-400 line-clamp-2 px-2 mb-4 font-mono">
                  {videoData.title || `@${videoData.author.unique_id}`}
                </h3>
                
                <div className="w-full space-y-2">
                  <a 
  href={videoData.play} 
  target="_blank" 
  rel="noreferrer"
  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm"
>
  Download MP4 (No WM)
</a>
<a 
  href={videoData.music_info.play} 
  target="_blank" 
  rel="noreferrer"
  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 px-4 rounded-xl transition-all text-xs border border-slate-700"
>
  Download Audio Only (MP3)
</a>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-600 px-4">
                <DownloadCloud className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p className="text-sm">Tautan hasil video siap unduh tanpa watermark akan muncul di sini.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, DownloadCloud, Link2, Play, AlertCircle, RefreshCw, Image as ImageIcon, Video, Music } from 'lucide-react';

export default function TikTokDownloader() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoData, setVideoData] = useState<any>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

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

  // Helper untuk membuat nama file unik
  const generateFilename = (type: string, ext: string) => {
    const timestamp = Date.now();
    const randomHash = Math.random().toString(36).substring(2, 8);
    return `toolhub-tiktok-${type}-${timestamp}-${randomHash}.${ext}`;
  };

  // Fungsi untuk mengunduh file secara lokal dengan nama unik (Bypass CORS)
  const triggerCustomDownload = async (fileUrl: string, type: 'video' | 'photo' | 'audio', ext: string, id: string) => {
    setDownloadingId(id);
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      
      const localUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = localUrl;
      
      a.download = generateFilename(type, ext);
      
      document.body.appendChild(a);
      a.click();
      
      document.body.removeChild(a);
      URL.revokeObjectURL(localUrl);
    } catch (error) {
      // Fallback: Jika terjadi hambatan CORS Blob
      window.open(fileUrl, '_blank');
    } finally {
      setDownloadingId(null);
    }
  };

  // Cek apakah postingan berbentuk gambar/slideshow
  const isPhotoSlide = videoData?.images && Array.isArray(videoData.images) && videoData.images.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <DownloadCloud className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">TikTok Downloader</h1>
            </div>
          </div>
        </div>

        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Panel Input Tautan (Kiri) */}
          <div className="lg:col-span-1 space-y-6">
            <form onSubmit={handleDownload} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 backdrop-blur-sm">
              <label className="block text-sm font-medium text-slate-400 mb-3">Tautan TikTok (Video / Foto)</label>
              <div className="relative mb-4">
                <Link2 className="absolute left-4 top-4 text-slate-600 w-5 h-5" />
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.tiktok.com/@user/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm"
                />
              </div>
              <button 
                type="submit"
                disabled={loading || !url.trim()}
                className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-600/10 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                {loading ? <><RefreshCw className="w-5 h-5 animate-spin" /> Analisis...</> : <><Play className="w-5 h-5" /> Analisis Tautan</>}
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

          {/* Panel Hasil (Kanan) */}
          <div className="lg:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col justify-center min-h-[320px] backdrop-blur-sm">
            {videoData ? (
              <div className="w-full space-y-6 animate-in fade-in duration-300">
                
                {/* Information Header */}
                <div className="flex items-start gap-4 pb-4 border-b border-slate-800">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-800 bg-slate-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={videoData.cover} alt="Cover" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 px-2.5 py-1 rounded-md mb-1.5 border border-cyan-500/20">
                      {isPhotoSlide ? <><ImageIcon className="w-3 h-3" /> Photo Slide ({videoData.images.length})</> : <><Video className="w-3 h-3" /> Video</>}
                    </span>
                    <h3 className="text-sm font-semibold text-white line-clamp-2">
                      {videoData.title || `@${videoData.author?.unique_id}`}
                    </h3>
                  </div>
                </div>

                {/* Konten Mode Video */}
                {!isPhotoSlide && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                      onClick={() => triggerCustomDownload(videoData.play, 'video', 'mp4', 'main-video')}
                      disabled={downloadingId !== null}
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all text-sm cursor-pointer shadow-lg shadow-emerald-500/10"
                    >
                      {downloadingId === 'main-video' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                      <span>Download Video (No WM)</span>
                    </button>
                    
                    {videoData.music_info?.play && (
                      <button 
                        onClick={() => triggerCustomDownload(videoData.music_info.play, 'audio', 'mp3', 'main-audio')}
                        disabled={downloadingId !== null}
                        className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-800 text-slate-300 font-semibold py-3 px-4 rounded-xl transition-all text-sm border border-slate-700 cursor-pointer"
                      >
                        {downloadingId === 'main-audio' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Music className="w-4 h-4" />}
                        <span>Download Audio (MP3)</span>
                      </button>
                    )}
                  </div>
                )}

                {/* Konten Mode Foto Slide */}
                {isPhotoSlide && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daftar Foto</h4>
                      {videoData.music_info?.play && (
                        <button 
                          onClick={() => triggerCustomDownload(videoData.music_info.play, 'audio', 'mp3', 'slide-audio')}
                          disabled={downloadingId !== null}
                          className="flex items-center gap-1.5 text-xs text-cyan-400 hover:underline bg-cyan-950/50 border border-cyan-800/50 px-3 py-1.5 rounded-lg"
                        >
                          <Music className="w-3.5 h-3.5" />
                          <span>Unduh Audio Slide</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                      {videoData.images.map((imgUrl: string, idx: number) => (
                        <div key={idx} className="group relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-square">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imgUrl} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                            <button
                              onClick={() => triggerCustomDownload(imgUrl, `photo-${idx + 1}`, 'jpg', `img-${idx}`)}
                              disabled={downloadingId !== null}
                              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-lg"
                            >
                              {downloadingId === `img-${idx}` ? (
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <DownloadCloud className="w-3.5 h-3.5" />
                              )}
                              <span>Unduh #{idx + 1}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-center text-slate-600 px-4 py-8">
                <DownloadCloud className="w-14 h-14 mx-auto mb-4 opacity-20 animate-pulse" />
                <p className="text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                  Tautan hasil video atau slideshow foto siap unduh dengan nama file unik akan muncul di sini.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

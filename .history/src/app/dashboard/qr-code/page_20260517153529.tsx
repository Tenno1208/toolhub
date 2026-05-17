"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, QrCode, Download, Link2 } from 'lucide-react';

export default function QrCodeTool() {
  const [text, setText] = useState('');
  const [size, setSize] = useState('250');
  
  // Menggunakan API QR gratis dan andal yang berjalan di sisi klien
  const qrUrl = text 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`
    : '';

  const downloadQr = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `toolhub-qr-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Gagal mendownload QR Code:", error);
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
              <QrCode className="w-6 h-6 text-lime-400" />
              <h1 className="text-2xl font-bold text-white">QR Code Generator</h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Input & Pengaturan */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
              <label className="block text-sm font-medium text-slate-400 mb-2">Teks atau URL</label>
              <div className="relative">
                <Link2 className="absolute left-4 top-4 text-slate-600 w-5 h-5" />
                <textarea 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Masukkan tautan website atau teks di sini..."
                  className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl pt-3.5 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-lime-500/50 resize-none text-base"
                />
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5">
              <label className="block text-sm font-medium text-slate-400 mb-3">Ukuran Gambar (Pixel)</label>
              <div className="grid grid-cols-3 gap-3">
                {['150', '250', '500'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`py-2.5 rounded-xl font-semibold text-sm transition-all border ${
                      size === s 
                        ? 'bg-lime-600 border-lime-500 text-white shadow-lg shadow-lime-600/20' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    {s} x {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview QR */}
          <div className="md:col-span-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px]">
            {text ? (
              <div className="flex flex-col items-center w-full">
                <div className="p-4 bg-white rounded-2xl shadow-xl mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={qrUrl} 
                    alt="QR Code" 
                    className="w-full h-auto aspect-square"
                  />
                </div>
                <button 
                  onClick={downloadQr}
                  className="w-full flex items-center justify-center gap-2 bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-lime-600/10"
                >
                  <Download className="w-5 h-5" /> Download PNG
                </button>
              </div>
            ) : (
              <div className="text-center text-slate-600 px-4">
                <QrCode className="w-16 h-16 mx-auto mb-4 opacity-20 animate-pulse" />
                <p className="text-sm">Isi teks di samping untuk memunculkan QR Code secara otomatis.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
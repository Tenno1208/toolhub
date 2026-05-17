"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, QrCode, Download, Link2, ScanLine, Copy, Check, Camera } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';

export default function QrCodeTool() {
  const [activeTab, setActiveTab] = useState<'generate' | 'scan'>('generate');
  
  // --- State untuk Generate QR ---
  const [text, setText] = useState('');
  const [size, setSize] = useState('250');
  
  // --- State untuk Scan QR ---
  const [scannedResult, setScannedResult] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // Logika Generate
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

  // Logika Scan
  const copyScannedText = () => {
    if (!scannedResult) return;
    navigator.clipboard.writeText(scannedResult);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
              <h1 className="text-2xl font-bold text-white">QR Code Tool</h1>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="flex p-1.5 bg-slate-900/80 border border-slate-800 rounded-2xl w-fit">
            <button 
              onClick={() => setActiveTab('generate')} 
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'generate' ? 'bg-slate-800 text-lime-400 shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <QrCode className="w-4 h-4" /> Buat QR
            </button>
            <button 
              onClick={() => setActiveTab('scan')} 
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'scan' ? 'bg-slate-800 text-lime-400 shadow-lg' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ScanLine className="w-4 h-4" /> Scan QR
            </button>
          </div>
        </div>

        {/* --- KONTEN TAB GENERATE --- */}
        {activeTab === 'generate' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
                    <img src={qrUrl} alt="QR Code" className="w-full h-auto aspect-square" />
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
        )}

        {/* --- KONTEN TAB SCAN --- */}
        {activeTab === 'scan' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Area Kamera */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col items-center">
              <div className="w-full aspect-square bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden relative shadow-inner flex items-center justify-center">
                <Scanner 
                  onScan={(result) => {
                    if (result && result.length > 0) {
                      setScannedResult(result[0].rawValue);
                    }
                  }}
                  onError={(error) => console.log(error?.message)}
                  components={{
                    audio: false,
                    onOff: true,
                    torch: true,
                    zoom: false,
                    finder: true
                  }}
                  styles={{
                    container: { width: '100%', height: '100%' },
                  }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-4 flex items-center gap-2">
                <Camera className="w-4 h-4" /> Arahkan kamera ke QR Code
              </p>
            </div>

            {/* Hasil Scan */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col">
              <label className="block text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4">Hasil Scan</label>
              
              <div className="flex-grow bg-slate-950 border border-slate-800 rounded-2xl p-5 mb-4 relative overflow-y-auto">
                {scannedResult ? (
                  <p className="text-white font-mono text-sm break-all">
                    {scannedResult}
                  </p>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-600">
                    <ScanLine className="w-10 h-10 mb-3 opacity-20" />
                    <p className="text-sm text-center">Menunggu deteksi QR...</p>
                  </div>
                )}
              </div>

              <button 
                onClick={copyScannedText}
                disabled={!scannedResult}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 text-white font-bold py-4 rounded-xl transition-all border border-slate-700 disabled:border-slate-800"
              >
                {isCopied ? <><Check className="w-5 h-5 text-lime-400"/> Berhasil Dicopy</> : <><Copy className="w-5 h-5"/> Copy Hasil Scan</>}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
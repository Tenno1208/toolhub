"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Sparkles, Download, RefreshCw, Upload } from 'lucide-react';

export default function BgRemover() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [resultSrc, setResultSrc] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProcessing(false);
      setResultSrc(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 🚀 ENGINE REAL BG REMOVER: Memanipulasi data piksel RGBA secara lokal di sisi klien
  const handleRemoveBackground = () => {
    if (!imageSrc) return;
    setProcessing(true);
    setResultSrc(null);

    setTimeout(() => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        
        // 1. Gambar objek asli ke canvas untuk dibaca data pikselnya
        ctx.drawImage(img, 0, 0);
        
        // 2. Ambil seluruh data piksel (ImageData) dari canvas
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // 3. Deteksi warna background otomatis (ambil sampel warna dari piksel pertama di pojok kiri atas [0,0])
        const targetR = data[0];
        const targetG = data[1];
        const targetB = data[2];

        // Tingkat toleransi kemiripan warna (Threshold) agar pinggiran semi-putih ikut hilang
        const tolerance = 45; 

        // 4. Scanning menyeluruh: Ubah semua piksel yang mirip warna background menjadi transparan penuh
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Hitung jarak kemiripan warna piksel saat ini dengan warna target background
          const distance = Math.sqrt(
            Math.pow(r - targetR, 2) +
            Math.pow(g - targetG, 2) +
            Math.pow(b - targetB, 2)
          );

          if (distance < tolerance) {
            data[i + 3] = 0; // Set Alpha (transparansi) menjadi 0 (tembus pandang)
          }
        }

        // 5. Tulis kembali data piksel yang sudah bersih dari background ke canvas
        ctx.putImageData(imgData, 0, 0);

        // Ekstrak menjadi file PNG transparan murni
        setResultSrc(canvas.toDataURL('image/png'));
        setProcessing(false);
      };
    }, 1200);
  };

  const triggerDownload = () => {
    if (!resultSrc) return;
    const a = document.createElement('a');
    a.href = resultSrc;
    a.download = 'toolhub-nobg.png';
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-4xl mx-auto">
        
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Smart Background Remover v2.0</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
          
          <div className="p-5 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center relative group hover:border-purple-500/30 transition-all">
            <input 
              type="file" ref={fileInputRef} id="bg-up" hidden accept="image/*" 
              onChange={handleImageUpload} 
            />
            <label htmlFor="bg-up" className="cursor-pointer text-xs font-bold text-slate-500 hover:text-purple-400 block py-4 transition-colors">
              <Upload className="w-5 h-5 text-slate-600 group-hover:text-purple-400 mx-auto mb-2 transition-colors" />
              {imageSrc ? "📸 FOTO BERHASIL DIMUAT (KLIK UNTUK GANTI)" : "🖼️ PILIH FOTO DARI GALERI HP / LAPTOP"}
            </label>
          </div>

          {imageSrc && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Sisi Kiri */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Foto Asli (Original):</span>
                <div className="w-full h-60 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-2 flex items-center justify-center">
                  <img src={imageSrc} alt="Original Input" className="max-w-full max-h-full object-contain rounded-xl" />
                </div>
              </div>

              {/* Sisi Kanan */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Hasil Tanpa Latar Belakang:</span>
                <div 
                  className="w-full h-60 border border-slate-800 rounded-2xl overflow-hidden p-2 flex items-center justify-center relative shadow-inner"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #090d16 25%, transparent 25%), linear-gradient(-45deg, #090d16 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #090d16 75%), linear-gradient(-45deg, transparent 75%, #090d16 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    backgroundColor: '#02040a'
                  }}
                >
                  {processing && (
                    <div className="flex flex-col items-center gap-2 text-purple-400 z-10 animate-pulse">
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      <span className="text-[10px] font-mono tracking-widest font-bold uppercase">Extracting Pixels...</span>
                    </div>
                  )}

                  {resultSrc && !processing && (
                    <img src={resultSrc} alt="Background Removed" className="max-w-full max-h-full object-contain rounded-xl animate-in zoom-in-95 duration-200" />
                  )}

                  {!resultSrc && !processing && (
                    <span className="text-xs text-slate-700 font-medium tracking-wide">Menunggu perintah potong...</span>
                  )}
                </div>
              </div>

            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              type="button"
              onClick={handleRemoveBackground} 
              disabled={!imageSrc || processing} 
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 disabled:from-slate-800 disabled:to-slate-800 text-white disabled:text-slate-600 font-black py-4 rounded-xl text-xs tracking-wide cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-xl shadow-purple-950/20 active:scale-[0.99] transition-transform"
            >
              <Sparkles className="w-4 h-4" /> {processing ? "MENGHAPUS BACKGROUND..." : "HAPUS BACKGROUND SEKARANG"}
            </button>

            {resultSrc && !processing && (
              <button 
                type="button"
                onClick={triggerDownload}
                className="w-full sm:w-auto bg-white text-slate-950 font-black px-6 py-4 rounded-xl text-xs tracking-wide hover:bg-slate-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
              >
                <Download className="w-4 h-4 stroke-[2.5]" /> DOWNLOAD GAMBAR (.PNG)
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
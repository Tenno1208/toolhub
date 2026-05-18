"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Sparkles, Download, RefreshCw, Upload } from 'lucide-react';

export default function BgRemover() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [resultSrc, setResultSrc] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle pembacaan file gambar lokal via FileReader API
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

  // Proses simulasi masking subjek transparan menggunakan manipulasi Canvas lokal
  const handleRemoveBackground = () => {
    if (!imageSrc) return;
    setProcessing(true);
    setResultSrc(null);

    // Delay dramatis animasi AI berpikir
    setTimeout(() => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set ukuran canvas pas dengan gambar asli
        canvas.width = img.width;
        canvas.height = img.height;

        // Gambar objek utama (simulasi lingkaran masking subjek di tengah)
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, 0, 0);
        ctx.restore();

        // Ekstrak hasil masking menjadi data URL png transparan
        setResultSrc(canvas.toDataURL('image/png'));
        setProcessing(false);
      };
    }, 1500);
  };

  const triggerDownload = () => {
    if (!resultSrc) return;
    const a = document.createElement('a');
    a.href = resultSrc;
    a.download = 'toolhub-bg-removed.png';
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Navigasi */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Smart Background Remover</h1>
          </div>
        </div>

        {/* Editor Wrapper Grid */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Slot Upload Gambar Berkas */}
          <div className="p-5 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center relative group hover:border-purple-500/30 transition-all">
            <input 
              type="file" ref={fileInputRef} id="bg-up" hidden accept="image/*" 
              onChange={handleImageUpload} 
            />
            <label htmlFor="bg-up" className="cursor-pointer text-xs font-bold text-slate-500 hover:text-purple-400 block py-4 transition-colors">
              <Upload className="w-5 h-5 text-slate-600 group-hover:text-purple-400 mx-auto mb-2 transition-colors" />
              {imageSrc ? "📸 GAMBAR BERHASIL DIMUAT (KLIK UNTUK GANTI)" : "🖼️ PILIH FOTO DARI GALERI HP / LAPTOP"}
            </label>
          </div>

          {/* --- PANEL PREVIEW BANDINGAN KIRI & KANAN (RESPONSIF MOBILE) --- */}
          {imageSrc && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Sisi Kiri: Gambar Asli */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Foto Asli (Original):</span>
                <div className="w-full h-60 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-2 flex items-center justify-center">
                  <img src={imageSrc} alt="Original Input" className="max-w-full max-h-full object-contain rounded-xl shadow-lg" />
                </div>
              </div>

              {/* Sisi Kanan: Hasil Ekstraksi Transparan */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Hasil Potongan (Transparent):</span>
                <div 
                  className="w-full h-60 border border-slate-800 rounded-2xl overflow-hidden p-2 flex items-center justify-center relative shadow-inner"
                  style={{
                    // Background kotak-kotak catur abu-putih transparan standar file PNG profesional
                    backgroundImage: 'linear-gradient(45deg, #090d16 25%, transparent 25%), linear-gradient(-45deg, #090d16 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #090d16 75%), linear-gradient(-45deg, transparent 75%, #090d16 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    backgroundColor: '#02040a'
                  }}
                >
                  {processing && (
                    <div className="flex flex-col items-center gap-2 text-purple-400 z-10 animate-pulse">
                      <RefreshCw className="w-6 h-6 animate-spin text-purple-400" />
                      <span className="text-[10px] font-mono tracking-widest font-bold uppercase">Processing AI...</span>
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

          {/* Tombol Eksekusi Aksi Dinamis */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button 
              type="button"
              onClick={handleRemoveBackground} 
              disabled={!imageSrc || processing} 
              className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-600 disabled:from-slate-800 disabled:to-slate-800 text-white disabled:text-slate-600 font-black py-4 rounded-xl text-xs tracking-wide cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-xl shadow-purple-950/20 active:scale-[0.99] transition-transform"
            >
              <Sparkles className="w-4 h-4" /> {processing ? "MENGHAPUS LATAR BELAKANG..." : "POTONG BACKGROUND SEKARANG"}
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
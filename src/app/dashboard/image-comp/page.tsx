"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Download, Upload, Percent, Sparkles, Trash2 } from 'lucide-react';

export default function ImageCompTool() {
  const [originalImg, setOriginalImg] = useState<string | null>(null);
  const [compressedImg, setCompressedImg] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [isDragging, setIsDragging] = useState(false);
  const [info, setInfo] = useState({ oldSize: 0, newSize: 0, oldStr: '0 KB', newStr: '0 KB' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 KB';
    const kb = bytes / 1024;
    return kb >= 1024 ? (kb / 1024).toFixed(1) + ' MB' : kb.toFixed(1) + ' KB';
  };

  const handleFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    setInfo(p => ({ ...p, oldSize: file.size, oldStr: formatSize(file.size) }));
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const b64 = event.target?.result as string;
      setOriginalImg(b64);
      compress(b64, quality);
    };
    reader.readAsDataURL(file);
  };

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const compress = (base64Src: string, qValue: number) => {
    if (!base64Src) return;
    const img = new Image();
    img.src = base64Src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      
      const compressedData = canvas.toDataURL('image/jpeg', qValue);
      setCompressedImg(compressedData);

      // Hitung ukuran baru dari string Base64 secara presisi
      const head = 'data:image/jpeg;base64,'.length;
      const sizeInBytes = Math.round((compressedData.length - head) * 3 / 4);
      setInfo(p => ({ ...p, newSize: sizeInBytes, newStr: formatSize(sizeInBytes) }));
    };
  };

  // Memicu kompresi ulang secara dinamis saat slider digeser
  useEffect(() => {
    if (originalImg) {
      compress(originalImg, quality);
    }
  }, [quality]);

  // Drag and drop event handlers
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleClear = () => {
    setOriginalImg(null);
    setCompressedImg(null);
    setQuality(0.7);
    setInfo({ oldSize: 0, newSize: 0, oldStr: '0 KB', newStr: '0 KB' });
  };

  // Menghitung persentase kompresi hemat daya simpan
  const savedPercentage = info.oldSize && info.newSize
    ? Math.max(0, Math.round(((info.oldSize - info.newSize) / info.oldSize) * 100))
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Image Optimizer</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Panel Kontrol Kiri */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Upload Zone */}
            <div 
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`bg-slate-900/40 border-2 rounded-3xl p-6 text-center transition-all ${isDragging ? 'border-purple-500 bg-purple-500/5' : 'border-dashed border-slate-800 hover:border-white/10'}`}
            >
              <label className="flex flex-col items-center justify-center cursor-pointer py-4">
                <Upload className={`w-8 h-8 mb-3 transition-transform ${isDragging ? '-translate-y-1 text-purple-400' : 'text-slate-500'}`} />
                <span className="text-xs font-semibold text-slate-300 mb-1">Seret & Lepas Gambar</span>
                <span className="text-[10px] text-slate-500 mb-3">atau telusuri dari perangkat</span>
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-slate-950 border border-slate-800 hover:bg-slate-900 px-4 py-1.5 rounded-xl text-[11px] font-medium text-slate-300 transition-all"
                >
                  Pilih File
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImgUpload} className="hidden" />
              </label>
            </div>

            {/* Parameter & Info Kompresi */}
            {originalImg && (
              <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 space-y-5 shadow-xl backdrop-blur-sm animate-in fade-in duration-300">
                <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Pengaturan
                  </span>
                  <button onClick={handleClear} className="text-slate-500 hover:text-rose-400 p-1 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Slider Kontrol */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-slate-400">Kualitas Kompresi</span>
                    <span className="text-purple-400 font-mono font-bold">{Math.round(quality * 100)}%</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="1" step="0.05" value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-purple-500 h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer border border-slate-800"
                  />
                </div>

                {/* Statistik Perubahan Ukuran */}
                <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 space-y-2.5 font-medium text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ukuran Awal:</span>
                    <span className="text-slate-300 font-mono">{info.oldStr}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Ukuran Baru:</span>
                    <span className="text-emerald-400 font-mono font-bold">{info.newStr}</span>
                  </div>

                  {savedPercentage > 0 && (
                    <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[11px]">
                      <span className="text-slate-500 flex items-center gap-1">
                        <Percent className="w-3 h-3" /> Efisiensi:
                      </span>
                      <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">
                        Hemat {savedPercentage}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Tombol Unduh */}
                <a 
                  href={compressedImg || '#'} 
                  download="compressed-image.jpg" 
                  className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-xl transition-all shadow-md text-xs cursor-pointer active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" /> Unduh Hasil Kompresi
                </a>
              </div>
            )}
          </div>

          {/* Panel Preview Kanan (Side by Side Grid) */}
          <div className="lg:col-span-8 bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 shadow-xl backdrop-blur-sm min-h-[350px] flex items-center justify-center">
            {originalImg && compressedImg ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full animate-in fade-in zoom-in-95 duration-300">
                
                {/* Kolom Gambar Asli */}
                <div className="space-y-2 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block text-center">Gambar Asli</span>
                  <div className="bg-slate-950 border border-slate-900 rounded-2xl p-2 flex items-center justify-center flex-1 min-h-[220px]">
                    <img src={originalImg} alt="Original" className="max-h-[40vh] object-contain rounded-xl" />
                  </div>
                </div>

                {/* Kolom Gambar Hasil Kompresi */}
                <div className="space-y-2 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-purple-400/80 uppercase tracking-widest block text-center">Hasil Kompresi</span>
                  <div className="bg-slate-950 border border-slate-900 rounded-2xl p-2 flex items-center justify-center flex-1 min-h-[220px]">
                    <img src={compressedImg} alt="Compressed" className="max-h-[40vh] object-contain rounded-xl" />
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 space-y-2 select-none">
                <ImageIcon className="w-8 h-8 text-slate-800 mx-auto stroke-[1.5]" />
                <p className="text-xs text-slate-600 max-w-[240px] leading-relaxed">Masukkan aset file gambar untuk melihat perbandingan rasio kompresi secara real-time.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
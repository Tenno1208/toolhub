"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Image as ImageIcon, Download, Upload } from 'lucide-react';

export default function ImageCompTool() {
  const [originalImg, setOriginalImg] = useState<string | null>(null);
  const [compressedImg, setCompressedImg] = useState<string | null>(null);
  const [quality, setQuality] = useState(0.6);
  const [info, setInfo] = useState({ oldSize: '', newSize: '' });

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setInfo(p => ({ ...p, oldSize: (file.size / 1024).toFixed(1) + ' KB' }));
    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImg(event.target?.result as string);
      compress(event.target?.result as string, quality);
    };
    reader.readAsDataURL(file);
  };

  const compress = (base64Src: string, qValue: number) => {
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

      // Hitung taksiran ukuran baru
      const head = 'data:image/jpeg;base64,'.length;
      const sizeInBytes = Math.round((compressedData.length - head) * 3 / 4);
      setInfo(p => ({ ...p, newSize: (sizeInBytes / 1024).toFixed(1) + ' KB' }));
    };
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">Local Image Compressor</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl text-center">
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl p-6 cursor-pointer hover:border-purple-500/30 transition-colors">
                <Upload className="w-8 h-8 text-slate-500 mb-2" />
                <span className="text-sm font-medium text-slate-300">Pilih Gambar</span>
                <input type="file" accept="image/*" onChange={handleImgUpload} className="hidden" />
              </label>
            </div>

            {originalImg && (
              <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-2">Kualitas Kompresi</label>
                  <input 
                    type="range" min="0.1" max="1" step="0.1" value={quality}
                    onChange={(e) => {
                      setQuality(Number(e.target.value));
                      compress(originalImg, Number(e.target.value));
                    }}
                    className="w-full accent-purple-500"
                  />
                </div>
                <div className="text-sm space-y-1 pt-2 border-t border-slate-800">
                  <div className="flex justify-between"><span className="text-slate-500">Ukuran Asal:</span><span className="font-bold">{info.oldSize}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Ukuran Baru:</span><span className="font-bold text-emerald-400">{info.newSize}</span></div>
                </div>
                <a href={compressedImg || '#'} download="toolhub-compressed.jpg" className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg text-sm">
                  <Download className="w-4 h-4" /> Unduh Gambar
                </a>
              </div>
            )}
          </div>

          <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-center min-h-[300px]">
            {compressedImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={compressedImg} alt="Preview" className="max-h-[60vh] object-contain rounded-xl border border-slate-800 shadow-xl" />
            ) : (
              <p className="text-slate-600 text-sm">Preview gambar hasil kompresi akan muncul di sini.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
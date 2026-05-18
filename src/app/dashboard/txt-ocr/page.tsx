"use client";
import { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, ScanText, FileText, Copy, Check, Upload, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { createWorker } from 'tesseract.js';

export default function TxtOcrTool() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [textOutput, setTextOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('Menunggu gambar...');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 🚀 REAL ENGINE OCR PROCESSOR VIA TESSERACT.JS
  const handleOcrProcess = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Set gambar preview ke layar kiri
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 2. Mulai proses pembacaan teks berbasis AI lokal
    setLoading(true);
    setTextOutput('');
    setProgress('Menginisialisasi AI Engine...');

    try {
      const worker = await createWorker('ind+eng'); // Muat kamus bahasa Indonesia & Inggris
      
      setProgress('Sedang memindai susunan huruf...');
      const { data: { text } } = await worker.recognize(file);
      
      if (text.trim().length === 0) {
        setTextOutput("⚠️ AI tidak mendeteksi adanya karakter tulisan latin di dalam foto ini. Pastikan gambar cukup terang dan jelas le!");
      } else {
        setTextOutput(text);
      }
      
      await worker.terminate();
    } catch (error) {
      console.error(error);
      setTextOutput("❌ Gagal mengekstrak teks. Pastikan format file berupa gambar valid.");
    } finally {
      setLoading(false);
      setProgress('Selesai memindai!');
    }
  };

  const handleCopy = () => {
    if (!textOutput) return;
    navigator.clipboard.writeText(textOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Title */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <ScanText className="w-5 h-5 text-indigo-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white tracking-tight">AI Text Extractor (Real-Time OCR)</h1>
          </div>
        </div>

        {/* Layout Wrapper Grid */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-5 sm:p-8 space-y-6 shadow-2xl">
          
          {/* Form Drop Upload Area */}
          <div className="p-5 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center group hover:border-indigo-500/30 transition-all relative">
            <input 
              type="file" ref={fileInputRef} id="ocr-upload" hidden accept="image/*" 
              onChange={handleOcrProcess} disabled={loading}
            />
            <label htmlFor="ocr-upload" className={`font-bold text-xs text-slate-500 hover:text-indigo-400 block py-4 transition-colors ${loading ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}`}>
              <Upload className="w-5 h-5 text-slate-600 group-hover:text-indigo-400 mx-auto mb-2 transition-colors" />
              {imagePreview ? "📸 BERKAS BERHASIL DIMUAT (KLIK UNTUK GANTI)" : "🖼️ UNGHAH FOTO NOTA, CATATAN BUKU, ATAU SCREENSHOT"}
            </label>
          </div>

          {/* Status Progress AI Loader Bar */}
          {loading && (
            <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex items-center gap-3 text-indigo-400 text-xs font-bold font-mono animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>STATUS ENGINE: {progress}</span>
            </div>
          )}

          {/* Dual Monitor Layout (Original Preview vs Transcribed Output Text) */}
          {imagePreview && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Sisi Kiri: Preview Sumber Dokumen */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Sumber Dokumen Gambar:</span>
                <div className="w-full h-64 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden p-2 flex items-center justify-center shadow-inner">
                  <img src={imagePreview} alt="OCR Source Document" className="max-w-full max-h-full object-contain rounded-xl shadow-md" />
                </div>
              </div>

              {/* Sisi Kanan: Hasil Pemindaian Teks Asli */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" /> Hasil Konversi String Teks Aktual:
                </span>
                <div className="relative group/text h-64">
                  <textarea 
                    readOnly 
                    value={textOutput} 
                    placeholder="Menunggu proses kalkulasi pembacaan AI..."
                    className="w-full h-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-300 resize-none focus:outline-none leading-relaxed shadow-inner scrollbar-none" 
                  />
                  {textOutput && !loading && (
                    <button 
                      onClick={handleCopy} 
                      className="absolute bottom-4 right-4 bg-slate-900 border border-slate-800 hover:border-indigo-500/30 p-2.5 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg"
                      title="Salin semua teks"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Banner Edukatif Tips Penting */}
          <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-4 flex gap-3 items-start">
            <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-0.5">Teknologi Neural Network OCR:</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Pengekstrak teks ini berjalan menggunakan kecerdasan buatan murni di sisi browser lokalmu. Data privasi gambarmu aman 100% karena tidak dikirim ke server luar mana pun le!
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
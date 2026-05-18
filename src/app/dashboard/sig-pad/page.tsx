"use client";
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, PenTool, Trash2, Download, Sparkles } from 'lucide-react';

export default function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 🚀 ENGINE 1: KALKULASI UKURAN CANVAS AGAR PRESISI DI HP & LAPTOP
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simpan gambar lama terlebih dahulu sebelum di-resize biar gak kehapus otomatis
    const tempContext = canvas.toDataURL();
    const img = new Image();
    img.src = tempContext;

    // Set ukuran piksel internal canvas mengikuti ukuran display kotak CSS aslinya
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 250; // Kunci tinggi pad konstan 250px

    // Set kembali parameter default kuas setelah resize
    ctx.strokeStyle = '#22d3ee'; // Ganti warna jadi cyan mewah biar senada
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Gambar ulang goresan lama jika ada
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  };

  // Jalankan auto-resize koordinat saat halaman dibuka atau layar diputar (rotate HP)
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Ambil koordinat titik sentuh X & Y murni berdasarkan tipe event (Mouse / Sentuhan Jari)
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    // Deteksi apakah user memakai jari (touches) atau mouse pointer
    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  // Memulai titik goresan pertama
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  // Melanjutkan alur tarikan garis kuas
  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clearPad = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const downloadSig = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Trik Pro: Gunakan canvas dummy sementara agar latar belakang unduhan tetap transparan penuh (.png)
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signature-digital-toolhub.png';
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Title */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-cyan-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white tracking-tight">Signature Pad Digital</h1>
          </div>
        </div>

        {/* Board Main Container */}
        <div className="bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px] p-5 space-y-4 shadow-2xl relative">
          
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

          {/* Area Kanvas Tanda Tangan Pro */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={() => setIsDrawing(false)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl cursor-crosshair touch-none h-[250px] shadow-inner"
          />

          {/* Tombol Panel Aksi */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={clearPad} 
              className="py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold hover:bg-white/5 text-rose-400 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Trash2 className="w-4 h-4" /> Reset Kanvas
            </button>
            <button 
              type="button"
              onClick={downloadSig} 
              className="py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-950/20 active:scale-[0.98] transition-transform"
            >
              <Download className="w-4 h-4 stroke-[2.5]" /> Download .PNG Transparan
            </button>
          </div>

          {/* Tips Info */}
          <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-3.5 flex gap-2.5 items-start">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-400 leading-normal font-medium">
              Gunakan jari tangan Anda langsung di atas layar ponsel untuk mulai menggores. Berkas hasil unduhan sudah otomatis berlatar transparan tingkat tinggi (.png) le!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
"use client";
import { useRef, useState } from 'react';
import Link from 'next/react';
import LinkComponent from 'next/link';
import { ArrowLeft, PenTool, Trash2, Download } from 'lucide-react';

export default function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const clearPad = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const downloadSig = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signature-digital.png';
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <LinkComponent href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </LinkComponent>
          <div className="flex items-center gap-2">
            <PenTool className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Signature Pad Digital</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 space-y-4">
          <canvas
            ref={canvasRef} width={600} height={250}
            onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)}
            onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={() => setIsDrawing(false)}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl cursor-crosshair touch-none h-[250px]"
          />

          <div className="grid grid-cols-2 gap-3">
            <button onClick={clearPad} className="py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold hover:bg-white/5 text-rose-400 flex items-center justify-center gap-1.5 cursor-pointer">
              <Trash2 className="w-4 h-4" /> Reset Kanvas
            </button>
            <button onClick={downloadSig} className="py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer">
              <Download className="w-4 h-4 stroke-[2.5]" /> Download .PNG Transparan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
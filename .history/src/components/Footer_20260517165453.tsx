import Link from 'next/link';
import { Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.03] bg-slate-950/40 backdrop-blur-md z-10">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Sisi Kiri: Deskripsi Singkat */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-sm tracking-tight text-white">ToolHub Ecosystem</span>
          </div>
          <p className="text-xs text-slate-500 max-w-xs">
            Aplikasi toolbox open-source yang terus berkembang secara berkala untuk kenyamanan produktivitas Anda.
          </p>
        </div>

        {/* Sisi Tengah/Kanan: Informasi Status Proyek */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-400">
          <span className="flex items-center gap-1.5 text-orange-400">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
            Under Development
          </span>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard App</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a>
        </div>

        {/* Sisi Kanan: Copyright */}
        <div className="text-xs text-slate-600 text-center sm:text-right font-mono">
          &copy; {new Date().getFullYear()} ToolHub Inc. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
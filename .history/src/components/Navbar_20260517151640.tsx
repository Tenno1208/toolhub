import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        {/* Gunakan Link dari Next.js agar bisa klik logo untuk kembali ke Home */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-sm shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Image 
              src="/logo.png" 
              alt="ToolHub Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            ToolHub
          </span>
        </Link>

        {/* Menu Navigasi Samping */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-slate-400 hover:text-white transition-colors">
            Beranda
          </Link>
          <a href="#" className="text-slate-400 hover:text-white transition-colors">
            Tentang
          </a>
        </div>

      </div>
    </nav>
  );
}
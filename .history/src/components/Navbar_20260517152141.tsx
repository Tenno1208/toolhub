import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 relative rounded-lg overflow-hidden group-hover:scale-105 transition-transform">
            <Image 
              src="/logo.png" 
              alt="ToolHub Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            ToolHub
          </span>
        </Link>

        {/* Menu Navigasi Samping */}
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Beranda
          </Link>
          <Link 
            href="/dashboard" 
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2 rounded-full transition-all shadow-lg shadow-purple-500/25"
          >
            Dashboard
          </Link>
        </div>

      </div>
    </nav>
  );
}
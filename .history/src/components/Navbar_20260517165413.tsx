import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/[0.03] bg-slate-950/60 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 relative rounded-xl overflow-hidden group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 shadow-md shadow-purple-500/10">
            <Image 
              src="/logo.png" 
              alt="ToolHub Logo"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            ToolHub
          </span>
        </Link>

        {/* Menu Navigasi Samping */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hidden sm:block text-sm font-medium text-slate-400 hover:text-white transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-purple-500 hover:after:w-full after:transition-all">
            Beranda
          </Link>
          <Link 
            href="/dashboard" 
            className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-purple-500/20 active:scale-95"
          >
            <span className="relative z-10">Buka Dashboard</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>

      </div>
    </nav>
  );
}
import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  Shield,
  Layout,
  Sparkles,
  Star,
  Globe,
  LockKeyhole,
  Cpu,
} from 'lucide-react';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_35%)]"></div>
      <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-700/20 blur-[180px] rounded-full"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full"></div>

      {/* GRID EFFECT */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* NAVBAR */}
      <header className="relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <span className="font-black text-lg text-white">T</span>
            </div>

            <div>
              <h1 className="font-black text-lg tracking-tight">
                ToolHub
              </h1>
              <p className="text-xs text-slate-500">
                utility ecosystem
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition">
              Features
            </a>

            <a href="#about" className="hover:text-white transition">
              About
            </a>

            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-semibold hover:bg-slate-200 transition active:scale-95"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-32">
          
          <div className="flex flex-col items-center text-center">

            {/* BADGE */}
            <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
              <Sparkles className="w-4 h-4 text-purple-400" />

              <span className="text-sm text-slate-300">
                ToolHub v2.0 tersedia sekarang
              </span>
            </div>

            {/* TITLE */}
            <h1 className="max-w-6xl text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] tracking-[-0.05em]">
              Semua Tools
              <br />

              <span className="bg-gradient-to-r from-purple-400 via-white to-cyan-400 bg-clip-text text-transparent">
                Dalam Satu Tempat.
              </span>
            </h1>

            {/* SUBTITLE */}
            <p className="mt-8 max-w-2xl text-base sm:text-xl text-slate-400 leading-relaxed">
              Platform utilitas modern untuk developer, creator, dan manusia yang terlalu malas buka 18 tab cuma buat convert file. Evolusi internet ternyata jadi kumpulan popup iklan dan captcha. Menyedihkan.
            </p>

            {/* BUTTONS */}
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">

              <Link
                href="/dashboard"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-slate-950 font-bold text-base hover:bg-slate-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.08)] active:scale-95"
              >
                Mulai Gratis
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl text-slate-300 hover:bg-white/[0.06] hover:text-white transition-all"
              >
                Lihat Fitur
              </a>
            </div>

            {/* STATS */}
            <div className="mt-16 flex flex-wrap justify-center gap-5">

              <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <h3 className="text-2xl font-black">20+</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Utility Tools
                </p>
              </div>

              <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <h3 className="text-2xl font-black">100%</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Client Side
                </p>
              </div>

              <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <h3 className="text-2xl font-black">0 Ads</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Tanpa Sampah Iklan
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* CARD */}
          <div className="group p-7 rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-purple-500/30 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>

            <h3 className="text-xl font-bold mb-3">
              Super Cepat
            </h3>

            <p className="text-slate-400 leading-relaxed text-sm">
              Semua proses berjalan langsung di browser tanpa lemot nunggu server ngambek kayak hubungan toxic.
            </p>
          </div>

          {/* CARD */}
          <div className="group p-7 rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-cyan-400" />
            </div>

            <h3 className="text-xl font-bold mb-3">
              Aman & Privat
            </h3>

            <p className="text-slate-400 leading-relaxed text-sm">
              File tidak dikirim ke server aneh-aneh. Karena internet sudah cukup penuh sama orang nyolong data.
            </p>
          </div>

          {/* CARD */}
          <div className="group p-7 rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-indigo-500/30 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
              <Layout className="w-6 h-6 text-indigo-400" />
            </div>

            <h3 className="text-xl font-bold mb-3">
              UI Premium
            </h3>

            <p className="text-slate-400 leading-relaxed text-sm">
              Desain clean, modern, elegan. Bukan tampilan web tahun 2013 yang masih pakai banner judi berkedip.
            </p>
          </div>

          {/* CARD */}
          <div className="group p-7 rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <Cpu className="w-6 h-6 text-emerald-400" />
            </div>

            <h3 className="text-xl font-bold mb-3">
              Teknologi Modern
            </h3>

            <p className="text-slate-400 leading-relaxed text-sm">
              Dibangun dengan Next.js + Tailwind biar nggak terasa seperti buka situs fotokopi KTP kecamatan.
            </p>
          </div>

        </div>
      </section>

      {/* PREMIUM SECTION */}
      <section
        id="about"
        className="relative z-10 max-w-7xl mx-auto px-6 pb-32"
      >
        <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-10 md:p-16 backdrop-blur-2xl">

          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] text-sm text-slate-300 mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              Premium Experience
            </div>

            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Dibuat Buat Produktivitas.
              <span className="block text-slate-400">
                Bukan Buat Ganggu Hidup.
              </span>
            </h2>

            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              ToolHub fokus ke kecepatan, kenyamanan, dan tampilan modern. Karena hidup sudah cukup berat tanpa harus nunggu website convert PDF loading 14 detik sambil muter iklan pinjol.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03]">
                <Globe className="w-5 h-5 text-cyan-400" />
                <span className="text-sm text-slate-300">
                  Global Access
                </span>
              </div>

              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/[0.03]">
                <LockKeyhole className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-slate-300">
                  Secure Encryption
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
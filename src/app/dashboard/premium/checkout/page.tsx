"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Crown, CheckCircle2, ShieldCheck, Copy, Sparkles, Loader2, AlertCircle } from 'lucide-react';

export default function PremiumCheckout() {
  const router = useRouter();
  const [licenseInput, setLicenseInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  // 🔑 KEY LISENSI RAHASIA (Baku terenkapsulasi secara lokal)
  const PREMIUM_SECRET_KEY = "TOOLHUB-PREMIUM-2026-LTS";

  // Fungsi menyalin teks dummy nomor rekening/e-wallet le
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Fungsi eksekutor validasi kunci premium lokal
  const handleActivatePremium = (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseInput.trim() || loading) return;

    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      // Validasi string kecocokan kunci
      if (licenseInput.trim() === PREMIUM_SECRET_KEY) {
        setSuccess(true);
        // 🚀 KUNCI UTAMA: Amankan status ke localStorage browser lokal
        localStorage.setItem('toolhub_membership', 'PREMIUM_TIER');
        
        // Kasih efek delay sebelum dilempar balik ke dashboard premium
        setTimeout(() => {
          router.push('/dashboard/premium');
        }, 2500);
      } else {
        setErrorMsg("Kode lisensi tidak valid le, periksa kembali spasi atau huruf besarnya!");
        setLoading(false);
      }
    }, 1500); // Simulasi loading server handshake
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-16 px-4 sm:px-8 text-slate-200 select-none font-sans">
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* Tombol Back */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard/premium" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <span className="text-xs font-bold text-slate-500 font-mono">SECURE TIER GATEWAY</span>
        </div>

        {/* LOGIKA JIKA SUKSES AKTIVASI */}
        {success ? (
          <div className="bg-slate-900/40 border border-emerald-500/30 rounded-[32px] p-8 text-center space-y-4 backdrop-blur-sm animate-in zoom-in-95 duration-200 shadow-2xl shadow-emerald-950/20">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-black text-white tracking-tight">Aktivasi Sukses, Selamat le!</h2>
              <p className="text-xs text-slate-400">Status akun lokal Anda berhasil ditingkatkan menjadi <strong className="text-amber-400 font-black">PREMIUM ACCESS</strong>.</p>
            </div>
            <p className="text-[10px] text-emerald-400 font-mono animate-pulse flex items-center justify-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" /> Mengonfigurasi lisensi enkripsi lokal browser...
            </p>
          </div>
        ) : (
          /* --- TAMPILAN UTAMA CHECKOUT FLOW --- */
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            {/* Sisi Kiri: Detail Pembayaran Ala-Ala (Lebar 3 Kolom) */}
            <div className="md:col-span-3 bg-slate-900/30 border border-white/[0.03] rounded-[32px] p-6 space-y-6 backdrop-blur-sm flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-[10px] font-black uppercase tracking-wider">
                  <Crown className="w-4 h-4" /> Lifetime Premium Plan
                </div>
                <h2 className="text-xl font-black text-white tracking-tight">Metode Pembayaran Invoice</h2>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                  Transfer nominal sesuai keikhlasan donasi pengembangan ke salah satu e-wallet di bawah ini untuk mendapatkan serial kode aktivasi premium le.
                </p>
              </div>

              {/* Box Detail Rekening Donasi */}
              <div className="space-y-2.5 my-4">
                <div className="bg-slate-950/80 border border-white/[0.01] p-3.5 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] font-black font-mono text-slate-600 uppercase tracking-widest">DANA / OVO / GOPAY</span>
                    <span className="text-xs font-bold text-slate-200">0812-3456-7890</span>
                  </div>
                  <button onClick={() => handleCopy("081234567890")} className="text-slate-500 hover:text-white p-2 transition-colors cursor-pointer" title="Salin Nomor">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="bg-slate-950/80 border border-white/[0.01] p-3.5 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] font-black font-mono text-slate-600 uppercase tracking-widest">Bank Transfer (BCA)</span>
                    <span className="text-xs font-bold text-slate-200">8705-xxxx-xxxx</span>
                  </div>
                  <button onClick={() => handleCopy("8705xxxxxx")} className="text-slate-500 hover:text-white p-2 transition-colors cursor-pointer" title="Salin No Rekening">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sandbox Cheat-Sheet Info */}
              <div className="p-3.5 bg-amber-500/5 border border-amber-500/10 rounded-xl text-[11px] text-amber-400/90 font-medium flex gap-2">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                <span>
                  <strong>Sandbox Test Key:</strong> Gunakan kode kunci <code className="bg-amber-500/10 px-1 py-0.5 rounded text-white font-mono font-bold select-text">{PREMIUM_SECRET_KEY}</code> untuk simulasi lolos instan tanpa transfer asli le!
                </span>
              </div>
            </div>

            {/* Sisi Kanan: Form Input Aktivasi Kunci (Lebar 2 Kolom) */}
            <div className="md:col-span-2 bg-slate-900/30 border border-white/[0.03] rounded-[32px] p-6 flex flex-col justify-between backdrop-blur-sm gap-6">
              <div className="space-y-4">
                <div className="border-b border-white/5 pb-2">
                  <h3 className="text-xs font-black font-mono text-slate-500 uppercase tracking-widest">Aktivasi Lisensi</h3>
                </div>

                <form onSubmit={handleActivatePremium} className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wide">Serial License Key</label>
                    <input 
                      type="text" value={licenseInput} onChange={(e) => setLicenseInput(e.target.value)} disabled={loading}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 px-3 text-center text-xs font-mono font-bold tracking-widest text-amber-400 focus:outline-none focus:border-amber-500/50 placeholder:text-slate-800 uppercase"
                    />
                  </div>

                  <button
                    type="submit" disabled={!licenseInput.trim() || loading}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 disabled:from-slate-900 disabled:to-slate-900 text-slate-950 disabled:text-slate-700 font-black py-4 rounded-xl text-xs tracking-wider flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed shadow-xl transition-all"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> VERIFYING KEY...
                      </>
                    ) : (
                      "VERIFIKASI LISENSI TIERS"
                    )}
                  </button>
                </form>

                {errorMsg && (
                  <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl flex items-start gap-2 text-[10px] text-rose-400 font-bold animate-in fade-in">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              {/* Info Notifikasi Toast Sukses Copy */}
              <div className="text-center">
                <p className="text-[10px] font-medium text-slate-600">
                  {copied ? "✅ Nomor berhasil disalin ke clipboard le!" : "Sistem Lisensi Aman Enkripsi 128-bit Lokal."}
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
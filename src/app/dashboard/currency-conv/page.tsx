"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, DollarSign, Loader2 } from 'lucide-react';

// Sebagai fallback jika API gagal di-load
const DEFAULT_RATES = { USD: 1, EUR: 0.92, JPY: 156, SGD: 1.35, IDR: 16500 };
type CurrencyKeys = 'USD' | 'EUR' | 'JPY' | 'SGD' | 'IDR';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurr, setFromCurr] = useState<CurrencyKeys>('USD');
  const [toCurr, setToCurr] = useState<CurrencyKeys>('IDR');
  const [rates, setRates] = useState<Record<CurrencyKeys, number>>(DEFAULT_RATES);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fetch data kurs real-time menggunakan USD sebagai base utama dari API open-source
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        
        if (data && data.rates) {
          setRates({
            USD: data.rates.USD || 1,
            EUR: data.rates.EUR,
            JPY: data.rates.JPY,
            SGD: data.rates.SGD,
            IDR: data.rates.IDR,
          });
          
          // Format waktu update terakhir (WIB/lokal)
          const date = new Date(data.time_last_update_utc);
          setLastUpdated(date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB');
        }
      } catch (error) {
        console.error("Gagal mengambil data kurs terbaru:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const calculateConversion = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return '0';
    
    // Konversi via USD Base (karena API mengembalikan rate berbasis USD)
    // Formula: (Jumlah / Rate Mata Uang Asal) * Rate Mata Uang Tujuan
    const amountInUSD = val / rates[fromCurr];
    const finalResult = amountInUSD * rates[toCurr];
    
    return finalResult.toLocaleString('id-ID', { maximumFractionDigits: 2 });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <h1 className="text-xl font-bold text-white">Konversi Mata Uang</h1>
            </div>
          </div>
          
          {/* Status Indikator Real-time */}
          {lastUpdated && (
            <span className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full font-medium">
              Terupdate: {lastUpdated}
            </span>
          )}
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl backdrop-blur-sm">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Jumlah Nominal Uang</label>
            <input
              type="number" 
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 font-mono"
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              placeholder="Masukkan angka nominal..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Dari Mata Uang</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/50 cursor-pointer" value={fromCurr} onChange={e => setFromCurr(e.target.value as any)}>
                <option value="USD">USD ($) Dolar AS</option>
                <option value="EUR">EUR (€) Euro</option>
                <option value="JPY">JPY (¥) Yen Jepang</option>
                <option value="SGD">SGD ($) Dolar Singapura</option>
                <option value="IDR">IDR (Rp) Rupiah</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Ke Mata Uang</label>
              <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500/50 cursor-pointer" value={toCurr} onChange={e => setToCurr(e.target.value as any)}>
                <option value="IDR">IDR (Rp) Rupiah</option>
                <option value="USD">USD ($) Dolar AS</option>
                <option value="EUR">EUR (€) Euro</option>
                <option value="JPY">JPY (¥) Yen Jepang</option>
                <option value="SGD">SGD ($) Dolar Singapura</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 text-center mt-4 min-h-[92px] flex flex-col justify-center items-center">
            {loading ? (
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                <span>Memuat kurs terbaru...</span>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 flex items-center justify-center gap-1">
                  <RefreshCw className="w-3 h-3 text-emerald-400" /> Hasil Penukaran Kurs:
                </p>
                <h2 className="text-2xl font-black text-emerald-400 font-mono transition-all">
                  {calculateConversion()} <span className="text-xs font-sans text-slate-400 font-normal">{toCurr}</span>
                </h2>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
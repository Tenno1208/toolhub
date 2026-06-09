"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, RefreshCw, Copy, Check, MapPin, Cpu, Shield, ExternalLink } from 'lucide-react';

interface IpData {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  country: string;
  org: string;
  timezone: string;
  asn: string;
  currency: string;
  latitude: number;
  longitude: number;
}

export default function ElegantIpInfoTool() {
  const [data, setData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const fetchIpData = async () => {
    setLoading(true);
    try {
      // Menggunakan ipapi.co gratis tanpa token untuk ekstraksi data komprehensif
      const res = await fetch('https://ipapi.co/json/');
      const json = await res.json();
      if (json && !json.error) {
        setData(json);
      } else {
        setData(null);
      }
    } catch (err) {
      console.error("Gagal mengambil data IP:", err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpData();
  }, []);

  const handleCopy = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 selection:bg-sky-500/30">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-900 pb-5">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-400" />
              <h1 className="text-xl font-bold text-white tracking-tight">Network Intelligence</h1>
            </div>
          </div>
          
          <button 
            onClick={fetchIpData} 
            disabled={loading}
            className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer disabled:opacity-30"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-sky-400' : ''}`} />
          </button>
        </div>

        {loading ? (
          /* Premium Skeleton Loader Card */
          <div className="space-y-6">
            <div className="bg-slate-900/20 border border-white/[0.04] h-32 rounded-3xl animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/20 border border-white/[0.04] h-28 rounded-2xl animate-pulse" />
              <div className="bg-slate-900/20 border border-white/[0.04] h-28 rounded-2xl animate-pulse" />
              <div className="bg-slate-900/20 border border-white/[0.04] h-28 rounded-2xl animate-pulse" />
            </div>
          </div>
        ) : data ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            
            {/* HERO PANEL: Alamat IP Utama */}
            <div className="bg-slate-900/40 border border-white/[0.04] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-sky-500/5 blur-3xl rounded-full pointer-events-none" />
              
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1.5">Public IP Address</span>
                <h2 className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
                  {data.ip}
                </h2>
              </div>

              <button 
                onClick={() => handleCopy(data.ip, 'main-ip')}
                className="flex items-center gap-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-md"
              >
                {copiedLabel === 'main-ip' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Tersalin</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Node</span>
                  </>
                )}
              </button>
            </div>

            {/* SEGMENTASI GRID INFORMASI ANALITIK */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Klaster 1: Geo-Lokasi Wilayah */}
              <div className="bg-slate-900/40 border border-white/[0.04] rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2.5">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Geo-Targeting</span>
                </div>
                <div className="space-y-3 flex-1 pt-1">
                  {[
                    { label: 'Kota Asal', val: data.city },
                    { label: 'Provinsi / State', val: data.region },
                    { label: 'Kedaulatan Negara', val: `${data.country_name} (${data.country})` }
                  ].map((item, i) => (
                    <div key={i}>
                      <span className="text-[9px] text-slate-500 block font-medium">{item.label}</span>
                      <span className="text-xs font-bold text-slate-200">{item.val || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Klaster 2: Provider & Infrastruktur ISP */}
              <div className="bg-slate-900/40 border border-white/[0.04] rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2.5">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Operator Core</span>
                </div>
                <div className="space-y-3 flex-1 pt-1">
                  {[
                    { label: 'Penyelenggara Jasa (ISP)', val: data.org },
                    { label: 'Autonomous System (ASN)', val: data.asn },
                    { label: 'Mata Uang Lokal', val: data.currency }
                  ].map((item, i) => (
                    <div key={i}>
                      <span className="text-[9px] text-slate-500 block font-medium">{item.label}</span>
                      <span className="text-xs font-bold text-slate-200 truncate block max-w-[220px]">{item.val || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Klaster 3: Koordinat Global & Waktu */}
              <div className="bg-slate-900/40 border border-white/[0.04] rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
                <div className="flex items-center gap-2 border-b border-slate-800/60 pb-2.5">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Data Metrik</span>
                </div>
                <div className="space-y-3 flex-1 pt-1">
                  {[
                    { label: 'Zona Waktu Node', val: data.timezone },
                    { label: 'Garis Lintang (Lat)', val: data.latitude?.toString(), mono: true },
                    { label: 'Garis Bujur (Lon)', val: data.longitude?.toString(), mono: true }
                  ].map((item, i) => (
                    <div key={i}>
                      <span className="text-[9px] text-slate-500 block font-medium">{item.label}</span>
                      <span className={`text-xs font-bold text-slate-200 ${item.mono ? 'font-mono' : ''}`}>{item.val || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Peta Integrasi Tautan Luar Minimalis */}
            {data.latitude && data.longitude && (
              <div className="pt-2">
                <a 
                  href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 border border-dashed border-slate-800 hover:border-sky-500/30 rounded-xl py-3 px-4 bg-slate-900/10 text-xs font-medium text-slate-400 hover:text-sky-300 transition-all cursor-pointer"
                >
                  <span>Buka Titik Koordinat di Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

          </div>
        ) : (
          /* Error Box */
          <div className="bg-rose-950/10 border border-rose-900/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center min-h-[220px] animate-in fade-in duration-300">
            <Shield className="w-6 h-6 text-rose-500 mb-2 stroke-[1.5]" />
            <p className="text-xs text-rose-400 font-semibold mb-1">Gagal Menghubungkan ke Node API</p>
            <p className="text-[11px] text-slate-500 max-w-[280px] leading-relaxed">Periksa kembali konfigurasi jaringan DNS atau koneksi internet perangkat Anda.</p>
          </div>
        )}

      </div>
    </div>
  );
}
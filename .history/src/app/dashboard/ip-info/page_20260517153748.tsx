"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, RefreshCw } from 'lucide-react';

export default function IpInfoTool() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchIpData = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://ipapi.co/json/');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchIpData(); }, []);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-sky-400" />
              <h1 className="text-2xl font-bold text-white">IP Info Finder</h1>
            </div>
          </div>
          <button onClick={fetchIpData} className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <RefreshCw className={`w-5 h-5 text-slate-400 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-slate-500 animate-pulse">Memuat data jaringan lokasi...</div>
        ) : data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'IP Address Anda', val: data.ip },
              { label: 'Kota', val: data.city },
              { label: 'Wilayah / Provinsi', val: data.region },
              { label: 'Negara', val: `${data.country_name} (${data.country})` },
              { label: 'Provider / ISP', val: data.org },
              { label: 'Zona Waktu', val: data.timezone },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 p-5 rounded-2xl">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">{item.label}</span>
                <span className="text-lg font-bold text-white">{item.val || 'N/A'}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-rose-400">Gagal memuat data. Cek koneksi internetmu.</div>
        )}
      </div>
    </div>
  );
}
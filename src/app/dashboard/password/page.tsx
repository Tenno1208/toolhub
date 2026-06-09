"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Copy, Check, RefreshCw, Eye, EyeOff, ShieldCheck, History } from 'lucide-react';

type StrengthType = { label: string; color: string; width: string };

export default function PasswordTool() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeSimilar, setExcludeSimilar] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [strength, setStrength] = useState<StrengthType>({ label: 'Weak', color: 'bg-rose-500', width: 'w-1/3' });

  // Fungsi evaluasi kekuatan password
  const evaluateStrength = (pass: string) => {
    let score = 0;
    if (!pass || pass.includes('Pilih minimal')) return { label: 'Empty', color: 'bg-slate-800', width: 'w-0' };
    
    if (pass.length >= 12) score += 1;
    if (pass.length >= 20) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 3) return { label: 'Lemah 😓', color: 'bg-rose-500', width: 'w-1/3' };
    if (score === 4 || score === 5) return { label: 'Sedang 🫡', color: 'bg-amber-500', width: 'w-2/3' };
    return { label: 'Sangat Kuat! 💪🔥', color: 'bg-emerald-500', width: 'w-full' };
  };

  const generatePassword = () => {
    let upperSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let lowerSet = 'abcdefghijklmnopqrstuvwxyz';
    let numberSet = '0123456789';
    let symbolSet = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    // Filter karakter yang mirip jika opsi aktif (i, l, 1, I, o, 0, O)
    if (excludeSimilar) {
      upperSet = upperSet.replace(/[IO]/g, '');
      lowerSet = lowerSet.replace(/[il]/g, '');
      numberSet = numberSet.replace(/[01]/g, '');
    }

    let charset = '';
    if (useUpper) charset += upperSet;
    if (useLower) charset += lowerSet;
    if (useNumbers) charset += numberSet;
    if (useSymbols) charset += symbolSet;

    if (charset === '') {
      setPassword('Pilih minimal satu kriteria!');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    setPassword(newPassword);
    
    // Tambahkan ke riwayat (maksimal 3 riwayat terakhir)
    setHistory(prev => [newPassword, ...prev.filter(p => p !== newPassword)].slice(0, 3));
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useNumbers, useSymbols, excludeSimilar]);

  useEffect(() => {
    setStrength(evaluateStrength(password));
  }, [password]);

  const copyToClipboard = (textToCopy: string) => {
    if (textToCopy.includes('Pilih minimal')) return;
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-rose-500" />
              <h1 className="text-2xl font-bold text-white">Password Generator</h1>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl backdrop-blur-sm">
          
          {/* Display Output & Main Actions */}
          <div className="relative group">
            <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 text-center break-all pr-14 relative min-h-[88px] flex items-center justify-center">
              <span className={`text-xl sm:text-2xl font-mono text-white tracking-wider ${!showPassword && password.all !== 'Pilih minimal satu kriteria!' ? 'blur-md select-none' : ''}`}>
                {password}
              </span>
              
              {/* Toggle Intip Password */}
              {password !== 'Pilih minimal satu kriteria!' && (
                <button 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Aksi Trigger Utama */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              <button 
                onClick={() => copyToClipboard(password)} 
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-4 py-2 rounded-xl transition-all shadow-lg text-xs font-medium"
              >
                {isCopied ? <><Check className="w-4 h-4 text-emerald-400"/> Copied</> : <><Copy className="w-4 h-4"/> Copy</>}
              </button>
              <button 
                onClick={generatePassword} 
                className="flex items-center justify-center bg-rose-600 hover:bg-rose-500 text-white w-10 h-10 rounded-xl transition-all shadow-lg hover:rotate-180 duration-300"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Password Strength Indicator */}
          <div className="pt-4 space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" /> Keamanan:
              </span>
              <span className="font-bold text-white">{strength.label}</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-[2px] border border-slate-900">
              <div className={`h-full rounded-full transition-all duration-500 ${strength.color} ${strength.width}`}></div>
            </div>
          </div>

          <hr className="border-slate-800/60 my-2" />

          {/* Parameter Settings */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-xs font-medium text-slate-400">Panjang Karakter</label>
                <span className="text-rose-400 font-mono font-bold text-sm bg-rose-500/10 px-2 py-0.5 rounded">{length}</span>
              </div>
              <input 
                type="range" min="8" max="64" value={length} 
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-950 rounded-lg appearance-none h-2 cursor-pointer border border-slate-800"
              />
            </div>

            {/* Checkbox Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: 'Huruf Besar (A-Z)', state: useUpper, set: setUseUpper },
                { label: 'Huruf Kecil (a-z)', state: useLower, set: setUseLower },
                { label: 'Angka (0-9)', state: useNumbers, set: setUseNumbers },
                { label: 'Simbol (!@#$)', state: useSymbols, set: setUseSymbols },
              ].map((item, idx) => (
                <label key={idx} className="flex items-center justify-between p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl cursor-pointer hover:border-rose-500/30 transition-all">
                  <span className="text-xs font-medium text-slate-300">{item.label}</span>
                  <input 
                    type="checkbox" 
                    checked={item.state} 
                    onChange={(e) => item.set(e.target.checked)}
                    className="w-4 h-4 accent-rose-500 bg-slate-900 border-slate-700 rounded focus:ring-0"
                  />
                </label>
              ))}
            </div>

            {/* Opsi Ekstra Minimalis */}
            <label className="flex items-center justify-between p-3.5 bg-slate-950/40 border border-dashed border-slate-800 rounded-xl cursor-pointer hover:bg-slate-950 transition-all">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-300">Hindari Karakter Mirip</span>
                <span className="text-[10px] text-slate-500">Hilangkan karakter membingungkan seperti (i, l, 1, 0, O)</span>
              </div>
              <input 
                type="checkbox" 
                checked={excludeSimilar} 
                onChange={(e) => setExcludeSimilar(e.target.checked)}
                className="w-4 h-4 accent-rose-500 bg-slate-900 border-slate-700 rounded"
              />
            </label>
          </div>

          {/* History Panel */}
          {history.length > 1 && (
            <div className="pt-2 border-t border-slate-800/60">
              <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                <History className="w-3 h-3" /> Riwayat Penjanaan Terakhir
              </div>
              <div className="space-y-1.5">
                {history.slice(1).map((histItem, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-950/60 border border-slate-900/80 rounded-xl px-4 py-2 text-xs font-mono text-slate-400 group/item">
                    <span className="truncate max-w-[80%]">{histItem}</span>
                    <button 
                      onClick={() => copyToClipboard(histItem)}
                      className="text-slate-500 hover:text-emerald-400 p-1 opacity-100 sm:opacity-0 group-hover/item:opacity-100 transition-all"
                      title="Salin password ini"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
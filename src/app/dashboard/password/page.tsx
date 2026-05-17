"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Copy, Check, RefreshCw } from 'lucide-react';

export default function PasswordTool() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (useUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      setPassword('Pilih minimal satu kriteria!');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  // Generate otomatis saat komponen dimuat atau pengaturan berubah
  useEffect(() => {
    generatePassword();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
              <Lock className="w-6 h-6 text-rose-400" />
              <h1 className="text-2xl font-bold text-white">Password Generator</h1>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8">
          
          {/* Display Password */}
          <div className="relative mb-8 group">
            <div className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-6 text-center break-all">
              <span className="text-2xl sm:text-3xl font-mono text-white tracking-wider">
                {password}
              </span>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              <button onClick={copyToClipboard} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white px-4 py-2 rounded-xl transition-all shadow-lg text-sm font-medium">
                {isCopied ? <><Check className="w-4 h-4 text-emerald-400"/> Copied</> : <><Copy className="w-4 h-4"/> Copy</>}
              </button>
              <button onClick={generatePassword} className="flex items-center justify-center bg-rose-600 hover:bg-rose-700 text-white w-10 h-10 rounded-xl transition-all shadow-lg">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-6 mt-12">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-400">Panjang Karakter</label>
                <span className="text-rose-400 font-bold">{length}</span>
              </div>
              <input 
                type="range" min="8" max="64" value={length} 
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-800 rounded-lg appearance-none h-2 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Huruf Besar (A-Z)', state: useUpper, set: setUseUpper },
                { label: 'Huruf Kecil (a-z)', state: useLower, set: setUseLower },
                { label: 'Angka (0-9)', state: useNumbers, set: setUseNumbers },
                { label: 'Simbol (!@#$)', state: useSymbols, set: setUseSymbols },
              ].map((item, idx) => (
                <label key={idx} className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl cursor-pointer hover:border-rose-500/30 transition-colors">
                  <span className="text-sm font-medium text-slate-300">{item.label}</span>
                  <input 
                    type="checkbox" 
                    checked={item.state} 
                    onChange={(e) => item.set(e.target.checked)}
                    className="w-5 h-5 accent-rose-500 bg-slate-800 border-slate-700 rounded focus:ring-rose-500"
                  />
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
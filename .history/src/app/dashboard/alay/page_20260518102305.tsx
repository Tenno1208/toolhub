"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Copy, Check, ArrowLeft } from 'lucide-react';

export default function AlayGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToAlay = (text: string) => {
    setInput(text);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let char = text[i].toLowerCase();
      if (char === 'a') char = '4';
      else if (char === 'e') char = '3';
      else if (char === 'g') char = '9';
      else if (char === 'i') char = '1';
      else if (char === 'o') char = '0';
      else if (char === 's') char = '5';
      result += i % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    }
    if (result.length > 0) result += "~~ xX_teh0reCz_Xx";
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h1 className="text-xl font-bold text-white">Teks Alay Generator</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Teks Normal</label>
            <textarea
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-purple-500/50 resize-none h-28"
              placeholder="Ketik kata-kata normal di sini..."
              value={input}
              onChange={(e) => convertToAlay(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2">Hasil Alay</label>
            <div className="relative">
              <textarea
                readOnly
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-purple-300 resize-none h-28 font-mono"
                placeholder="H451LNY4 4K4N MUNcul d1 51n1..."
                value={output}
              />
              {output && (
                <button
                  onClick={handleCopy}
                  className="absolute bottom-4 right-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 p-2 rounded-lg text-slate-300 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
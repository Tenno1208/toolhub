"use client";
import { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function AlayGenerator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToAlay = (text: string) => {
    setInput(text);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      let char = text[i].toLowerCase();
      // Substitusi angka alay klasik
      if (char === 'a') char = '4';
      else if (char === 'e') char = '3';
      else if (char === 'g') char = '9';
      else if (char === 'i') char = '1';
      else if (char === 'o') char = '0';
      else if (char === 's') char = '5';
      
      // Efek random uppercase/lowercase
      result += i % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    }
    // Tambahan bumbu alay di ujung kalimat
    if (result.length > 0) result += "~~ xX_teh0reCz_Xx";
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-purple-500/10 border border-purple-500/20 rounded-xl">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Teks Alay Generator</h2>
          <p className="text-xs text-slate-400">Ubah teks normalmu menjadi gaya anak warnet era 2010.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Teks Normal</label>
          <textarea
            className="w-full bg-slate-950 border border-white/[0.08] rounded-xl p-4 text-sm text-white focus:outline-none focus:border-purple-500/50 resize-none h-28"
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
              className="w-full bg-slate-950 border border-white/[0.08] rounded-xl p-4 text-sm text-purple-300 resize-none h-28 font-mono"
              placeholder="H451LNY4 4K4N MUNcul d1 51n1..."
              value={output}
            />
            {output && (
              <button
                onClick={handleCopy}
                className="absolute bottom-4 right-4 bg-white/5 border border-white/[0.08] hover:bg-white/10 p-2 rounded-lg text-slate-300 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
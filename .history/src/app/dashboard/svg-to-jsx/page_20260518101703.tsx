"use client";
import { useState } from 'react';
import { Code2, Copy, Check, Terminal } from 'lucide-react';

export default function SvgToJsx() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertSvgToJsx = () => {
    if (!input.trim()) return;

    let jsx = input.trim()
      // Konversi properti kebab-case HTML SVG ke PascalCase standar React JSX
      .replace(/class=/g, 'className=')
      .replace(/stroke-width=/g, 'strokeWidth=')
      .replace(/stroke-linecap=/g, 'strokeLinecap=')
      .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
      .replace(/fill-rule=/g, 'fillRule=')
      .replace(/clip-rule=/g, 'clipRule=')
      .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
      .replace(/stroke-dasharray=/g, 'strokeDasharray=');

    // Bungkus ke dalam struktur fungsional komponen React clean-code
    const finalComponent = `import React from 'react';\n\nexport default function CustomIcon({ className = "w-6 h-6" }) {\n  return (\n    ${jsx.replace('<svg', '<svg className={className}')}\n  );\n}`;
    setOutput(finalComponent);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-slate-900/40 border border-white/[0.05] backdrop-blur-md rounded-[32px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
          <Code2 className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">SVG to React JSX Converter</h2>
          <p className="text-xs text-slate-400">Konversi kode SVG mentah HTML menjadi komponen fungsional React/Next.js siap pasang.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">Raw SVG Code Input</label>
          <textarea
            className="w-full bg-slate-950 border border-white/[0.08] rounded-xl p-4 text-xs font-mono text-slate-400 focus:outline-none focus:border-cyan-500/50 h-64 resize-none"
            placeholder="<svg fill='none' viewBox='0 0 24 24' stroke='currentColor'>...</svg>"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-2">React JSX Component Output</label>
          <div className="relative h-64">
            <textarea
              readOnly
              className="w-full h-full bg-slate-950 border border-white/[0.08] rounded-xl p-4 text-xs font-mono text-cyan-400 resize-none focus:outline-none"
              placeholder="Komponen fungsional ekspor siap pakai akan muncul di sini..."
              value={output}
            />
            {output && (
              <button
                onClick={handleCopy}
                className="absolute bottom-4 right-4 bg-white/5 border border-white/[0.08] hover:bg-white/10 p-2 rounded-lg text-slate-300 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={convertSvgToJsx}
        disabled={!input.trim()}
        className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-20 cursor-pointer flex items-center justify-center gap-2"
      >
        <Terminal className="w-4 h-4" /> Transform SVG Code
      </button>
    </div>
  );
}
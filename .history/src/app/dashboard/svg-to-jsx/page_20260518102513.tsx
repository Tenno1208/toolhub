"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Code2, Copy, Check, Terminal, ArrowLeft } from 'lucide-react';

export default function SvgToJsx() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertSvgToJsx = () => {
    if (!input.trim()) return;
    let jsx = input.trim()
      .replace(/class=/g, 'className=')
      .replace(/stroke-width=/g, 'strokeWidth=')
      .replace(/stroke-linecap=/g, 'strokeLinecap=')
      .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
      .replace(/fill-rule=/g, 'fillRule=')
      .replace(/clip-rule=/g, 'clipRule=')
      .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
      .replace(/stroke-dasharray=/g, 'strokeDasharray=');

    const finalComponent = `import React from 'react';\n\nexport default function CustomIcon({ className = "w-6 h-6" }) {\n  return (\n    ${jsx.replace('<svg', '<svg className={className}')}\n  );\n}`;
    setOutput(finalComponent);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">SVG to React JSX Converter</h1>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Raw SVG Code Input</label>
              <textarea
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-400 focus:outline-none focus:border-cyan-500/50 h-64 resize-none"
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
                  className="w-full h-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs font-mono text-cyan-400 resize-none focus:outline-none"
                  placeholder="Komponen fungsional ekspor siap pakai..."
                  value={output}
                />
                {output && (
                  <button
                    onClick={handleCopy}
                    className="absolute bottom-4 right-4 bg-slate-900 border border-slate-800 hover:bg-slate-800 p-2 rounded-lg text-slate-300 transition-colors cursor-pointer"
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
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4" /> Transform SVG Code
          </button>
        </div>
      </div>
    </div>
  );
}
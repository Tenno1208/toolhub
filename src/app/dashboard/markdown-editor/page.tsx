"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Eye, Edit, ArrowLeft } from 'lucide-react';

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Project ToolHub\n\nSelamat datang di ekosistem **RFF707 Tools**.\n\n### Fitur Utama:\n- Super Cepat (Next.js)\n- 100% Aman & Lokal\n\n> "Simpel, Minimalis, dan Produktif."');

  const downloadMdFile = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DOCUMENTATION.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h1 className="text-xl font-bold text-white">Markdown Live Editor</h1>
            </div>
          </div>
          
          <button
            onClick={downloadMdFile}
            className="bg-white text-slate-950 font-bold px-4 py-2.5 rounded-xl hover:bg-slate-200 transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" /> Download .md
          </button>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-2 pl-1">
              <Edit className="w-3 h-3" /> Markdown Syntax Input
            </div>
            <textarea
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-indigo-500/50 h-[400px] resize-none leading-relaxed"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-2 pl-1">
              <Eye className="w-3 h-3" /> Live Rich Text Preview
            </div>
            <div className="w-full h-[400px] bg-slate-950 border border-slate-800 rounded-2xl p-5 overflow-y-auto prose prose-invert text-xs text-slate-300 space-y-3 font-sans leading-relaxed">
              {markdown.split('\n').map((line, idx) => {
                if (line.startsWith('# ')) return <h1 key={idx} className="text-2xl font-black text-white border-b border-white/5 pb-1 mt-3">{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={idx} className="text-xl font-bold text-white mt-3">{line.replace('## ', '')}</h2>;
                if (line.startsWith('### ')) return <h3 key={idx} className="text-md font-bold text-indigo-400 mt-2">{line.replace('### ', '')}</h3>;
                if (line.startsWith('- ')) return <li key={idx} className="list-disc list-inside text-slate-400 pl-1">{line.replace('- ', '')}</li>;
                if (line.startsWith('> ')) return <blockquote key={idx} className="border-l-2 border-indigo-500 pl-3 italic text-slate-500 my-2 bg-white/[0.01] py-1 rounded-r-lg">{line.replace('> ', '')}</blockquote>;
                return <p key={idx} className={line.trim() === '' ? 'h-2' : ''}>{line}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
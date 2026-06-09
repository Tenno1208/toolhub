"use client";
import { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Eye, Edit, ArrowLeft, Maximize2, Columns, Layers } from 'lucide-react';

type ViewLayout = 'split' | 'editor' | 'preview';

export default function ElegantMarkdownEditor() {
  const [markdown, setMarkdown] = useState(
    '# Project Studio\n\nSelamat datang di ekosistem **ToolHub Premium**.\n\n### Fitur Utama:\n- **Super Cepat** berbasis Next.js\n- 100% Aman, Pemrosesan Lokal\n- Estetika Minimalis Modern\n\n> "Clean code selalu menghasilkan produk digital yang memukau dan mudah dirawat."\n\nKamu juga bisa menulis `inline code block` atau teks *miring (italic)* dengan sangat mudah di sini.'
  );
  const [layout, setLayout] = useState<ViewLayout>('split');

  // Parser Markdown Lokal Kustom Menggunakan Regex (Mendukung Blok & Format Sebaris)
  const parseMarkdownToHTML = (text: string) => {
    const lines = text.split('\n');
    let inList = false;
    const htmlResult: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      let currentLine = line;

      // Pemrosesan Gaya Karakter Sebaris (Inline Styles)
      // 1. Tebal (**text**)
      currentLine = currentLine.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
      // 2. Miring (*text*)
      currentLine = currentLine.replace(/\*(.*?)\*/g, '<em class="text-slate-300 italic">$1</em>');
      // 3. Kode Sebaris (`code`)
      currentLine = currentLine.replace(/`(.*?)`/g, '<code class="bg-slate-900 border border-slate-800 text-indigo-400 px-1.5 py-0.5 rounded font-mono text-[11px]">$1</code>');

      const createMarkup = (htmlStr: string) => ({ __html: htmlStr });

      // Pemrosesan Struktur Blok Utama
      if (currentLine.startsWith('# ')) {
        htmlResult.push(
          <h1 key={idx} className="text-2xl font-black text-white border-b border-slate-900 pb-2 mt-4 mb-2 tracking-tight" dangerouslySetInnerHTML={createMarkup(currentLine.replace('# ', ''))} />
        );
      } else if (currentLine.startsWith('## ')) {
        htmlResult.push(
          <h2 key={idx} className="text-xl font-extrabold text-white mt-4 mb-2 tracking-tight" dangerouslySetInnerHTML={createMarkup(currentLine.replace('## ', ''))} />
        );
      } else if (currentLine.startsWith('### ')) {
        htmlResult.push(
          <h3 key={idx} className="text-sm font-bold text-indigo-400 uppercase tracking-wider mt-4 mb-1" dangerouslySetInnerHTML={createMarkup(currentLine.replace('### ', ''))} />
        );
      } else if (currentLine.startsWith('- ')) {
        htmlResult.push(
          <li key={idx} className="list-disc list-inside text-slate-300 pl-1 text-xs leading-relaxed" dangerouslySetInnerHTML={createMarkup(currentLine.replace('- ', ''))} />
        );
      } else if (currentLine.startsWith('> ')) {
        htmlResult.push(
          <blockquote key={idx} className="border-l-2 border-indigo-500 pl-4 italic text-slate-400 my-4 bg-indigo-500/[0.02] py-2.5 pr-2 rounded-r-2xl text-xs leading-relaxed" dangerouslySetInnerHTML={createMarkup(currentLine.replace('> ', ''))} />
        );
      } else if (currentLine.trim() === '') {
        htmlResult.push(<div key={idx} className="h-3" />);
      } else {
        htmlResult.push(
          <p key={idx} className="text-xs text-slate-300 leading-relaxed font-normal" dangerouslySetInnerHTML={createMarkup(currentLine)} />
        );
      }
    });

    return htmlResult;
  };

  const downloadMdFile = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Menghitung estimasi kapasitas file dalam Bytes
  const calculateByteSize = (str: string) => {
    return new TextEncoder().encode(str).length;
  };

  const fileSizeStr = calculateByteSize(markdown) < 1024 
    ? `${calculateByteSize(markdown)} Bytes` 
    : `${(calculateByteSize(markdown) / 1024).toFixed(2)} KB`;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 selection:bg-indigo-500/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Dashboard Utility */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4 border-b border-slate-900 pb-5">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              <h1 className="text-lg font-bold text-white tracking-tight">Markdown Workspace</h1>
            </div>
          </div>
          
          {/* Kelompok Kontrol Navigasi View */}
          <div className="flex items-center gap-3">
            <div className="flex bg-slate-900 border border-slate-800/80 p-1 rounded-xl">
              <button 
                onClick={() => setLayout('split')} 
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${layout === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                title="Tampilan Berdampingan"
              >
                <Columns className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setLayout('editor')} 
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${layout === 'editor' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                title="Hanya Editor"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setLayout('preview')} 
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${layout === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                title="Hanya Preview Visual"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={downloadMdFile}
              className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-indigo-500 transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" /> Download .md
            </button>
          </div>
        </div>

        {/* Workspace Card Grid Container */}
        <div className="bg-slate-900/30 border border-white/[0.04] rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-sm relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            
            {/* Sektor Input Lintasan Kode (Markdown Editor Pane) */}
            {(layout === 'split' || layout === 'editor') && (
              <div className={`flex flex-col space-y-2 animate-in fade-in duration-300 ${layout === 'editor' ? 'lg:col-span-2' : ''}`}>
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                    <Edit className="w-3 h-3 text-indigo-400" /> Editor Sintaksis
                  </div>
                  <div className="text-[10px] font-mono text-slate-600">
                    Lines: {markdown === '' ? 0 : markdown.split('\n').length}
                  </div>
                </div>
                
                <textarea
                  className="w-full bg-slate-950 border border-slate-900 rounded-2xl p-5 text-xs font-mono text-indigo-200 focus:outline-none focus:border-indigo-500/40 h-[440px] resize-none leading-relaxed custom-scrollbar shadow-inner"
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder="Ketik sintaksis markdown di sini..."
                />
              </div>
            )}

            {/* Sektor Tampilan Kompilasi Visual (Live Preview Pane) */}
            {(layout === 'split' || layout === 'preview') && (
              <div className={`flex flex-col space-y-2 animate-in fade-in duration-300 ${layout === 'preview' ? 'lg:col-span-2' : ''}`}>
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                    <Eye className="w-3 h-3 text-emerald-400" /> Kompilasi Dokumen
                  </div>
                  <div className="text-[10px] font-mono text-slate-600">
                    Size: {fileSizeStr}
                  </div>
                </div>
                
                <div className="w-full h-[440px] bg-slate-950 border border-slate-900 rounded-2xl p-6 overflow-y-auto custom-scrollbar text-slate-300 space-y-2.5 font-sans relative shadow-inner">
                  {markdown.trim() === '' ? (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-700 italic text-xs select-none">
                      Menunggu entri naskah dokumen untuk di-render...
                    </div>
                  ) : (
                    parseMarkdownToHTML(markdown)
                  )}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
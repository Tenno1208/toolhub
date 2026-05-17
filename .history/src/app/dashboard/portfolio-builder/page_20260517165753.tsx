"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Download, Eye, Code, Sparkles, Plus, Trash2 } from 'lucide-react';

export default function PortfolioBuilder() {
  // State Utama Formulir
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState(''); // Dipisah koma
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  
  // State Dinamis untuk Daftar Project
  const [projects, setProjects] = useState([
    { title: '', description: '', tech: '', link: '' }
  ]);

  const addProject = () => {
    setProjects([...projects, { title: '', description: '', tech: '', link: '' }]);
  };

  const removeProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  // 🛠️ LOGIK GENERATOR HTML TEMPLATE (Minimalist Dark Mode Design)
  const generateHTML = () => {
    const skillBadges = skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name || 'Portofolio'} | ${role || 'Developer'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #020617; color: #e2e8f0; font-family: system-ui, sans-serif; }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-purple-500/30">

    <main class="max-w-4xl mx-auto px-6 pt-24 pb-16 w-full flex-grow">
        <header class="mb-12 animate-fade-in">
            <h1 class="text-4xl sm:text-6xl font-black tracking-tight text-white mb-4">${name || 'Nama Anda'}</h1>
            <p class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-6">${role || 'Keahlian / Role'}</p>
            <p class="text-slate-400 leading-relaxed max-w-2xl">${about || 'Tulis deskripsi singkat tentang diri Anda di sini.'}</p>
            
            <div class="flex gap-4 mt-6">
                ${github ? `<a href="${github}" target="_blank" class="text-sm font-semibold text-slate-300 hover:text-white transition-colors">⚡ GitHub</a>` : ''}
                ${linkedin ? `<a href="${linkedin}" target="_blank" class="text-sm font-semibold text-slate-300 hover:text-white transition-colors">🔗 LinkedIn</a>` : ''}
            </div>
        </header>

        <hr class="border-white/[0.05] mb-12">

        <section class="mb-16">
            <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Skills & Tech Stack</h2>
            <div class="flex flex-wrap gap-2">
                ${skillBadges.length > 0 ? skillBadges.map(skill => `
                    <span class="px-3.5 py-1.5 text-xs font-semibold rounded-full bg-white/[0.02] border border-white/[0.05] text-slate-300">${skill}</span>
                `).join('') : '<p class="text-sm text-slate-600">Belum ada skill ditambahkan.</p>'}
            </div>
        </section>

        <section>
            <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">Featured Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${projects.map(proj => proj.title ? `
                    <div class="p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:border-purple-500/20 transition-all">
                        <h3 class="text-lg font-bold text-white mb-2">${proj.title}</h3>
                        <p class="text-sm text-slate-400 mb-4 leading-relaxed">${proj.description}</p>
                        <div class="flex flex-wrap gap-1.5 mb-4">
                            ${proj.tech.split(',').map(t => `<span class="text-[10px] px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/10 rounded-md font-mono font-medium">${t.trim()}</span>`).join('')}
                        </div>
                        ${proj.link ? `<a href="${proj.link}" target="_blank" class="text-xs font-bold text-white hover:underline inline-flex items-center gap-1">Lihat Project &rarr;</a>` : ''}
                    </div>
                ` : '').join('')}
            </div>
        </section>
    </main>

    <footer class="w-full border-t border-white/[0.03] py-8 text-center text-xs text-slate-600 font-mono">
        &copy; ${new Date().getFullYear()} ${name || 'Portfolio'}. Generated via ToolHub.
    </footer>

</body>
</html>`;
  };

  // Fungsi Unduh File HTML
  const downloadHTML = () => {
    const htmlContent = generateHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s+/g, '-') || 'portfolio'}-index.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 selection:bg-purple-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">Instant Portfolio Builder</h1>
          </div>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* SISI KIRI: INPUT FORM */}
          <div className="space-y-6 bg-slate-900/40 border border-white/[0.03] p-6 rounded-2xl backdrop-blur-md">
            <div>
              <h2 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Informasi Dasar
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Nama Lengkap</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Jhon Doe" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Role / Titel Pekerjaan</label>
                  <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="Contoh: Full-Stack Developer / UI Specialist" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Tentang Saya (About)</label>
                  <textarea value={about} onChange={e => setAbout(e.target.value)} rows={3} placeholder="Ceritakan profil ringkas Anda..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Skills (Pisahkan dengan koma)</label>
                  <input type="text" value={skills} onChange={e => setSkills(e.target.value)} placeholder="Laravel, Next.js, Tailwind CSS, Python" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
              </div>
            </div>

            <hr class="border-white/[0.03]" />

            {/* Kontak & Sosial Media */}
            <div>
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Sosial Media</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Link GitHub</label>
                  <input type="text" value={github} onChange={e => setGithub(e.target.value)} placeholder="https://github.com/..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Link LinkedIn</label>
                  <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
              </div>
            </div>

            <hr class="border-white/[0.03]" />

            {/* Dinamis Input Project */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Project Pilihan ({projects.length})</h2>
                <button type="button" onClick={addProject} className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-bold">
                  <Plus className="w-3.5 h-3.5" /> Tambah Project
                </button>
              </div>

              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {projects.map((proj, index) => (
                  <div key={index} className="p-4 bg-slate-950 border border-slate-800 rounded-xl relative space-y-3">
                    {projects.length > 1 && (
                      <button type="button" onClick={() => removeProject(index)} className="absolute top-3 right-3 text-slate-600 hover:text-rose-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <div>
                      <input type="text" value={proj.title} onChange={e => handleProjectChange(index, 'title', e.target.value)} placeholder="Judul Project" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" />
                    </div>
                    <div>
                      <textarea value={proj.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} rows={2} placeholder="Deskripsi singkat project..." className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" value={proj.tech} onChange={e => handleProjectChange(index, 'tech', e.target.value)} placeholder="Tech (ex: Next.js, Tailwind)" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" />
                      <input type="text" value={proj.link} onChange={e => handleProjectChange(index, 'link', e.target.value)} placeholder="Link Repository / Demo" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="button" 
              onClick={downloadHTML}
              disabled={!name}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-purple-600/10 flex items-center justify-center gap-2 mt-4"
            >
              <Download className="w-4 h-4" /> Download File HTML Portofolio
            </button>
          </div>

          {/* SISI KANAN: REALTIME LIVE CODE PREVIEW */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5" /> HTML Blueprint Output
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/[0.03] text-slate-400 font-mono">index.html</span>
            </div>
            <div className="w-full bg-slate-900/20 border border-white/[0.05] rounded-2xl p-5 font-mono text-[11px] leading-relaxed text-slate-400 overflow-x-auto max-h-[580px] select-text">
              <pre className="whitespace-pre-wrap">{generateHTML()}</pre>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
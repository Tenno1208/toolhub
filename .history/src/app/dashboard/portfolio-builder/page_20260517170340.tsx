"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Download, Eye, Code, Sparkles, Plus, Trash2, Laptop, User } from 'lucide-react';

export default function PortfolioBuilder() {
  // State Utama Formulir
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null); // State untuk Foto Profil
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState(''); // Dipisah koma
  const [github, setGithub] = useState('');
  const [linkedin, setLinkedin] = useState('');
  
  // State Dinamis untuk Daftar Project
  const [projects, setProjects] = useState([
    { title: 'Project Keren Pertama', description: 'Deskripsi singkat mengenai sistem atau aplikasi luar biasa yang pernah Anda bangun.', tech: 'Next.js, Tailwind', link: '#' }
  ]);

  // Logika untuk menangani unggahan foto
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

  // 🛠️ LOGIK GENERATOR HTML TEMPLATE (Premium Minimalist Dark Mode - Versi v2 dengan Foto Profil)
  const generateHTML = () => {
    const skillBadges = skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name || 'Portofolio Resmi'} | ${role || 'Developer Profile'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #030712; color: #f3f4f6; font-family: system-ui, -apple-system, sans-serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #030712; }
        ::-webkit-scrollbar-thumb { background: #1f2937; border-radius: 999px; }
        ::-webkit-scrollbar-thumb:hover { background: #374151; }
        /* Animasi fade-in */
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between selection:bg-purple-500/30 selection:text-white">

    <div style="position: fixed; top: -10%; left: 50%; transform: translateX(-50%); width: 100%; max-width: 800px; height: 400px; background: radial-gradient(circle, rgba(147,51,234,0.08) 0%, rgba(0,0,0,0) 70%); pointer-events: none; z-index: -1;"></div>

    <main class="max-w-3xl mx-auto px-6 pt-20 pb-16 w-full flex-grow animate-fade-in">
        
        <header class="mb-14 text-center">
            <div class="mb-6 flex justify-center">
                ${profilePhoto ? `
                    <img src="${profilePhoto}" alt="Foto Profil" class="w-32 h-32 rounded-full object-cover border-4 border-white/[0.05] shadow-xl" />
                ` : `
                    <div class="w-32 h-32 rounded-full bg-slate-800 border-4 border-white/[0.05] shadow-xl flex items-center justify-center">
                        <svg class="w-16 h-16 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                `}
            </div>

            <h1 class="text-4xl sm:text-5xl font-black tracking-tight text-white mb-3">${name || 'Nama Lengkap Anda'}</h1>
            <p class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400 mb-6">${role || 'Tulis Pekerjaan / Keahlian Utama'}</p>
            <p class="text-slate-400 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">${about || 'Tulis cerita singkat, visi, atau deskripsi profesional diri Anda di sini untuk menarik perhatian klien atau perekrut.'}</p>
            
            <div class="flex gap-5 mt-8 justify-center">
                ${github ? `<a href="${github}" target="_blank" style="text-decoration: none;" class="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">💻 GitHub &rarr;</a>` : ''}
                ${linkedin ? `<a href="${linkedin}" target="_blank" style="text-decoration: none;" class="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">🔗 LinkedIn &rarr;</a>` : ''}
            </div>
        </header>

        <div style="height: 1px; background: rgba(255,255,255,0.04); width: 100%; margin-bottom: 32px;"></div>

        <section class="mb-14">
            <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 text-center sm:text-left">Core Tech Stack</h2>
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
                ${skillBadges.length > 0 ? skillBadges.map(skill => `
                    <span class="px-3.5 py-1.5 text-xs font-medium rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-300 shadow-sm">${skill}</span>
                `).join('') : `
                    <span class="px-3.5 py-1.5 text-xs font-medium rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-600">HTML5</span>
                    <span class="px-3.5 py-1.5 text-xs font-medium rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-600">CSS3</span>
                    <span class="px-3.5 py-1.5 text-xs font-medium rounded-xl bg-white/[0.02] border border-white/[0.04] text-slate-600">JavaScript</span>
                `}
            </div>
        </section>

        <section class="mb-12">
            <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6 text-center sm:text-left">Featured Projects</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                ${projects.map(proj => proj.title ? `
                    <div class="p-5 rounded-2xl border border-white/[0.03] bg-white/[0.01] hover:border-purple-500/20 transition-all duration-300">
                        <h3 class="text-base font-bold text-white mb-1.5">${proj.title}</h3>
                        <p class="text-xs text-slate-400 mb-4 leading-relaxed line-clamp-3">${proj.description}</p>
                        
                        <div class="flex flex-wrap gap-1 mb-4">
                            ${proj.tech.split(',').map(t => t.trim() ? `<span class="text-[9px] px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/10 rounded font-mono font-medium">${t}</span>` : '').join('')}
                        </div>
                        
                        ${proj.link && proj.link !== '#' ? `<a href="${proj.link}" target="_blank" style="text-decoration: none;" class="text-xs font-bold text-purple-400 hover:text-purple-300 inline-flex items-center gap-1">Open Case Study &rarr;</a>` : ''}
                    </div>
                ` : '').join('')}
            </div>
        </section>

    </main>

    <footer class="w-full border-t border-white/[0.02] py-8 text-center text-[10px] text-slate-600 font-mono tracking-wide">
        &copy; ${new Date().getFullYear()} ${name || 'Portfolio'}. Built via ToolHub Ecosystem.
    </footer>

</body>
</html>`;
  };

  // Fungsi Unduh File HTML Fisik
  const downloadHTML = () => {
    const htmlContent = generateHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.toLowerCase().replace(/\s+/g, '-') || 'index'}-portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-bold text-white">Instant Portfolio Builder v2.1</h1>
          </div>
        </div>

        {/* Workspace Layout Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= SISI KIRI: INPUT DATA FORM (5 Kolom) ================= */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/40 border border-white/[0.03] p-5 rounded-2xl backdrop-blur-md max-h-[80vh] overflow-y-auto">
            <div>
              <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Biodata Diri
              </h2>
              <div className="space-y-4">
                {/* Area Baru untuk Foto Profil */}
                <div className="flex flex-col items-center mb-6">
                  <label className="block text-[11px] font-semibold text-slate-400 mb-2">Foto Profil</label>
                  <div className="relative group">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profil" className="w-28 h-28 rounded-full object-cover border-4 border-slate-800 group-hover:opacity-70 transition-opacity" />
                    ) : (
                      <div className="w-28 h-28 rounded-full bg-slate-800 border-4 border-slate-800 shadow-xl flex items-center justify-center text-slate-600 group-hover:text-purple-400 transition-colors">
                        <User className="w-12 h-12" />
                      </div>
                    )}
                    <label htmlFor="photo-upload" className="absolute inset-0 flex items-center justify-center bg-slate-950/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <Code className="w-6 h-6 text-white" />
                    </label>
                    <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </div>
                  <label htmlFor="photo-upload" className="text-xs text-purple-400 hover:text-purple-300 font-bold mt-2.5 cursor-pointer">
                    Unggah Foto
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nama Lengkap</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Contoh: Muhammad Dimas" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Role / Kompetensi Utama</label>
                  <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="Contoh: Laravel & Next.js Specialist" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Tentang Saya (About)</label>
                  <textarea value={about} onChange={e => setAbout(e.target.value)} rows={3} placeholder="Fokus pada kode bersih dan arsitektur web modern..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Keahlian (Pisahkan dengan koma)</label>
                  <input type="text" value={skills} onChange={e => setSkills(e.target.value)} placeholder="Laravel, Next.js, Tailwind, Python, MySQL" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500" />
                </div>
              </div>
            </div>

            <hr className="border-white/[0.03]" />

            {/* Sosial Media */}
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Tautan Jejaring</h2>
              <div className="space-y-3">
                <input type="text" value={github} onChange={e => setGithub(e.target.value)} placeholder="URL GitHub (https://github.com/...)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500" />
                <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="URL LinkedIn (https://linkedin.com/in/...)" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500" />
              </div>
            </div>

            <hr className="border-white/[0.03]" />

            {/* Daftar Project */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Karya / Project ({projects.length})</h2>
                <button type="button" onClick={addProject} className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-bold">
                  <Plus className="w-3.5 h-3.5" /> Tambah
                </button>
              </div>

              <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                {projects.map((proj, index) => (
                  <div key={index} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl relative space-y-2">
                    {projects.length > 1 && (
                      <button type="button" onClick={() => removeProject(index)} className="absolute top-2.5 right-2.5 text-slate-600 hover:text-rose-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <input type="text" value={proj.title} onChange={e => handleProjectChange(index, 'title', e.target.value)} placeholder="Nama Aplikasi / Project" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none" />
                    <textarea value={proj.description} onChange={e => handleProjectChange(index, 'description', e.target.value)} rows={2} placeholder="Fungsi dan kegunaan utama..." className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none resize-none" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" value={proj.tech} onChange={e => handleProjectChange(index, 'tech', e.target.value)} placeholder="Tech (ex: React, PHP)" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none" />
                      <input type="text" value={proj.link} onChange={e => handleProjectChange(index, 'link', e.target.value)} placeholder="Link Website/Repo" className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="button" 
              onClick={downloadHTML}
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Simpan & Download Portofolio (.html)
            </button>
          </div>

          {/* ================= SISI KANAN: REAL-TIME INTERACTIVE LIVE PREVIEW (7 Kolom) ================= */}
          <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5" /> Live Interactive Web Preview
              </h2>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-medium">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
                Sinkron Aktif
              </span>
            </div>
            
            {/* Monitor Frame Glassmorphism */}
            <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/20">
              {/* Browser Header Bar Control */}
              <div className="h-10 bg-slate-900 border-b border-slate-800/80 px-4 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
                </div>
                <div className="bg-slate-950 border border-slate-800 text-[10px] text-slate-500 px-12 py-1 rounded-md font-mono truncate max-w-xs sm:max-w-sm">
                  localhost:3000/preview-client.html
                </div>
                <div className="w-4"></div>
              </div>

              {/* Iframe Utama yang merender kode HTML secara langsung */}
              <iframe 
                title="Live Portfolio Preview"
                srcDoc={generateHTML()} 
                className="w-full h-[62vh] bg-slate-950 selection:bg-purple-500/20"
                sandbox="allow-scripts"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
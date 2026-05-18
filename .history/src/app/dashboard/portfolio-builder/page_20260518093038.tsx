"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Briefcase, Download, Sparkles, Plus, Trash2, Laptop, 
  User, Instagram, Twitter, Github, Music, Mail, Globe, Link2
} from 'lucide-react';

export default function PortfolioBuilder() {
  // --- STATE DENGAN DUMMY DATA (Sesuai Gambar) ---
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [name, setName] = useState('RFF707 Creator');
  const [role, setRole] = useState('AI Specialist & Full Stack Developer');
  const [about, setAbout] = useState('Artificial Super Intelligence. Membangun ekosistem tools produktivitas masa depan.');
  const [email, setEmail] = useState('rff707@example.com');
  
  // Media Sosial
  const [ig, setIg] = useState('https://instagram.com/rff707');
  const [tw, setTw] = useState('https://twitter.com/rff707');
  const [gh, setGh] = useState('https://github.com/rff707');
  const [tk, setTk] = useState('https://tiktok.com/@rff707');
  
  // Projects
  const [projects, setProjects] = useState([
    { title: 'ToolHub Ecosystem', link: 'https://github.com/rff707/toolhub' }
  ]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const addProject = () => setProjects([...projects, { title: '', link: '' }]);
  const removeProject = (index: number) => setProjects(projects.filter((_, i) => i !== index));
  const handleProjectChange = (index: number, field: string, value: string) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    setProjects(updated);
  };

  // --- HTML GENERATOR (Premium Design) ---
  const generateHTML = () => {
    return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #030712; color: #f3f4f6; font-family: system-ui, sans-serif; }
        .glass { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); }
    </style>
</head>
<body class="min-h-screen py-20 px-6">
    <div class="max-w-2xl mx-auto text-center">
        <div class="mb-8 flex justify-center">
            ${profilePhoto ? `<img src="${profilePhoto}" class="w-32 h-32 rounded-full object-cover border-4 border-purple-500/20 shadow-2xl">` : 
            `<div class="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center border-4 border-white/5"><svg class="w-16 h-16 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>`}
        </div>

        <h1 class="text-4xl font-black mb-2 text-white">${name}</h1>
        <p class="text-purple-400 font-bold mb-4">${role}</p>
        <p class="text-slate-400 mb-8 leading-relaxed">${about}</p>

        <div class="flex flex-wrap justify-center gap-3 mb-12">
            ${ig ? `<a href="${ig}" target="_blank" class="glass px-4 py-2 rounded-xl text-sm hover:bg-white/5 transition-all">Instagram</a>` : ''}
            ${tw ? `<a href="${tw}" target="_blank" class="glass px-4 py-2 rounded-xl text-sm hover:bg-white/5 transition-all">Twitter</a>` : ''}
            ${gh ? `<a href="${gh}" target="_blank" class="glass px-4 py-2 rounded-xl text-sm hover:bg-white/5 transition-all">GitHub</a>` : ''}
            ${tk ? `<a href="${tk}" target="_blank" class="glass px-4 py-2 rounded-xl text-sm hover:bg-white/5 transition-all">TikTok</a>` : ''}
            ${email ? `<a href="mailto:${email}" class="glass px-4 py-2 rounded-xl text-sm hover:bg-white/5 transition-all">Email</a>` : ''}
        </div>

        <div class="text-left">
            <h2 class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 px-2">Karya & Project</h2>
            <div class="space-y-4">
                ${projects.map(p => p.title ? `
                <a href="${p.link}" target="_blank" class="glass p-5 rounded-2xl block hover:border-purple-500/30 transition-all group">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="font-bold text-white group-hover:text-purple-400 transition-colors">${p.title}</h3>
                            <p class="text-xs text-slate-500 truncate max-w-xs">${p.link}</p>
                        </div>
                        <span class="text-slate-600 group-hover:text-purple-400">&rarr;</span>
                    </div>
                </a>` : '').join('')}
            </div>
        </div>

        <footer class="mt-20 text-[10px] text-slate-600 font-mono tracking-widest uppercase">
            Built with ToolHub By ${name}
        </footer>
    </div>
</body>
</html>`;
  };

  const downloadHTML = () => {
    const blob = new Blob([generateHTML()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-${name.toLowerCase().replace(/\s+/g, '-')}.html`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Nav */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <h1 className="text-xl font-bold text-white">Portfolio Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- FORM PANEL (LEFT) --- */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/40 border border-white/5 p-6 rounded-3xl backdrop-blur-md overflow-y-auto max-h-[85vh]">
            
            {/* Bio Section */}
            <div className="space-y-4">
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nama Lengkap" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
              <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="Role / Keahlian" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
              <textarea value={about} onChange={e => setAbout(e.target.value)} rows={2} placeholder="Tentang Saya" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm focus:ring-1 focus:ring-purple-500 outline-none resize-none" />
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-600" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Aktif" className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-1 focus:ring-purple-500 outline-none" />
              </div>
              
              <div className="p-4 bg-slate-950 border border-dashed border-slate-800 rounded-2xl text-center">
                <input type="file" id="p-upload" hidden onChange={handlePhotoUpload} />
                <label htmlFor="p-upload" className="cursor-pointer text-xs text-slate-500 hover:text-purple-400 transition-colors">
                  {profilePhoto ? 'Ganti foto profil' : 'Klik atau drag foto profil ke sini'}
                </label>
              </div>
            </div>

            {/* Social Media Section (Sesuai Gambar) */}
            <div className="pt-4 border-t border-white/5">
              <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Media Sosial
              </h2>
              <div className="space-y-3">
                <div className="relative group">
                  <Instagram className="absolute left-4 top-3.5 w-4 h-4 text-slate-600 group-focus-within:text-pink-500 transition-colors" />
                  <input type="text" value={ig} onChange={e => setIg(e.target.value)} placeholder="Link Instagram" className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none" />
                </div>
                <div className="relative group">
                  <Twitter className="absolute left-4 top-3.5 w-4 h-4 text-slate-600 group-focus-within:text-blue-400 transition-colors" />
                  <input type="text" value={tw} onChange={e => setTw(e.target.value)} placeholder="Link Twitter" className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none" />
                </div>
                <div className="relative group">
                  <Github className="absolute left-4 top-3.5 w-4 h-4 text-slate-600 group-focus-within:text-white transition-colors" />
                  <input type="text" value={gh} onChange={e => setGh(e.target.value)} placeholder="Link GitHub" className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none" />
                </div>
                <div className="relative group">
                  <Music className="absolute left-4 top-3.5 w-4 h-4 text-slate-600 group-focus-within:text-cyan-400 transition-colors" />
                  <input type="text" value={tk} onChange={e => setTk(e.target.value)} placeholder="Link TikTok" className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none" />
                </div>
              </div>
            </div>

            {/* Project Portfolio Section */}
            <div className="pt-4 border-t border-white/5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Project Portfolio
                </h2>
                <button onClick={addProject} className="p-2 bg-purple-600/20 text-purple-400 rounded-full hover:bg-purple-600 hover:text-white transition-all shadow-lg shadow-purple-600/10">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {projects.map((p, i) => (
                  <div key={i} className="flex gap-2 items-center animate-in fade-in slide-in-from-left-2">
                    <input value={p.title} onChange={e => handleProjectChange(i, 'title', e.target.value)} placeholder="Nama Proj" className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none" />
                    <input value={p.link} onChange={e => handleProjectChange(i, 'link', e.target.value)} placeholder="Link (GitHub/Demo)" className="flex-[1.5] bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none" />
                    {projects.length > 1 && (
                      <button onClick={() => removeProject(i)} className="text-slate-600 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button (Sesuai Gambar) */}
            <button 
              onClick={downloadHTML}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] active:scale-95 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-purple-950/20 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Generate Portfolio
            </button>
          </div>

          {/* --- PREVIEW PANEL (RIGHT) --- */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Laptop className="w-4 h-4" /> Live Web Preview
              </h2>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              </div>
            </div>
            <div className="w-full h-[75vh] bg-slate-900 border border-white/5 rounded-[40px] overflow-hidden shadow-2xl relative">
              <iframe 
                srcDoc={generateHTML()} 
                className="w-full h-full border-none"
                title="Preview"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
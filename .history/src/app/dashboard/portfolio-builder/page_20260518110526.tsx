"use client";
import React, { useState } from 'react';
import Link from 'next/link';
// Kita murnikan import Lucide hanya untuk utilitas umum yang aman dari masalah lisensi brand
import { 
  ArrowLeft, Briefcase, Download, Sparkles, Plus, Trash2, Laptop, 
  User, Mail, Globe, Link2 
} from 'lucide-react';

// =========================================================================
// 🛡️ BRAND NATIVE SVG COMPONENTS (Bypass Ketiadaan Modul Ekspor Lucide-React)
// =========================================================================

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
  </svg>
);

const TwitterIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.068.069-.068 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const TikTokIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.62 4.2 1.07 1.15 2.52 1.84 4.05 2.05v3.63c-1.68-.05-3.32-.59-4.73-1.53a7.46 7.46 0 0 1-2.31-2.43v9.06c.03 1.14-.14 2.29-.53 3.37A7.472 7.472 0 0 1 8.01 23.8a7.34 7.34 0 0 1-5.18-1.54 7.488 7.488 0 0 1-2.73-5.59c-.06-1.46.33-2.93 1.11-4.17 1.01-1.54 2.61-2.61 4.41-2.96v3.7c-.85.16-1.65.61-2.22 1.28-.61.76-.88 1.73-.75 2.69.13 1.09.77 2.07 1.7 2.61a3.84 3.84 0 0 0 4.67-.5c.82-.84 1.19-2.03 1.12-3.2V.02h2.22z"/>
  </svg>
);

// =========================================================================

export default function PortfolioBuilder() {
  // --- STATE DENGAN DUMMY DATA (Sesuai Gambar) ---
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [name, setName] = useState('ToolHub Creator');
  const [role, setRole] = useState('AI Specialist & Full Stack Developer');
  const [about, setAbout] = useState('Artificial Super Intelligence. Membangun ekosistem tools produktivitas masa depan.');
  const [email, setEmail] = useState('tenoavatar@.com');
  
  // Media Sosial
  const [ig, setIg] = useState('https://www.instagram.com/tennoaja_?igsh=MWx1dWRhcnpyaHV1bw==');
  const [tw, setTw] = useState('https://x.com/Jonjon6759');
  const [gh, setGh] = useState('https://github.com/Tenno1208');
  const [tk, setTk] = useState('https://tiktok.com/@tennoreal');
  
  // Projects
  const [projects, setProjects] = useState([
    { title: 'ToolHub Ecosystem', link: 'https://github.com/Tenno1208/toolhub.git' }
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

  // --- HTML GENERATOR (Sekarang dengan Logo SVG Resmi di Hasil Website-nya) ---
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
        <p class="text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto">${about}</p>

        <div class="flex flex-wrap justify-center gap-3 mb-12">
            ${ig ? `
            <a href="${ig}" target="_blank" class="glass px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-white/5 transition-all inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <svg class="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/></svg>
                Instagram
            </a>` : ''}
            
            ${tw ? `
            <a href="${tw}" target="_blank" class="glass px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-white/5 transition-all inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <svg class="w-3.5 h-3.5 text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                Twitter
            </a>` : ''}
            
            ${gh ? `
            <a href="${gh}" target="_blank" class="glass px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-white/5 transition-all inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.068.069-.068 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                GitHub
            </a>` : ''}
            
            ${tk ? `
            <a href="${tk}" target="_blank" class="glass px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-white/5 transition-all inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <svg class="w-3.5 h-3.5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.62 4.2 1.07 1.15 2.52 1.84 4.05 2.05v3.63c-1.68-.05-3.32-.59-4.73-1.53a7.46 7.46 0 0 1-2.31-2.43v9.06c.03 1.14-.14 2.29-.53 3.37A7.472 7.472 0 0 1 8.01 23.8a7.34 7.34 0 0 1-5.18-1.54 7.488 7.488 0 0 1-2.73-5.59c-.06-1.46.33-2.93 1.11-4.17 1.01-1.54 2.61-2.61 4.41-2.96v3.7c-.85.16-1.65.61-2.22 1.28-.61.76-.88 1.73-.75 2.69.13 1.09.77 2.07 1.7 2.61a3.84 3.84 0 0 0 4.67-.5c.82-.84 1.19-2.03 1.12-3.2V.02h2.22z"/></svg>
                TikTok
            </a>` : ''}
            
            ${email ? `
            <a href="mailto:${email}" class="glass px-4 py-2.5 rounded-xl text-xs font-medium hover:bg-white/5 transition-all inline-flex items-center gap-2 text-slate-300 hover:text-white">
                <svg class="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                Email
            </a>` : ''}
        </div>

        <div class="text-left max-w-xl mx-auto">
            <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Karya & Project</h2>
            <div class="space-y-3">
                ${projects.map(p => p.title ? `
                <a href="${p.link}" target="_blank" class="glass p-4 rounded-xl block hover:border-purple-500/20 transition-all group">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">${p.title}</h3>
                            <p class="text-[11px] text-slate-500 truncate max-w-xs sm:max-w-md mt-0.5">${p.link}</p>
                        </div>
                        <span class="text-slate-600 group-hover:text-purple-400 transition-transform group-hover:translate-x-1 duration-200 text-sm">&rarr;</span>
                    </div>
                </a>` : '').join('')}
            </div>
        </div>

        <footer class="mt-20 text-[9px] text-slate-600 font-mono tracking-widest uppercase">
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

            {/* Social Media Section */}
            <div className="pt-4 border-t border-white/5">
              <h2 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4" /> Media Sosial
              </h2>
              <div className="space-y-3">
                {/* Instagram Input */}
                <div className="relative group">
                  <div className="absolute left-4 top-3.5 text-slate-600 group-focus-within:text-pink-500 transition-colors">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <input type="text" value={ig} onChange={e => setIg(e.target.value)} placeholder="Link Instagram" className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none" />
                </div>
                
                {/* Twitter / X Input */}
                <div className="relative group">
                  <div className="absolute left-4 top-3.5 text-slate-600 group-focus-within:text-sky-400 transition-colors">
                    <TwitterIcon className="w-4 h-4" />
                  </div>
                  <input type="text" value={tw} onChange={e => setTw(e.target.value)} placeholder="Link Twitter" className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none" />
                </div>
                
                {/* GitHub Input */}
                <div className="relative group">
                  <div className="absolute left-4 top-3.5 text-slate-600 group-focus-within:text-white transition-colors">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <input type="text" value={gh} onChange={e => setGh(e.target.value)} placeholder="Link GitHub" className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none" />
                </div>

                {/* TikTok Input */}
                <div className="relative group">
                  <div className="absolute left-4 top-3.5 text-slate-600 group-focus-within:text-cyan-400 transition-colors">
                    <TikTokIcon className="w-4 h-4" />
                  </div>
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

            {/* Generate Button */}
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
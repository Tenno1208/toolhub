"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Briefcase, Download, Sparkles, Plus, Trash2, Laptop, 
  User, Mail, Globe, Palette, Layout
} from 'lucide-react';

// =========================================================================
// 🛡️ BRAND NATIVE SVG COMPONENTS
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

export default function PortfolioBuilder() {
  // --- STATE DATA PROFILE ---
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [name, setName] = useState('ToolHub Creator');
  const [role, setRole] = useState('AI Specialist & Full Stack Developer');
  const [about, setAbout] = useState('Artificial Super Intelligence. Membangun ekosistem tools produktivitas masa depan.');
  const [email, setEmail] = useState('tenoavatar@gmail.com');
  const [selectedTheme, setSelectedTheme] = useState('royal'); // State tema aktif: royal, cyberpunk, light
  
  // Media Sosial
  const [ig, setIg] = useState('https://www.instagram.com/tennoaja_');
  const [tw, setTw] = useState('https://x.com/Jonjon6759');
  const [gh, setGh] = useState('https://github.com/Tenno1208');
  const [tk, setTk] = useState('https://tiktok.com/@tennoreal');
  
  // Proyek
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

  // --- HTML THEME INJECTOR GENERATOR ---
  const generateHTML = () => {
    let themeStyles = '';
    
    // Konfigurasi Variasi Skema Desain CSS Tema
    if (selectedTheme === 'royal') {
      themeStyles = `
        body { background-color: #030712; color: #f3f4f6; font-family: system-ui, sans-serif; }
        .glass { background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.05); backdrop-filter: blur(12px); }
        .accent-text { color: #a855f7; }
        .card-hover:hover { border-color: rgba(168, 85, 247, 0.3); }
      `;
    } else if (selectedTheme === 'cyberpunk') {
      themeStyles = `
        body { background-color: #000000; color: #00ff66; font-family: 'Courier New', Courier, monospace; }
        .glass { background: #050505; border: 1px solid #00ff66; box-shadow: 0 0 8px rgba(0, 255, 102, 0.2); }
        .accent-text { color: #00ff66; text-shadow: 0 0 5px #00ff66; }
        .card-hover:hover { background: #00ff66; color: #000000; }
        .card-hover:hover h3, .card-hover:hover p { color: #000000 !important; }
      `;
    } else { // Minimalist Light Theme
      themeStyles = `
        body { background-color: #f8fafc; color: #0f172a; font-family: system-ui, sans-serif; }
        .glass { background: #ffffff; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .accent-text { color: #2563eb; }
        .card-hover:hover { border-color: #2563eb; background-color: #f1f5f9; }
      `;
    }

    return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>${themeStyles}</style>
</head>
<body class="min-h-screen py-20 px-6 transition-all duration-300">
    <div class="max-w-2xl mx-auto text-center">
        
        <div class="mb-8 flex justify-center">
            ${profilePhoto ? `<img src="${profilePhoto}" class="w-32 h-32 rounded-full object-cover border-4 border-slate-800/40 shadow-2xl">` : 
            `<div class="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center border-4 border-white/5"><svg class="w-16 h-16 text-slate-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg></div>`}
        </div>

        <h1 class="text-4xl font-black mb-2">${name}</h1>
        <p class="accent-text font-bold mb-4">${role}</p>
        <p class="text-slate-400 mb-8 leading-relaxed max-w-lg mx-auto text-sm">${about}</p>

        <div class="flex flex-wrap justify-center gap-3 mb-12">
            ${ig ? `<a href="${ig}" target="_blank" class="glass px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all">Instagram</a>` : ''}
            ${tw ? `<a href="${tw}" target="_blank" class="glass px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all">Twitter</a>` : ''}
            ${gh ? `<a href="${gh}" target="_blank" class="glass px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all">GitHub</a>` : ''}
            ${tk ? `<a href="${tk}" target="_blank" class="glass px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all">TikTok</a>` : ''}
            ${email ? `<a href="mailto:${email}" class="glass px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-all">Email</a>` : ''}
        </div>

        <div class="text-left max-w-xl mx-auto">
            <h2 class="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4 px-1">Karya & Project Utama</h2>
            <div class="space-y-3">
                ${projects.map(p => p.title ? `
                <a href="${p.link}" target="_blank" class="glass card-hover p-4 rounded-xl block transition-all group">
                    <div class="flex justify-between items-center">
                        <div>
                            <h3 class="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">${p.title}</h3>
                            <p class="text-[11px] text-slate-500 truncate max-w-xs sm:max-w-md mt-0.5">${p.link}</p>
                        </div>
                        <span class="text-slate-600 text-sm">&rarr;</span>
                    </div>
                </a>` : '').join('')}
            </div>
        </div>

        <footer class="mt-20 text-[9px] text-slate-500 font-mono tracking-widest uppercase">
            Built via ToolHub Portfolio Engine By ${name}
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
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Layout className="w-5 h-5 text-purple-400 animate-pulse" />
            <h1 className="text-xl font-bold text-white tracking-tight">Portfolio Engine Builder</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* --- FORM PANEL EDITOR (LEFT - ANTI-BUG BLANK HP) --- */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/40 border border-white/[0.05] p-5 sm:p-6 rounded-3xl backdrop-blur-md overflow-y-auto max-h-[80vh] scrollbar-none shadow-2xl">
            
            {/* 🎨 FEATURE BARU: PILIHAN TEMA VARIATIF */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 pl-1">
                <Palette className="w-3.5 h-3.5 text-purple-400" /> Pilih Varian Desain Portofolio:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'royal', label: '✨ Royal' },
                  { id: 'cyberpunk', label: '🦾 Cyber' },
                  { id: 'light', label: '🍦 Light' }
                ].map(t => (
                  <button
                    key={t.id} type="button" onClick={() => setSelectedTheme(t.id)}
                    className={`p-2.5 rounded-xl font-bold text-xs border tracking-wide transition-all cursor-pointer ${selectedTheme === t.id ? 'bg-purple-600/10 border-purple-500 text-purple-400 scale-[1.02]' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Data Bio Pribadi */}
            <div className="space-y-4 pt-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 pl-1"><User className="w-3.5 h-3.5" /> Data Identitas:</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nama Lengkap" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:bg-slate-950" />
              <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="Role / Spesialisasi Keahlian" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:bg-slate-950" />
              <textarea value={about} onChange={e => setAbout(e.target.value)} rows={2} placeholder="Tulis bio singkat tentang keahlianmu..." className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:bg-slate-950 resize-none" />
              
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-600" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Alamat Email Aktif" className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/50 focus:bg-slate-950" />
              </div>
              
              <div className="p-4 bg-slate-950/60 border border-dashed border-slate-800 rounded-xl text-center">
                <input type="file" id="p-upload" hidden onChange={handlePhotoUpload} accept="image/*" />
                <label htmlFor="p-upload" className="cursor-pointer text-xs font-medium text-slate-500 hover:text-purple-400 transition-colors">
                  {profilePhoto ? '📸 Foto Berhasil Dimuat (Klik Ganti)' : '📁 Unggah & Sematkan Foto Profil'}
                </label>
              </div>
            </div>

            {/* Input Tautan Media Sosial */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1 pl-1"><Globe className="w-3.5 h-3.5" /> Jejaring Sosial (URL):</label>
              <input type="text" value={ig} onChange={e => setIg(e.target.value)} placeholder="URL Instagram" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/50 focus:bg-slate-950" />
              <input type="text" value={tw} onChange={e => setTw(e.target.value)} placeholder="URL X / Twitter" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/50 focus:bg-slate-950" />
              <input type="text" value={gh} onChange={e => setGh(e.target.value)} placeholder="URL GitHub Repository" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/50 focus:bg-slate-950" />
              <input type="text" value={tk} onChange={e => setTk(e.target.value)} placeholder="URL TikTok Profile" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500/50 focus:bg-slate-950" />
            </div>

            {/* Input Daftar Proyek Terpilih */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1 flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> Showcase Project:</label>
                <button type="button" onClick={addProject} className="p-1.5 bg-purple-600/20 text-purple-400 border border-purple-500/20 rounded-lg hover:bg-purple-600 hover:text-white transition-all cursor-pointer">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {projects.map((p, i) => (
                  <div key={i} className="flex gap-2 items-center bg-slate-950/60 p-2 border border-slate-800 rounded-xl">
                    <div className="flex-grow space-y-1.5">
                      <input value={p.title} onChange={e => handleProjectChange(i, 'title', e.target.value)} placeholder="Judul Proyek" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] outline-none focus:border-purple-500/40" />
                      <input value={p.link} onChange={e => handleProjectChange(i, 'link', e.target.value)} placeholder="URL GitHub/Demo Web" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[11px] outline-none focus:border-purple-500/40" />
                    </div>
                    {projects.length > 1 && (
                      <button type="button" onClick={() => removeProject(i)} className="text-slate-600 hover:text-red-400 p-1.5 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Ekspor Berkas HTML Mandiri */}
            <button 
              type="button" onClick={downloadHTML}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.01] active:scale-95 text-white font-black py-4 rounded-2xl text-xs sm:text-sm tracking-wide transition-all shadow-xl shadow-purple-950/30 cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> COMPILING & DOWNLOAD WEB PORTFOLIO
            </button>
          </div>

          {/* --- LIVE PREVIEW BOX PANEL (RIGHT) --- */}
          <div className="lg:col-span-7 space-y-3 flex flex-col justify-between h-full">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                <Laptop className="w-4 h-4" /> Real-time Frame Live Preview
              </h2>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500/40"></span>
                <span className="w-2 h-2 rounded-full bg-amber-500/40"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-500/40"></span>
              </div>
            </div>
            
            {/* Bingkai Rendering iFrame Kaca */}
            <div className="w-full h-[72vh] bg-slate-900 border border-white/[0.05] rounded-[32px] overflow-hidden shadow-2xl relative">
              <iframe 
                srcDoc={generateHTML()} 
                className="w-full h-full border-none bg-transparent"
                title="Portfolio Sandbox Preview"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
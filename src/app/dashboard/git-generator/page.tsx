"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, GitBranch, Copy, Check, ArrowLeft, AlertTriangle, ShieldCheck, Search } from 'lucide-react';

type Category = 'all' | 'commit' | 'branch' | 'undo' | 'remote';

interface Scenario {
  id: string;
  category: Category;
  label: string;
  description: string;
  cmdTemplate: string; // Menggunakan template placeholder seperti [branch] atau [message]
  placeholderType?: 'message' | 'branch' | 'none';
  risk: 'safe' | 'danger';
}

const SCENARIOS: Scenario[] = [
  { 
    id: 'commit-amend', 
    category: 'commit', 
    label: 'Salah ketik pesan commit terakhir', 
    description: 'Mengubah teks pesan pada commit paling akhir yang belum di-push.',
    cmdTemplate: 'git commit --amend -m "[value]"', 
    placeholderType: 'message',
    risk: 'safe' 
  },
  { 
    id: 'undo-soft', 
    category: 'undo', 
    label: 'Batalkan commit terakhir (File tetap aman)', 
    description: 'Membatalkan commit tetapi mempertahankan seluruh perubahan file Anda di dalam posisi staged.',
    cmdTemplate: 'git reset --soft HEAD~1', 
    placeholderType: 'none',
    risk: 'safe' 
  },
  { 
    id: 'undo-hard', 
    category: 'undo', 
    label: 'Hancurkan commit terakhir & buang seluruh perubahan', 
    description: 'Menghapus commit, catatan log, dan seluruh modifikasi file pengerjaan secara permanen.',
    cmdTemplate: 'git reset --hard HEAD~1', 
    placeholderType: 'none',
    risk: 'danger' 
  },
  { 
    id: 'delete-local', 
    category: 'branch', 
    label: 'Hapus branch lokal secara paksa', 
    description: 'Menghapus cabang pengerjaan di komputer lokal Anda, bahkan jika belum di-merge.',
    cmdTemplate: 'git branch -D [value]', 
    placeholderType: 'branch',
    risk: 'danger' 
  },
  { 
    id: 'delete-remote', 
    category: 'remote', 
    label: 'Hapus branch di remote repository (GitHub)', 
    description: 'Menghapus referensi cabang yang ada di server awan (origin/remote).',
    cmdTemplate: 'git push origin --delete [value]', 
    placeholderType: 'branch',
    risk: 'danger' 
  },
  { 
    id: 'discard-all', 
    category: 'undo', 
    label: 'Buang seluruh perubahan lokal yang belum di-commit', 
    description: 'Mengembalikan seluruh kondisi file ke titik commit terakhir tanpa menyimpan sisa pengerjaan.',
    cmdTemplate: 'git restore .', 
    placeholderType: 'none',
    risk: 'danger' 
  },
  { 
    id: 'rename-branch', 
    category: 'branch', 
    label: 'Ganti nama branch saat ini', 
    description: 'Mengubah penamaan cabang pengerjaan lokal yang sedang aktif saat ini.',
    cmdTemplate: 'git branch -m [value]', 
    placeholderType: 'branch',
    risk: 'safe' 
  },
  { 
    id: 'pull-force', 
    category: 'remote', 
    label: 'Timpa total branch lokal dengan data dari GitHub', 
    description: 'Mengambil data terbaru dari remote dan memaksa branch lokal sama persis tanpa konflik.',
    cmdTemplate: 'git fetch origin && git reset --hard origin/[value]', 
    placeholderType: 'branch',
    risk: 'danger' 
  }
];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'commit', label: 'Commit' },
  { id: 'branch', label: 'Branch' },
  { id: 'undo', label: 'Undo / Reset' },
  { id: 'remote', label: 'Remote' },
];

export default function GitGenerator() {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScen, setSelectedScen] = useState<Scenario | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [generatedCmd, setGeneratedCmd] = useState('');
  const [copied, setCopied] = useState(false);

  // Filter skenario berdasarkan tab kategori aktif & search bar
  const filteredScenarios = SCENARIOS.filter(scen => {
    const matchesTab = activeTab === 'all' || scen.category === activeTab;
    const matchesSearch = scen.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          scen.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Efek untuk memproses kustomisasi variabel perintah secara real-time
  useEffect(() => {
    if (!selectedScen) return;
    
    if (selectedScen.placeholderType !== 'none') {
      const fallback = selectedScen.placeholderType === 'message' ? 'fitur_baru' : 'main';
      const finalVal = inputValue.trim() || fallback;
      setGeneratedCmd(selectedScen.cmdTemplate.replace('[value]', finalVal));
    } else {
      setGeneratedCmd(selectedScen.cmdTemplate);
    }
  }, [selectedScen, inputValue]);

  // Reset input kustom ketika skenario berubah
  const handleSelectScenario = (scen: Scenario) => {
    setSelectedScen(scen);
    setInputValue('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-bold text-white">Git Command Generator</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Panel Kiri: Navigasi Skenario Masalah */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 space-y-4 shadow-xl backdrop-blur-sm">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text"
                placeholder="Cari solusi masalah Git..."
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Kategori */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all shrink-0 cursor-pointer ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-950 border border-slate-800/60 text-slate-400 hover:text-slate-200'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* List Skenario */}
            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredScenarios.length > 0 ? (
                filteredScenarios.map((scen) => (
                  <button
                    key={scen.id}
                    onClick={() => handleSelectScenario(scen)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer block space-y-1 ${selectedScen?.id === scen.id ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-inner' : 'bg-slate-950 border-slate-800/60 text-slate-400 hover:border-white/10 hover:text-slate-200'}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs font-semibold text-slate-200 block">{scen.label}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 tracking-wider ${scen.risk === 'danger' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                        {scen.risk === 'danger' ? 'Risiko' : 'Aman'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{scen.description}</p>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-600 font-medium">Skenario tidak ditemukan.</div>
              )}
            </div>
          </div>

          {/* Panel Kanan: Hasil & Modifikasi Karakter Perintah */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            {selectedScen ? (
              <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 shadow-xl backdrop-blur-sm h-full flex flex-col justify-between space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                
                {/* Atur Variabel Tambahan */}
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Konfigurasi Perintah
                  </div>
                  
                  {selectedScen.placeholderType !== 'none' ? (
                    <div className="space-y-1.5">
                      <label className="block text-xs font-medium text-slate-400 capitalize">
                        Masukkan Nama {selectedScen.placeholderType === 'message' ? 'Pesan Commit' : 'Branch'}:
                      </label>
                      <input 
                        type="text"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500/50 font-mono"
                        placeholder={selectedScen.placeholderType === 'message' ? 'Contoh: perbaiki-bug-auth' : 'Contoh: feature/login'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="bg-slate-950 border border-slate-800/60 rounded-xl p-3 flex gap-2.5 items-start">
                      {selectedScen.risk === 'danger' ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-slate-400 leading-relaxed"><span className="text-amber-400 font-semibold">Perhatian:</span> Eksekusi perintah ini akan menimpa/menghapus riwayat pengerjaan lokal Anda secara langsung.</p>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <p className="text-[11px] text-slate-400 leading-relaxed"><span className="text-emerald-400 font-semibold">Aman:</span> Perintah ini tidak merusak atau menghilangkan file pengerjaan utama Anda di direktori lokal.</p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Tampilan Terminal Output */}
                <div className="space-y-2 mt-auto">
                  <label className="block text-xs font-medium text-slate-500">Siap Salin & Jalankan:</label>
                  <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4 space-y-3 shadow-inner">
                    <div className="font-mono text-xs text-indigo-400 break-all select-all min-h-[40px] flex items-center leading-relaxed">
                      $ {generatedCmd}
                    </div>
                    <button
                      onClick={handleCopy}
                      className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-xl text-xs font-semibold transition-all shadow-md cursor-pointer active:scale-[0.98]"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300" />
                          <span>Berhasil Disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Salin Perintah</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="border border-dashed border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center h-full min-h-[250px] bg-slate-900/10">
                <Terminal className="w-8 h-8 text-slate-700 mb-2 stroke-[1.5]" />
                <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed">Silakan pilih skenario masalah di panel kiri untuk menjana baris perintah.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
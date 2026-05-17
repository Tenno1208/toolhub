"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function AgeCalculatorTool() {
  const [dob, setDob] = useState('');
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);

  const calculateAge = (dateString: string) => {
    if (!dateString) return;
    
    const today = new Date();
    const birthDate = new Date(dateString);
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      // Dapatkan jumlah hari di bulan sebelumnya
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
    calculateAge(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-teal-400" />
              <h1 className="text-2xl font-bold text-white">Age Calculator</h1>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-10">
          
          {/* Input Area */}
          <div className="mb-10 text-center">
            <label className="block text-sm font-medium text-slate-400 mb-4 uppercase tracking-widest">
              Masukkan Tanggal Lahir
            </label>
            <input 
              type="date"
              value={dob}
              onChange={handleDateChange}
              max={new Date().toISOString().split('T')[0]}
              className="w-full sm:w-auto bg-slate-950 border border-slate-700 rounded-xl px-6 py-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all [&::-webkit-calendar-picker-indicator]:filter-[invert(1)] cursor-pointer shadow-inner"
            />
          </div>

          {/* Result Area */}
          {age ? (
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8">
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-teal-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="text-4xl sm:text-6xl font-bold text-white mb-2">{age.years}</span>
                <span className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest">Tahun</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-teal-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="text-4xl sm:text-6xl font-bold text-white mb-2">{age.months}</span>
                <span className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest">Bulan</span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-teal-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="text-4xl sm:text-6xl font-bold text-white mb-2">{age.days}</span>
                <span className="text-xs sm:text-sm text-slate-400 uppercase tracking-widest">Hari</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 flex flex-col items-center justify-center text-slate-600">
              <User className="w-16 h-16 mb-4 opacity-20" />
              <p>Pilih tanggal lahir untuk melihat rincian usiamu.</p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
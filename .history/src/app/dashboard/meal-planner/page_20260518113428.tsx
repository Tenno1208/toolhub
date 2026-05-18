"use client";
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Utensils, Plus, Trash2 } from 'lucide-react';

export default function MealPlanner() {
  const [meals, setMeals] = useState<{ name: string, cal: number }[]>([
    { name: 'Nasi Goreng + Telur Ceplok', cal: 450 }
  ]);
  const [foodName, setFoodName] = useState('');
  const [foodCal, setFoodCal] = useState('');

  const addMeal = () => {
    if (foodName && foodCal) {
      setMeals([...meals, { name: foodName, cal: parseInt(foodCal) }]);
      setFoodName(''); setFoodCal('');
    }
  };

  const totalCal = meals.reduce((sum, item) => sum + item.cal, 0);

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-400" />
          </Link>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-orange-400" />
            <h1 className="text-xl font-bold text-white">Meal & Calorie Planner</h1>
          </div>
        </div>

        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="text" placeholder="Nama makanan..." className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none" value={foodName} onChange={e => setFoodName(e.target.value)} />
            <input type="number" placeholder="Kalori (kcal)..." className="sm:w-32 bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none" value={foodCal} onChange={e => setFoodCal(e.target.value)} />
            <button onClick={addMeal} className="bg-orange-500 text-slate-950 font-black px-4 py-3 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer"><Plus className="w-4 h-4 stroke-[2.5]" /> Tambah</button>
          </div>

          <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 max-h-44 overflow-y-auto space-y-1.5">
            {meals.map((m, i) => (
              <div key={i} className="flex justify-between items-center bg-white/[0.01] px-3 py-2 rounded-lg text-xs">
                <span className="text-slate-300 font-medium">{m.name}</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-orange-400 font-bold">{m.cal} kcal</span>
                  <button onClick={() => setMeals(meals.filter((_, idx) => idx !== i))} className="text-slate-600 hover:text-red-400 cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/5 text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Konsumsi Kalori Hari Ini:</p>
            <h3 className="text-2xl font-black text-white font-mono mt-0.5">{totalCal} <span className="text-xs font-normal text-slate-400">kcal</span></h3>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckSquare, Plus, Trash2, Circle, CheckCircle2, ListFilter, Sparkles } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type FilterMode = 'all' | 'active' | 'completed';

export default function TodoTool() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data dari Local Storage saat pertama kali dibuka
  useEffect(() => {
    const saved = localStorage.getItem('toolhub_todos');
    if (saved) setTodos(JSON.parse(saved));
    setIsLoaded(true);
  }, []);

  // Simpan ke Local Storage setiap ada perubahan
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('toolhub_todos', JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]); // Tugas baru muncul paling atas
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // Filter Logik
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;
  
  // Hitung persentase progress untuk bar
  const progressPercentage = todos.length > 0 
    ? Math.round((completedCount / todos.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-400" />
              <h1 className="text-xl font-bold text-white">Task Management</h1>
            </div>
          </div>
          
          <div className="text-xs font-mono text-slate-500 bg-slate-900/60 border border-slate-800/80 px-3 py-1.5 rounded-full flex items-center gap-2 self-start sm:self-auto">
            <span>{completedCount} dari {todos.length} Tugas Selesai</span>
          </div>
        </div>

        {/* Card Utama */}
        <div className="bg-slate-900/40 border border-white/[0.05] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-sm">
          
          {/* Progress Bar Indikator */}
          {todos.length > 0 && (
            <div className="space-y-1.5 animate-in fade-in duration-300">
              <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-indigo-400" /> Progress Kerja</span>
                <span className="text-indigo-400 font-mono">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden p-[2px] border border-slate-900">
                <div 
                  className="h-full rounded-full bg-indigo-500 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Input Area Form */}
          <form onSubmit={addTodo} className="relative">
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Tulis list target pengerjaan harimu..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 pl-5 pr-14 focus:outline-none focus:border-indigo-500/50 transition-all text-xs text-white placeholder:text-slate-700 font-medium"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 disabled:text-slate-700 text-white rounded-xl transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </form>

          {/* Toolbar Navigasi & Filter Aksi */}
          <div className="flex items-center justify-between pt-2 gap-2 border-b border-slate-800/50 pb-4">
            <div className="flex bg-slate-950 border border-slate-800 p-1 rounded-xl">
              {([
                { id: 'all', label: 'Semua' },
                { id: 'active', label: 'Aktif' },
                { id: 'completed', label: 'Selesai' }
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilter(tab.id)}
                  className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg transition-all cursor-pointer ${filter === tab.id ? 'bg-indigo-600 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {completedCount > 0 && (
              <button
                type="button"
                onClick={clearCompleted}
                className="text-[11px] font-bold text-rose-500 hover:text-rose-400 transition-colors bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 px-3 py-2 rounded-xl cursor-pointer"
              >
                Clear Selesai
              </button>
            )}
          </div>

          {/* Task Render List Area */}
          <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 border border-slate-800/40 border-dashed rounded-2xl bg-slate-950/20">
                <p className="text-xs text-slate-500 font-medium">
                  {filter === 'all' && 'Belum ada tugas. Nikmati harimu!'}
                  {filter === 'active' && 'Tidak ada tugas aktif tersisa.'}
                  {filter === 'completed' && 'Belum ada tugas pengerjaan yang selesai.'}
                </p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div 
                  key={todo.id} 
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    todo.completed 
                      ? 'bg-slate-950/40 border-slate-900/60 opacity-50' 
                      : 'bg-slate-950 border-slate-800/80 hover:border-indigo-500/20'
                  }`}
                >
                  <div 
                    className="flex items-center gap-3.5 cursor-pointer flex-grow select-none"
                    onClick={() => toggleTodo(todo.id)}
                  >
                    <button type="button" className="focus:outline-none transition-colors shrink-0">
                      {todo.completed 
                        ? <CheckCircle2 className="w-5 h-5 text-indigo-500" /> 
                        : <Circle className="w-5 h-5 text-slate-600 hover:text-indigo-400" />
                      }
                    </button>
                    <span className={`text-xs font-medium transition-all break-all ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                      {todo.text}
                    </span>
                  </div>
                  
                  <button 
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    className="p-1.5 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors focus:outline-none shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
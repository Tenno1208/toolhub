"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckSquare, Plus, Trash2, Circle, CheckCircle2 } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoTool() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
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
    setTodos([...todos, newTodo]);
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

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-12 px-4 sm:px-8 text-slate-200">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="p-2 bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </Link>
            <div className="flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-indigo-400" />
              <h1 className="text-2xl font-bold text-white">To-Do List</h1>
            </div>
          </div>
          <div className="text-sm text-slate-500 font-medium bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
            {todos.filter(t => t.completed).length} / {todos.length} Selesai
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={addTodo} className="relative mb-8">
          <input 
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Tambahkan tugas baru..."
            className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white placeholder:text-slate-600 shadow-lg"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-xl transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        {/* List Area */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-12 border border-slate-800/50 border-dashed rounded-3xl bg-slate-900/20">
              <p className="text-slate-500">Belum ada tugas. Nikmati harimu!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div 
                key={todo.id} 
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                  todo.completed 
                    ? 'bg-slate-900/30 border-slate-800/50 opacity-60' 
                    : 'bg-slate-900/80 border-slate-700 hover:border-indigo-500/30'
                }`}
              >
                <div 
                  className="flex items-center gap-4 cursor-pointer flex-grow"
                  onClick={() => toggleTodo(todo.id)}
                >
                  <button className="focus:outline-none transition-colors">
                    {todo.completed 
                      ? <CheckCircle2 className="w-6 h-6 text-indigo-500" /> 
                      : <Circle className="w-6 h-6 text-slate-500 hover:text-indigo-400" />
                    }
                  </button>
                  <span className={`text-sm sm:text-base transition-all ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors focus:outline-none"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
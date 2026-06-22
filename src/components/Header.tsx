import { Bell, Menu, Mic, Search, Video, User } from 'lucide-react';
import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface HeaderProps {
  onMenuClick: () => void;
  onSearch: (query: string) => void;
  query: string;
}

export function Header({ onMenuClick, onSearch, query }: HeaderProps) {
  const [localQuery, setLocalQuery] = useState(query);
  const [isFocused, setIsFocused] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      onSearch(localQuery);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-[#0f0f0f] z-20">
      <div className="flex items-center gap-4 w-1/4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-white/10 rounded-full hidden sm:block text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">TechTube</span>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 max-w-xl px-12">
        <form 
          onSubmit={handleSubmit}
          className="relative w-full"
        >
          <input 
            type="text" 
            placeholder="Search Tech Tutorials, Programming, Engineering..." 
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full bg-[#121212] border border-[#303030] rounded-l-full py-2 px-6 focus:outline-none focus:border-[#1c62b9] transition-all text-[16px] text-white"
          />
          <button 
            type="submit"
            className="absolute right-0 top-0 bottom-0 bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 text-white/80 cursor-pointer hover:bg-[#303030] transition-colors"
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      <div className="flex items-center justify-end gap-6 w-1/4">
        <button className="text-white/80 hover:text-white transition-colors hidden sm:block">
          <Video size={24} />
        </button>
        
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="text-white/80 hover:text-white transition-colors relative hidden sm:block"
          >
            <Bell size={24} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0f0f0f]"></span>
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-4 w-80 bg-[#0f0f0f]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
              <h3 className="px-4 py-2 text-sm font-bold border-b border-white/5 text-white">Notifications</h3>
              <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer border-l-2 border-indigo-500">
                <p className="text-sm text-white/90">Welcome to <span className="font-bold text-indigo-400">TechTube</span>! An educational platform for tech students.</p>
                <p className="text-[10px] text-white/50 mt-2">Just now</p>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 border-2 border-white/20 cursor-pointer block"
          />
          {showProfile && (
            <div className="absolute top-full right-0 mt-4 w-64 bg-[#0f0f0f]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">Student User</p>
                  <p className="text-xs text-white/50">@arjuna_student</p>
                </div>
              </div>
              <div className="py-2">
                <button className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors">Your channel</button>
                <button className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors">Settings</button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors mt-2 border-t border-white/5 pt-3">Sign out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

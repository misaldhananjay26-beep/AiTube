import { BookOpen, Compass, Flame, History, Home, Laptop, PlaySquare, Rocket, Settings, Sparkles, Terminal, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  activeCategory: string;
  onCategorySelect: (category: string) => void;
  currentView: 'feed' | 'history';
  onViewSelect: (view: 'feed' | 'history') => void;
}

export const CATEGORIES = [
  { name: 'Home', icon: Home, query: 'ai tech startups OR llm OR machine learning expert' },
  { name: 'Zero to Expert', icon: Rocket, query: 'zero to expert tech tutorial full course full 2026' },
  { name: 'AI from Zero', icon: Sparkles, query: 'ai from zero to expert full course' },
  { name: 'Tech from Zero', icon: Laptop, query: 'tech from zero to expert programming' },
  { name: 'Startups', icon: Zap, query: 'tech startup advice ycombinator ai startup' },
  { name: 'LLMs', icon: Terminal, query: 'large language models tutorial technical' },
  { name: 'Machine Learning', icon: BookOpen, query: 'machine learning roadmap course' },
] as const;

export function Sidebar({ isOpen, activeCategory, onCategorySelect, currentView, onViewSelect }: SidebarProps) {
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-40 bg-black/20 border-r border-white/5 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 hidden sm:flex flex-col overflow-y-auto",
        !isOpen ? "sm:w-20 md:w-20 pt-16" : "w-64 pt-6"
      )}
    >
      <div className="flex flex-col gap-1 p-4 w-full h-full pb-20">
        {CATEGORIES.map((cat) => {
          const isActive = currentView === 'feed' && activeCategory === cat.query;
          const Icon = cat.icon;
          
          return (
            <button
              key={cat.name}
              onClick={() => {
                onViewSelect('feed');
                onCategorySelect(cat.query);
              }}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all",
                isActive 
                  ? "bg-white/10 font-medium text-white" 
                  : "text-white/60 hover:bg-white/5",
                !isOpen && "justify-center px-0"
              )}
              title={!isOpen ? cat.name : undefined}
            >
              <Icon size={20} className={cn(isActive && "text-white")} />
              {isOpen && <span className="truncate">{cat.name}</span>}
            </button>
          );
        })}

        {isOpen && <div className="my-4 h-px bg-white/10" />}
        
        {isOpen && (
          <>
            <span className="px-4 text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 mt-2">Explore</span>
            <button 
              onClick={() => {
                onViewSelect('feed');
                onCategorySelect('trending ai news');
              }}
              className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 rounded-xl text-sm text-white/60 transition-all"
            >
              <Compass size={20} />
              <span>Trending AI</span>
            </button>
            <button className="flex items-center gap-4 px-4 py-3 hover:bg-white/5 rounded-xl text-sm text-white/60 transition-all cursor-not-allowed opacity-50">
              <PlaySquare size={20} />
              <span>Your Library</span>
            </button>
            <button 
              onClick={() => onViewSelect('history')}
              className={cn(
                "flex items-center gap-4 px-4 py-3 hover:bg-white/5 rounded-xl text-sm transition-all",
                currentView === 'history' ? "bg-white/10 font-medium text-white" : "text-white/60"
              )}
            >
              <History size={20} className={cn(currentView === 'history' && "text-white")} />
              <span>History</span>
            </button>
          </>
        )}
      </div>
    </aside>
  );
}

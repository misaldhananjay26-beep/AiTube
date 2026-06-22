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
  { name: 'Home', icon: Home, query: 'tech tutorial programming course web development machine learning data structures' },
  { name: 'Web Development', icon: Laptop, query: 'web development full course react html css nodejs' },
  { name: 'Machine Learning', icon: Sparkles, query: 'machine learning roadmap ai tutorial python' },
  { name: 'Data Science', icon: BookOpen, query: 'data science full course python sql' },
  { name: 'Cybersecurity', icon: Terminal, query: 'cybersecurity full course ethical hacking' },
  { name: 'Cloud Computing', icon: Zap, query: 'aws azure gcp cloud computing full course' },
  { name: 'Mobile Dev', icon: Rocket, query: 'flutter react native android ios full course' },
] as const;

export function Sidebar({ isOpen, activeCategory, onCategorySelect, currentView, onViewSelect }: SidebarProps) {
  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-40 bg-[#0f0f0f] transition-transform duration-300 ease-in-out md:relative md:translate-x-0 hidden sm:flex flex-col overflow-y-auto",
        !isOpen ? "sm:w-20 md:w-20 pt-16" : "w-64 pt-6"
      )}
    >
      <div className="flex flex-col gap-1 p-3 w-full h-full pb-20">
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
                "flex items-center gap-4 px-3 py-2 rounded-lg text-sm transition-all",
                isActive 
                  ? "bg-white/10 font-medium text-white" 
                  : "text-white/80 hover:bg-white/10",
                !isOpen && "justify-center px-0 flex-col gap-1 py-4 text-[10px]"
              )}
              title={!isOpen ? cat.name : undefined}
            >
              <Icon size={!isOpen ? 24 : 20} className={cn(isActive ? "text-white" : "text-white/80")} />
              {isOpen ? <span className="truncate">{cat.name}</span> : <span className="truncate w-full text-center">{cat.name}</span>}
            </button>
          );
        })}

        {isOpen && <div className="my-3 h-px bg-white/10 mx-2" />}
        
        {isOpen && (
          <>
            <span className="px-3 text-base font-medium text-white mb-1 mt-2">Explore</span>
            <button 
              onClick={() => {
                onViewSelect('feed');
                onCategorySelect('trending tech programming');
              }}
              className="flex items-center gap-4 px-3 py-2 hover:bg-white/10 rounded-lg text-sm text-white/80 transition-all"
            >
              <Compass size={20} />
              <span>Trending</span>
            </button>
            <button className="flex items-center gap-4 px-3 py-2 hover:bg-white/10 rounded-lg text-sm text-white/80 transition-all cursor-not-allowed opacity-50">
              <PlaySquare size={20} />
              <span>Your Library</span>
            </button>
            <button 
              onClick={() => onViewSelect('history')}
              className={cn(
                "flex items-center gap-4 px-3 py-2 hover:bg-white/10 rounded-lg text-sm transition-all",
                currentView === 'history' ? "bg-white/10 font-medium text-white" : "text-white/80"
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

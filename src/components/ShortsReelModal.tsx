import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { YouTubeVideo } from '../types';

interface ShortsReelModalProps {
  shorts: YouTubeVideo[];
  initialIndex: number;
  onClose: () => void;
  onVideoWatch: (video: YouTubeVideo) => void;
}

export function ShortsReelModal({ shorts, initialIndex, onClose, onVideoWatch }: ShortsReelModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [playingIndex, setPlayingIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [onClose]);

  useEffect(() => {
    if (shorts[playingIndex]) {
      onVideoWatch(shorts[playingIndex]);
    }
  }, [playingIndex, shorts, onVideoWatch]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
    if (index !== currentIndex && index >= 0 && index < shorts.length) {
      setCurrentIndex(index);
    }

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setPlayingIndex(index);
    }, 300);
  };

  const scrollToNext = () => {
    if (currentIndex < shorts.length - 1 && containerRef.current) {
       containerRef.current.scrollTo({ top: (currentIndex + 1) * containerRef.current.clientHeight, behavior: 'smooth' });
    }
  };

  const scrollToPrev = () => {
    if (currentIndex > 0 && containerRef.current) {
       containerRef.current.scrollTo({ top: (currentIndex - 1) * containerRef.current.clientHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = currentIndex * containerRef.current.clientHeight;
    }
  }, []); // Only scroll to initial index on mount

  if (!shorts || shorts.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f0f]/95 backdrop-blur-xl animate-in fade-in duration-200">
       <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors z-50 shadow-xl"
      >
        <X size={24} />
      </button>

      {/* Navigation Buttons for Desktop */}
      <div className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50 hidden sm:flex">
         <button 
           onClick={scrollToPrev} 
           className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-lg text-white disabled:opacity-30 transition-all border border-white/10" 
           disabled={currentIndex === 0}
         >
           <ChevronUp size={28} />
         </button>
         <button 
           onClick={scrollToNext} 
           className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-lg text-white disabled:opacity-30 transition-all border border-white/10" 
           disabled={currentIndex === shorts.length - 1}
         >
           <ChevronDown size={28} />
         </button>
      </div>

      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="relative w-full max-w-[450px] h-full overflow-y-auto no-scrollbar snap-y snap-mandatory"
      >
        {shorts.map((short, idx) => {
          const isPlaying = idx === playingIndex;
          const videoId = typeof short.id === 'string' ? short.id : (short.id as any).videoId;
          const thumbnailUrl = short.snippet.thumbnails.maxres?.url || short.snippet.thumbnails.high?.url || short.snippet.thumbnails.medium.url;

          return (
            <div key={videoId} className="w-full h-full snap-start flex items-center justify-center py-6 px-2 sm:px-4 relative">
               <div className="relative w-full h-full max-h-[85vh] sm:max-h-[850px] min-h-[500px] bg-[#0f0f0f] rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl border border-[#303030] flex flex-col group">
                <div className="flex-1 w-full bg-black relative">
                  {isPlaying ? (
                    <iframe 
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&controls=1&modestbranding=1&mute=0&loop=1&playlist=${videoId}`}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img 
                      src={thumbnailUrl} 
                      alt={short.snippet.title}
                      className="w-full h-full object-cover opacity-50"
                    />
                  )}
                </div>
                
                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent pointer-events-none">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500 overflow-hidden flex items-center justify-center shrink-0">
                      <span className="text-white font-bold text-sm uppercase">
                        {short.snippet.channelTitle.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-base shadow-sm">
                      @{short.snippet.channelTitle}
                    </h3>
                  </div>
                  <h2 className="text-white text-sm font-medium line-clamp-2 shadow-sm">
                    {short.snippet.title}
                  </h2>
                </div>
              </div>

              {/* Navigation Buttons for Mobile */}
              <div className="absolute right-4 bottom-28 flex flex-col gap-4 z-10 sm:hidden">
                 <button 
                   onClick={scrollToPrev} 
                   className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-lg text-white disabled:opacity-30 border border-white/10" 
                   disabled={currentIndex === 0}
                 >
                   <ChevronUp size={24} />
                 </button>
                 <button 
                   onClick={scrollToNext} 
                   className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full shadow-lg text-white disabled:opacity-30 border border-white/10" 
                   disabled={currentIndex === shorts.length - 1}
                 >
                   <ChevronDown size={24} />
                 </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

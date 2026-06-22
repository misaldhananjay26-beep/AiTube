import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { YouTubeVideo } from '../types';

interface PlayerModalProps {
  video: YouTubeVideo | null;
  onClose: () => void;
  onWatch?: (video: YouTubeVideo) => void;
}

export function PlayerModal({ video, onClose, onWatch }: PlayerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (video) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [video, onClose]);

  useEffect(() => {
    if (video && onWatch) {
      onWatch(video);
    }
  }, [video, onWatch]);

  if (!video) return null;

  const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={onClose}
      />
      <div 
        ref={modalRef}
        className="relative w-full max-w-5xl bg-[#0f0f0f] rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 animate-in zoom-in-95 duration-200 border border-[#303030]"
      >
        <div className="flex items-center justify-between p-4 border-b border-[#303030] bg-[#0f0f0f]">
          <h2 className="text-white font-medium truncate pr-4">{video.snippet.title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div className="relative w-full aspect-video bg-black">
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.snippet.title}
          />
        </div>
        <div className="p-4 sm:p-6 bg-[#0f0f0f] max-h-[30vh] overflow-y-auto">
          <div className="flex items-center gap-4 mb-4">
             <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="text-white font-bold">{video.snippet.channelTitle.charAt(0)}</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{video.snippet.channelTitle}</h3>
              <p className="text-white/50 text-sm">Channel</p>
            </div>
          </div>
          <div className="bg-[#272727] p-4 rounded-xl text-sm text-white whitespace-pre-wrap font-sans leading-relaxed border border-[#303030]">
            {video.snippet.description || 'No description available.'}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { PlayerModal } from './components/PlayerModal';
import { ShortsCard } from './components/ShortsCard';
import { ShortsReelModal } from './components/ShortsReelModal';
import { CATEGORIES, Sidebar } from './components/Sidebar';
import { TopicChips } from './components/TopicChips';
import { VideoCard } from './components/VideoCard';
import { useHistory } from './hooks/useHistory';
import { YouTubeVideo } from './types';
import { Flame, History as HistoryIcon } from 'lucide-react';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState<'feed' | 'history'>('feed');
  const [activeCategoryQuery, setActiveCategoryQuery] = useState(CATEGORIES[0].query);
  const [searchQuery, setSearchQuery] = useState(CATEGORIES[0].query);
  const [activeChip, setActiveChip] = useState('All');
  
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [shorts, setShorts] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [activeShortsPayload, setActiveShortsPayload] = useState<{ shorts: YouTubeVideo[], initialIndex: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const { history, addToHistory, clearHistory } = useHistory();

  // Fetch standard videos
  useEffect(() => {
    if (currentView !== 'feed') return;
    
    async function fetchVideos() {
      setIsLoading(true);
      setError(null);
      try {
        let data;
        const query = searchQuery;
        try {
          const res = await fetch(`/api/videos?maxResults=100&q=${encodeURIComponent(query)}`);
          if (!res.ok) throw new Error('API route not available');
          data = await res.json();
          if (data.error) throw new Error(data.error);
        } catch (fetchError) {
          console.warn("Falling back to mock data:", fetchError);
          const { mockVideos } = await import('../mockData');
          data = { items: mockVideos(20, query) };
        }
        setVideos(data.items || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Error loading videos. Please check your API key.');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchVideos();
  }, [searchQuery, currentView]);

  // Fetch shorts
  useEffect(() => {
    if (currentView !== 'feed') return;

    async function fetchShorts() {
      try {
        let data;
        const query = `${activeCategoryQuery} shorts vertical`;
        try {
          const res = await fetch(`/api/videos?maxResults=50&videoDuration=short&q=${encodeURIComponent(query)}`);
          if (!res.ok) throw new Error('API route not available');
          data = await res.json();
        } catch (fetchError) {
          console.warn("Falling back to mock shorts:", fetchError);
          const { mockShorts } = await import('../mockData');
          data = { items: mockShorts(15) };
        }
        setShorts(data.items || []);
      } catch (error) {
        console.error('Failed to fetch shorts', error);
      }
    }
    fetchShorts();
  }, [activeCategoryQuery, currentView]);

  const handleSearch = (query: string) => {
    setCurrentView('feed');
    setActiveChip('');
    setSearchQuery(query);
  };

  const handleCategorySelect = (query: string) => {
    setActiveCategoryQuery(query);
    setSearchQuery(query);
    setActiveChip('All');
  };

  const handleChipSelect = (topic: string) => {
    setActiveChip(topic);
    if (topic === 'All') {
      setSearchQuery(activeCategoryQuery);
    } else {
      setSearchQuery(`${topic} ai start up tech tutorial`);
    }
  };

  const handleShortClick = (video: YouTubeVideo) => {
    const idx = displayShorts.findIndex(s => {
      const vId = typeof s.id === 'string' ? s.id : (s.id as any).videoId;
      const targetId = typeof video.id === 'string' ? video.id : (video.id as any).videoId;
      return vId === targetId;
    });
    if (idx !== -1) {
      setActiveShortsPayload({ shorts: displayShorts, initialIndex: idx });
    }
  };

  const watchedIds = new Set(history.map(v => typeof v.id === 'string' ? v.id : (v.id as any).videoId));

  const displayVideos = videos.filter(v => {
    const id = typeof v.id === 'string' ? v.id : (v.id as any).videoId;
    return !watchedIds.has(id);
  });

  const displayShorts = shorts.filter(v => {
    const id = typeof v.id === 'string' ? v.id : (v.id as any).videoId;
    return !watchedIds.has(id);
  });

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col font-sans overflow-hidden">
      <Header 
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onSearch={handleSearch}
        query={activeChip === 'All' ? '' : activeChip}
      />
      
      <div className="flex flex-1 pt-16 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeCategory={activeCategoryQuery}
          onCategorySelect={handleCategorySelect}
          currentView={currentView}
          onViewSelect={setCurrentView}
        />
        
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#0f0f0f]">
          {currentView === 'feed' && <TopicChips activeTopic={activeChip} onSelect={handleChipSelect} />}
          
          <div className="p-6 lg:p-8 max-w-[2000px] mx-auto w-full flex flex-col gap-6">
            
            {error && currentView === 'feed' && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8">
                <p className="font-semibold">Error loading content</p>
                <p className="text-sm mt-1">{error}</p>
                <p className="text-sm mt-2">Ensure your YOUTUBE_API_KEY is configured correctly in the AI Studio secrets panel.</p>
              </div>
            )}

            {currentView === 'history' ? (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/10 rounded-full">
                      <HistoryIcon size={28} />
                    </div>
                    <h2 className="text-2xl font-bold">Watch History</h2>
                  </div>
                  {history.length > 0 && (
                    <button 
                      onClick={() => setShowClearConfirm(true)}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full text-sm font-medium transition-colors border border-red-500/20"
                    >
                      Clear All History
                    </button>
                  )}
                </div>
                
                {history.length === 0 ? (
                  <p className="text-white/50 py-10">You have no watch history yet. Videos you play will appear here.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-6">
                    {history.map((video, idx) => (
                      <VideoCard 
                        key={`hist-${idx}`} 
                        video={video} 
                        onClick={setActiveVideo}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Video Grid section 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-6">
                  {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="animate-pulse flex flex-col gap-3">
                        <div className="w-full aspect-video bg-zinc-800 rounded-xl"></div>
                        <div className="flex gap-3">
                          <div className="w-9 h-9 rounded-full bg-zinc-800 shrink-0"></div>
                          <div className="flex flex-col gap-2 flex-1 pt-1">
                            <div className="h-4 bg-zinc-800 rounded w-full"></div>
                            <div className="h-4 bg-zinc-800 rounded w-4/5"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    displayVideos.slice(0, 8).map((video, idx) => (
                      <VideoCard 
                        key={idx} 
                        video={video} 
                        onClick={setActiveVideo}
                      />
                    ))
                  )}
                  {!isLoading && displayVideos.length === 0 && !error && (
                    <div className="col-span-full py-10 text-center text-white/50">
                      No new videos found for this topic. You might have watched them all! Try searching for something else.
                    </div>
                  )}
                </div>

                {/* Shorts Shelf */}
                {!isLoading && displayShorts.length > 0 && (
                  <section className="flex flex-col gap-3 py-6 my-2 border-y border-white/5 relative">
                    <div className="flex items-center gap-2 px-1">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                      </svg>
                      <h2 className="text-lg font-bold">Shorts</h2>
                    </div>
                    <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                      {displayShorts.map((short, idx) => (
                        <ShortsCard 
                          key={`short-${idx}`} 
                          video={short} 
                          onClick={handleShortClick}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Video Grid section 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-5 gap-6">
                  {!isLoading && displayVideos.slice(8).map((video, idx) => (
                    <VideoCard 
                      key={`v2-${idx}`} 
                      video={video} 
                      onClick={setActiveVideo}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      <PlayerModal 
        video={activeVideo} 
        onClose={() => setActiveVideo(null)} 
        onWatch={addToHistory}
      />

      {activeShortsPayload !== null && (
        <ShortsReelModal 
          shorts={activeShortsPayload.shorts} 
          initialIndex={activeShortsPayload.initialIndex} 
          onClose={() => setActiveShortsPayload(null)}
          onVideoWatch={addToHistory}
        />
      )}

      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#121212] border border-[#303030] rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
            <h3 className="text-lg font-bold mb-2">Clear Watch History?</h3>
            <p className="text-white/60 text-sm mb-6">This will remove all videos from your local watch history. This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 rounded-lg text-sm hover:bg-white/10 text-white transition-colors font-medium border border-transparent"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  clearHistory();
                  setShowClearConfirm(false);
                }}
                className="px-4 py-2 rounded-lg text-sm bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

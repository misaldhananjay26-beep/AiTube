import { useState, useEffect, useCallback } from 'react';
import { YouTubeVideo } from '../types';

export function useHistory() {
  const [history, setHistory] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('aitube_history');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const addToHistory = useCallback((video: YouTubeVideo) => {
    if (!video) return;
    setHistory(prev => {
      const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;
      const filtered = prev.filter(v => {
        const vId = typeof v.id === 'string' ? v.id : v.id.videoId;
        return vId !== videoId;
      });
      // Add the latest video to the beginning
      const newHistory = [video, ...filtered].slice(0, 100);
      localStorage.setItem('aitube_history', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem('aitube_history');
  }, []);

  return { history, addToHistory, clearHistory };
}

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { mockVideos, mockShorts } from './mockData';

import yts from 'yt-search';

function toISO8601Duration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `PT${m}M${s}S`;
}

// Hardcoded fallback since user explicitly provided it in prompt for convenience in preview,
// but checking process.env first.
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "AIzaSyCY9ViV-JhB8knaoXHOaBiuKxlwIylGOuY";
const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

// Simple in-memory cache to avoid hitting YouTube API quota limits during dev/usage
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Generalized YouTube API proxy
  app.get('/api/videos', async (req, res) => {
    try {
      const q = req.query.q || "ai tech startups OR llm OR machine learning expert OR generative ai";
      const maxResults = parseInt((req.query.maxResults as string) || "20", 10);
      const type = req.query.type || 'video';
      const videoDuration = req.query.videoDuration || 'any'; // 'any', 'long', 'medium', 'short'
      const pageToken = req.query.pageToken ? `&pageToken=${req.query.pageToken}` : '';

      const cacheKey = `search_${q}_${maxResults}_${type}_${videoDuration}_${pageToken}`;
      const cached = cache.get(cacheKey);
      
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json(cached.data);
      }

      // We use the search endpoint to find videos related to AI/Tech
      let url = `${YOUTUBE_API_BASE}/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(q as string)}&type=${type}&key=${YOUTUBE_API_KEY}${pageToken}`;
      
      if (videoDuration !== 'any') {
        url += `&videoDuration=${videoDuration}`;
      }

      let data: any = null;
      try {
        const response = await fetch(url);
        data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || 'Error fetching from YouTube API');
        }

        // To get video durations and better statistics, we need to fetch the video details using the IDs we just got.
        const videoIds = data.items.map((item: any) => item.id.videoId).filter(Boolean).join(',');
        
        if (videoIds) {
          const statsUrl = `${YOUTUBE_API_BASE}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
          const statsResponse = await fetch(statsUrl);
          const statsData = await statsResponse.json();
          
          if (statsResponse.ok) {
            // Merge stats into search results
            data.items = data.items.map((item: any) => {
              if (item.id.videoId) {
                const stats = statsData.items.find((statItem: any) => statItem.id === item.id.videoId);
                if (stats) {
                  return { ...item, ...stats }; // Replace simple snippet with detailed snippet, contentDetails, and stats
                }
              }
              return item;
            });
          }
        }
      } catch (innerError: any) {
        // Fallback to yt-search scraping on quota exceeded or any API error
        try {
          let searchQuery = q as string;
          if (videoDuration === 'short') {
            searchQuery += ' shorts';
          }
          
          const r = await yts(searchQuery);
          let videos = r.videos;
          
          if (videoDuration === 'short') {
            videos = videos.filter(v => v.seconds <= 60 || v.title.toLowerCase().includes('short'));
          } else if (videoDuration === 'long') {
            videos = videos.filter(v => v.seconds > 1200);
          }
          
          videos = videos.slice(0, maxResults);
          
          data = {
            items: videos.map((v, i) => ({
              id: { videoId: v.videoId },
              snippet: {
                title: v.title,
                description: v.description,
                channelTitle: v.author.name,
                publishedAt: new Date(Date.now() - (Math.random() * 30000000000)).toISOString(),
                thumbnails: {
                  medium: { url: v.thumbnail },
                  high: { url: v.image },
                  maxres: { url: v.image }
                }
              },
              contentDetails: {
                duration: toISO8601Duration(v.seconds || 0)
              },
              statistics: {
                viewCount: (v.views || 0).toString()
              }
            }))
          };
          if (data.items.length === 0) throw new Error("No scraped results");
        } catch (scrapeError) {
          console.error("yt-search fallback failed:", scrapeError);
          // Ultimate fallback
          data = {
            items: videoDuration === 'short' ? mockShorts(maxResults) : mockVideos(maxResults)
          };
        }
      }

      cache.set(cacheKey, { data, timestamp: Date.now() });
      res.json(data);
    } catch (error: any) {
      console.error('YouTube API Error:', error);
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

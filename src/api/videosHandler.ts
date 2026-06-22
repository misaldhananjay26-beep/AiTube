import { mockVideos, mockShorts } from '../../mockData';
import yts from 'yt-search';

function toISO8601Duration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `PT${m}M${s}S`;
}

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

export async function handleVideosRequest(req: any, res: any) {
  try {
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "AIzaSyCY9ViV-JhB8knaoXHOaBiuKxlwIylGOuY";
    const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

    const q = req.query.q || "ai tech startups OR llm OR machine learning expert OR generative ai";
    const maxResults = parseInt((req.query.maxResults as string) || "20", 10);
    const type = req.query.type || 'video';
    const videoDuration = req.query.videoDuration || 'any';
    const pageToken = req.query.pageToken ? `&pageToken=${req.query.pageToken}` : '';

    const cacheKey = `search_${q}_${maxResults}_${type}_${videoDuration}_${pageToken}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return res.json(cached.data);
    }

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

      const videoIds = data.items.map((item: any) => item.id?.videoId).filter(Boolean).join(',');
      
      if (videoIds) {
        const statsUrl = `${YOUTUBE_API_BASE}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
        const statsResponse = await fetch(statsUrl);
        const statsData = await statsResponse.json();
        
        if (statsResponse.ok) {
          data.items = data.items.map((item: any) => {
            if (item.id.videoId) {
              const stats = statsData.items.find((statItem: any) => statItem.id === item.id.videoId);
              if (stats) return { ...item, ...stats };
            }
            return item;
          });
        }
      }
    } catch (innerError: any) {
      try {
        let searchQuery = q as string;
        if (videoDuration === 'short') searchQuery += ' shorts';
        
        let videos: yts.VideoSearchResult[] = [];
        
        if (maxResults >= 100 || searchQuery.toLowerCase().includes('zero to expert')) {
          const searches = [
            yts('web development full course zero to expert'),
            yts('python from scratch complete course'),
            yts('react js complete tutorial 2026'),
            yts('javascript zero to mastery full course'),
            yts('machine learning full course beginners expert'),
            yts('data structures and algorithms complete'),
            yts('system design interview full course'),
            yts('sql complete course for beginners'),
            yts('kubernetes full course'),
            yts('cyber security full course zero to expert')
          ];
          
          const results = await Promise.all(searches);
          for (const r of results) {
             videos = videos.concat(r.videos);
          }
          const seen = new Set<string>();
          videos = videos.filter(v => {
            if (seen.has(v.videoId)) return false;
            seen.add(v.videoId);
            return true;
          });
          videos = videos.slice(0, 150);
        } else {
          const r = await yts(searchQuery);
          videos = r.videos;
        }
        
        if (videoDuration === 'short') {
          const shortVideos = videos.filter(v => v.seconds <= 60 || v.title.toLowerCase().includes('short') || v.title.toLowerCase().includes('#shorts'));
          if (shortVideos.length > 0) videos = shortVideos;
        } else if (videoDuration === 'long') {
          videos = videos.filter(v => v.seconds > 1200);
        }
        
        videos = videos.filter(v => typeof v.videoId === 'string' && v.videoId.length === 11).slice(0, maxResults);
        
        data = {
          items: videos.map((v) => ({
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
      } catch (scrapeError: any) {
        data = {
          items: videoDuration === 'short' ? mockShorts(maxResults) : mockVideos(maxResults, q as string)
        };
      }
    }

    cache.set(cacheKey, { data, timestamp: Date.now() });
    res.json(data);
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

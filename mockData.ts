export function mockVideos(count: number) {
  const realVideoIds = ['aircAruvnKk', 'bZQun8Y4L2A', '1bZ0OX0S0a8', 'LXb3EKWsInQ', 'M7FIvfx5J10'];
  return Array.from({ length: count }).map((_, i) => {
    const videoId = realVideoIds[i % realVideoIds.length];
    return {
      id: videoId,
      snippet: {
        title: `How to Build AI Startups in 2026 - Masterclass Part ${i + 1}`,
        description: "A comprehensive masterclass on building modern AI applications with LLMs and Agentic Frameworks. Zero to production.",
        channelTitle: ["AI Architect", "Founder Daily", "Neural Notes", "Frontend Masters", "TechLead", "Fireship"][Math.floor(Math.random() * 6)],
        publishedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        thumbnails: {
          medium: { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
          high: { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
          maxres: { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }
        }
      },
      contentDetails: {
        duration: `PT${Math.floor(Math.random() * 60) + 5}M${Math.floor(Math.random() * 60)}S`
      },
      statistics: {
        viewCount: Math.floor(Math.random() * 3000000).toString()
      }
    };
  });
}

export function mockShorts(count: number) {
  const realShortIds = ['aircAruvnKk', 'bZQun8Y4L2A', '1bZ0OX0S0a8', 'LXb3EKWsInQ', 'M7FIvfx5J10'];
  return Array.from({ length: count }).map((_, i) => {
    const videoId = realShortIds[i % realShortIds.length];
    return {
      id: videoId,
      snippet: {
        title: `GPT-5 Features You missed! 🤯🔥 #shorts #ai`,
        description: "Quick update on the latest AI trends.",
        channelTitle: ["AI Shorts", "Tech Pulse", "Daily AI", "Startup Alpha", "Code Quickies"][Math.floor(Math.random() * 5)],
        publishedAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
        thumbnails: {
          medium: { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
          high: { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
          maxres: { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }
        }
      },
      contentDetails: {
        duration: `PT${Math.floor(Math.random() * 50) + 10}S`
      },
      statistics: {
        viewCount: Math.floor(Math.random() * 5000000).toString()
      }
    };
  });
}

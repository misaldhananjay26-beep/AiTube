export function mockVideos(count: number) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `mock-video-${Math.random().toString(36).substring(2, 10)}-${i}`,
    snippet: {
      title: `How to Build AI Startups in 2026 - Masterclass Part ${i + 1}`,
      description: "A comprehensive masterclass on building modern AI applications with LLMs and Agentic Frameworks. Zero to production.",
      channelTitle: ["AI Architect", "Founder Daily", "Neural Notes", "Frontend Masters", "TechLead", "Fireship"][Math.floor(Math.random() * 6)],
      publishedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      thumbnails: {
        medium: { url: `https://picsum.photos/seed/video${i}${Math.random()}/640/360` },
        high: { url: `https://picsum.photos/seed/video${i}${Math.random()}/640/360` },
        maxres: { url: `https://picsum.photos/seed/video${i}${Math.random()}/1280/720` }
      }
    },
    contentDetails: {
      duration: `PT${Math.floor(Math.random() * 60) + 5}M${Math.floor(Math.random() * 60)}S`
    },
    statistics: {
      viewCount: Math.floor(Math.random() * 3000000).toString()
    }
  }));
}

export function mockShorts(count: number) {
  return Array.from({ length: count }).map((_, i) => ({
    id: `mock-short-${Math.random().toString(36).substring(2, 10)}-${i}`,
    snippet: {
      title: `GPT-5 Features You missed! 🤯🔥 #shorts #ai`,
      description: "Quick update on the latest AI trends.",
      channelTitle: ["AI Shorts", "Tech Pulse", "Daily AI", "Startup Alpha", "Code Quickies"][Math.floor(Math.random() * 5)],
      publishedAt: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
      thumbnails: {
        medium: { url: `https://picsum.photos/seed/short${i}${Math.random()}/360/640` },
        high: { url: `https://picsum.photos/seed/short${i}${Math.random()}/360/640` },
        maxres: { url: `https://picsum.photos/seed/short${i}${Math.random()}/540/960` }
      }
    },
    contentDetails: {
      duration: `PT${Math.floor(Math.random() * 50) + 10}S`
    },
    statistics: {
      viewCount: Math.floor(Math.random() * 5000000).toString()
    }
  }));
}

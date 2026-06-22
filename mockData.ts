export function mockVideos(count: number, query: string = "tech") {
  const isWebDev = query.toLowerCase().includes('web') || query.toLowerCase().includes('react') || query.toLowerCase().includes('html');
  const isMachineLearning = query.toLowerCase().includes('machine') || query.toLowerCase().includes('ai');
  const isPython = query.toLowerCase().includes('python');
  
  const devVideos = [
    { id: 'bMknfKXIFA8', title: 'React Course - Beginner\'s Tutorial for React JavaScript Library [2022]', channel: 'freeCodeCamp.org', duration: 'PT11H55M22S' },
    { id: 'zJSY8tbf_ys', title: 'Frontend Web Development Bootcamp Course (JavaScript, HTML, CSS)', channel: 'freeCodeCamp.org', duration: 'PT21H14M43S' },
    { id: 'mU6anWqZJcc', title: 'Learn HTML5 and CSS3 From Scratch - Full Course', channel: 'freeCodeCamp.org', duration: 'PT11H30M' }
  ];

  const mlVideos = [
    { id: 'GwIoAwogpWU', title: 'Machine Learning for Everybody – Full Course', channel: 'freeCodeCamp.org', duration: 'PT3H53M' },
    { id: 'NWONeJKn6kc', title: 'Deep Learning Crash Course for Beginners', channel: 'freeCodeCamp.org', duration: 'PT1H30M' },
    { id: 'i_LwzRmAzo0', title: 'Neural Networks from Scratch - P.1 Intro and Neuron Code', channel: 'sentdex', duration: 'PT24M34S' }
  ];

  const pythonVideos = [
    { id: 'rfscVS0vtbw', title: 'Learn Python - Full Course for Beginners [Tutorial]', channel: 'freeCodeCamp.org', duration: 'PT4H26M' },
    { id: '8ext9G7xspg', title: 'Python Backend Web Development Course (with Django)', channel: 'freeCodeCamp.org', duration: 'PT10H' }
  ];

  const generalVideos = [
    { id: 'kjBOesZCoqc', title: 'Complete Web Development Course', channel: 'Traversy Media', duration: 'PT2H' },
    { id: 'PkZNo7MFNFg', title: 'Learn JavaScript - Full Course for Beginners', channel: 'freeCodeCamp.org', duration: 'PT3H26M' },
    { id: 'zjkBMFhNj_g', title: 'Harvard CS50 – Full Computer Science University Course', channel: 'freeCodeCamp.org', duration: 'PT24H1M' },
    { id: 'bZQun8Y4L2A', title: 'C++ Tutorial for Beginners - Full Course', channel: 'freeCodeCamp.org', duration: 'PT4H1M' }
  ];

  let videoPool = generalVideos;
  if (isWebDev) videoPool = devVideos;
  if (isMachineLearning) videoPool = mlVideos;
  if (isPython) videoPool = pythonVideos;

  return Array.from({ length: count }).map((_, i) => {
    const video = videoPool[i % videoPool.length];
    return {
      id: video.id,
      snippet: {
        title: video.title,
        description: `A comprehensive course about ${query}. This is a placeholder description since the API failed to connect.`,
        channelTitle: video.channel,
        publishedAt: new Date().toISOString(),
        thumbnails: {
          medium: { url: `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg` },
          high: { url: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg` },
          maxres: { url: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg` }
        }
      },
      contentDetails: {
        duration: video.duration
      },
      statistics: {
        viewCount: Math.floor(Math.random() * 5000000).toString()
      }
    };
  });
}

export function mockShorts(count: number) {
  const realShortIds = ['aircAruvnKk', 'zjkBMFhNj_g', 'bZQun8Y4L2A']; // Not actual shorts but video IDs for embed
  return Array.from({ length: count }).map((_, i) => ({
    id: realShortIds[i % realShortIds.length],
    snippet: {
      title: `Programming Tips! 🤯🔥 #shorts #tech`,
      description: "Quick update on the latest tech trends.",
      channelTitle: "Code Quickies",
      publishedAt: new Date().toISOString(),
      thumbnails: {
        medium: { url: `https://i.ytimg.com/vi/${realShortIds[i % realShortIds.length]}/mqdefault.jpg` },
        high: { url: `https://i.ytimg.com/vi/${realShortIds[i % realShortIds.length]}/hqdefault.jpg` },
        maxres: { url: `https://i.ytimg.com/vi/${realShortIds[i % realShortIds.length]}/maxresdefault.jpg` }
      }
    },
    contentDetails: {
      duration: `PT45S`
    },
    statistics: {
      viewCount: Math.floor(Math.random() * 5000000).toString()
    }
  }));
}

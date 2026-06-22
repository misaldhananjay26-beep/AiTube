export function mockVideos(count: number, query: string = "tech") {
  const isWebDev = query.toLowerCase().includes('web') || query.toLowerCase().includes('react') || query.toLowerCase().includes('html') || query.toLowerCase().includes('css') || query.toLowerCase().includes('js') || query.toLowerCase().includes('javascript') || query.toLowerCase().includes('frontend');
  const isMachineLearning = query.toLowerCase().includes('machine') || query.toLowerCase().includes('ai') || query.toLowerCase().includes('deep') || query.toLowerCase().includes('neural') || query.toLowerCase().includes('nlp') || query.toLowerCase().includes('gpt') || query.toLowerCase().includes('llm');
  const isPython = query.toLowerCase().includes('python') || query.toLowerCase().includes('django') || query.toLowerCase().includes('fastapi') || query.toLowerCase().includes('backend') || query.toLowerCase().includes('sql') || query.toLowerCase().includes('database') || query.toLowerCase().includes('postgres');
  const isCyber = query.toLowerCase().includes('cyber') || query.toLowerCase().includes('security') || query.toLowerCase().includes('hacking') || query.toLowerCase().includes('network') || query.toLowerCase().includes('ethical');
  const isCloud = query.toLowerCase().includes('cloud') || query.toLowerCase().includes('aws') || query.toLowerCase().includes('azure') || query.toLowerCase().includes('gcp') || query.toLowerCase().includes('kubernetes') || query.toLowerCase().includes('devops') || query.toLowerCase().includes('docker');

  const devVideos = [
    { id: 'bMknfKXIFA8', title: 'React Course - Beginner\'s Tutorial for React JavaScript Library', channel: 'freeCodeCamp.org', duration: 'PT11H55M22S', baseViews: 8500000 },
    { id: 'zJSY8tbf_ys', title: 'Frontend Web Development Bootcamp Course (JavaScript, HTML, CSS)', channel: 'freeCodeCamp.org', duration: 'PT21H14M43S', baseViews: 12000000 },
    { id: 'mU6anWqZJcc', title: 'Learn HTML5 and CSS3 From Scratch - Full Course', channel: 'freeCodeCamp.org', duration: 'PT11H30M00S', baseViews: 4200000 },
    { id: '3PHXvlpOkf4', title: 'React JS Full Course 2026 - Master Modern Web Dev', channel: 'freeCodeCamp.org', duration: 'PT12H24M10S', baseViews: 1900000 },
    { id: 'y17RuWkWU80', title: 'Tailwind CSS Full Course - Learn Responsive Design with CSS', channel: 'freeCodeCamp.org', duration: 'PT4H15M30S', baseViews: 2500000 },
    { id: 'W9uS2r-6lV4', title: 'TypeScript Full Course for Beginners - Learn TypeScript from Scratch', channel: 'freeCodeCamp.org', duration: 'PT9H45M12S', baseViews: 3100000 },
    { id: 'gY5sGdg-C70', title: 'Svelte Tutorial for Beginners - Full Interactive Development Course', channel: 'freeCodeCamp.org', duration: 'PT3H12M40S', baseViews: 820000 },
    { id: '0ZJgJw3Y_y4', title: 'Next.js 14 Developer Masterclass - SSR, App Router, Server Actions', channel: 'JavaScript Mastery', duration: 'PT5H50M15S', baseViews: 1400000 },
    { id: 'ENrzD9HAZK4', title: 'Node.js and Express.js Full Course - Backend Development Tutorial', channel: 'freeCodeCamp.org', duration: 'PT8H10M05S', baseViews: 3600000 },
    { id: '7Wwfz91bY6E', title: 'HTML & CSS Full Course - Professional Web Developer Training', channel: 'SuperSimpleDev', duration: 'PT6H20M00S', baseViews: 15000000 },
    { id: 'pQN-PnXPaVg', title: 'Docker Tutorial for Web Developers - Containers & Deployment Crash Course', channel: 'TechWithTim', duration: 'PT2H15M40S', baseViews: 1100000 },
    { id: 'uD4izuDMUQA', title: 'Git and GitHub Full Course - Source Control & Collaboration Systems', channel: 'freeCodeCamp.org', duration: 'PT4H30M20S', baseViews: 5200000 },
    { id: 'kjBOesZCoqc', title: 'Complete Web Development Course - Full Stack Web Bootcamp', channel: 'Traversy Media', duration: 'PT2H10M00S', baseViews: 2800000 },
    { id: 'w7ejDF843hA', title: 'Modern React JS Web App Tutorial - Full Dave Gray Course', channel: 'Dave Gray', duration: 'PT8H22M00S', baseViews: 950000 }
  ];

  const mlVideos = [
    { id: 'GwIoAwogpWU', title: 'Machine Learning for Everybody – Comprehensive Full Course', channel: 'freeCodeCamp.org', duration: 'PT3H53M00S', baseViews: 6500000 },
    { id: 'NWONeJKn6kc', title: 'Deep Learning Crash Course for Beginners - Neural Networks Explained', channel: 'freeCodeCamp.org', duration: 'PT1H30M00S', baseViews: 2100000 },
    { id: 'i_LwzRmAzo0', title: 'Neural Networks from Scratch - P.1 Intro and Beginner Neuron Code', channel: 'sentdex', duration: 'PT24M34S', baseViews: 4500000 },
    { id: 'aircAruvnKk', title: 'Intro to Large Language Models (LLM Masterclass Deep Dive)', channel: 'Andrej Karpathy', duration: 'PT2H42M00S', baseViews: 3800000 },
    { id: 'VMj-3S1tku0', title: 'Stanford CS229: Machine Learning - Introductory Lecture', channel: 'Stanford Online', duration: 'PT1H18M40S', baseViews: 1200000 },
    { id: 'qFJeN9V1ZsI', title: 'AI for Everyone - Neural Nets, Machine Learning, & Deep Learning', channel: 'Andrew Ng', duration: 'PT1H10M00S', baseViews: 2900000 },
    { id: 'tPYj3oF9bTo`', title: 'Python for Data Science - Modern Machine Learning & Statistics Course', channel: 'freeCodeCamp.org', duration: 'PT12H15M00S', baseViews: 4800000 },
    { id: 'r-uOLxNrNQg', title: 'Data Science Full Course - Become a Master Data Scientist', channel: 'freeCodeCamp.org', duration: 'PT10H20M00S', baseViews: 5400000 },
    { id: 'KnaWshc_LWY', title: 'ChatGPT, GPT-4 and LLMs - Architectural Secrets & Technical Inside', channel: 'Andrej Karpathy', duration: 'PT58M20S', baseViews: 4100000 },
    { id: 'qy2vNNoP5p8', title: 'Data Science with Python & Pandas - Full Hands-on Crash Course', channel: 'freeCodeCamp.org', duration: 'PT5H12M00S', baseViews: 1700000 },
    { id: 'GZbeE6T-N-I', title: 'Linear Algebra for Machine Learning and Neural Networks', channel: '3Blue1Brown', duration: 'PT32M15S', baseViews: 6200000 },
    { id: '0pDo7TTeMhY', title: 'Machine Learning Algorithms - StatQuest Deep Technical Breakdown', channel: 'StatQuest', duration: 'PT45M10S', baseViews: 2200000 },
    { id: '6M5H9Mpyyco', title: 'Natural Language Processing (NLP) Tutorial - Transformers & Tokenizers', channel: 'freeCodeCamp.org', duration: 'PT4H40M00S', baseViews: 1300000 }
  ];

  const pythonVideos = [
    { id: 'rfscVS0vtbw', title: 'Learn Python - Full Comprehensive Course for Beginners [Tutorial]', channel: 'freeCodeCamp.org', duration: 'PT4H26M52S', baseViews: 42000000 },
    { id: '8ext9G7xspg', title: 'Python Backend Web Development Course (with Django)', channel: 'freeCodeCamp.org', duration: 'PT10H15M00S', baseViews: 3100000 },
    { id: 'HXTGxH_8b90', title: 'FastAPI Course - Build Fast and Modern APIs with Python 3', channel: 'freeCodeCamp.org', duration: 'PT3H45M20S', baseViews: 1200000 },
    { id: '7S_tz1z_5bA', title: 'SQL Tutorial for Beginners - Full Relational Databases Introduction', channel: 'Programming with Mosh', duration: 'PT1H20M00S', baseViews: 9800000 },
    { id: 'czW2Z8S6v8Q', title: 'SQL Full Course - Learn Postgres, MySQL, and Database Design', channel: 'freeCodeCamp.org', duration: 'PT4H39M00S', baseViews: 5100000 },
    { id: 'HXV3tSgR67g', title: 'PostgreSQL Tutorial for Beginners - Learn Relational DB Administration', channel: 'freeCodeCamp.org', duration: 'PT4H11M00S', baseViews: 2400000 },
    { id: 'eP4-6U3g1bQ', title: 'MongoDB Crash Course - Learn NoSQL Databases Fast', channel: 'Traversy Media', duration: 'PT1H30M00S', baseViews: 1800000 },
    { id: 'WvM8A6uR73k', title: 'Redis Full Course - Fast In-Memory Database Caching Tutorial', channel: 'freeCodeCamp.org', duration: 'PT2H45M00S', baseViews: 950000 },
    { id: '9PXRKcljKqg', title: 'REST API Design Guidelines - Designing Beautiful and Robust Endpoints', channel: 'Web Dev Simplified', duration: 'PT18M45S', baseViews: 750000 },
    { id: 't8pPdKYgI6Y', title: 'Python OOP Tutorial - Object Oriented Programming in Python', channel: 'Corey Schafer', duration: 'PT1H42M00S', baseViews: 3200000 },
    { id: 'DPgFZ6_oGAw', title: 'Web Scraping with Python - BeautifulSoup and Scrapy Bootcamp', channel: 'freeCodeCamp.org', duration: 'PT3H15M00S', baseViews: 1400000 },
    { id: 'UmljXZI1pI4', title: 'Docker and Containers for Backend Engineers - Full Guide', channel: 'freeCodeCamp.org', duration: 'PT2H50M00S', baseViews: 2100000 }
  ];

  const cyberVideos = [
    { id: '3Kq1MJf3Dqg', title: 'Cybersecurity Full Course for Beginners - Learn Information Security', channel: 'freeCodeCamp.org', duration: 'PT11H35M00S', baseViews: 7800000 },
    { id: 'qwAFL1bJSle', title: 'Ethical Hacking Course - Learn Penetration Testing from Scratch', channel: 'freeCodeCamp.org', duration: 'PT14H22M00S', baseViews: 11000000 },
    { id: 'H3Cx1sD6J8A', title: 'Computer Networking Course - Local Area Networks & Internet Protocols', channel: 'freeCodeCamp.org', duration: 'PT9H15M00S', baseViews: 4500000 },
    { id: 'v7YMcVkWXrg', title: 'Linux for Ethical Hackers - Learn Command Line & Terminal Tools', channel: 'freeCodeCamp.org', duration: 'PT6H40M00S', baseViews: 3800000 }
  ];

  const cloudVideos = [
    { id: 'SOTamWNgDKc', title: 'AWS Certified Cloud Practitioner - Full Certification Preparation Course', channel: 'freeCodeCamp.org', duration: 'PT11H20M00S', baseViews: 5200000 },
    { id: 'Z3XN_GgK3rg', title: 'Microsoft Azure Certification Course - Learn Azure Cloud Architecture', channel: 'freeCodeCamp.org', duration: 'PT9H40M00S', baseViews: 2600000 },
    { id: '7WpP_6S_e0Q', title: 'Google Cloud Platform (GCP) Course - Full Dev Cloud Engineers Guide', channel: 'freeCodeCamp.org', duration: 'PT6H15M00S', baseViews: 1900000 },
    { id: 'd6VOP_e0hS8', title: 'Kubernetes Tutorial for Beginners - Full DevOps Engineering Bootcamp', channel: 'TechWorld with Nana', duration: 'PT3H42M00S', baseViews: 3200000 }
  ];

  const generalVideos = [
    { id: 'zjkBMFhNj_g', title: 'Harvard CS50 – Full Computer Science University Course', channel: 'freeCodeCamp.org', duration: 'PT24H1M0S', baseViews: 24000000 },
    { id: 'bZQun8Y4L2A', title: 'C++ Tutorial for Beginners - Full OOP Programming Course', channel: 'freeCodeCamp.org', duration: 'PT4H1M0S', baseViews: 9200000 },
    { id: 'i_LwzRmAzo0', title: 'Data Structures and Algorithms for Beginners - Level Up Coding', channel: 'sentdex', duration: 'PT8H15M00S', baseViews: 3800000 },
    { id: '6i_mS-O188s', title: 'System Design Interview – Step-by-Step Architectural Foundations', channel: 'ByteByteGo', duration: 'PT40M15S', baseViews: 2900000 },
    { id: '3PHXvlpOkf4', title: 'Software Engineering Best Practices & Design Patterns', channel: 'freeCodeCamp.org', duration: 'PT5H45M12S', baseViews: 1300000 }
  ];

  let videoPool = generalVideos;
  if (isWebDev) videoPool = devVideos;
  else if (isMachineLearning) videoPool = mlVideos;
  else if (isPython) videoPool = pythonVideos;
  else if (isCyber) videoPool = cyberVideos;
  else if (isCloud) videoPool = cloudVideos;

  return Array.from({ length: count }).map((_, i) => {
    const poolIndex = i % videoPool.length;
    const baseVideo = videoPool[poolIndex];
    
    // Calculate parts/sessions for looped indexing to prevent duplicate names!
    const partNum = Math.floor(i / videoPool.length) + 1;
    let title = baseVideo.title;
    if (partNum > 1) {
      const suffixes = [
        ` [Part ${partNum}]`,
        ` - Session ${partNum}: Advanced Techniques`,
        ` - Chapter ${partNum}: Core Architectures`,
        ` (Module ${partNum}: Deep Dive Tutorial)`,
        `: Hands-on Practice ${partNum}`,
        ` - Advanced Lab ${partNum}`
      ];
      title += suffixes[(partNum - 2) % suffixes.length];
    }

    // Dynamic but fully reproducible randomly shifted view counts to ensure uniqueness
    const viewsFactor = 0.5 + ((i * 7 + 13) % 20) / 10; // returns 0.5 to 2.4
    const finalViews = Math.floor(baseVideo.baseViews * viewsFactor);

    // Randomize date elegantly so newer/differing upload relative times are displayed
    // Generates a fully calculated, distinct date (no "less than a minute ago" repetition!)
    const daysAgo = (poolIndex * 5) + (partNum * 12) + 2; 
    const publishedDate = new Date();
    publishedDate.setDate(publishedDate.getDate() - daysAgo);

    return {
      id: baseVideo.id,
      snippet: {
        title: title,
        description: `Welcome to this technical masterclass on ${query}. In this video, we dive deep into architectural patterns, clean programming practices, real-world case studies, and code implementations. Explore full projects, production-ready tips, and professional pipelines directly.`,
        channelTitle: baseVideo.channel,
        publishedAt: publishedDate.toISOString(),
        thumbnails: {
          medium: { url: `https://i.ytimg.com/vi/${baseVideo.id}/mqdefault.jpg` },
          high: { url: `https://i.ytimg.com/vi/${baseVideo.id}/hqdefault.jpg` },
          maxres: { url: `https://i.ytimg.com/vi/${baseVideo.id}/maxresdefault.jpg` }
        }
      },
      contentDetails: {
        duration: baseVideo.duration
      },
      statistics: {
        viewCount: finalViews.toString()
      }
    };
  });
}

export function mockShorts(count: number) {
  // Use highly-engaging distinct real youtube videos for embed, ensuring valid thumbnails and working videos
  const realShortPool = [
    { id: 'aircAruvnKk', title: 'Why Attention mechanism is revolutionary! 🤯💡 #ai #shorts', channel: 'Andrej Karpathy', baseViews: 1200000 },
    { id: 'zjkBMFhNj_g', title: 'How memory allocation actually works underneath binary 🚀💻 #programming', channel: 'Harvard CS50', baseViews: 3500000 },
    { id: 'bZQun8Y4L2A', title: 'Why C++ is still the king of high-performance backend 🔥 Tech', channel: 'freeCodeCamp.org', baseViews: 890000 },
    { id: 'bMknfKXIFA8', title: 'React Hooks VS Redux State - Choose wisely! ⚛️ #react', channel: 'freeCodeCamp.org', baseViews: 1800000 },
    { id: 'czW2Z8S6v8Q', title: 'SQL Joins explained visually in 40 seconds! 📊 #sql', channel: 'freeCodeCamp.org', baseViews: 2400000 },
    { id: '6i_mS-O188s', title: 'Horizontal scaling VS Vertical scaling database structures 📡', channel: 'ByteByteGo', baseViews: 4100000 }
  ];

  return Array.from({ length: count }).map((_, i) => {
    const baseShort = realShortPool[i % realShortPool.length];
    
    // Deduplicate short names and add subtle modifiers
    const isModifier = i >= realShortPool.length;
    let title = baseShort.title;
    if (isModifier) {
      const modifiers = [
        " [Secrets Video Edition]",
        " - Essential Python Tip!",
        " 🔥 Cheat Sheet Edition",
        " - Level Up Your Tech!",
        " ⚡ 60-Second Coding Hack"
      ];
      title += modifiers[Math.floor(i / realShortPool.length) % modifiers.length];
    }

    const viewsFactor = 0.8 + ((i * 11) % 15) / 10; // 0.8 to 2.2
    const finalViews = Math.floor(baseShort.baseViews * viewsFactor);

    // Calculate realistic uploaded days ago
    const daysAgo = (i * 3) + 1;
    const publishedDate = new Date();
    publishedDate.setDate(publishedDate.getDate() - daysAgo);

    return {
      id: baseShort.id,
      snippet: {
        title: title,
        description: "A quick, highly technical tip on modern systems architecture, programming workflows, and web technologies.",
        channelTitle: baseShort.channel,
        publishedAt: publishedDate.toISOString(),
        thumbnails: {
          medium: { url: `https://i.ytimg.com/vi/${baseShort.id}/mqdefault.jpg` },
          high: { url: `https://i.ytimg.com/vi/${baseShort.id}/hqdefault.jpg` },
          maxres: { url: `https://i.ytimg.com/vi/${baseShort.id}/maxresdefault.jpg` }
        }
      },
      contentDetails: {
        duration: "PT45S"
      },
      statistics: {
        viewCount: finalViews.toString()
      }
    };
  });
}

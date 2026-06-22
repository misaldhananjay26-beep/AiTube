export const TOPICS = [
  "All",
  "AI Startups",
  "Zero to Expert",
  "Large Language Models",
  "Machine Learning",
  "Deep Learning",
  "Neural Networks",
  "Generative AI",
  "Prompt Engineering",
  "Tech Entrepreneurship",
  "ChatGPT",
  "Cursor IDE",
  "AI Agents",
  "Computer Vision",
  "NLP",
  "Data Science",
  "Open Source AI",
  "Silicon Valley",
  "Y Combinator",
  "Vector Databases"
];

interface TopicChipsProps {
  activeTopic: string;
  onSelect: (topic: string) => void;
}

export function TopicChips({ activeTopic, onSelect }: TopicChipsProps) {
  return (
    <div className="sticky top-16 z-30 py-3 px-6 flex gap-3 overflow-x-auto no-scrollbar scroll-smooth backdrop-blur-sm bg-[#020617]/50 border-b border-white/5">
      {TOPICS.map(topic => (
        <button
          key={topic}
          onClick={() => onSelect(topic)}
          className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
            activeTopic === topic || (activeTopic.includes('OR') && topic === 'All') // Hack for 'All' topic when using category query
              ? 'bg-white text-black'
              : 'bg-white/10 hover:bg-white/20 border border-white/10 text-white'
          }`}
        >
          {topic}
        </button>
      ))}
    </div>
  );
}

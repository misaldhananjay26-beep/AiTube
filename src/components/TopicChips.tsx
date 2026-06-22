export const TOPICS = [
  "All",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Data Structures",
  "Algorithms",
  "Machine Learning",
  "C++",
  "Java",
  "SQL",
  "NoSQL",
  "Cloud Computing",
  "AWS",
  "Cybersecurity"
];

interface TopicChipsProps {
  activeTopic: string;
  onSelect: (topic: string) => void;
}

export function TopicChips({ activeTopic, onSelect }: TopicChipsProps) {
  return (
    <div className="sticky top-16 z-30 py-3 px-6 flex gap-3 overflow-x-auto no-scrollbar scroll-smooth backdrop-blur-sm bg-[#0f0f0f]/80 border-b border-[#303030]">
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

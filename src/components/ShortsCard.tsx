import React from 'react';
import { formatViews } from '../lib/utils';
import { YouTubeVideo } from '../types';

interface ShortsCardProps {
  key?: React.Key;
  video: YouTubeVideo;
  onClick: (video: YouTubeVideo) => void;
}

export function ShortsCard({ video, onClick }: ShortsCardProps) {
  const { snippet, statistics } = video;
  
  // Use high/medium for shorts which are usually 9:16 padded
  const thumbnailUrl = snippet.thumbnails.high?.url || snippet.thumbnails.medium.url;
  const views = statistics?.viewCount ? `${formatViews(statistics.viewCount)} views` : '';

  return (
    <div 
      className="aspect-[9/16] rounded-xl overflow-hidden relative bg-white/5 border border-white/10 group cursor-pointer min-w-[200px]"
      onClick={() => onClick(video)}
    >
      <img 
        src={thumbnailUrl} 
        alt={snippet.title}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
      
      <div className="absolute bottom-3 left-3 pr-3 z-10">
        <p className="text-[11px] font-medium leading-tight text-white line-clamp-2" title={snippet.title}>
          {snippet.title}
        </p>
        <p className="text-[9px] text-white/60 mt-1">
          {views && views.replace(' views', '') + ' views'}
        </p>
      </div>
    </div>
  );
}

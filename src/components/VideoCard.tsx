import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Play } from 'lucide-react';
import { formatViews, parseDuration } from '../lib/utils';
import { YouTubeVideo } from '../types';

interface VideoCardProps {
  key?: React.Key;
  video: YouTubeVideo;
  onClick: (video: YouTubeVideo) => void;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  const videoId = typeof video.id === 'string' ? video.id : video.id.videoId;
  const { snippet, contentDetails, statistics } = video;
  
  // Use highest res available, fallback to medium
  const thumbnailUrl = snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url || snippet.thumbnails.medium.url;
  
  const views = statistics?.viewCount ? `${formatViews(statistics.viewCount)} views` : '';
  const published = formatDistanceToNow(new Date(snippet.publishedAt), { addSuffix: true });
  
  const duration = contentDetails?.duration ? parseDuration(contentDetails.duration) : '';

  return (
    <div 
      className="flex flex-col gap-3 group cursor-pointer"
      onClick={() => onClick(video)}
    >
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-slate-800">
        <img 
          src={thumbnailUrl} 
          alt={snippet.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-[10px] px-1.5 py-0.5 rounded font-bold text-white">
            {duration}
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="bg-black/80 p-3 rounded-full text-white">
            <Play fill="currentColor" size={24} />
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 px-1">
        <div className="w-9 h-9 rounded-full bg-indigo-500 overflow-hidden flex items-center justify-center shrink-0">
          <span className="text-white font-semibold text-sm uppercase">
            {snippet.channelTitle.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <h3 className="text-sm font-bold line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors text-white" title={snippet.title}>
            {snippet.title}
          </h3>
          <p className="text-xs text-white/50 mt-1">
            {snippet.channelTitle}
            {views && ` • ${views.replace(' views', '')} views`}
            {` • ${published}`}
          </p>
        </div>
      </div>
    </div>
  );
}

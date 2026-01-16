
import React from 'react';
import { DiscussionTile } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface TileProps {
  topic: DiscussionTile;
  isRevealed: boolean;
  onReveal: (id: number) => void;
}

const Tile: React.FC<TileProps> = ({ topic, isRevealed, onReveal }) => {
  return (
    <div 
      className="h-48 perspective-1000 cursor-pointer group"
      onClick={() => onReveal(topic.id)}
    >
      <div className={`relative w-full h-full text-center transition-transform duration-500 preserve-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
        
        {/* Front Side */}
        <div className="absolute w-full h-full backface-hidden flex items-center justify-center bg-white border-2 border-slate-200 rounded-xl shadow-sm group-hover:border-indigo-400 group-hover:shadow-md transition-all">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-slate-300 group-hover:text-indigo-500 transition-colors">
              {topic.id}
            </span>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-2">
              Topic
            </span>
          </div>
        </div>

        {/* Back Side */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl p-4 flex flex-col justify-between text-white ${CATEGORY_COLORS[topic.category]} shadow-lg`}>
          <div>
            <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded-full block w-fit mb-2">
              {topic.category.replace('-', ' ')}
            </span>
            <h3 className="text-sm font-bold leading-tight mb-2 border-b border-white/20 pb-2">
              {topic.title}
            </h3>
            <p className="text-[11px] leading-relaxed opacity-95">
              {topic.description}
            </p>
          </div>
          <div className="text-[10px] italic opacity-70 text-right mt-1">
            Revealed
          </div>
        </div>

      </div>
    </div>
  );
};

export default Tile;

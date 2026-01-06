import { Play, Eye } from "lucide-react";
import { mockReels } from "@/data/mockPosts";

interface ReelsSectionProps {
  onOpenReel: (reelId: string) => void;
}

const ReelsSection = ({ onOpenReel }: ReelsSectionProps) => {
  return (
    <section className="bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Play className="h-4 w-4 text-primary-foreground" fill="currentColor" />
          </div>
          <div>
            <h2 className="font-display font-bold text-sm">Reels</h2>
            <p className="text-xs text-muted-foreground">Trending now</p>
          </div>
        </div>
        <button className="text-xs font-semibold text-primary">See all</button>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
        {mockReels.map((reel) => (
          <button
            key={reel.id}
            onClick={() => onOpenReel(reel.id)}
            className="flex-shrink-0 relative rounded-xl overflow-hidden group card-hover"
          >
            <img
              src={reel.thumbnail}
              alt={reel.author}
              className="w-24 h-40 object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-foreground/40" />
            
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity">
              <div className="h-10 w-10 rounded-full bg-card/80 flex items-center justify-center">
                <Play className="h-5 w-5 text-card-foreground ml-0.5" fill="currentColor" />
              </div>
            </div>

            {/* Views */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="flex items-center gap-1 text-primary-foreground">
                <Eye className="h-3 w-3" />
                <span className="text-[10px] font-semibold">{reel.views}</span>
              </div>
              <p className="text-[10px] text-primary-foreground/80 truncate mt-0.5">
                {reel.author}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default ReelsSection;

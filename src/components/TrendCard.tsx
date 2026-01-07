import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { TrendCard as TrendCardType } from "@/data/mockPosts";
import { cn } from "@/lib/utils";

interface TrendCardProps {
  trend: TrendCardType;
}

const TrendCard = ({ trend }: TrendCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(trend.likes);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const getAspectClass = () => {
    switch (trend.aspectRatio) {
      case "1:1":
        return "aspect-square";
      case "4:5":
        return "aspect-[4/5]";
      case "9:10":
        return "aspect-[9/10]";
      default:
        return "aspect-square";
    }
  };

  return (
    <article className="bg-card overflow-hidden">
      {/* Image */}
      <div className={cn("relative w-full", getAspectClass())}>
        <img
          src={trend.image}
          alt={trend.title}
          className="w-full h-full object-cover"
        />
        {/* Overlay with title */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-background font-medium text-sm leading-snug">
            {trend.title}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center border-t border-border">
        <button
          onClick={handleLike}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 transition-colors",
            isLiked ? "text-accent" : "text-muted-foreground"
          )}
        >
          <div className={cn(
            "p-1.5 rounded-full transition-colors",
            isLiked ? "bg-like text-like-foreground" : ""
          )}>
            <Heart
              className={cn("h-4 w-4 transition-transform", isLiked && "scale-110")}
              fill={isLiked ? "currentColor" : "none"}
            />
          </div>
          <span className="text-xs font-medium">{formatNumber(likeCount)}</span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-3 text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          <span className="text-xs font-medium">{formatNumber(trend.comments)}</span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-3 text-muted-foreground">
          <Share2 className="h-4 w-4" />
          <span className="text-xs font-medium">{formatNumber(trend.shares)}</span>
        </button>
      </div>
    </article>
  );
};

export default TrendCard;

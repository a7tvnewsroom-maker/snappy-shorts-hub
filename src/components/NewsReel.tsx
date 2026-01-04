import { useState, useRef, useEffect } from "react";
import { NewsItem } from "@/types/news";
import { Heart, MessageCircle, Share2, Bookmark, Play, Pause, Volume2, VolumeX, BadgeCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsReelProps {
  news: NewsItem;
  isActive: boolean;
  onOpenComments: () => void;
}

const NewsReel = ({ news, isActive, onOpenComments }: NewsReelProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(news.likes);
  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    if (!isLiked) {
      setShowHeartAnimation(true);
      setTimeout(() => setShowHeartAnimation(false), 400);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: news.title,
        text: news.description,
        url: window.location.href,
      });
    } catch {
      // Fallback or ignore
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="relative h-[100dvh] w-full snap-item bg-foreground">
      {/* Video */}
      <video
        ref={videoRef}
        src={news.videoUrl}
        poster={news.thumbnail}
        className="absolute inset-0 h-full w-full object-cover"
        loop
        muted={isMuted}
        playsInline
        onClick={togglePlay}
      />

      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-background/20 safe-area-top">
        <div
          className="h-full bg-primary transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Top overlay */}
      <div className="absolute top-0 left-0 right-0 safe-area-top">
        <div className="flex items-center justify-between p-4 pt-8">
          <div className="flex items-center gap-2">
            {news.isLive && (
              <span className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                <span className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse-live" />
                LIVE
              </span>
            )}
            <span className="rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
              {news.category}
            </span>
          </div>
          <button
            onClick={toggleMute}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-foreground" />
            ) : (
              <Volume2 className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Play/Pause indicator */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-background/30 backdrop-blur-sm animate-fade-in">
            <Play className="h-10 w-10 text-background ml-1" fill="currentColor" />
          </div>
        </div>
      )}

      {/* Heart animation on double tap */}
      {showHeartAnimation && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Heart className="h-32 w-32 text-primary animate-heart" fill="currentColor" />
        </div>
      )}

      {/* Right action buttons */}
      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 safe-area-bottom">
        <button
          onClick={handleLike}
          className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
        >
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            isLiked ? "bg-primary/20" : "bg-background/80 backdrop-blur-sm"
          )}>
            <Heart
              className={cn(
                "h-6 w-6 transition-colors",
                isLiked ? "text-primary fill-primary" : "text-foreground"
              )}
            />
          </div>
          <span className="text-xs font-semibold text-background drop-shadow-lg">
            {formatNumber(likeCount)}
          </span>
        </button>

        <button
          onClick={onOpenComments}
          className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
            <MessageCircle className="h-6 w-6 text-foreground" />
          </div>
          <span className="text-xs font-semibold text-background drop-shadow-lg">
            {formatNumber(news.comments)}
          </span>
        </button>

        <button
          onClick={() => setIsSaved(!isSaved)}
          className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
        >
          <div className={cn(
            "flex h-12 w-12 items-center justify-center rounded-full",
            isSaved ? "bg-primary/20" : "bg-background/80 backdrop-blur-sm"
          )}>
            <Bookmark
              className={cn(
                "h-6 w-6 transition-colors",
                isSaved ? "text-primary fill-primary" : "text-foreground"
              )}
            />
          </div>
          <span className="text-xs font-semibold text-background drop-shadow-lg">Save</span>
        </button>

        <button
          onClick={handleShare}
          className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm">
            <Share2 className="h-6 w-6 text-foreground" />
          </div>
          <span className="text-xs font-semibold text-background drop-shadow-lg">
            {formatNumber(news.shares)}
          </span>
        </button>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-20 p-4 safe-area-bottom">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={news.author.avatar}
            alt={news.author.name}
            className="h-10 w-10 rounded-full border-2 border-background object-cover"
          />
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-background drop-shadow-lg">
              {news.author.name}
            </span>
            {news.author.verified && (
              <BadgeCheck className="h-4 w-4 text-primary fill-primary" />
            )}
          </div>
          <span className="text-xs text-background/80">{news.createdAt}</span>
        </div>
        <h2 className="text-lg font-display font-bold text-background drop-shadow-lg leading-tight mb-2">
          {news.title}
        </h2>
        <p className="text-sm text-background/90 drop-shadow-lg line-clamp-2">
          {news.description}
        </p>
      </div>

      {/* Gradient overlay for text readability */}
      <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent pointer-events-none" />
    </div>
  );
};

export default NewsReel;

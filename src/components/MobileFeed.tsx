import { useState, useRef, useEffect } from "react";
import { Post, Reel } from "@/types/post";
import { mockPosts, mockReels } from "@/data/mockPosts";
import { Heart, MessageCircle, Share2, Bookmark, BadgeCheck, Play, Pause, Volume2, VolumeX, Quote, Sparkles, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type FeedItem = 
  | { type: "post"; data: Post }
  | { type: "reel"; data: Reel };

const MobileFeed = ({ onOpenComments }: { onOpenComments: (count: number) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  // Create interleaved feed: post, reel, post, reel...
  const feedItems: FeedItem[] = [];
  const maxItems = Math.max(mockPosts.length, mockReels.length);
  for (let i = 0; i < maxItems; i++) {
    if (mockPosts[i]) feedItems.push({ type: "post", data: mockPosts[i] });
    if (mockReels[i]) feedItems.push({ type: "reel", data: mockReels[i] });
  }

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const itemHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / itemHeight);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < feedItems.length) {
      setCurrentIndex(newIndex);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Pause all videos first
    videoRefs.current.forEach((video) => video.pause());
    
    // Play current video if it's a reel
    const currentItem = feedItems[currentIndex];
    if (currentItem?.type === "reel") {
      const video = videoRefs.current.get(currentItem.data.id);
      if (video && isPlaying) {
        video.play().catch(() => {});
      }
    }
  }, [currentIndex, isPlaying]);

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSave = (id: string) => {
    setSavedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const togglePlay = (videoId: string) => {
    const video = videoRefs.current.get(videoId);
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const renderPost = (post: Post, index: number) => {
    const isLiked = likedItems.has(post.id);
    const isSaved = savedItems.has(post.id);
    const isCurrent = index === currentIndex;

    return (
      <div key={`post-${post.id}`} className="h-[100dvh] w-full snap-start relative bg-background flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 pt-14 bg-gradient-to-b from-background via-background/80 to-transparent safe-area-top">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-border"
            />
            <div>
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm">{post.author.name}</span>
                {post.author.verified && (
                  <BadgeCheck className="h-4 w-4 text-primary" fill="currentColor" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{post.createdAt}</p>
            </div>
          </div>
          <button className="p-2 rounded-full hover:bg-secondary transition-colors">
            <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center px-4 pt-28 pb-24">
          {post.type === "motivation" && post.motivation ? (
            <div className="w-full relative overflow-hidden rounded-2xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${post.motivation.gradient} opacity-90`} />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
              
              <div className="absolute top-4 right-4 animate-float">
                <Sparkles className="h-6 w-6 text-primary-foreground/40" />
              </div>
              <div className="absolute bottom-8 left-6 animate-float" style={{ animationDelay: "1s" }}>
                <Sparkles className="h-4 w-4 text-primary-foreground/30" />
              </div>

              <div className="relative p-6 pt-8">
                <Quote className="h-8 w-8 text-primary-foreground/30 mb-4" />
                <p className="text-xl font-display font-semibold text-primary-foreground leading-relaxed mb-6">
                  "{post.motivation.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-0.5 flex-1 bg-primary-foreground/20 rounded-full" />
                  <span className="text-sm font-medium text-primary-foreground/80">
                    — {post.motivation.author}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-4">
              {post.content && (
                <p className="text-lg leading-relaxed text-center">{post.content}</p>
              )}
              {post.media && (
                <div className="rounded-xl overflow-hidden">
                  {post.media.type === "image" ? (
                    <img
                      src={post.media.url}
                      alt="Post"
                      className="w-full object-cover max-h-[50vh]"
                    />
                  ) : (
                    <video
                      ref={el => { if (el) videoRefs.current.set(`post-video-${post.id}`, el); }}
                      src={post.media.url}
                      poster={post.media.thumbnail}
                      className="w-full object-cover max-h-[50vh]"
                      loop
                      playsInline
                      muted={isMuted}
                      onClick={() => togglePlay(`post-video-${post.id}`)}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-4">
          <button
            onClick={() => toggleLike(post.id)}
            className="flex flex-col items-center gap-1"
          >
            <div className={cn(
              "h-12 w-12 rounded-full flex items-center justify-center",
              isLiked ? "bg-accent/20" : "bg-secondary"
            )}>
              <Heart
                className={cn("h-6 w-6", isLiked ? "text-accent" : "text-foreground")}
                fill={isLiked ? "currentColor" : "none"}
              />
            </div>
            <span className="text-xs font-semibold">{formatNumber(post.likes)}</span>
          </button>

          <button 
            onClick={() => onOpenComments(post.comments)}
            className="flex flex-col items-center gap-1"
          >
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-foreground" />
            </div>
            <span className="text-xs font-semibold">{formatNumber(post.comments)}</span>
          </button>

          <button
            onClick={() => toggleSave(post.id)}
            className="flex flex-col items-center gap-1"
          >
            <div className={cn(
              "h-12 w-12 rounded-full flex items-center justify-center",
              isSaved ? "bg-primary/20" : "bg-secondary"
            )}>
              <Bookmark
                className={cn("h-6 w-6", isSaved ? "text-primary" : "text-foreground")}
                fill={isSaved ? "currentColor" : "none"}
              />
            </div>
            <span className="text-xs font-semibold">Save</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
              <Share2 className="h-6 w-6 text-foreground" />
            </div>
            <span className="text-xs font-semibold">{formatNumber(post.shares)}</span>
          </button>
        </div>
      </div>
    );
  };

  const renderReel = (reel: Reel, index: number) => {
    const isLiked = likedItems.has(reel.id);
    const isSaved = savedItems.has(reel.id);
    const isCurrent = index === currentIndex;

    return (
      <div key={`reel-${reel.id}`} className="h-[100dvh] w-full snap-start relative bg-foreground">
        <video
          ref={el => { if (el) videoRefs.current.set(reel.id, el); }}
          src={reel.videoUrl}
          poster={reel.thumbnail}
          className="absolute inset-0 h-full w-full object-cover"
          loop
          playsInline
          muted={isMuted}
          onClick={() => togglePlay(reel.id)}
        />

        {/* Top controls */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-14 safe-area-top">
          <span className="text-lg font-logo tracking-wider text-background">GOFLIX</span>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="h-10 w-10 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center"
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-background" />
            ) : (
              <Volume2 className="h-5 w-5 text-background" />
            )}
          </button>
        </div>

        {/* Play/Pause indicator */}
        {!isPlaying && isCurrent && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="h-20 w-20 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center animate-scale-in">
              <Play className="h-10 w-10 text-background ml-1" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Right actions */}
        <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 safe-area-bottom">
          <button
            onClick={() => toggleLike(reel.id)}
            className="flex flex-col items-center gap-1"
          >
            <div className={cn(
              "h-12 w-12 rounded-full flex items-center justify-center",
              isLiked ? "bg-accent/20" : "bg-foreground/30 backdrop-blur-sm"
            )}>
              <Heart
                className={cn("h-6 w-6", isLiked ? "text-accent" : "text-background")}
                fill={isLiked ? "currentColor" : "none"}
              />
            </div>
            <span className="text-xs font-semibold text-background">24.5K</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-background" />
            </div>
            <span className="text-xs font-semibold text-background">1.2K</span>
          </button>

          <button
            onClick={() => toggleSave(reel.id)}
            className="flex flex-col items-center gap-1"
          >
            <div className={cn(
              "h-12 w-12 rounded-full flex items-center justify-center",
              isSaved ? "bg-primary/20" : "bg-foreground/30 backdrop-blur-sm"
            )}>
              <Bookmark
                className={cn("h-6 w-6", isSaved ? "text-primary" : "text-background")}
                fill={isSaved ? "currentColor" : "none"}
              />
            </div>
            <span className="text-xs font-semibold text-background">Save</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="h-12 w-12 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center">
              <Share2 className="h-6 w-6 text-background" />
            </div>
            <span className="text-xs font-semibold text-background">Share</span>
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-20 p-4 safe-area-bottom">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={reel.thumbnail}
              alt={reel.author}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-background"
            />
            <span className="font-semibold text-background">{reel.author}</span>
            <button className="px-4 py-1 rounded-full bg-background/20 backdrop-blur-sm text-sm font-semibold text-background">
              Follow
            </button>
          </div>
          <p className="text-sm text-background/90">
            Amazing content coming your way! 🔥 #trending #viral
          </p>
        </div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-foreground/60 to-transparent pointer-events-none" />
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-[100dvh] overflow-y-scroll snap-y snap-mandatory no-scrollbar"
    >
      {feedItems.map((item, index) => 
        item.type === "post" 
          ? renderPost(item.data, index) 
          : renderReel(item.data, index)
      )}
    </div>
  );
};

export default MobileFeed;
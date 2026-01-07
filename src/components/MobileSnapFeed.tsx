import { useState, useRef, useEffect } from "react";
import { Post } from "@/types/post";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, BadgeCheck, Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileSnapFeedProps {
  posts: Post[];
  onOpenComments: (commentsCount: number) => void;
}

const MobileSnapFeed = ({ posts, onOpenComments }: MobileSnapFeedProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const cardHeight = containerRef.current.clientHeight;
    const newIndex = Math.round(scrollTop / cardHeight);
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      // Pause all videos except current
      videoRefs.current.forEach((video, id) => {
        const postIndex = posts.findIndex(p => p.id === id);
        if (postIndex === newIndex) {
          video.play().catch(() => {});
          setPlayingVideos(prev => new Set([...prev, id]));
        } else {
          video.pause();
          setPlayingVideos(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }
      });
    }
  };

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleSave = (postId: string) => {
    setSavedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const toggleMute = (postId: string) => {
    const video = videoRefs.current.get(postId);
    if (video) {
      video.muted = !video.muted;
      setMutedVideos(prev => {
        const newSet = new Set(prev);
        if (video.muted) {
          newSet.add(postId);
        } else {
          newSet.delete(postId);
        }
        return newSet;
      });
    }
  };

  const togglePlay = (postId: string) => {
    const video = videoRefs.current.get(postId);
    if (video) {
      if (video.paused) {
        video.play().catch(() => {});
        setPlayingVideos(prev => new Set([...prev, postId]));
      } else {
        video.pause();
        setPlayingVideos(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
      }
    }
  };

  const handleShare = async (post: Post) => {
    try {
      await navigator.share({
        title: post.author.name,
        text: post.content || post.motivation?.quote,
        url: window.location.href,
      });
    } catch {
      // Fallback
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-[calc(100vh-120px)] overflow-y-scroll snap-y snap-mandatory"
    >
      {/* Progress dots */}
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1.5">
        {posts.slice(0, 10).map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              index === currentIndex 
                ? "bg-primary h-4" 
                : "bg-muted-foreground/40"
            )}
          />
        ))}
      </div>

      {posts.map((post, index) => (
        <article
          key={post.id}
          className="h-[calc(100vh-120px)] snap-start snap-always relative bg-card flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
                />
                {post.author.verified && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                    <BadgeCheck className="h-3 w-3 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm">{post.author.name}</span>
                  {post.author.verified && (
                    <span className="text-primary text-xs">●</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{post.createdAt}</p>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Media - takes remaining space */}
          <div className="flex-1 relative overflow-hidden">
            {post.type === "motivation" && post.motivation ? (
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br flex flex-col items-center justify-center p-6 text-center",
                post.motivation.gradient
              )}>
                <span className="text-6xl mb-4">✨</span>
                <p className="text-xl md:text-2xl font-bold text-white leading-relaxed max-w-sm">
                  "{post.motivation.quote}"
                </p>
                <p className="mt-4 text-white/80 font-medium">— {post.motivation.author}</p>
              </div>
            ) : post.media?.type === "video" ? (
              <div 
                className="absolute inset-0 bg-black"
                onClick={() => togglePlay(post.id)}
              >
                <video
                  ref={(el) => {
                    if (el) videoRefs.current.set(post.id, el);
                  }}
                  src={post.media.url}
                  poster={post.media.thumbnail}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  muted
                />
                {!playingVideos.has(post.id) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="h-8 w-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                )}
                {/* Mute button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute(post.id);
                  }}
                  className="absolute bottom-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-sm"
                >
                  {mutedVideos.has(post.id) || !videoRefs.current.get(post.id)?.muted === false ? (
                    <VolumeX className="h-5 w-5 text-white" />
                  ) : (
                    <Volume2 className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            ) : post.media?.type === "image" ? (
              <img
                src={post.media.url}
                alt="Post"
                className="w-full h-full object-cover"
              />
            ) : null}

            {/* Side action buttons - Reels style */}
            <div className="absolute right-3 bottom-20 flex flex-col items-center gap-5">
              <button
                onClick={() => toggleLike(post.id)}
                className="flex flex-col items-center gap-1"
              >
                <div className={cn(
                  "p-2.5 rounded-full transition-colors",
                  likedPosts.has(post.id) 
                    ? "bg-like text-like-foreground" 
                    : "bg-foreground/20 backdrop-blur-sm"
                )}>
                  <Heart
                    className={cn(
                      "h-6 w-6 transition-transform",
                      likedPosts.has(post.id) ? "text-white scale-110" : "text-white"
                    )}
                    fill={likedPosts.has(post.id) ? "currentColor" : "none"}
                  />
                </div>
                <span className="text-xs font-semibold text-white drop-shadow-lg">
                  {formatNumber(post.likes + (likedPosts.has(post.id) ? 1 : 0))}
                </span>
              </button>

              <button
                onClick={() => onOpenComments(post.comments)}
                className="flex flex-col items-center gap-1"
              >
                <div className="p-2.5 rounded-full bg-foreground/20 backdrop-blur-sm">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-white drop-shadow-lg">
                  {formatNumber(post.comments)}
                </span>
              </button>

              <button
                onClick={() => handleShare(post)}
                className="flex flex-col items-center gap-1"
              >
                <div className="p-2.5 rounded-full bg-foreground/20 backdrop-blur-sm">
                  <Send className="h-6 w-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-white drop-shadow-lg">
                  {formatNumber(post.shares)}
                </span>
              </button>

              <button
                onClick={() => toggleSave(post.id)}
                className="flex flex-col items-center gap-1"
              >
                <div className={cn(
                  "p-2.5 rounded-full transition-colors",
                  savedPosts.has(post.id) 
                    ? "bg-primary" 
                    : "bg-foreground/20 backdrop-blur-sm"
                )}>
                  <Bookmark
                    className="h-6 w-6 text-white"
                    fill={savedPosts.has(post.id) ? "currentColor" : "none"}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Text content */}
          <div className="p-3 shrink-0 bg-card">
            {post.content && (
              <p className="text-sm leading-relaxed line-clamp-3">{post.content}</p>
            )}
            {post.motivation && (
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-primary text-xs">#motivation</span>
                <span className="text-primary text-xs">#inspiration</span>
                <span className="text-primary text-xs">#quotes</span>
              </div>
            )}
          </div>
        </article>
      ))}

      {/* First time swipe hint */}
      {currentIndex === 0 && (
        <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40 animate-bounce pointer-events-none">
          <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
            <div className="w-6 h-10 border-2 border-muted-foreground/40 rounded-full flex items-start justify-center pt-2">
              <div className="w-1 h-2 bg-muted-foreground/60 rounded-full animate-pulse" />
            </div>
            <span className="text-xs">Swipe up</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSnapFeed;

import { useState, useRef } from "react";
import { Post } from "@/types/post";
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, BadgeCheck, Play, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import MotivationCard from "./MotivationCard";

interface PostCardProps {
  post: Post;
  onOpenComments: () => void;
}

const PostCard = ({ post, onOpenComments }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const handleShare = async () => {
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
    <article className="bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            {post.type === "motivation" && (
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                <span className="text-[10px]">✨</span>
              </div>
            )}
          </div>
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

      {/* Content based on type */}
      {post.type === "motivation" && post.motivation ? (
        <MotivationCard post={post} onLike={handleLike} isLiked={isLiked} />
      ) : (
        <>
          {/* Text content */}
          {post.content && (
            <div className="px-3 pb-3">
              <p className="text-sm leading-relaxed">{post.content}</p>
            </div>
          )}

          {/* Media */}
          {post.media && (
            <div className="relative aspect-square">
              {post.media.type === "image" ? (
                <img
                  src={post.media.url}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full" onClick={toggleVideo}>
                  <video
                    ref={videoRef}
                    src={post.media.url}
                    poster={post.media.thumbnail}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                  />
                  {!isVideoPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/10">
                      <div className="h-14 w-14 rounded-full bg-card/90 flex items-center justify-center shadow-lg">
                        <Play className="h-7 w-7 text-card-foreground ml-1" fill="currentColor" />
                      </div>
                    </div>
                  )}
                  {post.views && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-foreground/60 rounded-full px-2 py-1">
                      <Eye className="h-3 w-3 text-background" />
                      <span className="text-[10px] font-semibold text-background">
                        {formatNumber(post.views)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Engagement stats */}
      <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <span className="h-5 w-5 rounded-full bg-like flex items-center justify-center text-[10px]">❤️</span>
            <span className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px]">👍</span>
          </div>
          <span>{formatNumber(likeCount + (isLiked ? 1 : 0))}</span>
        </div>
        <div className="flex gap-3">
          <button onClick={onOpenComments}>{formatNumber(post.comments)} comments</button>
          <span>{formatNumber(post.shares)} shares</span>
        </div>
      </div>

      {/* Action buttons */}
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
            isLiked ? "bg-foreground text-background" : ""
          )}>
            <Heart
              className={cn("h-5 w-5 transition-transform", isLiked && "scale-110 animate-scale-in")}
              fill={isLiked ? "currentColor" : "none"}
            />
          </div>
          <span className="text-sm font-medium">Like</span>
        </button>

        <button
          onClick={onOpenComments}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-muted-foreground"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium">Comment</span>
        </button>

        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-3 text-muted-foreground"
        >
          <Share2 className="h-5 w-5" />
          <span className="text-sm font-medium">Share</span>
        </button>

        <button
          onClick={() => setIsSaved(!isSaved)}
          className={cn(
            "px-4 py-3 transition-colors",
            isSaved ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Bookmark className="h-5 w-5" fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>
    </article>
  );
};

export default PostCard;

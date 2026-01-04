import { useState, useRef } from "react";
import { Post, ReactionType } from "@/types/post";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe, BadgeCheck, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
  onOpenComments: () => void;
}

const reactions: { type: ReactionType; emoji: string; color: string }[] = [
  { type: "like", emoji: "👍", color: "text-fb-blue" },
  { type: "love", emoji: "❤️", color: "text-fb-red" },
  { type: "haha", emoji: "😂", color: "text-fb-yellow" },
  { type: "wow", emoji: "😮", color: "text-fb-yellow" },
  { type: "sad", emoji: "😢", color: "text-fb-yellow" },
  { type: "angry", emoji: "😠", color: "text-fb-orange" },
];

const PostCard = ({ post, onOpenComments }: PostCardProps) => {
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [showReactions, setShowReactions] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const longPressTimer = useRef<NodeJS.Timeout>();

  const totalReactions = Object.values(post.reactions).reduce((a, b) => a + b, 0);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  const handleLikePress = () => {
    if (userReaction) {
      setUserReaction(null);
    } else {
      setUserReaction("like");
    }
  };

  const handleLongPressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setShowReactions(true);
    }, 500);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const selectReaction = (type: ReactionType) => {
    setUserReaction(type);
    setShowReactions(false);
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
        text: post.content,
        url: window.location.href,
      });
    } catch {
      // Fallback
    }
  };

  const getTopReactions = () => {
    return Object.entries(post.reactions)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([type]) => reactions.find(r => r.type === type)?.emoji)
      .filter(Boolean);
  };

  return (
    <article className="bg-card shadow-card mb-2">
      {/* Header */}
      <div className="flex items-start justify-between p-3">
        <div className="flex gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-card-foreground">
                {post.author.name}
              </span>
              {post.author.verified && (
                <BadgeCheck className="h-4 w-4 text-primary fill-primary" />
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{post.createdAt}</span>
              <span>·</span>
              <Globe className="h-3 w-3" />
              {post.isSponsored && (
                <>
                  <span>·</span>
                  <span className="text-muted-foreground">Sponsored</span>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="p-2 -mr-2 rounded-full hover:bg-secondary">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="px-3 pb-3">
        <p className="text-sm text-card-foreground whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Media */}
      {post.media && (
        <div className="relative">
          {post.media.type === "image" ? (
            <img
              src={post.media.url}
              alt="Post media"
              className="w-full object-cover max-h-[400px]"
            />
          ) : (
            <div className="relative" onClick={toggleVideo}>
              <video
                ref={videoRef}
                src={post.media.url}
                className="w-full object-cover max-h-[400px]"
                loop
                playsInline
                muted
              />
              {!isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-foreground/20">
                  <div className="h-16 w-16 rounded-full bg-card/90 flex items-center justify-center">
                    <Play className="h-8 w-8 text-card-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Reactions summary */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            {getTopReactions().map((emoji, i) => (
              <span key={i} className="text-base">{emoji}</span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            {formatNumber(totalReactions + (userReaction ? 1 : 0))}
          </span>
        </div>
        <div className="flex gap-3 text-xs text-muted-foreground">
          <button onClick={onOpenComments}>
            {formatNumber(post.comments)} comments
          </button>
          <span>{formatNumber(post.shares)} shares</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="relative flex items-center justify-around px-2 py-1">
        {/* Reaction picker */}
        {showReactions && (
          <div 
            className="absolute bottom-full left-2 mb-2 flex gap-1 bg-card rounded-full shadow-elevated p-2 animate-reaction z-10"
            onMouseLeave={() => setShowReactions(false)}
          >
            {reactions.map((reaction) => (
              <button
                key={reaction.type}
                onClick={() => selectReaction(reaction.type)}
                className="text-2xl hover:scale-125 transition-transform p-1"
              >
                {reaction.emoji}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={handleLikePress}
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
          onMouseDown={handleLongPressStart}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md hover:bg-secondary transition-colors flex-1 justify-center",
            userReaction && "text-primary"
          )}
        >
          {userReaction ? (
            <span className="text-xl animate-reaction">
              {reactions.find(r => r.type === userReaction)?.emoji}
            </span>
          ) : (
            <ThumbsUp className="h-5 w-5" />
          )}
          <span className={cn("text-sm font-medium", !userReaction && "text-muted-foreground")}>
            {userReaction ? userReaction.charAt(0).toUpperCase() + userReaction.slice(1) : "Like"}
          </span>
        </button>

        <button
          onClick={onOpenComments}
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-secondary transition-colors flex-1 justify-center"
        >
          <MessageCircle className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Comment</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-secondary transition-colors flex-1 justify-center"
        >
          <Share2 className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Share</span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;

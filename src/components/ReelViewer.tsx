import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Heart, MessageCircle, Share2, Bookmark, X, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { mockReels } from "@/data/mockPosts";
import { cn } from "@/lib/utils";

interface ReelViewerProps {
  isOpen: boolean;
  onClose: () => void;
  initialReelId: string;
}

const ReelViewer = ({ isOpen, onClose, initialReelId }: ReelViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = mockReels.findIndex(r => r.id === initialReelId);
    if (index !== -1) setCurrentIndex(index);
  }, [initialReelId]);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [isOpen, currentIndex]);

  const currentReel = mockReels[currentIndex];

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

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    const itemHeight = window.innerHeight;
    const newIndex = Math.round(scrollTop / itemHeight);
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < mockReels.length) {
      setCurrentIndex(newIndex);
      setIsLiked(false);
      setIsSaved(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-full p-0 bg-foreground border-0">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
        >
          {mockReels.map((reel, index) => (
            <div key={reel.id} className="h-[100dvh] w-full snap-start relative">
              <video
                ref={index === currentIndex ? videoRef : null}
                src={reel.videoUrl}
                poster={reel.thumbnail}
                className="absolute inset-0 h-full w-full object-cover"
                loop
                playsInline
                muted={isMuted}
                onClick={togglePlay}
              />

              {/* Top controls */}
              <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 safe-area-top">
                <button
                  onClick={onClose}
                  className="h-10 w-10 rounded-full bg-foreground/30 backdrop-blur-sm flex items-center justify-center"
                >
                  <X className="h-5 w-5 text-background" />
                </button>
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
              {!isPlaying && index === currentIndex && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="h-20 w-20 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center animate-scale-in">
                    <Play className="h-10 w-10 text-background ml-1" fill="currentColor" />
                  </div>
                </div>
              )}

              {/* Right actions */}
              <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5 safe-area-bottom">
                <button
                  onClick={() => setIsLiked(!isLiked)}
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
                  onClick={() => setIsSaved(!isSaved)}
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
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReelViewer;

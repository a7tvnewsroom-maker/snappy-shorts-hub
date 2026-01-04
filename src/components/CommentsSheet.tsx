import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Heart, Send, Image } from "lucide-react";
import { mockComments } from "@/data/mockPosts";
import { cn } from "@/lib/utils";

interface CommentsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  commentsCount: number;
}

const CommentsSheet = ({ isOpen, onClose, commentsCount }: CommentsSheetProps) => {
  const [newComment, setNewComment] = useState("");
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const toggleLikeComment = (commentId: string) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
  };

  const handleSendComment = () => {
    if (newComment.trim()) {
      setNewComment("");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl px-0 bg-card">
        <SheetHeader className="px-4 pb-3 border-b border-border">
          <SheetTitle className="text-center font-display">
            {commentsCount.toLocaleString()} Comments
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 h-[calc(70vh-130px)]">
          {mockComments.map((comment) => (
            <div key={comment.id} className="flex gap-3 animate-fade-in">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className="h-9 w-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="bg-secondary rounded-2xl px-4 py-2.5">
                  <span className="text-sm font-semibold">{comment.user.name}</span>
                  <p className="text-sm mt-0.5">{comment.text}</p>
                </div>
                <div className="flex items-center gap-4 mt-1.5 px-2">
                  <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                  <button
                    onClick={() => toggleLikeComment(comment.id)}
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium",
                      likedComments.has(comment.id) ? "text-accent" : "text-muted-foreground"
                    )}
                  >
                    <Heart className="h-3 w-3" fill={likedComments.has(comment.id) ? "currentColor" : "none"} />
                    {likedComments.has(comment.id) ? comment.likes + 1 : comment.likes}
                  </button>
                  <button className="text-xs font-medium text-muted-foreground">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card border-t border-border safe-area-bottom">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="You"
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="flex-1 flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 border-0 bg-transparent p-0 h-auto text-sm focus-visible:ring-0"
                onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
              />
              <button className="text-muted-foreground">
                <Image className="h-5 w-5" />
              </button>
            </div>
            {newComment.trim() && (
              <button
                onClick={handleSendComment}
                className="h-9 w-9 rounded-full brand-gradient flex items-center justify-center"
              >
                <Send className="h-4 w-4 text-primary-foreground" />
              </button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentsSheet;

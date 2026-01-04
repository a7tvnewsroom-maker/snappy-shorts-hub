import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Send } from "lucide-react";
import { mockComments } from "@/data/mockNews";
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
      // In a real app, this would send to backend
      setNewComment("");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[70vh] rounded-t-3xl px-0">
        <SheetHeader className="px-4 pb-4 border-b border-border">
          <SheetTitle className="text-center font-display">
            {commentsCount.toLocaleString()} Comments
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 h-[calc(70vh-140px)]">
          {mockComments.map((comment) => (
            <div key={comment.id} className="flex gap-3 animate-fade-in">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className="h-10 w-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{comment.user.name}</span>
                  <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                </div>
                <p className="text-sm text-foreground">{comment.text}</p>
                <button
                  onClick={() => toggleLikeComment(comment.id)}
                  className="flex items-center gap-1 mt-2 text-xs text-muted-foreground"
                >
                  <Heart
                    className={cn(
                      "h-4 w-4 transition-colors",
                      likedComments.has(comment.id)
                        ? "text-primary fill-primary"
                        : "text-muted-foreground"
                    )}
                  />
                  <span>
                    {likedComments.has(comment.id) ? comment.likes + 1 : comment.likes}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comment input */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-border safe-area-bottom">
          <div className="flex items-center gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 rounded-full bg-secondary border-0"
              onKeyDown={(e) => e.key === "Enter" && handleSendComment()}
            />
            <Button
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={handleSendComment}
              disabled={!newComment.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentsSheet;

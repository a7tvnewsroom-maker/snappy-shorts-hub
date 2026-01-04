import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Send, Camera } from "lucide-react";
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
      <SheetContent side="bottom" className="h-[75vh] rounded-t-2xl px-0 bg-card">
        <SheetHeader className="px-4 pb-3 border-b border-border">
          <SheetTitle className="text-center text-base font-semibold">
            Comments
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 h-[calc(75vh-130px)]">
          {mockComments.map((comment) => (
            <div key={comment.id} className="flex gap-2">
              <img
                src={comment.user.avatar}
                alt={comment.user.name}
                className="h-8 w-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="bg-secondary rounded-2xl px-3 py-2">
                  <span className="text-sm font-semibold">{comment.user.name}</span>
                  <p className="text-sm text-card-foreground">{comment.text}</p>
                </div>
                <div className="flex items-center gap-4 mt-1 px-3">
                  <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                  <button
                    onClick={() => toggleLikeComment(comment.id)}
                    className={cn(
                      "text-xs font-semibold",
                      likedComments.has(comment.id) ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    Like
                  </button>
                  <button className="text-xs font-semibold text-muted-foreground">
                    Reply
                  </button>
                  {(comment.likes > 0 || likedComments.has(comment.id)) && (
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-xs text-muted-foreground">
                        {likedComments.has(comment.id) ? comment.likes + 1 : comment.likes}
                      </span>
                      <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                        <ThumbsUp className="h-2.5 w-2.5 text-primary-foreground" fill="currentColor" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comment input */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-card border-t border-border safe-area-bottom">
          <div className="flex items-center gap-2">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              alt="You"
              className="h-8 w-8 rounded-full object-cover"
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
                <Camera className="h-5 w-5" />
              </button>
            </div>
            {newComment.trim() && (
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-primary"
                onClick={handleSendComment}
              >
                <Send className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CommentsSheet;

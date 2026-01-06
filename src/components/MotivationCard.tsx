import { Post } from "@/types/post";
import { Sparkles } from "lucide-react";

interface MotivationCardProps {
  post: Post;
  onLike: () => void;
  isLiked: boolean;
}

const MotivationCard = ({ post }: MotivationCardProps) => {
  if (!post.motivation) return null;

  return (
    <div className="relative bg-primary p-6 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4">
        <Sparkles className="h-6 w-6 text-primary-foreground/30" />
      </div>
      <div className="absolute bottom-4 left-4">
        <Sparkles className="h-4 w-4 text-primary-foreground/20" />
      </div>

      {/* Quote */}
      <div className="relative z-10">
        <p className="text-primary-foreground text-lg font-medium leading-relaxed mb-4">
          "{post.motivation.quote}"
        </p>
        <p className="text-primary-foreground/70 text-sm font-medium">
          — {post.motivation.author}
        </p>
      </div>
    </div>
  );
};

export default MotivationCard;

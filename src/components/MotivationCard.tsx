import { Post } from "@/types/post";
import { Quote, Sparkles } from "lucide-react";

interface MotivationCardProps {
  post: Post;
  onLike: () => void;
  isLiked: boolean;
}

const MotivationCard = ({ post }: MotivationCardProps) => {
  if (!post.motivation) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${post.motivation.gradient} opacity-90`} />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      {/* Floating sparkles */}
      <div className="absolute top-4 right-4 animate-float">
        <Sparkles className="h-6 w-6 text-primary-foreground/40" />
      </div>
      <div className="absolute bottom-8 left-6 animate-float" style={{ animationDelay: "1s" }}>
        <Sparkles className="h-4 w-4 text-primary-foreground/30" />
      </div>

      {/* Content */}
      <div className="relative p-6 pt-8">
        <Quote className="h-8 w-8 text-primary-foreground/30 mb-4" />
        
        <p className="text-lg font-display font-semibold text-primary-foreground leading-relaxed mb-6">
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
  );
};

export default MotivationCard;

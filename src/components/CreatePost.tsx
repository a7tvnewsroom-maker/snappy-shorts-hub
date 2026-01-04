import { Image, Video, Sparkles } from "lucide-react";

const CreatePost = () => {
  return (
    <div className="bg-card rounded-xl shadow-sm p-4">
      <div className="flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
          alt="Your profile"
          className="h-11 w-11 rounded-full object-cover ring-2 ring-border"
        />
        <button className="flex-1 text-left px-4 py-3 bg-secondary hover:bg-muted rounded-full text-muted-foreground text-sm transition-colors">
          What's happening?
        </button>
      </div>
      <div className="flex items-center justify-around mt-3 pt-3 border-t border-border">
        <button className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-secondary transition-colors">
          <Video className="h-5 w-5 text-accent" />
          <span className="text-xs font-medium text-muted-foreground">Live</span>
        </button>
        <button className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-secondary transition-colors">
          <Image className="h-5 w-5 text-success" />
          <span className="text-xs font-medium text-muted-foreground">Photo</span>
        </button>
        <button className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-secondary transition-colors">
          <Sparkles className="h-5 w-5 text-warning" />
          <span className="text-xs font-medium text-muted-foreground">Feeling</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;

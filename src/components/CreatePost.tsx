import { Camera, Image } from "lucide-react";

const CreatePost = () => {
  return (
    <div className="bg-card shadow-card p-3">
      <div className="flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
          alt="Your profile"
          className="h-10 w-10 rounded-full object-cover"
        />
        <button className="flex-1 text-left px-4 py-2.5 bg-secondary rounded-full text-muted-foreground text-sm">
          What's on your mind?
        </button>
      </div>
      <div className="flex items-center justify-around mt-3 pt-3 border-t border-border">
        <button className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-secondary transition-colors">
          <Camera className="h-5 w-5 text-fb-red" />
          <span className="text-sm font-medium text-muted-foreground">Live</span>
        </button>
        <button className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-secondary transition-colors">
          <Image className="h-5 w-5 text-fb-green" />
          <span className="text-sm font-medium text-muted-foreground">Photo</span>
        </button>
      </div>
    </div>
  );
};

export default CreatePost;

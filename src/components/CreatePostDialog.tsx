import { X, Film, Image } from "lucide-react";

interface CreatePostDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostDialog = ({ isOpen, onClose }: CreatePostDialogProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/50 z-50"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-card rounded-xl z-50 shadow-lg animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display font-bold text-lg">Create</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Options */}
        <div className="p-4 space-y-3">
          <button
            onClick={onClose}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-muted transition-colors"
          >
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
              <Image className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Create Post</p>
              <p className="text-sm text-muted-foreground">Share photos & text</p>
            </div>
          </button>

          <button
            onClick={onClose}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-muted transition-colors"
          >
            <div className="h-12 w-12 rounded-full bg-accent flex items-center justify-center">
              <Film className="h-6 w-6 text-accent-foreground" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Create Reel</p>
              <p className="text-sm text-muted-foreground">Share short videos</p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default CreatePostDialog;

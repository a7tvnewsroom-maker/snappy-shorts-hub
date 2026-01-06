import { useState, useEffect } from "react";
import { mockPosts } from "@/data/mockPosts";
import Header from "@/components/Header";
import ReelsSection from "@/components/ReelsSection";
import PostCard from "@/components/PostCard";
import CommentsSheet from "@/components/CommentsSheet";
import ReelViewer from "@/components/ReelViewer";
import MenuDrawer from "@/components/MenuDrawer";
import CreatePostDialog from "@/components/CreatePostDialog";
import Advertisement from "@/components/Advertisement";

const Index = () => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState(0);
  const [reelViewerOpen, setReelViewerOpen] = useState(false);
  const [selectedReelId, setSelectedReelId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const openComments = (commentsCount: number) => {
    setSelectedPostComments(commentsCount);
    setCommentsOpen(true);
  };

  const openReel = (reelId: string) => {
    setSelectedReelId(reelId);
    setReelViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop: Black sides with centered content */}
      <div className="md:flex">
        {/* Left black space - desktop only */}
        <div className="hidden md:block flex-1 bg-background" />
        
        {/* Center content */}
        <div className="w-full md:w-[600px] md:max-w-[600px] mx-auto">
          <Header 
            onMenuClick={() => setMenuOpen(true)} 
            onCreateClick={() => setCreateOpen(true)} 
          />
          
          {/* Main content */}
          <main className="pt-[120px] pb-6">
            <ReelsSection 
              onOpenReel={openReel} 
              onCreateReel={() => setCreateOpen(true)}
            />
            
            {/* Feed */}
            <div className="space-y-0">
              {mockPosts.slice(0, 2).map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onOpenComments={() => openComments(post.comments)}
                />
              ))}
              
              {/* Advertisement */}
              <Advertisement />
              
              {mockPosts.slice(2).map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onOpenComments={() => openComments(post.comments)}
                />
              ))}
            </div>
          </main>
        </div>
        
        {/* Right black space - desktop only */}
        <div className="hidden md:block flex-1 bg-background" />
      </div>

      <CommentsSheet
        isOpen={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        commentsCount={selectedPostComments}
      />

      <ReelViewer
        isOpen={reelViewerOpen}
        onClose={() => setReelViewerOpen(false)}
        initialReelId={selectedReelId}
      />

      <MenuDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <CreatePostDialog
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
      />
    </div>
  );
};

export default Index;

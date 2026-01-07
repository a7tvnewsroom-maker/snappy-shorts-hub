import { useState, useEffect } from "react";
import { mockPosts, mockTrends } from "@/data/mockPosts";
import Header from "@/components/Header";
import DesktopSidebar from "@/components/DesktopSidebar";
import ReelsSection from "@/components/ReelsSection";
import PostCard from "@/components/PostCard";
import TrendCard from "@/components/TrendCard";
import CommentsSheet from "@/components/CommentsSheet";
import ReelViewer from "@/components/ReelViewer";
import MenuDrawer from "@/components/MenuDrawer";
import CreatePostDialog from "@/components/CreatePostDialog";
import Advertisement from "@/components/Advertisement";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState(0);
  const [reelViewerOpen, setReelViewerOpen] = useState(false);
  const [selectedReelId, setSelectedReelId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "profile") {
      navigate("/profile/me");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
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
          </>
        );
      
      case "reels":
        return (
          <ReelsSection 
            onOpenReel={openReel} 
            onCreateReel={() => setCreateOpen(true)}
          />
        );
      
      case "trends":
        return (
          <div className="space-y-0">
            {mockTrends.map((trend) => (
              <TrendCard key={trend.id} trend={trend} />
            ))}
          </div>
        );
      
      case "alerts":
        return (
          <div className="p-4 text-center text-muted-foreground">
            <p className="text-sm">No new alerts</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <DesktopSidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCreateClick={() => setCreateOpen(true)}
        onMenuClick={() => setMenuOpen(true)}
      />

      {/* Mobile Header */}
      <Header 
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onMenuClick={() => setMenuOpen(true)} 
        onCreateClick={() => setCreateOpen(true)} 
      />
      
      {/* Main content wrapper */}
      <div className="lg:pl-[72px]">
        {/* Center content */}
        <div className="w-full lg:w-[70%] lg:max-w-[700px] mx-auto">
          {/* Main content */}
          <main className="pt-[120px] lg:pt-6 pb-6">
            {renderContent()}
          </main>
        </div>
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

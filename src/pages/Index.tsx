import { useState } from "react";
import { mockPosts } from "@/data/mockPosts";
import Header from "@/components/Header";
import Stories from "@/components/Stories";
import CreatePost from "@/components/CreatePost";
import ReelsSection from "@/components/ReelsSection";
import PostCard from "@/components/PostCard";
import CommentsSheet from "@/components/CommentsSheet";
import ReelViewer from "@/components/ReelViewer";
import MobileFeed from "@/components/MobileFeed";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState(0);
  const [reelViewerOpen, setReelViewerOpen] = useState(false);
  const [selectedReelId, setSelectedReelId] = useState("");
  const isMobile = useIsMobile();

  const openComments = (commentsCount: number) => {
    setSelectedPostComments(commentsCount);
    setCommentsOpen(true);
  };

  const openReel = (reelId: string) => {
    setSelectedReelId(reelId);
    setReelViewerOpen(true);
  };

  // Mobile: TikTok-style full-page scroll
  if (isMobile) {
    return (
      <div className="h-[100dvh] overflow-hidden bg-background">
        <MobileFeed onOpenComments={openComments} />
        
        <CommentsSheet
          isOpen={commentsOpen}
          onClose={() => setCommentsOpen(false)}
          commentsCount={selectedPostComments}
        />
      </div>
    );
  }

  // Desktop: Traditional infinite scroll
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main content */}
      <main className="pt-[120px] pb-6 px-3 space-y-3 max-w-2xl mx-auto">
        <Stories />
        <CreatePost />
        <ReelsSection onOpenReel={openReel} />
        
        {/* Feed */}
        <div className="space-y-3">
          {mockPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onOpenComments={() => openComments(post.comments)}
            />
          ))}
        </div>
      </main>

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
    </div>
  );
};

export default Index;

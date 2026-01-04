import { useState } from "react";
import { mockPosts } from "@/data/mockPosts";
import Header from "@/components/Header";
import Stories from "@/components/Stories";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import CommentsSheet from "@/components/CommentsSheet";

const Index = () => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState(0);

  const openComments = (commentsCount: number) => {
    setSelectedPostComments(commentsCount);
    setCommentsOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main content with proper padding for fixed header */}
      <main className="pt-[108px] pb-4">
        <Stories />
        
        <div className="h-2" />
        
        <CreatePost />
        
        <div className="h-2" />
        
        {/* Feed */}
        <div className="space-y-2">
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
    </div>
  );
};

export default Index;

import { useState } from "react";
import { ArrowLeft, Settings, Grid, User } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { mockPosts } from "@/data/mockPosts";
import PostCard from "@/components/PostCard";
import CommentsSheet from "@/components/CommentsSheet";

const Profile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [selectedPostComments, setSelectedPostComments] = useState(0);

  // Mock user data
  const user = {
    id: userId || "me",
    name: "John Doe",
    username: "@johndoe",
    bio: "Digital creator | Travel enthusiast | Coffee lover ☕",
    followers: 12500,
    following: 890,
    posts: mockPosts.length,
  };

  // Filter posts for this user (in real app, filter by author)
  const userPosts = mockPosts;

  const openComments = (commentsCount: number) => {
    setSelectedPostComments(commentsCount);
    setCommentsOpen(true);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border safe-area-top">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="font-display font-bold text-lg">{user.name}</h1>
          <button className="p-2 -mr-2 rounded-full hover:bg-secondary transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Profile Info */}
      <div className="bg-card p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center">
            <User className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="font-display font-bold text-xl">{user.name}</h2>
            <p className="text-muted-foreground text-sm">{user.username}</p>
          </div>
        </div>

        <p className="text-sm mb-4">{user.bio}</p>

        {/* Stats */}
        <div className="flex items-center gap-6 mb-4">
          <div className="text-center">
            <p className="font-bold">{user.posts}</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{formatNumber(user.followers)}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{formatNumber(user.following)}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="w-full py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold text-sm hover:bg-muted transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Posts Tab */}
      <div className="border-b border-border bg-card">
        <div className="flex">
          <button className="flex-1 py-3 flex items-center justify-center gap-2 border-b-2 border-primary text-primary">
            <Grid className="h-5 w-5" />
            <span className="font-semibold text-sm">Posts</span>
          </button>
        </div>
      </div>

      {/* User's Posts */}
      <div className="pb-6">
        {userPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onOpenComments={() => openComments(post.comments)}
          />
        ))}
      </div>

      <CommentsSheet
        isOpen={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        commentsCount={selectedPostComments}
      />
    </div>
  );
};

export default Profile;

import { Post, Reel, Comment } from "@/types/post";

export const mockReels: Reel[] = [
  {
    id: "r1",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    views: "2.3M",
    author: "FoodVibes",
  },
  {
    id: "r2",
    thumbnail: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    views: "1.8M",
    author: "FitLife",
  },
  {
    id: "r3",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    views: "5.1M",
    author: "MusicWorld",
  },
  {
    id: "r4",
    thumbnail: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    views: "890K",
    author: "TravelMore",
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    type: "news",
    author: {
      name: "GOFLIX News",
      avatar: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "🚨 Breaking: Revolutionary AI technology unveiled at global tech summit. This innovation could reshape the future of human-computer interaction forever.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    },
    createdAt: "2h ago",
    likes: 15420,
    comments: 892,
    shares: 2340,
  },
  {
    id: "2",
    type: "motivation",
    author: {
      name: "Daily Inspiration",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      verified: true,
    },
    motivation: {
      quote: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
      author: "Steve Jobs",
      gradient: "from-primary via-accent to-primary",
    },
    createdAt: "3h ago",
    likes: 28930,
    comments: 567,
    shares: 4890,
  },
  {
    id: "3",
    type: "news",
    author: {
      name: "Sports Central",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "⚽ Historic victory! Underdog team clinches championship title in a nail-biting finale that will be remembered for generations.",
    media: {
      type: "video",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
    },
    createdAt: "5h ago",
    likes: 42150,
    comments: 3421,
    shares: 8920,
    views: 1250000,
  },
  {
    id: "4",
    type: "motivation",
    author: {
      name: "Mindset Matters",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      verified: false,
    },
    motivation: {
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      gradient: "from-info via-primary to-accent",
    },
    createdAt: "6h ago",
    likes: 19340,
    comments: 823,
    shares: 3670,
  },
  {
    id: "5",
    type: "news",
    author: {
      name: "Global Report",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "🌍 World leaders unite for climate action. New agreement sets ambitious targets for carbon neutrality by 2040.",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&h=500&fit=crop",
    },
    createdAt: "8h ago",
    likes: 35890,
    comments: 2945,
    shares: 7340,
  },
  {
    id: "6",
    type: "motivation",
    author: {
      name: "Growth Mindset",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      verified: true,
    },
    motivation: {
      quote: "Your limitation—it's only your imagination. Push yourself, because no one else is going to do it for you.",
      author: "Unknown",
      gradient: "from-accent via-warning to-accent",
    },
    createdAt: "10h ago",
    likes: 22150,
    comments: 1234,
    shares: 5670,
  },
];

export const mockComments: Comment[] = [
  {
    id: "c1",
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    text: "This is incredible! Thanks for sharing 🙌",
    likes: 234,
    createdAt: "1h",
  },
  {
    id: "c2",
    user: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    text: "Absolutely inspiring content!",
    likes: 156,
    createdAt: "2h",
  },
  {
    id: "c3",
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    text: "Can't wait to see more like this 💯",
    likes: 89,
    createdAt: "3h",
  },
];

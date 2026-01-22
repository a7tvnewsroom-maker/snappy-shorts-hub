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
  {
    id: "r5",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    views: "3.2M",
    author: "TechTips",
  },
  {
    id: "r6",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    views: "1.5M",
    author: "StyleIcon",
  },
  {
    id: "r7",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    views: "4.7M",
    author: "LifeHacks",
  },
  {
    id: "r8",
    thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    views: "2.1M",
    author: "BeautyPro",
  },
  {
    id: "r9",
    thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    views: "6.2M",
    author: "SportsHub",
  },
  {
    id: "r10",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    views: "3.8M",
    author: "AINews",
  },
  {
    id: "r11",
    thumbnail: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    views: "2.9M",
    author: "EcoWorld",
  },
  {
    id: "r12",
    thumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300&h=500&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    views: "4.1M",
    author: "NatureVibes",
  },
];

export interface TrendCard {
  id: string;
  image: string;
  title: string;
  aspectRatio: "1:1" | "4:5" | "9:10";
  likes: number;
  comments: number;
  shares: number;
}

export const mockTrends: TrendCard[] = [
  {
    id: "t1",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080&h=1080&fit=crop",
    title: "Mountains call those who dare to climb higher",
    aspectRatio: "1:1",
    likes: 12500,
    comments: 432,
    shares: 890,
  },
  {
    id: "t2",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080&h=1350&fit=crop",
    title: "Silence speaks louder when stars align above",
    aspectRatio: "4:5",
    likes: 8900,
    comments: 234,
    shares: 567,
  },
  {
    id: "t3",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1080&h=1200&fit=crop",
    title: "Nature heals what medicine cannot touch",
    aspectRatio: "9:10",
    likes: 15600,
    comments: 678,
    shares: 1200,
  },
  {
    id: "t4",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1080&h=1080&fit=crop",
    title: "Forests whisper secrets to patient souls",
    aspectRatio: "1:1",
    likes: 9800,
    comments: 345,
    shares: 678,
  },
  {
    id: "t5",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&h=1350&fit=crop",
    title: "Ocean waves carry dreams to distant shores",
    aspectRatio: "4:5",
    likes: 22300,
    comments: 890,
    shares: 1500,
  },
  {
    id: "t6",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1080&h=1200&fit=crop",
    title: "Adventure awaits beyond your comfort zone",
    aspectRatio: "9:10",
    likes: 18700,
    comments: 567,
    shares: 1100,
  },
  {
    id: "t7",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1080&h=1080&fit=crop",
    title: "Sunsets remind us endings can be beautiful",
    aspectRatio: "1:1",
    likes: 31200,
    comments: 1200,
    shares: 2300,
  },
  {
    id: "t8",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1080&h=1350&fit=crop",
    title: "Wild hearts find home in untamed places",
    aspectRatio: "4:5",
    likes: 14500,
    comments: 456,
    shares: 890,
  },
  {
    id: "t9",
    image: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1080&h=1080&fit=crop",
    title: "Every journey starts with a single brave step",
    aspectRatio: "1:1",
    likes: 25800,
    comments: 789,
    shares: 1890,
  },
  {
    id: "t10",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1080&h=1350&fit=crop",
    title: "Be the light you wish to see in the world",
    aspectRatio: "4:5",
    likes: 19400,
    comments: 623,
    shares: 1340,
  },
  {
    id: "t11",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1080&h=1200&fit=crop",
    title: "Innovation begins where comfort zone ends",
    aspectRatio: "9:10",
    likes: 16200,
    comments: 534,
    shares: 978,
  },
  {
    id: "t12",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1080&h=1080&fit=crop",
    title: "Music speaks what words cannot express today",
    aspectRatio: "1:1",
    likes: 28900,
    comments: 1023,
    shares: 2100,
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    type: "news",
    author: {
      name: "A7TV News",
      avatar: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "🚨 Breaking: Revolutionary AI technology unveiled at global tech summit. This innovation could reshape the future of human-computer interaction forever.",
    media: {
      type: "video",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1080&h=1080&fit=crop",
    },
    createdAt: "2h ago",
    likes: 15420,
    comments: 892,
    shares: 2340,
    views: 2500000,
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
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1080&h=1080&fit=crop",
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
      url: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1080&h=1080&fit=crop",
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

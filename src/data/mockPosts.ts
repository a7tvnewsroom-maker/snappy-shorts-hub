import { Post, Comment } from "@/types/post";

export const mockPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "A7TV News",
      avatar: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "🚨 BREAKING: Major Tech Company Announces Revolutionary AI Assistant that promises to transform how we interact with technology in our daily lives. Experts say this could be the biggest advancement in decades. What do you think? 🤖",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    },
    createdAt: "2h",
    reactions: { like: 8420, love: 2340, haha: 156, wow: 892, sad: 23, angry: 45 },
    comments: 1892,
    shares: 3420,
  },
  {
    id: "2",
    author: {
      name: "Global Report",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "🌍 Historic Climate Agreement Reached at Global Summit! World leaders have come together to sign a groundbreaking climate accord that could reshape environmental policy for generations. This is a pivotal moment for our planet. 🌱",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&h=600&fit=crop",
    },
    createdAt: "4h",
    reactions: { like: 15930, love: 8567, haha: 89, wow: 2341, sad: 567, angry: 234 },
    comments: 4567,
    shares: 8920,
  },
  {
    id: "3",
    author: {
      name: "Sports Central",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "⚽ INCREDIBLE FINISH! Local Team Wins Championship in Thrilling Final Match! In an electrifying finish, the underdog team clinched victory in the final seconds, sending fans into a frenzy of celebration! 🏆🎉",
    media: {
      type: "video",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    createdAt: "6h",
    reactions: { like: 32150, love: 12421, haha: 2341, wow: 5678, sad: 123, angry: 89 },
    comments: 8421,
    shares: 15920,
  },
  {
    id: "4",
    author: {
      name: "Celeb Watch",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      verified: false,
    },
    content: "💍 SURPRISE WEDDING! Hollywood's favorite couple has tied the knot in an intimate ceremony, surprising fans and media alike with the sudden announcement. Congratulations to the happy couple! 💕",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    },
    createdAt: "8h",
    reactions: { like: 45340, love: 28823, haha: 1234, wow: 8912, sad: 234, angry: 156 },
    comments: 12823,
    shares: 21670,
    isSponsored: true,
  },
  {
    id: "5",
    author: {
      name: "Finance Daily",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
      verified: true,
    },
    content: "📈 Stock Markets Hit Record High Amid Economic Optimism! Financial markets continue their bullish run as investors respond to positive economic indicators and corporate earnings reports. Is now the time to invest? 💰",
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop",
    },
    createdAt: "10h",
    reactions: { like: 6890, love: 1945, haha: 567, wow: 1234, sad: 89, angry: 234 },
    comments: 2945,
    shares: 4340,
  },
];

export const mockComments: Comment[] = [
  {
    id: "c1",
    user: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    text: "This is incredible news! Can't wait to see how this develops 🎉",
    likes: 234,
    createdAt: "1h",
  },
  {
    id: "c2",
    user: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    text: "Finally some good news! This is exactly what we needed.",
    likes: 156,
    createdAt: "2h",
  },
  {
    id: "c3",
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    text: "I've been following this story for weeks. Great coverage! 👏",
    likes: 89,
    createdAt: "3h",
  },
];

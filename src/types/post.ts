export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  media?: {
    type: "image" | "video";
    url: string;
  };
  createdAt: string;
  reactions: {
    like: number;
    love: number;
    haha: number;
    wow: number;
    sad: number;
    angry: number;
  };
  comments: number;
  shares: number;
  isSponsored?: boolean;
}

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  likes: number;
  createdAt: string;
  replies?: Comment[];
}

export type ReactionType = "like" | "love" | "haha" | "wow" | "sad" | "angry";

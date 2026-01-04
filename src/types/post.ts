export interface Post {
  id: string;
  type: "news" | "reel" | "motivation";
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  content?: string;
  media?: {
    type: "image" | "video";
    url: string;
    thumbnail?: string;
  };
  motivation?: {
    quote: string;
    author: string;
    gradient: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  views?: number;
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
}

export interface Reel {
  id: string;
  thumbnail: string;
  videoUrl: string;
  views: string;
  author: string;
}

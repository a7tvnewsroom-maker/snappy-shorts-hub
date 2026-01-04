export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  likes: number;
  comments: number;
  shares: number;
  isLive?: boolean;
  author: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  createdAt: string;
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

import { useState, useRef, useEffect } from "react";
import { mockNews } from "@/data/mockNews";
import NewsReel from "@/components/NewsReel";
import CommentsSheet from "@/components/CommentsSheet";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const itemHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / itemHeight);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < mockNews.length) {
        setActiveIndex(newIndex);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  return (
    <>
      <meta name="theme-color" content="#0a0a0a" />
      <div
        ref={containerRef}
        className="h-[100dvh] w-full overflow-y-scroll snap-container no-scrollbar"
      >
        {mockNews.map((news, index) => (
          <NewsReel
            key={news.id}
            news={news}
            isActive={index === activeIndex}
            onOpenComments={() => setCommentsOpen(true)}
          />
        ))}
      </div>

      <CommentsSheet
        isOpen={commentsOpen}
        onClose={() => setCommentsOpen(false)}
        commentsCount={mockNews[activeIndex]?.comments || 0}
      />

      <BottomNav />
    </>
  );
};

export default Index;

import { Home, Users, PlaySquare, Bell, Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", icon: Home },
    { id: "friends", icon: Users },
    { id: "watch", icon: PlaySquare },
    { id: "notifications", icon: Bell },
    { id: "menu", icon: Menu },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card shadow-card safe-area-top">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2">
        <h1 className="text-2xl font-bold text-primary">a7tv</h1>
        <div className="flex items-center gap-2">
          <button className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
            <Search className="h-5 w-5 text-card-foreground" />
          </button>
        </div>
      </div>

      {/* Navigation tabs */}
      <nav className="flex items-center border-t border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-3 flex items-center justify-center relative transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 1.5} />
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
              {tab.id === "notifications" && (
                <span className="absolute top-1 right-1/4 h-5 w-5 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                  9+
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;

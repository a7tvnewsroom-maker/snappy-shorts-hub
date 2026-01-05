import { Home, Compass, Film, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "explore", icon: Compass, label: "Explore" },
    { id: "reels", icon: Film, label: "Reels" },
    { id: "alerts", icon: Bell, label: "Alerts", badge: 5 },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border safe-area-top">
      {/* Logo bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-2xl font-display font-extrabold brand-gradient-text">a7tv</h1>
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
            📍 Live
          </span>
        </div>
      </div>

      {/* Navigation tabs */}
      <nav className="flex items-center px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 py-2.5 flex flex-col items-center gap-0.5 relative transition-all",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <div className="relative">
                <Icon className={cn("h-5 w-5", isActive && "scale-110")} strokeWidth={isActive ? 2.5 : 2} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full brand-gradient" />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;

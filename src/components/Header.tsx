import { Home, Film, Bell, User, Menu, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
  onCreateClick: () => void;
}

const Header = ({ onMenuClick, onCreateClick }: HeaderProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate();

  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "reels", icon: Film, label: "Reels" },
    { id: "alerts", icon: Bell, label: "Alerts", badge: 5 },
    { id: "profile", icon: User, label: "Profile" },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "profile") {
      navigate("/profile/me");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border safe-area-top">
      {/* Logo bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-2xl font-display font-extrabold text-primary">GOFLIX</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={onCreateClick}
            className="p-2 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Plus className="h-5 w-5" />
          </button>
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
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
              onClick={() => handleTabClick(tab.id)}
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
                <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;

import { Home, Film, TrendingUp, Bell, User, Plus, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onCreateClick: () => void;
  onMenuClick: () => void;
}

const DesktopSidebar = ({ activeTab, onTabChange, onCreateClick, onMenuClick }: DesktopSidebarProps) => {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "reels", icon: Film, label: "Reels" },
    { id: "trends", icon: TrendingUp, label: "Trends" },
    { id: "alerts", icon: Bell, label: "Alerts", badge: 5 },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-[72px] flex-col items-center py-6 bg-background border-r border-border z-50">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-xl font-display font-extrabold">
          <span className="text-primary">G</span>
          <span className="text-foreground">F</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "relative p-3 rounded-xl transition-all",
                isActive 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon 
                className={cn("h-6 w-6", isActive && "scale-110")} 
                strokeWidth={isActive ? 2.5 : 2} 
              />
              {tab.badge && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Create button */}
        <button
          onClick={onCreateClick}
          className="p-3 rounded-xl bg-secondary text-muted-foreground hover:text-foreground transition-all mt-2"
        >
          <Plus className="h-6 w-6" />
        </button>
      </nav>

      {/* Menu button at bottom */}
      <button
        onClick={onMenuClick}
        className="p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
      >
        <Menu className="h-6 w-6" />
      </button>
    </aside>
  );
};

export default DesktopSidebar;

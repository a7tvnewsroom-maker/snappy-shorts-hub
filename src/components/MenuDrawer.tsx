import { X, User, Sun, Moon, Settings, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const MenuDrawer = ({ isOpen, onClose, isDarkMode, onToggleDarkMode }: MenuDrawerProps) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate("/profile/me");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/50 z-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-72 bg-card z-50 shadow-lg animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display font-bold text-lg">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Profile Section */}
        <button
          onClick={handleViewProfile}
          className="w-full flex items-center gap-3 p-4 hover:bg-secondary transition-colors"
        >
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="text-left">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-muted-foreground">View your profile</p>
          </div>
        </button>

        {/* Menu Items */}
        <div className="p-2">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors"
          >
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Moon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" />
              )}
              <span className="font-medium">{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
            </div>
            <div
              className={`w-12 h-6 rounded-full p-1 transition-colors ${
                isDarkMode ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`h-4 w-4 rounded-full bg-card transition-transform ${
                  isDarkMode ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>
          </button>

          {/* Settings */}
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Settings</span>
          </button>

          {/* Help & Support */}
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Help & Support</span>
          </button>

          {/* Log Out */}
          <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-destructive">
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuDrawer;

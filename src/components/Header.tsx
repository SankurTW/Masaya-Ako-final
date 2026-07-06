import { Bell, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useNotificationStore } from "../stores/useNotificationStore";
import { Button } from "./ui/Button";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.signOut);
  const unread = useNotificationStore(
    (state) => state.notifications.filter((notification) => !notification.read).length,
  );

  return (
    <header className="app-header">
      <div className="shell-row">
        <h1>{title}</h1>
        <div className="header-actions">
          <Button
            variant="ghost"
            size="icon"
            className="header-icon"
            onClick={() => navigate("/notifications")}
            aria-label="Notifications"
          >
            <Bell size={19} />
            {unread > 0 ? <span className="header-dot" /> : null}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="header-icon"
            onClick={() => navigate("/profile?settings=true")}
            aria-label="Settings"
          >
            <Settings size={19} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="header-icon"
            onClick={() => {
              signOut();
              navigate("/auth");
            }}
            aria-label="Log out"
          >
            <LogOut size={19} />
          </Button>
        </div>
      </div>
    </header>
  );
}

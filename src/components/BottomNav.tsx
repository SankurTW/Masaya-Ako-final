import { Home, Map, MessageCircle, UserRound, UsersRound } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useLocationStore } from "../stores/useLocationStore";
import { useProfileStore } from "../stores/useProfileStore";
import { getWorkApp } from "../utils/workApps";

export function BottomNav() {
  const user = useAuthStore((state) => state.user);
  const activeApp = useProfileStore((state) => state.activeApp);
  const totalDistanceKm = useLocationStore((state) => state.totalDistanceKm);
  const app = getWorkApp(activeApp);
  const firstName = user?.fullName.split(" ")[0] ?? "Driver";

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        <NavItem to="/home" label="Home" icon={<Home size={21} />} />
        <NavItem to="/community" label="Community" icon={<UsersRound size={21} />} />
        <NavItem
          to="/routes"
          label={firstName}
          subLabel={app ? `${totalDistanceKm.toFixed(1)}km` : undefined}
          icon={
            <span className="nav-live-icon">
              <Map size={21} />
              {app ? <small>{app.logo}</small> : null}
            </span>
          }
        />
        <NavItem to="/messages" label="Messages" icon={<MessageCircle size={21} />} />
        <NavItem to="/profile" label="Profile" icon={<UserRound size={21} />} />
      </div>
    </nav>
  );
}

function NavItem({
  to,
  icon,
  label,
  subLabel,
}: {
  to: string;
  icon: ReactNode;
  label: string;
  subLabel?: string;
}) {
  return (
    <NavLink to={to} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      {icon}
      <span>{label}</span>
      {subLabel ? <em>{subLabel}</em> : null}
    </NavLink>
  );
}

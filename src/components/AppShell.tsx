import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

interface AppShellProps {
  title: string;
  children: ReactNode;
}

export function AppShell({ title, children }: AppShellProps) {
  const user = useAuthStore((state) => state.user);

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="app-frame">
      <Header title={title} />
      {children}
      <BottomNav />
    </div>
  );
}

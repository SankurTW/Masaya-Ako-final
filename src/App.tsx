import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ConsentGate } from "./components/ConsentGate";
import { Toasts } from "./components/Toasts";
import { NotificationService } from "./services/NotificationService";
import { SupabaseService } from "./services/SupabaseService";
import { useAuthStore } from "./stores/useAuthStore";
import { useChatStore } from "./stores/useChatStore";
import { useCommunityStore } from "./stores/useCommunityStore";
import { useJobStore } from "./stores/useJobStore";
import { useLocationStore } from "./stores/useLocationStore";
import { useNotificationStore } from "./stores/useNotificationStore";
import { useProfileStore } from "./stores/useProfileStore";
import { AuthScreen } from "./screens/AuthScreen";
import { CommunityScreen } from "./screens/CommunityScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { MessagesScreen } from "./screens/MessagesScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { PrivacyScreen } from "./screens/PrivacyScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { RoutesScreen } from "./screens/RoutesScreen";
import { TermsScreen } from "./screens/TermsScreen";

export default function App() {
  const user = useAuthStore((state) => state.user);
  const initSession = useAuthStore((state) => state.initSession);
  const isTracking = useLocationStore((state) => state.isTracking);
  const tickElapsed = useLocationStore((state) => state.tickElapsed);
  const loadCloudSettings = useProfileStore((state) => state.loadCloudSettings);
  const loadCloudJobs = useJobStore((state) => state.loadCloudJobs);
  const loadCloudCommunity = useCommunityStore((state) => state.loadCloudCommunity);
  const loadCloudChats = useChatStore((state) => state.loadCloudChats);
  const loadCloudNotifications = useNotificationStore((state) => state.loadCloudNotifications);

  useEffect(() => {
    void initSession();
  }, [initSession]);

  useEffect(() => {
    if (!isTracking) return undefined;
    const timer = window.setInterval(tickElapsed, 60000);
    return () => window.clearInterval(timer);
  }, [isTracking, tickElapsed]);

  useEffect(() => {
    if (!user || !SupabaseService.enabled) return undefined;
    void loadCloudSettings(user.id);
    void loadCloudJobs(user.id);
    void loadCloudCommunity();
    void loadCloudChats(user.id);
    void loadCloudNotifications(user.id);
    void NotificationService.initPush(user.id);

    const unsubscribe = [
      SupabaseService.subscribeToTable("jobs", () => void loadCloudJobs(user.id)),
      SupabaseService.subscribeToTable("feed_posts", () => void loadCloudCommunity()),
      SupabaseService.subscribeToTable("worker_locations", () => void loadCloudCommunity()),
      SupabaseService.subscribeToTable("chat_messages", () => void loadCloudChats(user.id)),
      SupabaseService.subscribeToTable("notifications", () => void loadCloudNotifications(user.id)),
    ];
    return () => unsubscribe.forEach((fn) => fn());
  }, [
    loadCloudChats,
    loadCloudCommunity,
    loadCloudJobs,
    loadCloudNotifications,
    loadCloudSettings,
    user,
  ]);

  return (
    <>
      <ConsentGate />
      <Routes>
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/privacy" element={<PrivacyScreen />} />
        <Route path="/terms" element={<TermsScreen />} />
        <Route
          path="/home"
          element={
            <AppShell title="Masaya Ako">
              <HomeScreen />
            </AppShell>
          }
        />
        <Route
          path="/community"
          element={
            <AppShell title="Community">
              <CommunityScreen />
            </AppShell>
          }
        />
        <Route
          path="/routes"
          element={
            <AppShell title="Routes">
              <RoutesScreen />
            </AppShell>
          }
        />
        <Route
          path="/messages"
          element={
            <AppShell title="Messages">
              <MessagesScreen />
            </AppShell>
          }
        />
        <Route
          path="/profile"
          element={
            <AppShell title="Profile">
              <ProfileScreen />
            </AppShell>
          }
        />
        <Route
          path="/notifications"
          element={
            <AppShell title="Notifications">
              <NotificationsScreen />
            </AppShell>
          }
        />
        <Route path="/" element={<Navigate to="/routes" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      <Toasts />
    </>
  );
}

# Masaya Ako Driver App

Masaya Ako is a gig-worker mobile app for driver onboarding, job feed, live GPS tracking, community posts, realtime chat, notifications, profile/settings, vehicle maintenance, and earnings summaries.

## What Is Included

- React + TypeScript + Vite frontend.
- Capacitor Android project in `android/` for Android Studio and APK builds.
- Offline-first Zustand stores with local persistence.
- Supabase-ready cloud sync for auth, profiles, jobs, chat, community, notifications, and live locations.
- Native Android GPS, camera/image attachment, and local notification plugin wiring.

## Web Development

```bash
pnpm install
pnpm dev
```

Open `http://127.0.0.1:5173/`.

## Cloud Setup

1. Create a Supabase project.
2. Run [supabase/schema.sql](./supabase/schema.sql) in the Supabase SQL editor.
3. Copy `.env.example` to `.env`.
4. Fill in:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

5. In Supabase Auth settings, disable email confirmation for the quickest phone-as-login-password flow, or replace the current phone/password adapter with OTP before production launch.

Without these env values, the app still works locally/offline on one device.

## Push Notifications (optional)

The app registers for push via `@capacitor/push-notifications`. Local notifications
work out of the box. Remote/server push (chat messages, job alerts) is fully built:

- Server sender: [supabase/functions/send-push/index.ts](./supabase/functions/send-push/index.ts) (FCM HTTP v1).
- DB hardening + auto chat push trigger: [supabase/production.sql](./supabase/production.sql).
- **Step-by-step setup: [supabase/PUSH_SETUP.md](./supabase/PUSH_SETUP.md).**

Until Firebase is configured, the app runs normally — push registration fails
silently and falls back to in-app/local notifications, so nothing crashes.

## Android Studio / APK

Requirements:

- Android Studio with Android SDK installed.
- JDK compatible with the installed Android Gradle Plugin.
- Node.js and pnpm.

Build and sync web assets into Android:

```bash
pnpm android:sync
```

Open in Android Studio:

```bash
pnpm android:open
```

Build a debug APK from terminal:

```bash
pnpm android:apk
```

The debug APK will be under:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

For Play Store release, use Android Studio `Build > Generate Signed Bundle / APK` and create a signed AAB.

## GitHub

Recommended files to commit:

- `src/`
- `android/`
- `supabase/schema.sql`
- `capacitor.config.ts`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `.env.example`
- `README.md`

Do not commit `.env`, `node_modules/`, `.tools/`, or generated build folders.

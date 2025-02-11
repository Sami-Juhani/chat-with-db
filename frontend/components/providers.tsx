"use client";

import { useEffect } from "react";

import { AuthProvider } from "@/context/auth-context";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import posthog from "posthog-js";
import SuspendedPostHogPageView from "./posthog-pageview";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.VERCEL_ENV === "development"
    ) {
      const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

      if (posthogKey && posthogHost) {
        posthog.init(posthogKey, {
          api_host: posthogHost,
          person_profiles: "identified_only",
        });
      } else {
        console.error("PostHog environment variables are not set correctly");
      }
    }
  }, []);

  if (
    process.env.NODE_ENV === "development" ||
    process.env.VERCEL_ENV === "development"
  ) {
    return (
      <PHProvider client={posthog}>
        <SuspendedPostHogPageView />
        <AuthProvider>{children}</AuthProvider>
      </PHProvider>
    );
  }

  return <AuthProvider>{children}</AuthProvider>;
}

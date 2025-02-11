"use client";

import { useEffect } from "react";
import { AuthProvider } from "@/context/auth-context";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import posthog from "posthog-js";

export default function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL_ENV === "production"
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: "identified_only",
      });
    }
  }, []);

  if (
    process.env.NODE_ENV === "production" ||
    process.env.VERCEL_ENV === "production"
  ) {
    return (
      <PHProvider client={posthog}>
        <AuthProvider>{children}</AuthProvider>
      </PHProvider>
    );
  }

  return <AuthProvider>{children}</AuthProvider>;
}

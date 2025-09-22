"use client";

import { usePathname } from "next/navigation";
import Analytics from "@vercel/analytics";

export default function AnalyticsWrapper() {
  const pathname = usePathname();

  if (pathname === "/about") return null;

  // Inject analytics into the page
  if (typeof window !== "undefined") {
    Analytics.inject();
  }

  return null; // no JSX component
}

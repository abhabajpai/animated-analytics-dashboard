import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import AnalyticsWrapper from "./AnalyticsWrapper";

export const metadata: Metadata = {
  title: "App",
  description: "",
  generator: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <AnalyticsWrapper /> {/* conditionally injects analytics */}
      </body>
    </html>
  );
}

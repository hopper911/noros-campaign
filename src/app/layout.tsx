import type { Metadata, Viewport } from "next";
import { DisclaimerBanner } from "@/components/shell/DisclaimerBanner";
import { SpriteIcons } from "@/components/north/SpriteIcons";
import { PageTransition } from "@/components/motion/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI FinOps Agent | Noros by North.cloud — Portfolio Recreation",
  description:
    "Independent portfolio recreation of the Noros AI Agent page. Not commissioned by or affiliated with North.Cloud.",
};

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#212121",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-black text-neue">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-md focus:bg-mint focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:tracking-wide focus:text-black focus:uppercase"
        >
          Skip to main content
        </a>
        <PageTransition />
        <SpriteIcons />
        <DisclaimerBanner />
        {children}
      </body>
    </html>
  );
}

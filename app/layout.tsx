import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteTitle = "HSAY 网球俱乐部｜Hit · Spin · Ace & You";
const siteDescription =
  "扎根上海的 LGBTQ+ 友好网球社群。查看赛事日历、赛程安排、完整比分、赛季排名、H2H 与球员档案。";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  const socialImage = new URL("/og.png", origin).toString();

  return {
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      type: "website",
      locale: "zh_CN",
      images: [{ url: socialImage, width: 1734, height: 907, alt: "HSAY 网球俱乐部 — 场下是姐妹，场上撕得飞。" }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}

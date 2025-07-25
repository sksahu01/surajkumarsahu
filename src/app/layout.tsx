import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suraj Kumar Sahu - Software Developer Portfolio",
  description: "Modern portfolio website showcasing software development skills, projects, and experience. Built with Next.js, Shadcn UI, and Tailwind CSS.",
  keywords: ["Software Developer", "Portfolio", "Next.js", "React", "TypeScript", "Frontend", "Backend", "Full Stack"],
  authors: [{ name: "Suraj Kumar Sahu" }],
  openGraph: {
    title: "Suraj Kumar Sahu - Software Developer Portfolio",
    description: "Modern portfolio website showcasing software development skills, projects, and experience.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suraj Kumar Sahu - Software Developer Portfolio",
    description: "Modern portfolio website showcasing software development skills, projects, and experience.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-screen bg-black text-white"
        )}
      >
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}

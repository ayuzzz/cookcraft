import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CookCraft",
  description: "an AI-powered personal meal tracker",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <header className="fixed top-0 left-0 w-full z-50">
          <div >
            <Navbar />
          </div>
        </header>
        <main className="container min-h-screen py-6 mx-auto pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}

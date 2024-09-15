import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { MusicNote } from "@/components/music-note";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://almighty-k-piano-site.vercel.app/"),
  title: "Almighty-K piano performance",
  description:
    "A simple site created by an engineer who plays piano as a hobby, using v0. Please enjoy my piano videos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#1C0C0C]`}
      >
        <div className="p-4 relative overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <MusicNote key={i} delay={i * 0.5} size={Math.random() * 20 + 20} />
          ))}
          {children}
        </div>
      </body>
    </html>
  );
}

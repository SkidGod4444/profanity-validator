import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";

const usefont = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Fast, Open-Source Profanity Validator',
  description: "Profanity SDK made by Saidev Dhal",
};

export const viewport: Viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari, credit to https://github.com/ai-ng
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={usefont.className}
      >
        <Navbar/>
        <div className="flex h-screen w-full">
        {children}
        </div>
      </body>
    </html>
  );
}

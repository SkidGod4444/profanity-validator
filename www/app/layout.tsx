import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/custom/navbar";
import { Toaster } from "@/components/ui/sonner";

const usefont = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fast, Open-Source Profanity Validator",
  description: "Profanity SDK made by Saidev Dhal",
  keywords: [
    "profanity api",
    "profanity.dev",
    "profanity validator",
    "swear word",
    "react hook form",
    "react form",
    "saidev dhal",
    "form validator",
    "zod",
    "zod validator",
    "zod resolver",
    "profanity resolver",
  ],
  authors: [
    {
      name: "Saidev Dhal",
      url: "https://devwtf.in",
    },
  ],
  creator: "Saidev Dhal",
  openGraph: {
    images: [
      {
        url: "https://i.imgur.com/KCJmPOa.png",
        width: 1200,
        height: 627,
        alt: "ProfanityValidator - Free, OpenSource swear word validator for your form.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "https://profanity.devwtf.in",
    creator: "Saidev Dhal",
    title: "Fast, Open-Source Profanity Validator",
    description: "Profanity SDK made by Saidev Dhal",
    images: [
      {
        url: "https://i.imgur.com/KCJmPOa.png",
        width: 1200,
        height: 627,
        alt: "Fast, Open-Source Profanity Validator",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={usefont.className}>
        <Navbar />
        <div className="flex h-screen w-full">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}

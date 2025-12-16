import type { Metadata } from "next";
import { Sen, Satisfy, Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ReactQueryContext from "@/lib/context/react-query-context";
import Footer from "@/components/footer";
import UserContext from "@/lib/context/user-context";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import GlobalScripts from "@/components/global-scripts";
import ScrollToTopTempFix from "@/components/scroll-to-top-temp-fix";
import Topbar from "@/components/header/Topbar";
import FloatingButtons from "@/components/HoveringButtons/FloatingButtons";

const sen = Sen({
  subsets: ["latin"],
  variable: "--font-sen",
  display: "swap",
});

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-satisfy",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rara Treks Tours & Travels | Nepal Trekking & Tour Operator",
  description:
    "Explore Nepal with Rara Treks Tours & Travels, offering luxury, family, solo, and budget trekking and tours across Everest, Annapurna, Rara, and other Himalayan destinations.",
  keywords: [
    "Nepal trekking",
    "Nepal tour operator",
    "Himalayan adventure Nepal",
    "Everest trek",
    "Annapurna trek",
    "Rara Lake trek",
    "luxury trekking Nepal",
    "family tours Nepal",
    "budget trekking Nepal",
    "eco-conscious trekking",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sen.variable} ${satisfy.variable} ${mulish.variable} min-h-screen flex flex-col bg-[#F2F5F0] text-black`}
      >
        <ReactQueryContext>
          <UserContext>
            <Topbar />
            <Header />
            {children}
            <Footer />
            <Toaster />
            <NextTopLoader height={5} color="hsl(var(--primary))" />
            <ScrollToTopTempFix />
            <FloatingButtons />
          </UserContext>
        </ReactQueryContext>
        <GlobalScripts />
      </body>
    </html>
  );
}

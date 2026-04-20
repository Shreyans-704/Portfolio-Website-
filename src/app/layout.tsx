import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TitleTyper from "@/components/TitleTyper";
import PortfolioAssistant from "@/components/PortfolioAssistant";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shreyans Jaiswal — Creative Developer",
  description: "I build AI-powered digital experiences bridging design, systems, and intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={inter.className}>
        <TitleTyper />
        {children}
        <PortfolioAssistant />
      </body>
    </html>
  );
}

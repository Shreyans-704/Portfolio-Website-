import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import TitleTyper from "@/components/TitleTyper";
import PortfolioAssistant from "@/components/PortfolioAssistant";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const siteUrl = "https://www.shreyansjaiswal.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  applicationName: "Shreyans Jaiswal — Portfolio",

  title: {
    default: "Shreyans Jaiswal | Software Engineer & AI Developer",
    template: "%s | Shreyans Jaiswal",
  },

  description:
    "Shreyans Jaiswal is a Software Engineer and AI Developer at NIT Jalandhar, building AI applications, scalable backend systems, real-time platforms, and full-stack products.",

  authors: [{ name: "Shreyans Jaiswal", url: siteUrl }],
  creator: "Shreyans Jaiswal",

  keywords: [
    "Shreyans Jaiswal",
    "Software Engineer",
    "AI Developer",
    "NIT Jalandhar",
    "Full Stack Developer",
    "Backend Engineer",
    "RAG",
    "LangChain",
    "Next.js",
    "Node.js",
  ],

  alternates: {
    canonical: siteUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Shreyans Jaiswal",
    title: "Shreyans Jaiswal | Software Engineer & AI Developer",
    description:
      "Shreyans Jaiswal is a Software Engineer and AI Developer at NIT Jalandhar, building AI applications, scalable backend systems, real-time platforms, and full-stack products.",
    images: [
      {
        url: "/profile.png",
        width: 1200,
        height: 1200,
        alt: "Shreyans Jaiswal — Software Engineer & AI Developer",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@Shreyans704",
    creator: "@Shreyans704",
    title: "Shreyans Jaiswal | Software Engineer & AI Developer",
    description:
      "Shreyans Jaiswal is a Software Engineer and AI Developer at NIT Jalandhar, building AI applications, scalable backend systems, real-time platforms, and full-stack products.",
    images: ["/profile.png"],
  },
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

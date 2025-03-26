import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ART Emerged Web - Unique Clothing Collections",
  description:
    "Discover ARt Emerged Clothing, featuring unique, high-quality apparel & immersive art pieces from our latest collections. Shop now for style and durability.",
  keywords: "art emerged, augmented reality, ar, clothing, fashion, e-commerce, unique apparel, summer collection",
  authors: [{ name: "Robert Lawrence", url: "https://art-web-nu.vercel.app/" }],
  openGraph: {
    title: "ART Emerged Web - Unique Clothing Collections",
    description:
      "Explore the latest from ARt Emerged Clothing. Shop premium apparel designed for style and durability.",
    url: "https://art-web-nu.vercel.app/",
    siteName: "ART Emerged Web",
    images: [
      {
        url: "https://art-web-nu.vercel.app/logo.png",
        width: 1200,
        height: 630,
        alt: "ART Emerged Clothing Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ART Emerged Web - Augmented reality for the future.",
    description:
      "Shop ARt Emerged Clothing for unique, durable apparel from our latest collections.",
    image: "https://art-web-nu.vercel.app/logo.png",
  },
  icons: {
    icon: "/favicon.ico", // Ensure this matches the file in public/
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <script src="https://docs.opencv.org/4.10.0/opencv.js" async />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        </head>
      <body className="bg-black">{children}</body>
    </html>
  );
}
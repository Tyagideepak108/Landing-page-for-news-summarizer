import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LoadingScreen from "../components/LoadingScreen";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnapNews - AI News Summarizer",
  description: "AI-powered news summarization platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <LoadingScreen />
        {children}
      </body>
    </html>
  );
}

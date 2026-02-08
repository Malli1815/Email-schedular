import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReachInbox | Premium Email Scheduler",
  description: "Automate your email outreach with precision",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, backgroundColor: '#030303', color: 'white', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}

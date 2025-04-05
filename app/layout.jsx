import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import Session from "@/providers/Session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CPU process Scheduler Simulator",
  description: "A CPU process scheduler simulator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white grid grid-cols-[auto_1fr] h-screen max-h-screen overflow-hidden`}
      >
        <Session>

        <Navbar/>
        {children}
      
        </Session>
      </body>
    </html>
  );
}

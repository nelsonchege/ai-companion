import NextAuthSessionProvider from "@/providers/sessionProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToasterProvider } from "@/providers/toastProvider";
import { ThemeProvider } from "@/providers/themeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Companion",
  description: "talk and create you personalized AI Companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthSessionProvider>
          <ToasterProvider />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

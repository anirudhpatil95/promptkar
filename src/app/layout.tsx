import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PromptKar - AI Prompt Generator for India",
  description: "Generate perfect AI prompts in Hindi and English. Create text, images, and websites with simple voice or text input.",
  keywords: ["AI", "prompt", "generator", "Hindi", "English", "India", "ChatGPT", "Gemini", "Claude"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

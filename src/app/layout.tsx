import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar'; // Adjust the path based on your project structure

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mj+",
  description: "personal use - LM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-500 text-white`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

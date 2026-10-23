import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/app/components/Navbar";

export const metadata: Metadata = {
  title: "Constellation Counter",
  description: "Constellation Counter client viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import { ClerkProvider } from '@clerk/nextjs';
export const metadata: Metadata = {
  title: "Queue Overflow",
  description: "Thriving Community of Geeks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body>{children}</body>
    </html>
  </ClerkProvider>
  );
}

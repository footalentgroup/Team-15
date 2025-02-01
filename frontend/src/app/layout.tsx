import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { SnackbarProvider } from "@/contexts/snackbar/snackbarContext";

export const metadata: Metadata = {
  title: "PalProfe",
  description: "Apoyando a los que educan",
  manifest: "/manifest.js",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-yellow-light-100 ${inter.className}`}>
        <SnackbarProvider>
          {children}
        </SnackbarProvider>
      </body>
    </html>
  );
}

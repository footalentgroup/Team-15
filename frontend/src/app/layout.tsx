import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pal Profe",
  description: "Tu ayuda en la planificación de clases",
  manifest: "/manifest.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-yellow-light-100">
        {children}
      </body>
    </html>
  );
}

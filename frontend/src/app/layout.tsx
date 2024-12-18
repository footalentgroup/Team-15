import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pal Profe",
  description: "Tu ayuda en la planificación de clases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}

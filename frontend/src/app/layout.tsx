import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { SnackbarProvider } from "@/contexts/snackbar/SnackbarContext";
import { Analytics } from '@vercel/analytics/next';
import WarningMessage from "@/ui/warningMessage";

export const metadata: Metadata = {
  title: "PalProfe",
  description: "Apoyando a los que educan",
  manifest: "/manifest.js",
};

const inter = Inter({ subsets: ["latin"] });

const OFFLINE = process.env.NEXT_PUBLIC_OFFLINE;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-yellow-light-100 ${inter.className}`}>
        {OFFLINE === "true" && (
          <WarningMessage title="OFFLINE" info="En este modo, usted podrá probar la aplicación sin realizar cambios en el servidor. Esto significa que cualquier modificación que realice no se guardará ni afectará a los datos reales. Algunas funciones pueden no comportarse como se espera debido a la falta de conexión con el servidor. Le recomendamos que utilice este modo para familiarizarse con la interfaz y las funcionalidades de la aplicación. Tenga en cuenta que algunas características avanzadas pueden no estar disponibles o funcionar de manera limitada." />
        )}
        <SnackbarProvider>
          {children}
          <Analytics />
        </SnackbarProvider>
      </body>
    </html>
  );
}

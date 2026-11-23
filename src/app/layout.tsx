import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar } from "@/components/NavBar";
import { config } from "@/lib/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${config.appName} · Guía turística de El Salvador`,
    template: `%s · ${config.appName}`,
  },
  description:
    "Descubre playas, volcanes, lagos y pueblos de El Salvador con el clima en tiempo real de cada destino.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <NavBar appName={config.appName} />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <p>
            Hecho con Next.js 16 y Vibe Coding · Clima por{" "}
            <a href="https://open-meteo.com" className="underline hover:text-blue-600" target="_blank" rel="noreferrer">
              Open-Meteo
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}

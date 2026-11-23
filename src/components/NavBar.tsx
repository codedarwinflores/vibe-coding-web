"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/destinos", label: "Destinos" },
  { href: "/clima", label: "Clima" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/acerca", label: "Acerca" },
];

export function NavBar({ appName }: { appName: string }) {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  const activo = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-slate-900 dark:text-white">
          <span aria-hidden>🇸🇻</span>
          {appName}
        </Link>

        <ul className="hidden gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activo(l.href)
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 md:hidden dark:text-slate-200 dark:hover:bg-slate-800"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        >
          <span aria-hidden className="text-2xl leading-none">
            {abierto ? "✕" : "☰"}
          </span>
        </button>
      </nav>

      {abierto && (
        <ul id="menu-movil" className="space-y-1 border-t border-slate-200 px-4 py-3 md:hidden dark:border-slate-800">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setAbierto(false)}
                className={`block rounded-lg px-3 py-2 font-medium ${
                  activo(l.href)
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}

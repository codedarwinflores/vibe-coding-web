"use client";

import Link from "next/link";
import { useFavoritos } from "@/hooks/useFavoritos";
import type { Destino } from "@/lib/destinos";
import { DestinoCard } from "./DestinoCard";

export function ListaFavoritos({ destinos }: { destinos: Destino[] }) {
  const { favoritos, listo } = useFavoritos();

  if (!listo) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  const guardados = destinos.filter((d) => favoritos.includes(d.slug));

  if (guardados.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
        <p className="text-4xl" aria-hidden>
          ♡
        </p>
        <p className="mt-2 font-semibold">Aún no tienes destinos favoritos</p>
        <p className="mt-1 text-sm text-slate-500">Toca el corazón en cualquier destino para guardarlo aquí.</p>
        <Link href="/destinos" className="mt-4 inline-block rounded-full bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700">
          Explorar destinos
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {guardados.map((d) => (
        <DestinoCard key={d.slug} destino={d} />
      ))}
    </div>
  );
}

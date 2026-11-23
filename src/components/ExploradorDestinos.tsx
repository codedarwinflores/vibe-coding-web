"use client";

import { useMemo, useState } from "react";
import type { Categoria, Destino } from "@/lib/destinos";
import { DestinoCard } from "./DestinoCard";

export function ExploradorDestinos({ destinos, categorias }: { destinos: Destino[]; categorias: Categoria[] }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "Todas">("Todas");

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return destinos.filter(
      (d) =>
        (categoria === "Todas" || d.categoria === categoria) &&
        (!texto || `${d.nombre} ${d.departamento} ${d.resumen}`.toLowerCase().includes(texto)),
    );
  }, [destinos, busqueda, categoria]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center">
        <label className="flex-1">
          <span className="sr-only">Buscar destino</span>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o departamento…"
            className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:focus:ring-blue-900"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
          {(["Todas", ...categorias] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategoria(c)}
              aria-pressed={categoria === c}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                categoria === c
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
        {filtrados.length} {filtrados.length === 1 ? "destino encontrado" : "destinos encontrados"}
      </p>

      {filtrados.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((d) => (
            <DestinoCard key={d.slug} destino={d} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700">
          No hay destinos que coincidan con tu búsqueda.
        </div>
      )}
    </div>
  );
}

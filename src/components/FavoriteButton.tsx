"use client";

import { useFavoritos } from "@/hooks/useFavoritos";

export function FavoriteButton({ slug, nombre, conTexto = false }: { slug: string; nombre: string; conTexto?: boolean }) {
  const { esFavorito, alternar, listo } = useFavoritos();
  const activo = listo && esFavorito(slug);

  return (
    <button
      type="button"
      onClick={() => alternar(slug)}
      aria-pressed={activo}
      aria-label={activo ? `Quitar ${nombre} de favoritos` : `Agregar ${nombre} a favoritos`}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium shadow-sm transition-colors ${
        activo
          ? "border-rose-300 bg-rose-50 text-rose-600 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-300"
          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
      }`}
    >
      <span aria-hidden>{activo ? "♥" : "♡"}</span>
      {conTexto && (activo ? "En favoritos" : "Guardar en favoritos")}
    </button>
  );
}

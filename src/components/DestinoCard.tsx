import Link from "next/link";
import type { Destino } from "@/lib/destinos";
import { FavoriteButton } from "./FavoriteButton";

export function DestinoCard({ destino }: { destino: Destino }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <Link href={`/destinos/${destino.slug}`} className="block">
        <div className={`flex h-36 items-center justify-center bg-gradient-to-br ${destino.gradiente}`}>
          <span aria-hidden className="text-6xl drop-shadow transition-transform group-hover:scale-110">
            {destino.emoji}
          </span>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            <span>{destino.categoria}</span>
            <span aria-hidden>·</span>
            <span className="text-slate-500 dark:text-slate-400">{destino.departamento}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{destino.nombre}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">{destino.resumen}</p>
        </div>
      </Link>
      <div className="absolute right-3 top-3">
        <FavoriteButton slug={destino.slug} nombre={destino.nombre} />
      </div>
    </article>
  );
}

import { describirClima } from "@/lib/clima-codigos";
import type { PronosticoDia } from "@/lib/tipos-clima";

export function ListaPronostico({ dias }: { dias: PronosticoDia[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      {dias.map((d) => {
        const { texto, icono } = describirClima(d.codigo);
        return (
          <li
            key={d.fecha}
            className="rounded-xl border border-slate-200 bg-white p-3 text-center dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm font-semibold capitalize text-slate-700 dark:text-slate-200">{formatearDia(d.fecha)}</p>
            <p className="my-1 text-3xl" title={texto} aria-label={texto}>
              {icono}
            </p>
            <p className="text-sm">
              <span className="font-bold text-slate-900 dark:text-white">{d.maxima}°</span>{" "}
              <span className="text-slate-500">{d.minima}°</span>
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">💧 {d.lluvia}%</p>
          </li>
        );
      })}
    </ul>
  );
}

export function formatearDia(fecha: string) {
  return new Intl.DateTimeFormat("es-SV", { weekday: "short", day: "numeric", timeZone: "UTC" }).format(
    new Date(`${fecha}T12:00:00Z`),
  );
}


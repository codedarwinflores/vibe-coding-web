"use client";

import { useEffect, useState } from "react";
import { describirClima } from "@/lib/clima-codigos";
import type { Clima, Ubicacion } from "@/lib/tipos-clima";
import { ListaPronostico } from "./ListaPronostico";

type RespuestaClima = Clima & { ubicacion: Ubicacion };

const SUGERENCIAS = ["San Salvador", "Santa Ana", "San Miguel", "Suchitoto", "La Libertad", "Juayúa"];

/**
 * Client Component: consulta el Route Handler /api/clima.
 * - useState: texto del buscador, ciudad consultada, datos, carga y error.
 * - useEffect: dispara la petición (con debounce y cancelación) cuando cambia la ciudad.
 */
export function BuscadorClima() {
  const [texto, setTexto] = useState("San Salvador");
  const [ciudad, setCiudad] = useState("San Salvador");
  // Resultado de la última consulta terminada, asociado a la ciudad que lo pidió.
  const [resultado, setResultado] = useState<{ ciudad: string; datos?: RespuestaClima; error?: string } | null>(null);

  // Estado derivado: la consulta está en curso si el resultado no corresponde a la ciudad actual.
  const cargando = resultado?.ciudad !== ciudad;
  const datos = cargando ? null : (resultado?.datos ?? null);
  const error = cargando ? null : (resultado?.error ?? null);

  // Debounce: espera 600 ms después de que el usuario deja de escribir.
  useEffect(() => {
    const id = setTimeout(() => {
      if (texto.trim().length >= 2) setCiudad(texto.trim());
    }, 600);
    return () => clearTimeout(id);
  }, [texto]);

  useEffect(() => {
    const controlador = new AbortController();

    fetch(`/api/clima?ciudad=${encodeURIComponent(ciudad)}`, { signal: controlador.signal })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "No se pudo obtener el clima.");
        setResultado({ ciudad, datos: json as RespuestaClima });
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        setResultado({ ciudad, error: e instanceof Error ? e.message : "Error desconocido." });
      });

    return () => controlador.abort();
  }, [ciudad]);

  const actual = datos?.actual;
  const desc = actual ? describirClima(actual.codigo, actual.esDeDia) : null;

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (texto.trim().length >= 2) setCiudad(texto.trim());
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <label className="flex-1">
          <span className="sr-only">Ciudad</span>
          <input
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe una ciudad, por ejemplo: Suchitoto"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-900 dark:focus:ring-blue-900"
          />
        </label>
        <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Buscar
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {SUGERENCIAS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setTexto(s);
              setCiudad(s);
            }}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {s}
          </button>
        ))}
      </div>

      {cargando && (
        <div className="space-y-4" aria-live="polite" aria-busy="true">
          <div className="h-36 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <div className="h-32 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
          <span className="sr-only">Cargando clima…</span>
        </div>
      )}

      {!cargando && error && (
        <div role="alert" className="rounded-2xl border border-rose-300 bg-rose-50 p-5 text-rose-700 dark:border-rose-800 dark:bg-rose-950 dark:text-rose-200">
          <p className="font-semibold">No pudimos obtener el clima</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!cargando && !error && datos && actual && desc && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-6xl" aria-hidden>
              {desc.icono}
            </span>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {[datos.ubicacion.nombre, datos.ubicacion.region, datos.ubicacion.pais].filter(Boolean).join(", ")}
              </p>
              <p className="text-5xl font-bold">{actual.temperatura}°C</p>
              <p className="font-medium">{desc.texto}</p>
            </div>
            <dl className="grid grid-cols-3 gap-4 text-center sm:ml-auto">
              <div>
                <dt className="text-xs text-slate-500">Sensación</dt>
                <dd className="font-semibold">{actual.sensacion}°</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Humedad</dt>
                <dd className="font-semibold">{actual.humedad}%</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Viento</dt>
                <dd className="font-semibold">{actual.viento} km/h</dd>
              </div>
            </dl>
          </div>
          <ListaPronostico dias={datos.dias} />
        </div>
      )}
    </div>
  );
}

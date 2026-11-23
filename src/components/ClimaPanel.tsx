import { describirClima } from "@/lib/clima-codigos";
import { getClima } from "@/lib/weather";
import { ListaPronostico } from "./ListaPronostico";

/** Server Component: clima actual de unas coordenadas (datos cacheados en el servidor). */
export async function ClimaActualCard({ lat, lon, lugar }: { lat: number; lon: number; lugar: string }) {
  const resultado = await getClima(lat, lon);

  if (!resultado.ok) {
    return <AvisoError mensaje={resultado.error} />;
  }

  const { actual } = resultado.clima;
  const { texto, icono } = describirClima(actual.codigo, actual.esDeDia);

  return (
    <div className="flex flex-wrap items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <span className="text-6xl" aria-hidden>
        {icono}
      </span>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">Ahora en {lugar}</p>
        <p className="text-5xl font-bold text-slate-900 dark:text-white">{actual.temperatura}°C</p>
        <p className="font-medium text-slate-700 dark:text-slate-200">{texto}</p>
      </div>
      <dl className="grid grid-cols-3 gap-4 text-center sm:ml-auto">
        <Dato etiqueta="Sensación" valor={`${actual.sensacion}°`} />
        <Dato etiqueta="Humedad" valor={`${actual.humedad}%`} />
        <Dato etiqueta="Viento" valor={`${actual.viento} km/h`} />
      </dl>
    </div>
  );
}

/** Server Component: pronóstico de 7 días. */
export async function PronosticoSemanal({ lat, lon }: { lat: number; lon: number }) {
  const resultado = await getClima(lat, lon);
  if (!resultado.ok) return <AvisoError mensaje={resultado.error} />;

  return <ListaPronostico dias={resultado.clima.dias} />;
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-500 dark:text-slate-400">{etiqueta}</dt>
      <dd className="font-semibold text-slate-900 dark:text-white">{valor}</dd>
    </div>
  );
}

function AvisoError({ mensaje }: { mensaje: string }) {
  return (
    <div role="alert" className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-200">
      ⚠️ No pudimos obtener el clima en este momento. {mensaje}
    </div>
  );
}

export function ClimaSkeleton({ altura = "h-32" }: { altura?: string }) {
  return <div className={`${altura} animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800`} aria-label="Cargando clima" />;
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ClimaActualCard, ClimaSkeleton, PronosticoSemanal } from "@/components/ClimaPanel";
import { FavoriteButton } from "@/components/FavoriteButton";
import { DESTINOS, getDestino } from "@/lib/destinos";

export function generateStaticParams() {
  return DESTINOS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const destino = getDestino(slug);
  return destino ? { title: destino.nombre, description: destino.resumen } : { title: "Destino no encontrado" };
}

export default async function DestinoPage({ params }: PageProps<"/destinos/[slug]">) {
  const { slug } = await params;
  const destino = getDestino(slug);
  if (!destino) notFound();

  return (
    <article className="space-y-8">
      <Link href="/destinos" className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
        ← Volver a destinos
      </Link>

      <header className={`rounded-3xl bg-gradient-to-br ${destino.gradiente} p-8 text-white shadow-lg sm:p-12`}>
        <span className="text-7xl" aria-hidden>
          {destino.emoji}
        </span>
        <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-white/80">
          {destino.categoria} · {destino.departamento}
        </p>
        <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{destino.nombre}</h1>
        <p className="mt-3 max-w-2xl text-lg text-white/90">{destino.resumen}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <h2 className="text-xl font-bold">Sobre el destino</h2>
          <p className="leading-relaxed text-slate-700 dark:text-slate-300">{destino.descripcion}</p>
          <h3 className="font-semibold">Qué hacer</h3>
          <ul className="flex flex-wrap gap-2">
            {destino.actividades.map((a) => (
              <li key={a} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                {a}
              </li>
            ))}
          </ul>
        </section>
        <aside className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-bold">Datos útiles</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Altitud</dt>
              <dd className="font-medium">{destino.altitud.toLocaleString("es-SV")} m s. n. m.</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Coordenadas</dt>
              <dd className="font-medium">
                {destino.lat.toFixed(3)}, {destino.lon.toFixed(3)}
              </dd>
            </div>
          </dl>
          <FavoriteButton slug={destino.slug} nombre={destino.nombre} conTexto />
        </aside>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Clima actual</h2>
        <Suspense fallback={<ClimaSkeleton />}>
          <ClimaActualCard lat={destino.lat} lon={destino.lon} lugar={destino.nombre} />
        </Suspense>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Pronóstico de 7 días</h2>
        <Suspense fallback={<ClimaSkeleton altura="h-40" />}>
          <PronosticoSemanal lat={destino.lat} lon={destino.lon} />
        </Suspense>
      </section>
    </article>
  );
}

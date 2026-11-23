import Link from "next/link";
import { Suspense } from "react";
import { ClimaActualCard, ClimaSkeleton } from "@/components/ClimaPanel";
import { DestinoCard } from "@/components/DestinoCard";
import { CATEGORIAS, DESTINOS } from "@/lib/destinos";

const DESTACADOS = ["volcan-santa-ana", "el-tunco", "suchitoto"];

export default function InicioPage() {
  const destacados = DESTINOS.filter((d) => DESTACADOS.includes(d.slug));

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 px-6 py-12 text-white shadow-xl sm:px-12 sm:py-16">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-100">Guía turística con clima en vivo</p>
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl">
          Descubre El Salvador, el país de los volcanes
        </h1>
        <p className="mt-4 max-w-xl text-lg text-blue-50">
          Playas de surf, lagos volcánicos, pueblos coloniales y sitios mayas. Consulta el clima de cada destino antes de
          salir.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/destinos" className="rounded-full bg-white px-6 py-3 font-semibold text-blue-700 shadow hover:bg-blue-50">
            Explorar destinos
          </Link>
          <Link href="/clima" className="rounded-full border border-white/70 px-6 py-3 font-semibold hover:bg-white/10">
            Consultar el clima
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">El clima en la capital</h2>
        <Suspense fallback={<ClimaSkeleton />}>
          <ClimaActualCard lat={13.6929} lon={-89.2182} lugar="San Salvador" />
        </Suspense>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Destinos destacados</h2>
          <Link href="/destinos" className="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400">
            Ver los {DESTINOS.length} destinos →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destacados.map((d) => (
            <DestinoCard key={d.slug} destino={d} />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {CATEGORIAS.map((c) => (
          <div key={c} className="rounded-2xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {DESTINOS.filter((d) => d.categoria === c).length}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{c}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca del proyecto",
  description: "Cómo se construyó Destinos SV con Next.js 16 y Vibe Coding.",
};

const STACK = [
  ["Next.js 16", "App Router, Cache Components, Route Handlers"],
  ["React 19", "Server y Client Components, hooks useState / useEffect"],
  ["TypeScript", "Tipado estricto en todo el proyecto"],
  ["Tailwind CSS 4", "Diseño responsive y modo oscuro"],
  ["Open-Meteo", "API pública de clima y geocodificación"],
  ["Vercel", "Despliegue continuo desde GitHub"],
];

const ARQUITECTURA = [
  ["Server Components", "Inicio, detalle de destino y paneles de clima: obtienen datos en el servidor con 'use cache'."],
  ["Client Components", "Barra de navegación, explorador con filtros, buscador de clima y favoritos."],
  ["Route Handlers", "/api/clima (proxy a Open-Meteo) y /api/destinos (catálogo interno)."],
  ["Estados de carga y error", "loading.tsx, Suspense con skeletons, error.tsx y not-found.tsx."],
];

export default function AcercaPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Acerca de Destinos SV</h1>
        <p className="max-w-3xl text-slate-600 dark:text-slate-300">
          Aplicación construida con la metodología de <strong>Vibe Coding</strong>: un asistente de IA actuó como copiloto
          para generar la estructura, los componentes y la documentación, mientras el desarrollador dirigió el alcance,
          revisó el código, corrigió errores y decidió la arquitectura. El registro completo de prompts e iteraciones está
          en el archivo <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">VIBE_CODING.md</code>{" "}
          del repositorio.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Tecnologías</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map(([nombre, detalle]) => (
            <li key={nombre} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="font-semibold">{nombre}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{detalle}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Arquitectura</h2>
        <dl className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {ARQUITECTURA.map(([titulo, texto]) => (
            <div key={titulo} className="grid gap-1 p-4 sm:grid-cols-3">
              <dt className="font-semibold">{titulo}</dt>
              <dd className="text-sm text-slate-600 sm:col-span-2 dark:text-slate-300">{texto}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

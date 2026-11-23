import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-12 text-center">
      <p className="text-6xl" aria-hidden>
        🧭
      </p>
      <h1 className="text-3xl font-bold">Página no encontrada</h1>
      <p className="text-slate-600 dark:text-slate-300">El destino o la página que buscas no existe o cambió de dirección.</p>
      <Link href="/destinos" className="inline-block rounded-full bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700">
        Ver destinos
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    // En producción se enviaría a un servicio de monitoreo.
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="mx-auto max-w-lg space-y-4 rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center dark:border-rose-900 dark:bg-rose-950">
      <p className="text-5xl" aria-hidden>
        🌧️
      </p>
      <h1 className="text-2xl font-bold text-rose-700 dark:text-rose-300">Algo salió mal</h1>
      <p className="text-rose-700/80 dark:text-rose-200/80">
        Ocurrió un error inesperado al cargar esta sección. Puedes intentarlo de nuevo.
      </p>
      {error.digest && <p className="font-mono text-xs text-rose-500">Código: {error.digest}</p>}
      <div className="flex justify-center gap-3">
        <button type="button" onClick={() => retry()} className="rounded-full bg-rose-600 px-5 py-2 font-semibold text-white hover:bg-rose-700">
          Reintentar
        </button>
        <Link href="/" className="rounded-full border border-rose-300 px-5 py-2 font-semibold text-rose-700 hover:bg-rose-100 dark:text-rose-200 dark:hover:bg-rose-900">
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}

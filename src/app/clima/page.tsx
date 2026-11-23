import type { Metadata } from "next";
import { BuscadorClima } from "@/components/BuscadorClima";

export const metadata: Metadata = {
  title: "Clima",
  description: "Consulta el clima actual y el pronóstico de 7 días de cualquier ciudad.",
};

export default function ClimaPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Consulta el clima</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Busca cualquier ciudad (prioriza resultados de El Salvador). Los datos llegan desde nuestro Route Handler{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">/api/clima</code>, que consulta
          Open-Meteo.
        </p>
      </header>
      <BuscadorClima />
    </div>
  );
}

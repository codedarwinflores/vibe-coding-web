import type { Metadata } from "next";
import { ExploradorDestinos } from "@/components/ExploradorDestinos";
import { CATEGORIAS, DESTINOS } from "@/lib/destinos";

export const metadata: Metadata = {
  title: "Destinos",
  description: "Explora y filtra los destinos turísticos de El Salvador.",
};

/** Server Component que entrega los datos al explorador interactivo (Client Component). */
export default function DestinosPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Destinos turísticos</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Filtra por categoría o busca por nombre. Toca el corazón para guardar tus favoritos.
        </p>
      </header>
      <ExploradorDestinos destinos={DESTINOS} categorias={CATEGORIAS} />
    </div>
  );
}

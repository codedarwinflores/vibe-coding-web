import type { Metadata } from "next";
import { ListaFavoritos } from "@/components/ListaFavoritos";
import { DESTINOS } from "@/lib/destinos";

export const metadata: Metadata = {
  title: "Favoritos",
  description: "Tus destinos guardados.",
};

export default function FavoritosPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Mis favoritos</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Se guardan en tu navegador (localStorage), sin necesidad de crear una cuenta.
        </p>
      </header>
      <ListaFavoritos destinos={DESTINOS} />
    </div>
  );
}

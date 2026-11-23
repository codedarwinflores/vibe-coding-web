"use client";

import { useCallback, useEffect, useState } from "react";

const CLAVE = "destinos-sv:favoritos";
const EVENTO = "favoritos-actualizados";

function leer(): string[] {
  try {
    const valor = window.localStorage.getItem(CLAVE);
    const datos: unknown = valor ? JSON.parse(valor) : [];
    return Array.isArray(datos) ? datos.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Favoritos guardados en localStorage.
 * `listo` indica que ya se leyó el almacenamiento (evita parpadeos en la hidratación).
 * Se sincroniza entre componentes y entre pestañas del navegador.
 */
export function useFavoritos() {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const sincronizar = () => setFavoritos(leer());
    sincronizar();
    setListo(true);

    window.addEventListener(EVENTO, sincronizar);
    window.addEventListener("storage", sincronizar);
    return () => {
      window.removeEventListener(EVENTO, sincronizar);
      window.removeEventListener("storage", sincronizar);
    };
  }, []);

  const alternar = useCallback((slug: string) => {
    const actuales = leer();
    const nuevos = actuales.includes(slug) ? actuales.filter((s) => s !== slug) : [...actuales, slug];
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(nuevos));
    } catch {
      // Almacenamiento no disponible (modo privado): solo se actualiza el estado.
    }
    setFavoritos(nuevos);
    window.dispatchEvent(new Event(EVENTO));
  }, []);

  return { favoritos, listo, alternar, esFavorito: (slug: string) => favoritos.includes(slug) };
}

"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const CLAVE = "destinos-sv:favoritos";
const EVENTO = "favoritos-actualizados";

function suscribir(callback: () => void) {
  window.addEventListener(EVENTO, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENTO, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Devuelve el texto crudo guardado (string estable para useSyncExternalStore). */
function leerCrudo(): string {
  try {
    return window.localStorage.getItem(CLAVE) ?? "[]";
  } catch {
    return "[]";
  }
}

function parsear(crudo: string): string[] {
  try {
    const datos: unknown = JSON.parse(crudo);
    return Array.isArray(datos) ? datos.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Favoritos guardados en localStorage.
 * - `useSyncExternalStore` se suscribe al almacenamiento del navegador (y a otras pestañas).
 * - En el servidor no hay localStorage: `listo` es false hasta hidratar, para evitar parpadeos.
 */
export function useFavoritos() {
  const crudo = useSyncExternalStore(suscribir, leerCrudo, () => null);
  const favoritos = useMemo(() => (crudo === null ? [] : parsear(crudo)), [crudo]);

  const alternar = useCallback((slug: string) => {
    const actuales = parsear(leerCrudo());
    const nuevos = actuales.includes(slug) ? actuales.filter((s) => s !== slug) : [...actuales, slug];
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify(nuevos));
    } catch {
      // Almacenamiento no disponible (modo privado): no se persiste.
    }
    window.dispatchEvent(new Event(EVENTO));
  }, []);

  return {
    favoritos,
    listo: crudo !== null,
    alternar,
    esFavorito: (slug: string) => favoritos.includes(slug),
  };
}

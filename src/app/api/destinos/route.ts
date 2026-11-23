import type { NextRequest } from "next/server";
import { CATEGORIAS, getDestinos } from "@/lib/destinos";

/**
 * GET /api/destinos
 * GET /api/destinos?categoria=Playa
 *
 * API interna con el catálogo de destinos turísticos.
 */
export async function GET(request: NextRequest) {
  const categoria = request.nextUrl.searchParams.get("categoria");

  if (categoria && !CATEGORIAS.some((c) => c.toLowerCase() === categoria.toLowerCase())) {
    return Response.json(
      { error: `Categoría no válida. Usa una de: ${CATEGORIAS.join(", ")}.` },
      { status: 400 },
    );
  }

  const destinos = getDestinos(categoria);
  return Response.json({ total: destinos.length, destinos });
}

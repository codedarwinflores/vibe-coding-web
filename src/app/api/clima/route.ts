import type { NextRequest } from "next/server";
import { buscarUbicaciones, getClima } from "@/lib/weather";

/**
 * GET /api/clima?ciudad=Suchitoto
 * GET /api/clima?lat=13.69&lon=-89.19
 *
 * Route Handler que actúa como proxy de Open-Meteo: resuelve la ciudad con la
 * API de geocodificación y devuelve el clima actual y el pronóstico de 7 días.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const ciudad = searchParams.get("ciudad")?.trim();
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  try {
    let ubicacion: { nombre: string; region: string; pais: string; lat: number; lon: number };

    if (ciudad) {
      if (ciudad.length < 2) {
        return Response.json({ error: "Escribe al menos 2 caracteres." }, { status: 400 });
      }
      const [primera] = await buscarUbicaciones(ciudad);
      if (!primera) {
        return Response.json({ error: `No se encontró la ciudad "${ciudad}".` }, { status: 404 });
      }
      ubicacion = primera;
    } else if (Number.isFinite(lat) && Number.isFinite(lon) && searchParams.has("lat") && searchParams.has("lon")) {
      ubicacion = { nombre: "Ubicación personalizada", region: "", pais: "", lat, lon };
    } else {
      return Response.json(
        { error: "Indica el parámetro 'ciudad' o las coordenadas 'lat' y 'lon'." },
        { status: 400 },
      );
    }

    const resultado = await getClima(ubicacion.lat, ubicacion.lon);
    if (!resultado.ok) {
      return Response.json({ error: resultado.error }, { status: 502 });
    }

    return Response.json({ ubicacion, ...resultado.clima });
  } catch {
    return Response.json({ error: "Error inesperado al consultar el clima." }, { status: 500 });
  }
}

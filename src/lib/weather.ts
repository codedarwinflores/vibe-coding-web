import { cacheLife } from "next/cache";
import { config } from "./config";
import type { Clima, ResultadoClima, Ubicacion } from "./tipos-clima";

export type { Clima, ClimaActual, PronosticoDia, ResultadoClima, Ubicacion } from "./tipos-clima";

interface OpenMeteoForecast {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    is_day: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

/**
 * Clima actual y pronóstico de 7 días desde Open-Meteo.
 * Cacheado 15 minutos con `use cache` (Cache Components de Next.js 16).
 * Nunca lanza: devuelve un resultado con `ok: false` para que la UI muestre un mensaje.
 */
export async function getClima(lat: number, lon: number): Promise<ResultadoClima> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 900, expire: 3600 });

  const params = new URLSearchParams({
    latitude: lat.toFixed(4),
    longitude: lon.toFixed(4),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
    timezone: config.timezone,
    forecast_days: "7",
  });

  try {
    const res = await fetch(`${config.forecastUrl}?${params}`);
    if (!res.ok) return { ok: false, error: `Open-Meteo respondió ${res.status}` };
    const data = (await res.json()) as OpenMeteoForecast;

    return {
      ok: true,
      clima: {
        actual: {
          temperatura: Math.round(data.current.temperature_2m),
          sensacion: Math.round(data.current.apparent_temperature),
          humedad: data.current.relative_humidity_2m,
          viento: Math.round(data.current.wind_speed_10m),
          codigo: data.current.weather_code,
          esDeDia: data.current.is_day === 1,
        },
        dias: data.daily.time.map((fecha, i) => ({
          fecha,
          codigo: data.daily.weather_code[i],
          maxima: Math.round(data.daily.temperature_2m_max[i]),
          minima: Math.round(data.daily.temperature_2m_min[i]),
          lluvia: data.daily.precipitation_probability_max[i] ?? 0,
        })),
      },
    };
  } catch {
    return { ok: false, error: "No se pudo conectar con el servicio de clima." };
  }
}

/** Busca ciudades por nombre con la API de geocodificación de Open-Meteo. */
export async function buscarUbicaciones(nombre: string): Promise<Ubicacion[]> {
  "use cache";
  cacheLife("days");

  const params = new URLSearchParams({ name: nombre, count: "10", language: "es", format: "json" });
  const res = await fetch(`${config.geocodingUrl}?${params}`);
  if (!res.ok) throw new Error(`Geocodificación respondió ${res.status}`);

  const data = (await res.json()) as {
    results?: { name: string; admin1?: string; country: string; country_code: string; latitude: number; longitude: number }[];
  };

  const resultados = (data.results ?? []).map((r) => ({
    nombre: r.name,
    region: r.admin1 ?? "",
    pais: r.country,
    codigoPais: r.country_code,
    lat: r.latitude,
    lon: r.longitude,
  }));

  // Prioriza resultados del país configurado (El Salvador por defecto).
  resultados.sort(
    (a, b) => Number(b.codigoPais === config.defaultCountry) - Number(a.codigoPais === config.defaultCountry),
  );

  return resultados.map(({ codigoPais: _codigoPais, ...u }) => u);
}

/**
 * Configuración leída de variables de entorno (ver .env.example).
 * Los valores por defecto permiten ejecutar el proyecto sin un .env.local.
 */
export const config = {
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? "Destinos SV",
  forecastUrl: process.env.OPEN_METEO_FORECAST_URL ?? "https://api.open-meteo.com/v1/forecast",
  geocodingUrl:
    process.env.OPEN_METEO_GEOCODING_URL ?? "https://geocoding-api.open-meteo.com/v1/search",
  /** Código ISO del país para priorizar resultados del buscador de clima. */
  defaultCountry: process.env.DEFAULT_COUNTRY_CODE ?? "SV",
  timezone: process.env.WEATHER_TIMEZONE ?? "America/El_Salvador",
};

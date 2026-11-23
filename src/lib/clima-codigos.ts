/** Códigos de clima WMO usados por Open-Meteo, traducidos al español. */
const CODIGOS: Record<number, [string, string]> = {
  0: ["Despejado", "☀️"],
  1: ["Mayormente despejado", "🌤️"],
  2: ["Parcialmente nublado", "⛅"],
  3: ["Nublado", "☁️"],
  45: ["Niebla", "🌫️"],
  48: ["Niebla con escarcha", "🌫️"],
  51: ["Llovizna ligera", "🌦️"],
  53: ["Llovizna", "🌦️"],
  55: ["Llovizna intensa", "🌧️"],
  61: ["Lluvia ligera", "🌦️"],
  63: ["Lluvia", "🌧️"],
  65: ["Lluvia fuerte", "🌧️"],
  80: ["Chubascos", "🌦️"],
  81: ["Chubascos fuertes", "🌧️"],
  82: ["Chubascos violentos", "⛈️"],
  95: ["Tormenta", "⛈️"],
  96: ["Tormenta con granizo", "⛈️"],
  99: ["Tormenta fuerte con granizo", "⛈️"],
};

/** Traduce un código WMO a descripción en español y emoji. */
export function describirClima(codigo: number, esDeDia = true): { texto: string; icono: string } {
  const [texto, icono] = CODIGOS[codigo] ?? ["Condición variable", "🌡️"];
  return { texto, icono: !esDeDia && codigo <= 1 ? "🌙" : icono };
}

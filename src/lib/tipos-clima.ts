/** Tipos compartidos entre el servidor y los Client Components. */
export interface ClimaActual {
  temperatura: number;
  sensacion: number;
  humedad: number;
  viento: number;
  codigo: number;
  esDeDia: boolean;
}

export interface PronosticoDia {
  fecha: string;
  codigo: number;
  maxima: number;
  minima: number;
  lluvia: number;
}

export interface Clima {
  actual: ClimaActual;
  dias: PronosticoDia[];
}

export type ResultadoClima = { ok: true; clima: Clima } | { ok: false; error: string };

export interface Ubicacion {
  nombre: string;
  region: string;
  pais: string;
  lat: number;
  lon: number;
}

# 🤖 Proceso de Vibe Coding: Destinos SV

Registro del desarrollo de **Destinos SV** con la metodología de Vibe Coding. La IA trabajó como copiloto: generó la estructura, los componentes y la documentación. El desarrollador definió el alcance, revisó cada entrega, probó la aplicación y decidió qué cambiar.

- **Herramienta de IA:** Claude (Claude Code, agente de programación en la terminal)
- **Desarrollador:** Darwin Flores
- **Stack:** Next.js 16.4 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS 4 · Open-Meteo · Vercel

---

## 1. Concepción del proyecto

**Prompt inicial**

> Lee el archivo de la actividad y desarrolla la solución: una aplicación web con Next.js 16 y App Router en TypeScript, con al menos 4 rutas, consumo de una API mediante Route Handlers, Server y Client Components, useState/useEffect, diseño responsive, estados de carga y error, y variables de entorno en `.env.local`. Súbela a GitHub con historial de commits y despliégala en Vercel.

**Propuesta de la IA y decisión.** La temática era libre. La IA propuso una guía turística de El Salvador con clima en tiempo real y la aceptamos por tres razones:

- La API de **Open-Meteo** es pública y no requiere registro ni API key. Así no se arriesga publicar credenciales y quien revise el proyecto puede ejecutarlo sin configurar nada.
- La temática obliga a combinar **datos estáticos** (catálogo de destinos) con **datos dinámicos** (clima), un buen escenario para Server Components, cache y Client Components.
- Da contenido real y local para un portafolio.

## 2. Prompts principales e iteraciones

| # | Prompt / instrucción | Resultado de la IA | Revisión del desarrollador |
|---|---|---|---|
| 1 | "Crea el proyecto con `create-next-app` (TypeScript, Tailwind, App Router, `src/`)." | Proyecto Next.js 16.4.6 con Cache Components y Partial Prefetching activados por defecto. | Antes de escribir código pedimos revisar la documentación incluida en `node_modules/next/dist/docs`, porque esta versión cambia el modelo de caché. |
| 2 | "Define el modelo de datos de 8 destinos (playa, volcán, lago, montaña, pueblo, arqueología) con coordenadas reales." | `src/lib/destinos.ts` con tipos `Destino` y `Categoria`. | Revisamos nombres, departamentos y altitudes. |
| 3 | "Crea un servicio que consulte el clima actual y el pronóstico de 7 días en Open-Meteo, con caché." | `getClima()` con `'use cache'` + `cacheLife` (revalida cada 15 min) y que nunca lanza: devuelve `{ ok, error }`. | Si la API falla durante el build en Vercel, el despliegue no se rompe y la UI muestra un aviso. |
| 4 | "Agrega Route Handlers: `/api/clima` (por ciudad o coordenadas) y `/api/destinos` (con filtro)." | Handlers con validación y códigos 400 / 404 / 502. | Probamos con `curl` los casos válidos e inválidos. |
| 5 | "Construye las páginas: inicio, listado con filtros, detalle con pronóstico, buscador de clima, favoritos y acerca." | 6 rutas; Server Components para datos y Client Components para interacción. | Verificamos que cada Client Component recibiera solo datos serializables. |
| 6 | "Agrega loading, error y not-found, y deja el lint en cero." | `loading.tsx`, `error.tsx`, `not-found.tsx`, skeletons con Suspense. | Corregimos los errores reportados (ver desafíos). |
| 7 | "Documenta el proyecto (README, `.env.example`, este archivo) y despliega en Vercel." | Documentación; proyecto importado en Vercel con las variables de entorno. | Probamos la URL de producción (https://vibe-coding-web-phi.vercel.app): todas las rutas, las APIs y el 404. |

## 3. Decisiones técnicas

| Decisión | Motivo |
|---|---|
| **Cache Components + `'use cache'`** para el clima | Es el modelo recomendado en Next.js 16. La página se prerenderiza con el clima y se revalida cada 15 minutos sin llamar a Open-Meteo en cada visita. |
| **`<Suspense>` con skeletons** alrededor de los paneles de clima | El resto de la página se muestra al instante y el clima entra por streaming. |
| **`generateStaticParams`** en `/destinos/[slug]` | Los 8 destinos se prerenderizan en el build. |
| **Route Handler como proxy** (`/api/clima`) | El navegador no habla directo con Open-Meteo: se centralizan la validación, el formato de la respuesta y el caché del servidor. |
| **Favoritos en `localStorage`** con `useSyncExternalStore` | No hace falta base de datos ni login, y se sincroniza entre componentes y pestañas. |
| **Variables de entorno con valores por defecto** (`src/lib/config.ts`) | La app funciona sin `.env.local`, pero las URLs de la API y la configuración regional se pueden cambiar por ambiente. |
| **Tailwind CSS 4** con modo oscuro automático | Diseño responsive móvil-primero sin CSS adicional. |

## 4. Desafíos y cómo se resolvieron con la IA

1. **Next.js 16.4 trae Cache Components activados.** Un `fetch` sin caché fuera de `<Suspense>` bloquea el prerender. La IA consultó la documentación local de la versión instalada y aplicó `'use cache'` + `cacheLife` en el servicio, más `<Suspense>` en los componentes.

2. **Error al importar código de servidor en un Client Component.** El buscador de clima (cliente) reutilizaba `describirClima` y `ListaPronostico`, que vivían en un módulo que importa `next/cache`. Se separaron en módulos puros: `clima-codigos.ts`, `tipos-clima.ts` y `ListaPronostico.tsx`.

3. **La API de `error.tsx` cambió.** La IA generó primero la prop `reset`, como en versiones anteriores. Al revisar la documentación de Next 16.4 se vio que ahora es `retry()`, y se actualizó.

4. **ESLint con `react-hooks/set-state-in-effect`.** La primera versión llamaba `setState` dentro de `useEffect` en tres componentes. Se corrigió así:
   - favoritos con `useSyncExternalStore`, que suscribe a `localStorage`;
   - buscador de clima con estado de carga **derivado**, sin `setCargando(true)` en el efecto;
   - menú móvil que se cierra en el `onClick` del enlace, en lugar de un efecto que observe la ruta.

5. **Un slug inexistente respondía 200 en vez de 404.** Con Partial Prerendering el *shell* se envía por streaming antes de llamar a `notFound()`, y `dynamicParams = false` no está disponible con Cache Components. Se agregó `src/proxy.ts`, que valida el slug antes de renderizar y reescribe a una ruta inexistente para devolver un 404 real.

6. **Tipos de rutas (`PageProps<'/destinos/[slug]'>`) marcados como error por `tsc`.** Next los genera durante el build o con `next typegen`. Se verificó con `next build`, que incluye la comprobación de TypeScript.

## 5. Validación

- `npm run build`: compila sin errores. Las rutas estáticas y de destinos se prerenderizan y las APIs son dinámicas.
- `npm run lint`: 0 errores y 0 advertencias.
- Pruebas manuales en local y en producción:
  - las 6 rutas responden 200 y las desconocidas 404;
  - `/api/clima` devuelve 400 sin parámetros y 404 para una ciudad inexistente;
  - los favoritos persisten al recargar;
  - el buscador muestra la carga, el resultado y los errores;
  - el menú móvil funciona en pantallas pequeñas.

## 6. Lecciones aprendidas

- La IA acelera mucho la generación de código, pero **no sustituye leer la documentación de la versión exacta**: dos de los errores vinieron de patrones de versiones anteriores.
- Pedir pasos pequeños y verificables (un commit por funcionalidad) hace más fácil revisar y corregir lo que genera la IA.
- Las herramientas automáticas (TypeScript, ESLint, `next build`, `curl`) son la red de seguridad del Vibe Coding: cada iteración se validó con ellas antes de seguir.

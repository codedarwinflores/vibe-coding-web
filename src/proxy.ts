import { NextResponse, type NextRequest } from "next/server";
import { DESTINOS } from "@/lib/destinos";

const SLUGS = new Set(DESTINOS.map((d) => d.slug));

/**
 * Con Cache Components, `dynamicParams = false` no está disponible y un slug
 * desconocido se renderizaría con la página 404 pero con estado HTTP 200
 * (el shell ya se envió por streaming). Este proxy valida el slug antes de
 * renderizar y reescribe a una ruta inexistente para responder un 404 real.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !SLUGS.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/destino-no-encontrado", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/destinos/:slug",
};

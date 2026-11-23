export default function LoadingDestino() {
  return (
    <div className="space-y-8" aria-busy="true" aria-live="polite">
      <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      <div className="h-64 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="h-40 animate-pulse rounded-2xl bg-slate-200 lg:col-span-2 dark:bg-slate-800" />
        <div className="h-40 animate-pulse rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
      <span className="sr-only">Cargando destino…</span>
    </div>
  );
}

import { cn } from "../../utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("rounded-md bg-line/70 animate-pulse", className)} />;
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="bg-surface-card rounded-card border border-line overflow-hidden" aria-busy="true" aria-label="Yüklənir">
      <div className="h-12 bg-surface-main border-b border-line" />
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-16 flex items-center gap-6 px-4 md:px-6 border-b border-line last:border-0">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="hidden md:block h-6 w-24 rounded-pill" />
          <Skeleton className="h-3.5 w-14" />
          <Skeleton className="hidden md:block h-6 w-28 rounded-pill" />
          <Skeleton className="hidden md:block h-9 w-16 rounded-pill" />
        </div>
      ))}
    </div>
  );
}

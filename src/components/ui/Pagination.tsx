import { cn } from "../../utils/cn";
import { getPages } from "../../utils/getPages";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

const circle =
  "w-9 h-9 rounded-full flex items-center justify-center text-sm tabular-nums transition-colors";

export function Pagination({ page, pageSize, total, onChange }: PaginationProps) {
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
      <p className="text-sm text-content-secondary tabular-nums">
        {from}–{to} / {total} məhsul
      </p>

      {lastPage > 1 && (
        <nav aria-label="Səhifələr" className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Əvvəlki səhifə"
            disabled={page <= 1}
            onClick={() => onChange(page - 1)}
            className={cn(circle, "border border-line bg-surface-card hover:border-content-secondary disabled:opacity-40 disabled:pointer-events-none")}
          >
            ‹
          </button>

          {getPages(page, lastPage).map((p, i) =>
            p === "gap" ? (
              <span key={`gap-${i}`} className="w-6 text-center text-content-secondary">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                aria-current={p === page ? "page" : undefined}
                onClick={() => onChange(p)}
                className={cn(
                  circle,
                  p === page
                    ? "bg-content-primary text-white"
                    : "border border-line bg-surface-card hover:border-content-secondary"
                )}
              >
                {p}
              </button>
            )
          )}

          <button
            type="button"
            aria-label="Növbəti səhifə"
            disabled={page >= lastPage}
            onClick={() => onChange(page + 1)}
            className={cn(circle, "border border-line bg-surface-card hover:border-content-secondary disabled:opacity-40 disabled:pointer-events-none")}
          >
            ›
          </button>
        </nav>
      )}
    </div>
  );
}

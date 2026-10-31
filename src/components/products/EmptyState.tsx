import { Button } from "../ui/Button";

interface EmptyStateProps {
  filtered: boolean;
  onReset: () => void;
  onAdd: () => void;
}

export default function EmptyState({ filtered, onReset, onAdd }: EmptyStateProps) {
  return (
    <div className="bg-surface-card rounded-card border border-line px-6 py-16 text-center">
      <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-[#F1EBE0] flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A37B3E" strokeWidth="1.8" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
      </div>

      <h2 className="text-lg font-semibold">{filtered ? "Heç nə tapılmadı" : "Menyu hələ boşdur"}</h2>
      <p className="mt-1 text-sm text-content-secondary">
        {filtered
          ? "Bu axtarışa və ya kateqoriyaya uyğun məhsul yoxdur."
          : "İlk məhsulu əlavə edin, o burada görünəcək."}
      </p>

      <div className="mt-6">
        {filtered ? (
          <Button variant="secondary" onClick={onReset}>
            Filtrləri təmizlə
          </Button>
        ) : (
          <Button onClick={onAdd}>Yeni məhsul</Button>
        )}
      </div>
    </div>
  );
}

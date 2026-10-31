import { Button } from "../ui/Button";

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
  retrying?: boolean;
}

export default function ErrorState({ message, onRetry, retrying }: ErrorStateProps) {
  return (
    <div role="alert" className="bg-surface-card rounded-card border border-line px-6 py-16 text-center">
      <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-danger-light flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9A3B1E" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5v5.5M12 16.5h.01" strokeLinecap="round" />
        </svg>
      </div>

      <h2 className="text-lg font-semibold">Məhsulları yükləmək olmadı</h2>
      <p className="mt-1 text-sm text-content-secondary">{message ?? "Bağlantını yoxlayıb yenidən cəhd edin."}</p>

      <div className="mt-6">
        <Button onClick={onRetry} loading={retrying}>
          Yenidən cəhd et
        </Button>
      </div>
    </div>
  );
}

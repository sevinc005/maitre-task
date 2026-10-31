import { useEffect } from "react";
import { cn } from "../../utils/cn";

export interface ToastMessage {
  id: number;
  text: string;
  tone: "success" | "error";
}

interface ToastProps {
  toast: ToastMessage | null;
  onClose: () => void;
}

// sade bildiris — eyni anda yalniz biri gorunur, 4 saniyeden sonra itir
export function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed z-[60] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm",
        "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm shadow-lg border",
        toast.tone === "success"
          ? "bg-success-light text-success border-success/20"
          : "bg-danger-light text-danger border-danger/20"
      )}
    >
      <span className="flex-1">{toast.text}</span>
      <button type="button" onClick={onClose} aria-label="Bağla" className="opacity-60 hover:opacity-100">
        ✕
      </button>
    </div>
  );
}

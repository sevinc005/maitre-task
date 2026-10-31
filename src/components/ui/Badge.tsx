import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface BadgeProps {
  children: ReactNode;
  muted?: boolean;
}

// dizaynda satisda olmayan mehsulun etiketi fonsuz, yalniz kenar xetti ile gorunur
export function Badge({ children, muted }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center h-6 px-2.5 rounded-pill text-[13px] whitespace-nowrap border",
        muted
          ? "bg-surface-card border-line text-content-secondary"
          : "bg-[#F1EBE0] border-transparent text-content-primary"
      )}
    >
      {children}
    </span>
  );
}

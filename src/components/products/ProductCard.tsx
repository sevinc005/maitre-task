import type { Category, Product } from "../../api/api";
import { formatPrice } from "../../utils/formatPrice";
import { cn } from "../../utils/cn";
import { Badge } from "../ui/Badge";
import { Toggle } from "../ui/Toggle";

interface ProductCardProps {
  product: Product;
  category?: Category;
  onEdit: (product: Product) => void;
  onToggle: (product: Product) => void;
  busy?: boolean;
}

export default function ProductCard({ product, category, onEdit, onToggle, busy }: ProductCardProps) {
  const off = !product.isAvailable;

  return (
    <li className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className={cn("font-semibold truncate", off ? "text-content-secondary" : "text-content-primary")}>
            {product.nameAz}
          </p>
          <p className="text-[13px] text-content-secondary truncate">{product.nameEn ?? "—"}</p>
        </div>
        <span className={cn("tabular-nums whitespace-nowrap", off ? "text-content-secondary" : "text-content-primary")}>
          {formatPrice(product.price)}
        </span>
      </div>

      <div className="mt-3">
        <Badge muted={off}>{category?.name ?? "—"}</Badge>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Toggle
            checked={product.isAvailable}
            onChange={() => onToggle(product)}
            disabled={busy}
            aria-label={`${product.nameAz} — satış statusu`}
          />
          <span className={cn("text-sm", off ? "text-content-secondary" : "text-content-primary")}>
            {off ? "Satışda deyil" : "Satışda"}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="h-9 px-4 rounded-pill border border-line text-sm font-medium"
        >
          Düzəlt
        </button>
      </div>
    </li>
  );
}

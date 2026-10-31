import type { Category, Product } from "../../api/api";
import { formatPrice } from "../../utils/formatPrice";
import { cn } from "../../utils/cn";
import { Badge } from "../ui/Badge";
import { Toggle } from "../ui/Toggle";
import ProductCard from "./ProductCard";

interface ProductTableProps {
  products: Product[];
  categories: Map<number, Category>;
  onEdit: (product: Product) => void;
  onToggle: (product: Product) => void;
  busyIds: number[];
  dimmed?: boolean; // yeni sehife yuklenerken kohne data solgun gorunur
}

const th = "h-12 px-4 font-display text-xs font-semibold uppercase tracking-wider text-content-secondary";

export default function ProductTable({ products, categories, onEdit, onToggle, busyIds, dimmed }: ProductTableProps) {
  return (
    <div
      className={cn(
        "bg-surface-card rounded-card border border-line overflow-hidden transition-opacity",
        dimmed && "opacity-60"
      )}
    >
      <table className="hidden md:table w-full text-left">
        <thead className="bg-surface-main border-b border-line">
          <tr>
            <th className={cn(th, "pl-6")}>Ad</th>
            <th className={th}>Kateqoriya</th>
            <th className={cn(th, "text-right")}>Qiymət</th>
            <th className={cn(th, "pl-10")}>Status</th>
            <th className={th}>
              <span className="sr-only">Əməliyyatlar</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const off = !product.isAvailable;
            return (
              <tr key={product.id} className="h-16 border-b border-line last:border-0">
                <td className="pl-6 pr-4">
                  <p className={cn("text-[15px] font-semibold", off ? "text-content-secondary" : "text-content-primary")}>
                    {product.nameAz}
                  </p>
                  <p className="text-[13px] text-content-secondary">{product.nameEn ?? "—"}</p>
                </td>

                <td className="px-4">
                  <Badge muted={off}>{categories.get(product.categoryId)?.name ?? "—"}</Badge>
                </td>

                <td
                  className={cn(
                    "px-4 text-right text-[15px] tabular-nums whitespace-nowrap",
                    off ? "text-content-secondary" : "text-content-primary"
                  )}
                >
                  {formatPrice(product.price)}
                </td>

                <td className="pl-10 pr-4">
                  <div className="flex items-center gap-2.5">
                    <Toggle
                      checked={product.isAvailable}
                      onChange={() => onToggle(product)}
                      disabled={busyIds.includes(product.id)}
                      aria-label={`${product.nameAz} — satış statusu`}
                    />
                    <span className={cn("text-sm", off ? "text-content-secondary" : "text-content-primary")}>
                      {off ? "Satışda deyil" : "Satışda"}
                    </span>
                  </div>
                </td>

                <td className="pr-4 text-right">
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="h-9 px-4 rounded-pill border border-line text-sm font-medium hover:border-content-secondary transition-colors"
                  >
                    Düzəlt
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* telefonda cedvel yerine kartlar */}
      <ul className="md:hidden divide-y divide-line">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            category={categories.get(product.categoryId)}
            onEdit={onEdit}
            onToggle={onToggle}
            busy={busyIds.includes(product.id)}
          />
        ))}
      </ul>
    </div>
  );
}

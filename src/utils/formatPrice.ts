/**
 * 4.5 -> "4,50 ₼"
 * 18  -> "18,00 ₼"
 */
export function formatPrice(price: number): string {
  const formatted = price.toFixed(2).replace(".", ",");
  return `${formatted} ₼`;
}

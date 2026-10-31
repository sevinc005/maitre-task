import { z } from "zod";
import type { Product, ProductInput } from "../../api/api";

// inputlardan hamisi string gelir, ona gore sxem string-ler uzerinde qurulub,
// API-ye gondermeden evvel toInput() ile duzgun tiplere cevrilir
export const productSchema = z.object({
  nameAz: z.string().trim().min(1, "Azərbaycan dilində ad məcburidir").max(100, "Ad çox uzundur"),
  nameEn: z.string().trim().max(100, "Ad çox uzundur"),
  categoryId: z.string().min(1, "Kateqoriya seçin"),
  price: z
    .string()
    .trim()
    .min(1, "Qiyməti daxil edin")
    .refine((v) => /^\d+([.,]\d{1,2})?$/.test(v), "Düzgün qiymət yazın, məs: 4,50")
    .refine((v) => parsePrice(v) > 0, "Qiymət 0-dan böyük olmalıdır"),
  isAvailable: z.boolean(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

// istifadeci hem "4,5" hem "4.5" yaza biler
export function parsePrice(value: string) {
  return Number(value.replace(",", "."));
}

export function toInput(values: ProductFormValues): ProductInput {
  return {
    nameAz: values.nameAz.trim(),
    nameEn: values.nameEn.trim() || null,
    categoryId: Number(values.categoryId),
    price: parsePrice(values.price),
    isAvailable: values.isAvailable,
  };
}

export function toFormValues(product?: Product | null): ProductFormValues {
  if (!product) {
    return { nameAz: "", nameEn: "", categoryId: "", price: "", isAvailable: true };
  }
  return {
    nameAz: product.nameAz,
    nameEn: product.nameEn ?? "",
    categoryId: String(product.categoryId),
    price: product.price.toFixed(2).replace(".", ","),
    isAvailable: product.isAvailable,
  };
}

import { describe, expect, it } from "vitest";
import { productSchema, toFormValues, toInput } from "./productSchema";

const valid = { nameAz: "Dovğa", nameEn: "", categoryId: "1", price: "3,80", isAvailable: true };

describe("productSchema", () => {
  it("duzgun deyerleri qebul edir", () => {
    expect(productSchema.safeParse(valid).success).toBe(true);
  });

  it("AZ ad bos ola bilmez", () => {
    const r = productSchema.safeParse({ ...valid, nameAz: "   " });
    expect(r.success).toBe(false);
  });

  it("kateqoriya mecburidir", () => {
    expect(productSchema.safeParse({ ...valid, categoryId: "" }).success).toBe(false);
  });

  it.each(["0", "0,00", "-5", "abc", "4,555"])("yanlis qiymet: %s", (price) => {
    expect(productSchema.safeParse({ ...valid, price }).success).toBe(false);
  });

  it.each(["4", "4,5", "4.50"])("duzgun qiymet: %s", (price) => {
    expect(productSchema.safeParse({ ...valid, price }).success).toBe(true);
  });
});

describe("toInput / toFormValues", () => {
  it("bos EN adi null-a cevirir, qiymeti reqeme", () => {
    expect(toInput({ ...valid, nameEn: "  " })).toEqual({
      nameAz: "Dovğa",
      nameEn: null,
      categoryId: 1,
      price: 3.8,
      isAvailable: true,
    });
  });

  it("movcud mehsulu forma deyerlerine cevirir", () => {
    const values = toFormValues({ id: 1, nameAz: "Xaş", nameEn: null, categoryId: 1, price: 8, isAvailable: false });
    expect(values).toEqual({ nameAz: "Xaş", nameEn: "", categoryId: "1", price: "8,00", isAvailable: false });
  });
});

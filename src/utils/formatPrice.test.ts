import { describe, expect, it } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("dizayndaki formatda gosterir", () => {
    expect(formatPrice(4.5)).toBe("4,50 ₼");
    expect(formatPrice(18)).toBe("18,00 ₼");
    expect(formatPrice(3.8)).toBe("3,80 ₼");
  });
});

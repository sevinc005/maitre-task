import { describe, expect, it } from "vitest";
import { getPages } from "./getPages";

describe("getPages", () => {
  it("dizayndaki kimi: 5 sehifeden 1-ci", () => {
    expect(getPages(1, 5)).toEqual([1, 2, 3, "gap", 5]);
  });

  it("ortada iki terefde bosluq", () => {
    expect(getPages(5, 10)).toEqual([1, "gap", 4, 5, 6, "gap", 10]);
  });

  it("sonda", () => {
    expect(getPages(5, 5)).toEqual([1, "gap", 3, 4, 5]);
  });

  it("az sehife olanda bosluq yoxdur", () => {
    expect(getPages(1, 2)).toEqual([1, 2]);
    expect(getPages(1, 1)).toEqual([1]);
  });
});

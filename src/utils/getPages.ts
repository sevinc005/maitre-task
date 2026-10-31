// ilk, son, cari ve qonsu sehifeler gorunur, arada bosluq olsa "gap" qoyulur.
// 5 sehifede 1-ci sehife: 1 2 3 … 5 (dizayndaki kimi)
export function getPages(current: number, last: number): (number | "gap")[] {
  const visible = new Set([1, last, current - 1, current, current + 1]);
  if (current <= 2) visible.add(3);
  if (current >= last - 1) visible.add(last - 2);

  const sorted = [...visible].filter((p) => p >= 1 && p <= last).sort((a, b) => a - b);

  const result: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("gap");
    result.push(p);
  });
  return result;
}

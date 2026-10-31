import { useSearchParams } from "react-router-dom";

// axtaris, kateqoriya ve sehife URL-de saxlanilir ki,
// sehife yenilenende ve ya link paylasilanda filtrler itmesin
export function useURLFilters() {
  const [params, setParams] = useSearchParams();

  const search = params.get("q") ?? "";

  const rawCategory = Number(params.get("category"));
  const categoryId = rawCategory > 0 ? rawCategory : undefined;

  const rawPage = Number(params.get("page"));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  function update(changes: Record<string, string | undefined>, replace = false) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(changes)) {
          if (value) next.set(key, value);
          else next.delete(key);
        }
        return next;
      },
      { replace }
    );
  }

  return {
    search,
    categoryId,
    page,
    // filtr deyisende 1-ci sehifeye qayidiriq.
    // axtaris her herfde history-ni doldurmasin deye replace istifade olunur
    setSearch: (value: string) =>
      update({ q: value.trim() || undefined, page: undefined }, true),
    setCategoryId: (id?: number) =>
      update({ category: id ? String(id) : undefined, page: undefined }),
    setPage: (p: number) => update({ page: p > 1 ? String(p) : undefined }),
    // ayri-ayri setSearch + setCategoryId cagirsaq ikincisi birincini ezir
    clearFilters: () => update({ q: undefined, category: undefined, page: undefined }),
    hasFilters: Boolean(search || categoryId),
  };
}

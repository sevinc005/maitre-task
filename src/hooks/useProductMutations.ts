import { useMutation, useMutationState, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  updateProduct,
  type PagedResult,
  type Product,
  type ProductInput,
} from "../api/api";

type ProductsCache = PagedResult<Product> | undefined;
type ToggleVars = { id: number; isAvailable: boolean };

const TOGGLE_KEY = ["toggle-product"];

// statusu deyisdirilen (cavabi gozlenilen) mehsullarin id-leri.
// cavab gelmemis eyni toggle-a tekrar basmaq olmur, yoxsa
// gecikmeler ferqli oldugu ucun sorgular qarisiq qayida biler
export function usePendingToggles() {
  return useMutationState({
    filters: { mutationKey: TOGGLE_KEY, status: "pending" },
    select: (m) => (m.state.variables as ToggleVars).id,
  });
}

export function useProductMutations() {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: ["products"] });

  const create = useMutation({
    mutationFn: (input: ProductInput) => createProduct(input),
    onSuccess: refresh,
  });

  const update = useMutation({
    mutationFn: ({ id, input }: { id: number; input: ProductInput }) =>
      updateProduct(id, input),
    onSuccess: refresh,
  });

  // status deyisikliyi optimistic: toggle derhal deyisir,
  // server xeta qaytarsa evvelki veziyyete qaytaririq
  const toggle = useMutation({
    mutationKey: TOGGLE_KEY,
    mutationFn: ({ id, isAvailable }: ToggleVars) =>
      updateProduct(id, { isAvailable }),

    onMutate: async ({ id, isAvailable }) => {
      await queryClient.cancelQueries({ queryKey: ["products"] });
      const snapshot = queryClient.getQueriesData<ProductsCache>({ queryKey: ["products"] });

      queryClient.setQueriesData<ProductsCache>({ queryKey: ["products"] }, (old) =>
        old
          ? { ...old, items: old.items.map((p) => (p.id === id ? { ...p, isAvailable } : p)) }
          : old
      );

      return { snapshot };
    },

    onError: (_err, _vars, ctx) => {
      ctx?.snapshot.forEach(([key, data]) => queryClient.setQueryData(key, data));
    },

    onSettled: refresh,
  });

  return { create, update, toggle };
}

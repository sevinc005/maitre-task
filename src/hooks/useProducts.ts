import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts, type GetProductsParams } from "../api/api";

export const PAGE_SIZE = 10;

export function useProducts(params: GetProductsParams) {
  const query = { ...params, pageSize: PAGE_SIZE };

  return useQuery({
    queryKey: ["products", query],
    queryFn: () => getProducts(query),
    // sehife deyisende cedvel bos qalmasin, kohne data gorunsun
    placeholderData: keepPreviousData,
  });
}

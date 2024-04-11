import axiosInstance from "@/helpers/axiosInstance";

import { Product } from "@/types/product";
import { PaginationData, PaginationQueryProps } from "@/types/pagination";

export const fetchProducts = async ({
  page,
  perPage = 10,
}: PaginationQueryProps) => {
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  const { data } = await axiosInstance.get(
    `/products?_page=${page}&_per_page=${perPage}`
  );
  return data as PaginationData<Product>;
};

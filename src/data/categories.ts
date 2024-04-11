import axiosInstance from "@/helpers/axiosInstance";

import { Category } from "@/types/category";
import { PaginationData, PaginationQueryProps } from "@/types/pagination";

export const fetchCategories = async ({
  page,
  perPage = 10,
}: PaginationQueryProps) => {
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  const { data } = await axiosInstance.get(
    `/categories?_page=${page}&_per_page=${perPage}`
  );
  return data as PaginationData<Category>;
};

export const fetchAllCategories = async () => {
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  const { data } = await axiosInstance.get("/categories");
  return data as Category[];
};

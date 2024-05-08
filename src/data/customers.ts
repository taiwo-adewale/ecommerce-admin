import axiosInstance from "@/helpers/axiosInstance";

import { Customer } from "@/types/customer";
import { PaginationData, PaginationQueryProps } from "@/types/pagination";

export const fetchCustomers = async ({
  page,
  perPage = 10,
}: PaginationQueryProps) => {
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  const { data } = await axiosInstance.get(
    `/customers?_page=${page}&_per_page=${perPage}`
  );
  return data as PaginationData<Customer>;
};

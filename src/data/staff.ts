import axiosInstance from "@/helpers/axiosInstance";

import { Staff } from "@/types/staff";
import { PaginationData, PaginationQueryProps } from "@/types/pagination";

export const fetchStaff = async ({
  page,
  perPage = 10,
}: PaginationQueryProps) => {
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  const { data } = await axiosInstance.get(
    `/staff?_page=${page}&_per_page=${perPage}`
  );
  return data as PaginationData<Staff>;
};

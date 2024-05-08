import axiosInstance from "@/helpers/axiosInstance";

import { Coupon } from "@/types/coupon";
import { PaginationData, PaginationQueryProps } from "@/types/pagination";

export const fetchCoupons = async ({
  page,
  perPage = 10,
}: PaginationQueryProps) => {
  await new Promise((resolve, reject) => setTimeout(resolve, 500));
  const { data } = await axiosInstance.get(
    `/coupons?_page=${page}&_per_page=${perPage}`
  );
  return data as PaginationData<Coupon>;
};

import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";

export type CouponStatus = "expired" | "active";

export type SBCoupon = Database["public"]["Tables"]["coupons"]["Row"];

export type Coupon = SBCoupon;

export interface FetchCouponsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface FetchCouponsResponse {
  data: Coupon[];
  pagination: Pagination;
}

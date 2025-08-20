import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";
import { SBOrder } from "../orders/types";

export type SBCustomer = Database["public"]["Tables"]["customers"]["Row"];

export type Customer = SBCustomer;

export interface FetchCustomersParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface FetchCustomersResponse {
  data: Customer[];
  pagination: Pagination;
}

export type CustomerOrder = Pick<
  SBOrder,
  | "id"
  | "invoice_no"
  | "order_time"
  | "payment_method"
  | "total_amount"
  | "status"
> & {
  customers: Pick<SBCustomer, "name" | "address" | "phone">;
};

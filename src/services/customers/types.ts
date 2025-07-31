import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";

type SBCustomer = Database["public"]["Tables"]["customers"]["Row"];

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

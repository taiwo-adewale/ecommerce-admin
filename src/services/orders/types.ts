import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";

export type OrderStatus = Database["public"]["Enums"]["order_status_enum"];
export type OrderMethod = Database["public"]["Enums"]["payment_method_enum"];

type SBOrder = Database["public"]["Tables"]["orders"]["Row"];

export type Order = SBOrder & {
  customers: {
    name: string | null;
  } | null;
};

export interface FetchOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  method?: string;
  startDate?: string;
  endDate?: string;
}

export interface FetchOrdersResponse {
  data: Order[];
  pagination: Pagination;
}

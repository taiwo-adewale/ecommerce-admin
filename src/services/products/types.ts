import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";

type SBProduct = Database["public"]["Tables"]["products"]["Row"];

export type Product = SBProduct & {
  categories: {
    name: string | null;
    slug: string | null;
  } | null;
};

export interface FetchProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  priceSort?: string;
  status?: string;
  published?: boolean;
  dateSort?: string;
}

export interface FetchProductsResponse {
  data: Product[];
  pagination: Pagination;
}

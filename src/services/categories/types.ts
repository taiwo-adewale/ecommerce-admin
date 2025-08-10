import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";

export type SBCategory = Database["public"]["Tables"]["categories"]["Row"];

export type Category = SBCategory;

export interface FetchCategoriesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface FetchCategoriesResponse {
  data: Category[];
  pagination: Pagination;
}

export type CategoryDropdown = Pick<SBCategory, "id" | "name" | "slug">;

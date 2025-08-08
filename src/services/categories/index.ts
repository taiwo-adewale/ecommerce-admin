import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";
import {
  Category,
  CategoryDropdown,
  FetchCategoriesParams,
  FetchCategoriesResponse,
} from "./types";
import { queryPaginatedTable } from "@/helpers/queryPaginatedTable";

export async function fetchCategories(
  client: SupabaseClient<Database>,
  { page = 1, limit = 10, search }: FetchCategoriesParams
): Promise<FetchCategoriesResponse> {
  let query = client.from("categories").select("*", { count: "exact" });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  query = query.order("created_at", { ascending: false });

  const paginatedCategories = await queryPaginatedTable<Category, "categories">(
    {
      name: "categories",
      page,
      limit,
      query,
    }
  );

  return paginatedCategories;
}

export async function fetchCategoriesDropdown(
  client: SupabaseClient<Database>
): Promise<CategoryDropdown[]> {
  const { data, error } = await client
    .from("categories")
    .select("id, name, slug");

  if (error) {
    console.error("Error fetching categories:", error.message);
    throw new Error(error.message);
  }

  return data ?? [];
}

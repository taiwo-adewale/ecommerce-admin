import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";
import { queryPaginatedTable } from "@/helpers/queryPaginatedTable";
import { Product, FetchProductsParams, FetchProductsResponse } from "./types";

export async function fetchProducts(
  client: SupabaseClient<Database>,
  {
    page = 1,
    limit = 10,
    search,
    category,
    priceSort,
    status,
    published,
    dateSort,
  }: FetchProductsParams
): Promise<FetchProductsResponse> {
  const selectQuery = `
    *,
    categories!inner (
      name,
      slug
    )
  `;

  let query = client.from("products").select(selectQuery, { count: "exact" });

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (category) {
    query = query.eq("categories.slug", category);
  }

  if (status) {
    if (status === "selling") {
      query = query.gt("stock", 0);
    } else if (status === "out-of-stock") {
      query = query.eq("stock", 0);
    }
  }

  if (published !== undefined) {
    query = query.eq("published", published);
  }

  if (priceSort) {
    query = query.order("selling_price", {
      ascending: priceSort === "lowest-first",
    });
  } else if (dateSort) {
    const [field, direction] = dateSort.split("-");
    query = query.order(field === "added" ? "created_at" : "updated_at", {
      ascending: direction === "asc",
    });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  const paginatedProducts = await queryPaginatedTable<Product, "products">({
    name: "products",
    page,
    limit,
    query,
  });

  return paginatedProducts;
}

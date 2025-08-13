import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";
import { Coupon, FetchCouponsParams, FetchCouponsResponse } from "./types";
import { queryPaginatedTable } from "@/helpers/queryPaginatedTable";

export async function fetchCoupons(
  client: SupabaseClient<Database>,
  { page = 1, limit = 10, search }: FetchCouponsParams
): Promise<FetchCouponsResponse> {
  let query = client.from("coupons").select("*", { count: "exact" });

  if (search) {
    query = query.or(`campaign_name.ilike.%${search}%,code.ilike.%${search}%`);
  }

  query = query.order("created_at", { ascending: false });

  const paginatedCoupons = await queryPaginatedTable<Coupon, "coupons">({
    name: "coupons",
    page,
    limit,
    query,
  });

  return paginatedCoupons;
}

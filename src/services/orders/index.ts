import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";
import { queryPaginatedTable } from "@/helpers/queryPaginatedTable";
import { Order, FetchOrdersParams, FetchOrdersResponse } from "./types";

export async function fetchOrders(
  client: SupabaseClient<Database>,
  {
    page = 1,
    limit = 10,
    search,
    status,
    method,
    startDate,
    endDate,
  }: FetchOrdersParams
): Promise<FetchOrdersResponse> {
  const selectQuery = `
    *,
    customers!inner (
      name
    )
  `;

  let query = client.from("orders").select(selectQuery, { count: "exact" });

  if (search) {
    query = query.ilike("customers.name", `%${search}%`);
  }

  if (status) {
    query = query.eq("status", status);
  }

  if (method) {
    query = query.eq("payment_method", method);
  }

  if (startDate) {
    query = query.gte("created_at", startDate);
  }

  if (endDate) {
    const endDay = new Date(endDate);
    const nextDay = new Date(endDay);
    nextDay.setDate(endDay.getDate() + 1);

    query = query.lt("created_at", nextDay.toISOString());
  }

  query = query.order("created_at", { ascending: false });

  const paginatedOrders = await queryPaginatedTable<Order, "orders">({
    name: "orders",
    page,
    limit,
    query,
  });

  return paginatedOrders;
}

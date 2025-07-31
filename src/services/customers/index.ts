import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";
import {
  Customer,
  FetchCustomersParams,
  FetchCustomersResponse,
} from "./types";
import { queryPaginatedTable } from "@/helpers/queryPaginatedTable";

export async function fetchCustomers(
  client: SupabaseClient<Database>,
  { page = 1, limit = 10, search }: FetchCustomersParams
): Promise<FetchCustomersResponse> {
  let query = client.from("customers").select("*", { count: "exact" });

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
    );
  }

  query = query.order("created_at", { ascending: false });

  const paginatedCustomers = await queryPaginatedTable<Customer, "customers">({
    name: "customers",
    page,
    limit,
    query,
  });

  return paginatedCustomers;
}

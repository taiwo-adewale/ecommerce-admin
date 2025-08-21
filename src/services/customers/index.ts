import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";
import {
  Customer,
  FetchCustomersParams,
  FetchCustomersResponse,
  CustomerOrder,
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

export async function fetchCustomerOrders(
  client: SupabaseClient<Database>,
  { id }: { id: string }
) {
  const selectQuery = `
    id,
    invoice_no,
    order_time,
    payment_method,
    total_amount,
    status,
    customers(name, address, phone)
  `;

  const { data, error } = await client
    .from("orders")
    .select(selectQuery)
    .eq("customer_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
    throw new Error(`Failed to fetch customer orders: ${error.message}`);
  }

  if (!data) {
    console.error("Failed to fetch customer orders");
    throw new Error("Failed to fetch customer orders");
  }

  return {
    customerOrders: data as CustomerOrder[],
  };
}

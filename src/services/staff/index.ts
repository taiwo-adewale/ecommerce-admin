import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";
import {
  Staff,
  StaffRolesDropdown,
  FetchStaffParams,
  FetchStaffResponse,
  SBStaff,
} from "./types";
import { queryPaginatedTable } from "@/helpers/queryPaginatedTable";

export async function fetchStaff(
  client: SupabaseClient<Database>,
  { page = 1, limit = 10, search, role }: FetchStaffParams
): Promise<FetchStaffResponse> {
  const selectQuery = `
    *,
    staff_roles!inner (
      name,
      display_name
    )
  `;

  let query = client.from("staff").select(selectQuery, { count: "exact" });

  if (search) {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`
    );
  }

  if (role) {
    query = query.eq("staff_roles.name", role);
  }

  query = query.order("created_at", { ascending: false });

  const paginatedStaff = await queryPaginatedTable<Staff, "staff">({
    name: "staff",
    page,
    limit,
    query,
  });

  return paginatedStaff;
}

export async function fetchStaffRolesDropdown(
  client: SupabaseClient<Database>
): Promise<StaffRolesDropdown[]> {
  const { data, error } = await client
    .from("staff_roles")
    .select("name, display_name");

  if (error) {
    console.error("Error fetching staff roles:", error.message);
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function fetchStaffDetails(
  client: SupabaseClient<Database>
): Promise<SBStaff | null> {
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) return null;

  const { data: profile, error } = await client
    .from("staff")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching staff profile:", error);
    return null;
  }

  return profile;
}

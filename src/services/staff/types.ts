import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";

export type StaffStatus = "active" | "inactive";

export type SBStaff = Database["public"]["Tables"]["staff"]["Row"];
type SBStaffRole = Database["public"]["Tables"]["staff_roles"]["Row"];

export type Staff = SBStaff & {
  staff_roles: {
    name: string | null;
    display_name: string | null;
  } | null;
};

export interface FetchStaffParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

export interface FetchStaffResponse {
  data: Staff[];
  pagination: Pagination;
}

export type StaffRolesDropdown = Pick<SBStaffRole, "name" | "display_name">;

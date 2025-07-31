import { Database } from "@/types/supabase";

type SBCategory = Database["public"]["Tables"]["categories"]["Row"];

export type CategoryDropdown = Pick<SBCategory, "name" | "slug">;

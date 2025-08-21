import { Database } from "@/types/supabase";

export type SBNotification =
  Database["public"]["Tables"]["notifications"]["Row"];

export type Notification = SBNotification;

import { SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/supabase";
import { Notification } from "./types";

export async function fetchNotifications(
  client: SupabaseClient<Database>,
  { staffId }: { staffId: string }
): Promise<Notification[]> {
  const { data, error } = await client
    .from("notifications")
    .select("*")
    .eq("staff_id", staffId)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notifications:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function deleteNotification(
  client: SupabaseClient<Database>,
  { notificationId }: { notificationId: string }
) {
  const { error } = await client
    .from("notifications")
    .update({ published: false })
    .eq("id", notificationId);

  if (error) {
    console.error("Error deleting notification:", error.message);
    throw new Error("Could not dismiss the notification.");
  }

  return;
}

export async function fetchNotificationsCount(
  client: SupabaseClient<Database>,
  { staffId }: { staffId: string }
): Promise<number> {
  const { count, error } = await client
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("staff_id", staffId)
    .eq("is_read", false)
    .eq("published", true);

  if (error) {
    console.error("Error fetching notification count:", error.message);
    throw new Error("Could not fetch notification count.");
  }

  return count ?? 0;
}

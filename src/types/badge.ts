export type BadgeStatus = "Pending" | "Processing" | "Delivered" | "Cancel";

export enum BadgeVariants {
  Pending = "warning",
  Processing = "processing",
  Delivered = "success",
  Cancel = "destructive",
}

export const badgeStatuses: BadgeStatus[] = [
  "Pending",
  "Processing",
  "Delivered",
  "Cancel",
];

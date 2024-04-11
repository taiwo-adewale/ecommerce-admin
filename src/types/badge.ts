export type OrderBadgeStatus =
  | "Pending"
  | "Processing"
  | "Delivered"
  | "Cancel";

export type ProductBadgeStatus = "selling" | "out-of-stock";

export enum OrderBadgeVariants {
  Pending = "warning",
  Processing = "processing",
  Delivered = "success",
  Cancel = "destructive",
}

export enum ProductBadgeVariants {
  selling = "success",
  "out-of-stock" = "destructive",
}

export const ORDER_BADGE_STATUSES: OrderBadgeStatus[] = [
  "Pending",
  "Processing",
  "Delivered",
  "Cancel",
];

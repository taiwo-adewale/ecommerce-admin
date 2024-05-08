import { OrderStatus } from "@/types/order";
import { ProductStatus } from "@/types/product";
import { CouponStatus } from "@/types/coupon";
import { StaffStatus } from "@/types/staff";

import { BadgeVariantProps } from "@/components/ui/badge";

export const OrderBadgeVariants: Record<OrderStatus, BadgeVariantProps> = {
  pending: "warning",
  processing: "processing",
  delivered: "success",
  cancel: "destructive",
};

export const ProductBadgeVariants: Record<ProductStatus, BadgeVariantProps> = {
  selling: "success",
  "out-of-stock": "destructive",
};

export const CouponBadgeVariants: Record<CouponStatus, BadgeVariantProps> = {
  active: "success",
  expired: "destructive",
};

export const StaffBadgeVariants: Record<StaffStatus, BadgeVariantProps> = {
  active: "success",
  inactive: "warning",
};

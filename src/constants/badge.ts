import { OrderStatus } from "@/services/orders/types";
import { ProductStatus } from "@/services/products/types";
import { CouponStatus } from "@/services/coupons/types";
import { StaffStatus } from "@/services/staff/types";

import { BadgeVariantProps } from "@/components/ui/badge";

export const OrderBadgeVariants: Record<OrderStatus, BadgeVariantProps> = {
  pending: "warning",
  processing: "processing",
  delivered: "success",
  cancelled: "destructive",
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
  inactive: "destructive",
};

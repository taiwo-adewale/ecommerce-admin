import { SBCoupon } from "@/services/coupons/types";
import { SBOrder } from "@/services/orders/types";

type Props = {
  coupon: Pick<SBCoupon, "discount_type" | "discount_value"> | null;
  totalAmount: SBOrder["total_amount"];
  shippingCost: SBOrder["shipping_cost"];
};

export function getDiscount({ coupon, totalAmount, shippingCost }: Props) {
  let calculatedDiscount = 0;

  if (coupon) {
    if (coupon.discount_type === "fixed") {
      calculatedDiscount = coupon.discount_value;
    } else {
      const subtotal = totalAmount - shippingCost;
      const originalPrice = (subtotal * 100) / (100 - coupon.discount_value);
      calculatedDiscount = originalPrice - subtotal;
    }
  }

  return calculatedDiscount.toFixed(2);
}

"use server";

import { createServerActionClient } from "@/lib/supabase/server-action";
import { OrdersExport } from "@/services/orders/types";
import { getDiscount } from "@/helpers/getDiscount";

export async function exportOrders() {
  const supabase = createServerActionClient();

  const selectQuery = `
    *,
    coupons(discount_type, discount_value),
    customers(name, email)
  `;

  const { data, error } = await supabase.from("orders").select(selectQuery);

  if (error) {
    console.error(`Error fetching orders:`, error);
    return { error: `Failed to fetch data for orders.` };
  }

  return {
    data: data.map(
      (order): OrdersExport => ({
        id: order.id,
        invoice_no: order.invoice_no,
        customer_name: order.customers?.name ?? "",
        customer_email: order.customers?.email ?? "",
        total_amount: order.total_amount,
        discount: getDiscount({
          coupon: order.coupons,
          totalAmount: order.total_amount,
          shippingCost: order.shipping_cost,
        }),
        shipping_cost: order.shipping_cost,
        payment_method: order.payment_method,
        order_time: order.order_time,
        status: order.status,
        created_at: order.created_at,
        updated_at: order.updated_at,
      })
    ),
  };
}

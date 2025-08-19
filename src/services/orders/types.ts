import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";

import { SBCustomer } from "../customers/types";
import { SBProduct } from "../products/types";
import { SBCoupon } from "../coupons/types";

export type OrderStatus = Database["public"]["Enums"]["order_status_enum"];
export type OrderMethod = Database["public"]["Enums"]["payment_method_enum"];

export type SBOrder = Database["public"]["Tables"]["orders"]["Row"];
type SBOrderItems = Database["public"]["Tables"]["order_items"]["Row"];

export type Order = SBOrder & {
  customers: Pick<SBCustomer, "name"> | null;
};

export interface FetchOrdersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  method?: string;
  startDate?: string;
  endDate?: string;
}

export interface FetchOrdersResponse {
  data: Order[];
  pagination: Pagination;
}

export type OrderDetails = Pick<
  SBOrder,
  | "id"
  | "invoice_no"
  | "order_time"
  | "total_amount"
  | "shipping_cost"
  | "payment_method"
  | "status"
> & {
  customers: Pick<SBCustomer, "name" | "email" | "phone" | "address">;
} & {
  order_items: (Pick<SBOrderItems, "quantity" | "unit_price"> & {
    products: Pick<SBProduct, "name">;
  })[];
} & {
  coupons: Pick<SBCoupon, "discount_type" | "discount_value"> | null;
};

export type OrdersExport = Pick<
  SBOrder,
  | "id"
  | "invoice_no"
  | "order_time"
  | "total_amount"
  | "shipping_cost"
  | "payment_method"
  | "order_time"
  | "status"
  | "created_at"
  | "updated_at"
> & {
  discount: string;
  customer_name: SBCustomer["name"];
  customer_email: SBCustomer["email"];
};

import { OrderMethod, OrderStatus } from "@/types/order";

export const ORDER_STATUSES: OrderStatus[] = [
  "pending",
  "processing",
  "delivered",
  "cancel",
];

export const ORDER_METHODS: OrderMethod[] = ["card", "cash", "credit"];

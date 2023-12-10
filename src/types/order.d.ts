import { BadgeStatus } from "@/types/badge";

type OrderMethod = "cash" | "card" | "credit";

export type Order = {
  invoiceNo: string;
  orderTime: Date | string;
  customerName: string;
  method: OrderMethod;
  amount: string;
  status: BadgeStatus;
};

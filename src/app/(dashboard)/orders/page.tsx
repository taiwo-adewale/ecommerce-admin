import { Metadata } from "next";

import Orders from "@/containers/orders";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function OrdersPage() {
  return <Orders />;
}

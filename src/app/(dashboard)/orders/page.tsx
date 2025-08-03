import { Metadata } from "next";

import PageTitle from "@/components/shared/PageTitle";
import AllOrders from "./_components/orders-table";
import OrderFilters from "./_components/OrderFilters";

export const metadata: Metadata = {
  title: "Orders",
};

export default async function OrdersPage() {
  return (
    <section>
      <PageTitle>Orders</PageTitle>

      <OrderFilters />
      <AllOrders />
    </section>
  );
}

"use client";

import Typography from "@/components/ui/typography";

import { columns } from "@/tables/orders/columns";
import { OrdersTable } from "@/tables/orders/DataTable";
import { fetchOrders, fetchData } from "@/test-files/recent-orders";

import useGetMountStatus from "@/hooks/useGetMountStatus";

export default function RecentOrders() {
  const mounted = useGetMountStatus();

  const orders = fetchOrders();

  return (
    <section>
      <Typography variant="h3" component="h2" className="mb-6">
        Recent Orders
      </Typography>

      {mounted && <OrdersTable columns={columns} data={orders} />}
    </section>
  );
}

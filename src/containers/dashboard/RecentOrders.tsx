"use client";

import { columns } from "./columns";
import { OrdersTable } from "./OrdersTable";
import { fetchOrders, fetchData } from "@/test-files/recent-orders";

import useGetMountStatus from "@/hooks/useGetMountStatus";

export default function RecentOrders() {
  const mounted = useGetMountStatus();
  const orders = fetchOrders();

  return <>{mounted && <OrdersTable columns={columns} data={orders} />}</>;
}

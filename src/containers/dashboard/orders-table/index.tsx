"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { columns } from "./columns";
import { OrdersTable } from "./Table";
import TableSkeleton from "./Skeleton";
import TableError from "./Error";
import { fetchOrders } from "@/data/orders";

export default function RecentOrders() {
  const searchParams = useSearchParams();
  const ordersPage = searchParams.get("orders_page");

  const page = Math.trunc(Number(ordersPage)) || 1;
  const perPage = 10;

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", page],
    queryFn: () => fetchOrders({ page, perPage }),
    placeholderData: keepPreviousData,
    select: (ordersData) => {
      const { data, pages, ...rest } = ordersData;

      return {
        data: data,
        pagination: {
          ...rest,
          pages,
          current: page < 1 ? 1 : Math.min(page, pages),
          perPage,
        },
      };
    },
  });

  if (isLoading) return <TableSkeleton />;

  if (isError || !orders) return <TableError />;

  return (
    <OrdersTable
      columns={columns}
      data={orders.data}
      pagination={orders.pagination}
    />
  );
}

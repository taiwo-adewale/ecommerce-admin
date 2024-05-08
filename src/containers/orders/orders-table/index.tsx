"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { columns, skeletonColumns } from "./columns";
import OrdersTable from "./Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import TableError from "@/components/shared/TableError";
import { fetchOrders } from "@/data/orders";

type Props = {
  perPage?: number;
};

export default function RecentOrders({ perPage = 10 }: Props) {
  const ordersPage = useSearchParams().get("page");
  const page = Math.trunc(Number(ordersPage)) || 1;

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["orders", page, perPage],
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

  if (isLoading)
    return <TableSkeleton perPage={perPage} columns={skeletonColumns} />;

  if (isError || !orders)
    return (
      <TableError
        errorMessage="Something went wrong while trying to fetch orders."
        refetch={refetch}
      />
    );

  return (
    <OrdersTable
      columns={columns}
      data={orders.data}
      pagination={orders.pagination}
    />
  );
}

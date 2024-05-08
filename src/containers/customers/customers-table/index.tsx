"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { columns, skeletonColumns } from "./columns";
import CustomersTable from "./Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import TableError from "@/components/shared/TableError";
import { fetchCustomers } from "@/data/customers";

type Props = {
  perPage?: number;
};

export default function AllCustomers({ perPage = 10 }: Props) {
  const customersPage = useSearchParams().get("page");
  const page = Math.trunc(Number(customersPage)) || 1;

  const {
    data: customers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["customers", page],
    queryFn: () => fetchCustomers({ page, perPage }),
    placeholderData: keepPreviousData,
    select: (customersData) => {
      const { data, pages, ...rest } = customersData;

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

  if (isError || !customers)
    return (
      <TableError
        errorMessage="Something went wrong while trying to fetch customers."
        refetch={refetch}
      />
    );

  return (
    <CustomersTable
      columns={columns}
      data={customers.data}
      pagination={customers.pagination}
    />
  );
}

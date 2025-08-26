"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import CustomersTable from "./Table";
import { getColumns, skeletonColumns } from "./columns";
import TableSkeleton from "@/components/shared/table/TableSkeleton";
import TableError from "@/components/shared/table/TableError";

import { getSearchParams } from "@/helpers/getSearchParams";
import { fetchCustomers } from "@/services/customers";
import { createBrowserClient } from "@/lib/supabase/client";
import { useAuthorization } from "@/hooks/use-authorization";

export default function AllCustomers() {
  const { hasPermission } = useAuthorization();
  const columns = getColumns({ hasPermission });
  const { page, limit, search } = getSearchParams(useSearchParams());

  const {
    data: customers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["customers", page, limit, search],
    queryFn: () =>
      fetchCustomers(createBrowserClient(), { page, limit, search }),
    placeholderData: keepPreviousData,
  });

  if (isLoading)
    return <TableSkeleton perPage={limit} columns={skeletonColumns} />;

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

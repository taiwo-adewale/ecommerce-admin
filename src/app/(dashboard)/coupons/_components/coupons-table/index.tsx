"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import CouponsTable from "./Table";
import { getColumns, skeletonColumns } from "./columns";
import TableSkeleton from "@/components/shared/table/TableSkeleton";
import TableError from "@/components/shared/table/TableError";

import { getSearchParams } from "@/helpers/getSearchParams";
import { fetchCoupons } from "@/services/coupons";
import { createBrowserClient } from "@/lib/supabase/client";
import { RowSelectionProps } from "@/types/data-table";
import { useAuthorization } from "@/hooks/use-authorization";

export default function AllCoupons({
  rowSelection,
  setRowSelection,
}: RowSelectionProps) {
  const { hasPermission } = useAuthorization();
  const columns = getColumns({ hasPermission });
  const { page, limit, search } = getSearchParams(useSearchParams());

  const {
    data: coupons,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["coupons", page, limit, search],
    queryFn: () => fetchCoupons(createBrowserClient(), { page, limit, search }),
    placeholderData: keepPreviousData,
  });

  if (isLoading)
    return <TableSkeleton perPage={limit} columns={skeletonColumns} />;

  if (isError || !coupons)
    return (
      <TableError
        errorMessage="Something went wrong while trying to fetch coupons."
        refetch={refetch}
      />
    );

  return (
    <CouponsTable
      columns={columns}
      data={coupons.data}
      pagination={coupons.pagination}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
    />
  );
}

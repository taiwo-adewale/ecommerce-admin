"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import StaffTable from "./Table";
import { getColumns, skeletonColumns } from "./columns";
import TableError from "@/components/shared/table/TableError";
import TableSkeleton from "@/components/shared/table/TableSkeleton";

import { getSearchParams } from "@/helpers/getSearchParams";
import { fetchStaff } from "@/services/staff";
import { createBrowserClient } from "@/lib/supabase/client";
import { useAuthorization } from "@/hooks/use-authorization";

export default function AllStaff() {
  const { hasPermission, isSelf } = useAuthorization();
  const columns = getColumns({ hasPermission, isSelf });
  const { page, limit, search, role } = getSearchParams(useSearchParams());

  const {
    data: staff,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["staff", page, limit, search, role],
    queryFn: () =>
      fetchStaff(createBrowserClient(), { page, limit, search, role }),
    placeholderData: keepPreviousData,
  });

  if (isLoading)
    return <TableSkeleton perPage={limit} columns={skeletonColumns} />;

  if (isError || !staff)
    return (
      <TableError
        errorMessage="Something went wrong while trying to fetch staff."
        refetch={refetch}
      />
    );

  return (
    <StaffTable
      columns={columns}
      data={staff.data}
      pagination={staff.pagination}
    />
  );
}

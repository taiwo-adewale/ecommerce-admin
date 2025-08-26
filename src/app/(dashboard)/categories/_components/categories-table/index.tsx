"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import CategoriesTable from "./Table";
import { getColumns, skeletonColumns } from "./columns";
import TableSkeleton from "@/components/shared/table/TableSkeleton";
import TableError from "@/components/shared/table/TableError";

import { getSearchParams } from "@/helpers/getSearchParams";
import { fetchCategories } from "@/services/categories";
import { createBrowserClient } from "@/lib/supabase/client";
import { RowSelectionProps } from "@/types/data-table";
import { useAuthorization } from "@/hooks/use-authorization";

export default function AllCategories({
  rowSelection,
  setRowSelection,
}: RowSelectionProps) {
  const { hasPermission } = useAuthorization();
  const columns = getColumns({ hasPermission });
  const { page, limit, search } = getSearchParams(useSearchParams());

  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["categories", page, limit, search],
    queryFn: () =>
      fetchCategories(createBrowserClient(), { page, limit, search }),
    placeholderData: keepPreviousData,
  });

  if (isLoading)
    return <TableSkeleton perPage={limit} columns={skeletonColumns} />;

  if (isError || !categories)
    return (
      <TableError
        errorMessage="Something went wrong while trying to fetch categories."
        refetch={refetch}
      />
    );

  return (
    <CategoriesTable
      columns={columns}
      data={categories.data}
      pagination={categories.pagination}
      rowSelection={rowSelection}
      setRowSelection={setRowSelection}
    />
  );
}

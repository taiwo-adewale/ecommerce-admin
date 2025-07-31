"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import CategoriesTable from "./Table";
import { columns, skeletonColumns } from "./columns";
import TableSkeleton from "@/components/shared/TableSkeleton";
import TableError from "@/components/shared/TableError";

import { getSearchParams } from "@/helpers/getSearchParams";
import { fetchCategories } from "@/services/categories";
import { createBrowserClient } from "@/lib/supabase/client";

export default function AllCategories() {
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
    />
  );
}

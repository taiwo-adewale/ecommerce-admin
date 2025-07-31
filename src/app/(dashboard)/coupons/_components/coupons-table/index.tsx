"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import CouponsTable from "./Table";
import { columns, skeletonColumns } from "./columns";
import TableSkeleton from "@/components/shared/TableSkeleton";
import TableError from "@/components/shared/TableError";

import { getSearchParams } from "@/helpers/getSearchParams";
import { fetchCoupons } from "@/services/coupons";
import { createBrowserClient } from "@/lib/supabase/client";

export default function AllCoupons() {
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
    />
  );
}

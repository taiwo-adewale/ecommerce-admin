"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { columns, skeletonColumns } from "./columns";
import CouponsTable from "./Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import TableError from "@/components/shared/TableError";
import { fetchCoupons } from "@/data/coupons";

type Props = {
  perPage?: number;
};

export default function AllCategories({ perPage = 10 }: Props) {
  const couponsPage = useSearchParams().get("page");
  const page = Math.trunc(Number(couponsPage)) || 1;

  const {
    data: coupons,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["coupons", page],
    queryFn: () => fetchCoupons({ page, perPage }),
    placeholderData: keepPreviousData,
    select: (couponsData) => {
      const { data, pages, ...rest } = couponsData;

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

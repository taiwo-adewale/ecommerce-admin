"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import StaffTable from "./Table";
import { columns, skeletonColumns } from "./columns";
import TableError from "@/components/shared/TableError";
import TableSkeleton from "@/components/shared/TableSkeleton";

import { fetchStaff } from "@/data/staff";

type Props = {
  perPage?: number;
};

export default function AllStaff({ perPage = 10 }: Props) {
  const staffPage = useSearchParams().get("page");
  const page = Math.trunc(Number(staffPage)) || 1;

  const {
    data: staff,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["staff", page],
    queryFn: () => fetchStaff({ page, perPage }),
    placeholderData: keepPreviousData,
    select: (staffData) => {
      const { data, pages, ...rest } = staffData;

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

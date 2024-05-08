"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { columns, skeletonColumns } from "./columns";
import CategoriesTable from "./Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import TableError from "@/components/shared/TableError";
import { fetchCategories } from "@/data/categories";

type Props = {
  perPage?: number;
};

export default function AllCategories({ perPage = 10 }: Props) {
  const categoriesPage = useSearchParams().get("page");
  const page = Math.trunc(Number(categoriesPage)) || 1;

  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["categories", page],
    queryFn: () => fetchCategories({ page, perPage }),
    placeholderData: keepPreviousData,
    select: (categoriesData) => {
      const { data, pages, ...rest } = categoriesData;

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

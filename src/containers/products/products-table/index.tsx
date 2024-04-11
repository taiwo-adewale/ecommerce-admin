"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { columns, skeletonColumns } from "./columns";
import ProductsTable from "./Table";
import TableSkeleton from "@/components/shared/TableSkeleton";
import TableError from "@/components/shared/TableError";
import { fetchProducts } from "@/data/products";

export default function AllProducts() {
  const productsPage = useSearchParams().get("page");

  const page = Math.trunc(Number(productsPage)) || 1;
  const perPage = 10;

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: () => fetchProducts({ page, perPage }),
    placeholderData: keepPreviousData,
    select: (productsData) => {
      const { data, pages, ...rest } = productsData;

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

  if (isLoading) return <TableSkeleton columns={skeletonColumns} />;

  if (isError || !products)
    return (
      <TableError
        errorMessage="Something went wrong while trying to fetch products."
        refetch={refetch}
      />
    );

  return (
    <ProductsTable
      columns={columns}
      data={products.data}
      pagination={products.pagination}
    />
  );
}

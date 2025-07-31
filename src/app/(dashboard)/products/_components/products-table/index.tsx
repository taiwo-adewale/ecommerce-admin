"use client";

import { useSearchParams } from "next/navigation";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

import ProductsTable from "./Table";
import { columns, skeletonColumns } from "./columns";
import TableSkeleton from "@/components/shared/TableSkeleton";
import TableError from "@/components/shared/TableError";

import { fetchProducts } from "@/services/products";
import { createBrowserClient } from "@/lib/supabase/client";

export default function AllProducts() {
  const searchParams = useSearchParams();

  const page =
    Math.max(1, Math.trunc(Number(searchParams.get("page")))) || undefined;
  const limit = Math.trunc(Number(searchParams.get("limit"))) || undefined;
  const search = searchParams.get("search") || undefined;
  const category =
    searchParams.get("category") === "all"
      ? undefined
      : searchParams.get("category") || undefined;
  const price = searchParams.get("price") || undefined;
  const published =
    searchParams.get("published") === "true"
      ? true
      : searchParams.get("published") === "false"
      ? false
      : undefined;
  const status = searchParams.get("status") || undefined;
  const date = searchParams.get("date") || undefined;

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "products",
      page,
      limit,
      search,
      category,
      price,
      published,
      status,
      date,
    ],
    queryFn: () =>
      fetchProducts(createBrowserClient(), {
        page,
        limit,
        search,
        category,
        priceSort: price,
        status,
        published,
        dateSort: date,
      }),
    placeholderData: keepPreviousData,
  });

  if (isLoading)
    return <TableSkeleton perPage={limit} columns={skeletonColumns} />;

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

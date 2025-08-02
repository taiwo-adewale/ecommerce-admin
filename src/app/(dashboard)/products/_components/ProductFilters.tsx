"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { sortMap, reverseSortMap } from "./sortMap";

import { createBrowserClient } from "@/lib/supabase/client";
import { fetchCategoriesDropdown } from "@/services/categories";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(searchParams.toString());
    const sortKey = params.get("price")
      ? `price=${params.get("price")}`
      : params.get("published")
      ? `published=${params.get("published")}`
      : params.get("status")
      ? `status=${params.get("status")}`
      : params.get("date")
      ? `date=${params.get("date")}`
      : "";
    return {
      search: params.get("search") || "",
      category: params.get("category") || "all",
      sort: reverseSortMap[sortKey] || "none",
    };
  });

  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", "dropdown"],
    queryFn: () => fetchCategoriesDropdown(createBrowserClient()),
    staleTime: 5 * 60 * 1000,
  });

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category && filters.category !== "all")
      params.set("category", filters.category);

    if (filters.sort && filters.sort !== "none") {
      const sortConfig = sortMap[filters.sort];
      if (sortConfig) {
        params.set(sortConfig.key, sortConfig.value);
      }
    }

    params.set("page", "1");
    params.set("limit", searchParams.get("limit") || "10");
    router.push(`/products?${params.toString()}`);
  };

  const handleReset = () => {
    setFilters({ search: "", category: "all", sort: "none" });
    router.push("/products");
  };

  return (
    <Card className="mb-5">
      <form
        onSubmit={handleFilter}
        className="flex flex-col md:flex-row gap-4 lg:gap-6"
      >
        <Input
          type="search"
          placeholder="Search product..."
          className="h-12 md:basis-[30%]"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />

        <Select
          value={filters.category}
          onValueChange={(value) => setFilters({ ...filters, category: value })}
        >
          <SelectTrigger className="md:basis-1/5">
            <SelectValue placeholder="Category" />
          </SelectTrigger>

          <SelectContent>
            {isLoading ? (
              <div className="flex flex-col gap-2 items-center px-2 py-6">
                <Loader2 className="size-4 animate-spin" />
                <Typography>Loading...</Typography>
              </div>
            ) : isError || !categories ? (
              <div className="flex flex-col gap-2 items-center px-2 py-6 max-w-full">
                <ShieldAlert className="size-6" />
                <Typography>Failed to load categories</Typography>
              </div>
            ) : (
              [
                <SelectItem key="all" value="all">
                  All Categories
                </SelectItem>,
                categories.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                )),
              ]
            )}
          </SelectContent>
        </Select>

        <Select
          value={filters.sort}
          onValueChange={(value) => setFilters({ ...filters, sort: value })}
        >
          <SelectTrigger className="md:basis-1/5">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="none">No Sort</SelectItem>
            <SelectItem value="lowest-first">Price: Low to High</SelectItem>
            <SelectItem value="highest-first">Price: High to Low</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="unpublished">Unpublished</SelectItem>
            <SelectItem value="status-selling">Status - Selling</SelectItem>
            <SelectItem value="status-out-of-stock">
              Status - Out of Stock
            </SelectItem>
            <SelectItem value="date-added-asc">Date Added (Asc)</SelectItem>
            <SelectItem value="date-added-desc">Date Added (Desc)</SelectItem>
            <SelectItem value="date-updated-asc">Date Updated (Asc)</SelectItem>
            <SelectItem value="date-updated-desc">
              Date Updated (Desc)
            </SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-wrap sm:flex-nowrap gap-4 md:basis-[30%]">
          <Button type="submit" size="lg" className="flex-grow">
            Filter
          </Button>
          <Button
            type="button"
            size="lg"
            variant="secondary"
            className="flex-grow"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}

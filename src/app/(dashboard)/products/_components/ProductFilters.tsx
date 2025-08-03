"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import FetchDropdownContainer from "@/components/shared/FetchDropdownContainer";

import { sortToParamsMap, getSortFromParams } from "./sortParams";
import { createBrowserClient } from "@/lib/supabase/client";
import { fetchCategoriesDropdown } from "@/services/categories";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    sort: getSortFromParams(searchParams) || "",
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
      const sortConfig = sortToParamsMap[filters.sort];
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
            <FetchDropdownContainer
              isLoading={isLoading}
              isError={isError}
              errorMessage="Failed to load categories"
            >
              <SelectItem key="all" value="all">
                All Categories
              </SelectItem>

              {!isLoading &&
                !isError &&
                categories &&
                categories!.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
            </FetchDropdownContainer>
          </SelectContent>
        </Select>

        <Select
          value={filters.sort}
          onValueChange={(value) => setFilters({ ...filters, sort: value })}
        >
          <SelectTrigger className="md:basis-1/5">
            <SelectValue placeholder="Sort by" />
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

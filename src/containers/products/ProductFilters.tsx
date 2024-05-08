"use client";

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

import { fetchAllCategories } from "@/data/categories";

export default function ProductFilters() {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
    select: (data) =>
      data.map((item) => ({
        name: item.name,
        slug: item.slug,
      })),
  });
  return (
    <Card className="mb-5">
      <form className="flex flex-col md:flex-row gap-4 lg:gap-6">
        <Input
          type="search"
          placeholder="Search product..."
          className="h-12 md:basis-[30%]"
        />

        <Select>
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
                <Typography>
                  Sorry, something went wrong while fetching categories
                </Typography>
              </div>
            ) : (
              categories.map((category) => (
                <SelectItem key={category.slug} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="md:basis-1/5">
            <SelectValue placeholder="Price" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="low">Low to High</SelectItem>
            <SelectItem value="high">High to Low</SelectItem>
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
          <Button size="lg" className="flex-grow">
            Filter
          </Button>
          <Button size="lg" variant="secondary" className="flex-grow">
            Reset
          </Button>
        </div>
      </form>
    </Card>
  );
}

"use client";

import * as React from "react";
import { Table as TableType, flexRender } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Typography from "@/components/ui/typography";
import { Pagination as PaginationType } from "@/types/pagination";
import { useUpdateQueryString } from "@/hooks/use-update-query-string";
import { getPaginationButtons } from "@/helpers/getPaginationButtons";

interface DataTableProps<TData> {
  table: TableType<TData>;
  pagination: PaginationType;
}

export default function DataTable<TData>({
  table,
  pagination,
}: DataTableProps<TData>) {
  const updateQueryString = useUpdateQueryString({ scroll: false });
  const paginationButtons = getPaginationButtons({
    totalPages: pagination.pages,
    currentPage: pagination.current,
  });

  const handlePaginationButton = (page: number) => {
    updateQueryString("page", page.toString());
  };

  const handlePaginationPrev = () => {
    if (pagination.prev) {
      updateQueryString("page", pagination.prev.toString());
    }
  };

  const handlePaginationNext = () => {
    if (pagination.next) {
      updateQueryString("page", pagination.next.toString());
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      {/* data table */}
      <Table>
        <TableHeader className="bg-popover">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="uppercase whitespace-nowrap"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="hover:bg-transparent"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.options.columns.length}
                className="h-32 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* pagination */}
      {pagination.items > 0 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-3.5 p-4 bg-popover text-muted-foreground">
          <Typography className="text-sm flex-shrink-0 uppercase font-medium">
            Showing{" "}
            {Math.max((pagination.current - 1) * pagination.limit + 1, 1)} to{" "}
            {Math.min(pagination.current * pagination.limit, pagination.items)}{" "}
            of {pagination.items}
          </Typography>

          <Pagination>
            <PaginationContent className="flex-wrap">
              <PaginationItem>
                <PaginationPrevious
                  onClick={handlePaginationPrev}
                  disabled={!pagination.prev}
                />
              </PaginationItem>

              {paginationButtons.map((page, index) => (
                <PaginationItem key={`page-${index}`}>
                  {page === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      onClick={() => handlePaginationButton(page)}
                      isActive={page === pagination.current}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={handlePaginationNext}
                  disabled={!pagination.next}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

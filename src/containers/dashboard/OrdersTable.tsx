"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
import { Order } from "@/types/order";
import { PaginationProps } from "@/types/pagination";
import { getPaginationButtons } from "@/helpers/getPaginationButtons";

interface DataTableProps {
  columns: ColumnDef<Order>[];
  data: Order[];
  pagination: PaginationProps;
}

export function OrdersTable({ columns, data, pagination }: DataTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const paginationButtons = getPaginationButtons({
    totalPages: pagination.pages,
    currentPage: pagination.current,
  });

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
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3.5 p-4 bg-popover text-muted-foreground">
        <Typography className="text-sm flex-shrink-0 uppercase font-medium">
          Showing{" "}
          {Math.max((pagination.current - 1) * pagination.perPage + 1, 1)} to{" "}
          {Math.min(pagination.current * pagination.perPage, pagination.items)}{" "}
          of {pagination.items}
        </Typography>

        <Pagination>
          <PaginationContent className="flex-wrap">
            <PaginationItem>
              <PaginationPrevious
                href={`?orders_page=${pagination.prev}`}
                disabled={!pagination.prev}
              />
            </PaginationItem>

            {paginationButtons.map((page, index) => (
              <PaginationItem key={`page-${index}`}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href={`?orders_page=${page}`}
                    isActive={page === pagination.current}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={`?orders_page=${pagination.next}`}
                disabled={!pagination.next}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

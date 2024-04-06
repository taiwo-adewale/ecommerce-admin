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
import { Skeleton } from "@/components/ui/skeleton";

const columns: ColumnDef<number>[] = [
  {
    accessorKey: "invoiceNo",
    header: "invoice no",
    cell: () => <Skeleton className="w-20 h-10" />,
  },
  {
    accessorKey: "orderTime",
    header: "order time",
    cell: () => <Skeleton className="w-32 h-10" />,
  },
  {
    accessorKey: "customerName",
    header: "customer name",
    cell: () => <Skeleton className="w-32 h-10" />,
  },
  {
    accessorKey: "method",
    header: "method",
    cell: () => <Skeleton className="w-14 h-10" />,
  },
  {
    accessorKey: "amount",
    header: "amount",
    cell: () => <Skeleton className="w-16 h-10" />,
  },
  {
    accessorKey: "status",
    header: "status",
    cell: () => <Skeleton className="w-16 h-10" />,
  },
  {
    accessorKey: "action",
    header: "action",
    cell: () => <Skeleton className="w-24 h-10" />,
  },
  {
    accessorKey: "invoice",
    header: "invoice",
    cell: () => <Skeleton className="w-20 h-10" />,
  },
];

export default function TableSkeleton() {
  const table = useReactTable({
    data: [1, 2, 3, 4, 5, 6, 8, 9, 10],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border overflow-hidden">
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
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-transparent">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col md:flex-row items-center justify-between gap-3.5 p-4 bg-popover">
        <Skeleton className="w-44 h-9" />

        <Skeleton className="w-full max-w-80 h-9" />
      </div>
    </div>
  );
}

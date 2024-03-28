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

const columns: ColumnDef<number>[] = [
  {
    accessorKey: "invoiceNo",
    header: "invoice no",
  },
  {
    accessorKey: "orderTime",
    header: "order time",
  },
  {
    accessorKey: "customerName",
    header: "customer name",
  },
  {
    accessorKey: "method",
    header: "method",
  },
  {
    accessorKey: "amount",
    header: "amount",
  },
  {
    accessorKey: "status",
    header: "status",
  },
  {
    accessorKey: "action",
    header: "action",
  },
  {
    accessorKey: "invoice",
    header: "invoice",
  },
];

export default function TableError() {
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
          <TableRow>
            <TableCell colSpan={columns.length} className="h-40 text-center">
              Something went wrong while trying to fetch orders
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

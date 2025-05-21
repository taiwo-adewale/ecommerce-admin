"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import DataTable from "@/components/shared/DataTable";
import { Customer } from "@/types/customer";
import { DataTableProps } from "@/types/data-table";

export default function CustomersTable({
  data,
  columns,
  pagination,
}: DataTableProps<Customer>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} pagination={pagination} />;
}

"use client";

import * as React from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import DataTable from "@/components/shared/DataTable";
import { Staff } from "@/types/staff";
import { DataTableProps } from "@/types/data-table";

export default function StaffTable({
  data,
  columns,
  pagination,
}: DataTableProps<Staff>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} pagination={pagination} />;
}

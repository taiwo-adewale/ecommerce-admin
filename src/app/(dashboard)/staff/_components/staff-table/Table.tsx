"use client";

import * as React from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import DataTable from "@/components/shared/table/DataTable";
import { DataTableProps } from "@/types/data-table";
import { Staff } from "@/services/staff/types";

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

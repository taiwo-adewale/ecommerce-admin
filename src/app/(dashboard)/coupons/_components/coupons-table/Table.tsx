"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import DataTable from "@/components/shared/table/DataTable";
import { DataTableWithRowSelectionProps } from "@/types/data-table";
import { Coupon } from "@/services/coupons/types";

export default function CouponTable({
  data,
  columns,
  pagination,
  rowSelection,
  setRowSelection,
}: DataTableWithRowSelectionProps<Coupon>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    state: {
      rowSelection,
    },
    onRowSelectionChange: (updater) => {
      const newSelectionState =
        typeof updater === "function" ? updater(rowSelection) : updater;

      setRowSelection(newSelectionState);
    },
  });

  return <DataTable table={table} pagination={pagination} />;
}

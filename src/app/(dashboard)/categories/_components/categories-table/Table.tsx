"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

import DataTable from "@/components/shared/table/DataTable";
import { DataTableWithRowSelectionProps } from "@/types/data-table";
import { Category } from "@/services/categories/types";

export default function CategoryTable({
  data,
  columns,
  pagination,
  rowSelection,
  setRowSelection,
}: DataTableWithRowSelectionProps<Category>) {
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

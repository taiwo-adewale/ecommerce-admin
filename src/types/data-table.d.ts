import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { Pagination } from "./pagination";

export interface DataTableProps<Data> {
  columns: ColumnDef<Data>[];
  data: Data[];
  pagination: Pagination;
}

export interface RowSelectionProps {
  rowSelection: RowSelectionState;
  setRowSelection: (selection: RowSelectionState) => void;
}

export type DataTableWithRowSelectionProps<Data> = DataTableProps<Data> &
  RowSelectionProps;

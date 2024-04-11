import { ColumnDef } from "@tanstack/react-table";
import { PaginationProps } from "./pagination";

export interface DataTableProps<Data> {
  columns: ColumnDef<Data>[];
  data: Data[];
  pagination: PaginationProps;
}

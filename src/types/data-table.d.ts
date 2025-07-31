import { ColumnDef } from "@tanstack/react-table";
import { Pagination } from "./pagination";

export interface DataTableProps<Data> {
  columns: ColumnDef<Data>[];
  data: Data[];
  pagination: Pagination;
}

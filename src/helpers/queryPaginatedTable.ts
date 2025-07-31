import { type PostgrestFilterBuilder } from "@supabase/postgrest-js";

import { Database } from "@/types/supabase";
import { Pagination } from "@/types/pagination";

type PublicSchema = Database["public"];
type PublicTables = PublicSchema["Tables"];

type Props<TableData, TableName extends keyof PublicTables> = {
  page: number;
  limit: number;
  name: keyof PublicTables;
  query: PostgrestFilterBuilder<
    PublicSchema,
    PublicTables[TableName]["Row"],
    TableData[]
  >;
};

type Response<TableData> = {
  data: TableData[];
  pagination: Pagination;
};

export async function queryPaginatedTable<
  TableData,
  TableName extends keyof PublicTables
>({
  page,
  limit,
  name,
  query,
}: Props<TableData, TableName>): Promise<Response<TableData>> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const limitQuery = query.range(from, to);

  const { data, error, count } = await limitQuery;

  if (error) {
    console.error(`Error fetching ${name}:`, error.message);
    throw new Error(`Error fetching from table '${name}': ${error.message}`);
  }

  const totalItems = count ?? 0;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;

  return {
    data: data,
    pagination: {
      limit,
      current: currentPage,
      items: totalItems,
      pages: totalPages,
      next: nextPage,
      prev: prevPage,
    },
  };
}

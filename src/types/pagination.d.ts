export interface Pagination {
  limit: number;
  current: number;
  items: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface PaginationQueryProps {
  page: number;
  perPage?: number;
}

export interface PaginationData<Data> extends Pagination {
  data: Data[];
}

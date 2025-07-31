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

export interface PaginationProps extends Pagination {
  current: number;
  // TODO: Remove next line and remove ? from next 2 lines
  perPage?: number;
  limit: number;
}

export interface PaginationData<Data> extends Pagination {
  data: Data[];
}

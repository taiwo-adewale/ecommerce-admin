interface Pagination {
  items: number;
  pages: number;
  first: number;
  last: number;
  next: number | null;
  prev: number | null;
}

export interface PaginationQueryProps {
  page: number;
  perPage?: number;
}

export interface PaginationProps extends Pagination {
  current: number;
  perPage: number;
}

export interface PaginationData<Data> extends Pagination {
  data: Data[];
}

export interface Pagination {
  limit: number;
  current: number;
  items: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

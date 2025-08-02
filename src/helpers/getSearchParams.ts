import { ReadonlyURLSearchParams } from "next/navigation";

type ParamsResponse = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  price?: string;
  published?: boolean;
  status?: string;
  date?: string;
  role?: string;
};

export const getSearchParams = (
  searchParams: ReadonlyURLSearchParams
): ParamsResponse => {
  const page =
    Math.max(1, Math.trunc(Number(searchParams.get("page")))) || undefined;
  const limit = Math.trunc(Number(searchParams.get("limit"))) || undefined;
  const search = searchParams.get("search") || undefined;
  const category =
    searchParams.get("category") === "all"
      ? undefined
      : searchParams.get("category") || undefined;
  const price = searchParams.get("price") || undefined;
  const published =
    searchParams.get("published") === "true"
      ? true
      : searchParams.get("published") === "false"
      ? false
      : undefined;
  const status = searchParams.get("status") || undefined;
  const date = searchParams.get("date") || undefined;
  const role =
    searchParams.get("role") === "all"
      ? undefined
      : searchParams.get("role") || undefined;

  return {
    page,
    limit,
    search,
    category,
    price,
    published,
    status,
    date,
    role,
  };
};

import { ReadonlyURLSearchParams } from "next/navigation";

type ParamsResponse = {
  page?: number;
  limit?: number;
  search?: string;
  price?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  category?: string;
  status?: string;
  method?: string;
  role?: string;
  published?: boolean;
};

export const getSearchParams = (
  searchParams: ReadonlyURLSearchParams
): ParamsResponse => {
  const getDropdownParam = (param: string) => {
    return searchParams.get(param) === "all"
      ? undefined
      : searchParams.get(param) || undefined;
  };

  const getBooleanParam = (param: string) => {
    return searchParams.get(param) === "true"
      ? true
      : searchParams.get(param) === "false"
      ? false
      : undefined;
  };

  const page =
    Math.max(1, Math.trunc(Number(searchParams.get("page")))) || undefined;
  const limit = Math.trunc(Number(searchParams.get("limit"))) || undefined;

  const search = searchParams.get("search") || undefined;
  const price = searchParams.get("price") || undefined;
  const date = searchParams.get("date") || undefined;
  const startDate = searchParams.get("start-date") || undefined;
  const endDate = searchParams.get("end-date") || undefined;

  const category = getDropdownParam("category");
  const status = getDropdownParam("status");
  const method = getDropdownParam("method");
  const role = getDropdownParam("role");
  const published = getBooleanParam("published");

  return {
    page,
    limit,
    search,
    price,
    date,
    startDate,
    endDate,
    category,
    status,
    method,
    role,
    published,
  };
};

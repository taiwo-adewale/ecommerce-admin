import { ReadonlyURLSearchParams } from "next/navigation";

export const sortToParamsMap: Record<string, { key: string; value: string }> = {
  "lowest-first": { key: "price", value: "lowest-first" },
  "highest-first": { key: "price", value: "highest-first" },
  published: { key: "published", value: "true" },
  unpublished: { key: "published", value: "false" },
  "status-selling": { key: "status", value: "selling" },
  "status-out-of-stock": { key: "status", value: "out-of-stock" },
  "date-added-asc": { key: "date", value: "added-asc" },
  "date-added-desc": { key: "date", value: "added-desc" },
  "date-updated-asc": { key: "date", value: "updated-asc" },
  "date-updated-desc": { key: "date", value: "updated-desc" },
};

export const paramsToSortMap: Record<string, string> = {
  "price=lowest-first": "lowest-first",
  "price=highest-first": "highest-first",
  "published=true": "published",
  "published=false": "unpublished",
  "status=selling": "status-selling",
  "status=out-of-stock": "status-out-of-stock",
  "date=added-asc": "date-added-asc",
  "date=added-desc": "date-added-desc",
  "date=updated-asc": "date-updated-asc",
  "date=updated-desc": "date-updated-desc",
};

export const getSortFromParams = (searchParams: ReadonlyURLSearchParams) => {
  const queryParams = new URLSearchParams(searchParams.toString());
  const paramKey = queryParams.get("price")
    ? `price=${queryParams.get("price")}`
    : queryParams.get("published")
    ? `published=${queryParams.get("published")}`
    : queryParams.get("status")
    ? `status=${queryParams.get("status")}`
    : queryParams.get("date")
    ? `date=${queryParams.get("date")}`
    : "";

  return paramsToSortMap[paramKey];
};

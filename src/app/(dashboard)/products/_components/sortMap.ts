export const sortMap: Record<string, { key: string; value: string }> = {
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

export const reverseSortMap: Record<string, string> = {
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

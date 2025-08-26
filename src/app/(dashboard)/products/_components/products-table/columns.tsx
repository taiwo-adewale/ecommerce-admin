import Link from "next/link";
import { ZoomIn, PenSquare, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Typography from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import { formatAmount } from "@/helpers/formatAmount";

import { TableSwitch } from "@/components/shared/table/TableSwitch";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { SheetTooltip } from "@/components/shared/table/TableActionTooltip";
import { TableActionAlertDialog } from "@/components/shared/table/TableActionAlertDialog";
import ProductFormSheet from "../form/ProductFormSheet";
import { ProductBadgeVariants } from "@/constants/badge";
import { Product } from "@/services/products/types";
import { SkeletonColumn } from "@/types/skeleton";

import { editProduct } from "@/actions/products/editProduct";
import { deleteProduct } from "@/actions/products/deleteProduct";
import { toggleProductPublishedStatus } from "@/actions/products/toggleProductStatus";
import { HasPermission } from "@/hooks/use-authorization";

export const getColumns = ({
  hasPermission,
}: {
  hasPermission: HasPermission;
}) => {
  const columns: ColumnDef<Product>[] = [
    {
      header: "product name",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <ImagePlaceholder
            src={row.original.image_url}
            alt={row.original.name}
            width={32}
            height={32}
            className="size-8 rounded-full"
          />

          <Typography className="capitalize block truncate">
            {row.original.name}
          </Typography>
        </div>
      ),
    },
    {
      header: "category",
      cell: ({ row }) => (
        <Typography
          className={cn(
            "block max-w-52 truncate",
            !row.original.categories?.name && "pl-8"
          )}
        >
          {row.original.categories?.name || "—"}
        </Typography>
      ),
    },
    {
      header: "price",
      cell: ({ row }) => {
        return formatAmount(row.original.cost_price);
      },
    },
    {
      header: "sale price",
      cell: ({ row }) => {
        return formatAmount(row.original.selling_price);
      },
    },
    {
      header: "stock",
      cell: ({ row }) => row.original.stock,
    },
    {
      header: "status",
      cell: ({ row }) => {
        const stock = row.original.stock;
        const status = stock > 0 ? "selling" : "out-of-stock";

        return (
          <Badge
            variant={ProductBadgeVariants[status]}
            className="flex-shrink-0 text-xs"
          >
            {status === "selling" ? "Selling" : "Out of stock"}
          </Badge>
        );
      },
    },
    {
      header: "view",
      cell: ({ row }) => (
        <Button size="icon" asChild variant="ghost" className="text-foreground">
          <Link href={`/products/${row.original.slug}`}>
            <ZoomIn className="size-5" />
          </Link>
        </Button>
      ),
    },
  ];

  if (hasPermission("products", "canTogglePublished")) {
    columns.splice(7, 0, {
      header: "published",
      cell: ({ row }) => (
        <div className="pl-5">
          <TableSwitch
            checked={row.original.published}
            toastSuccessMessage="Product status updated successfully."
            queryKey="products"
            onCheckedChange={() =>
              toggleProductPublishedStatus(
                row.original.id,
                row.original.published
              )
            }
          />
        </div>
      ),
    });
  }

  if (
    hasPermission("products", "canDelete") ||
    hasPermission("products", "canEdit")
  ) {
    columns.splice(0, 0, {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    });

    columns.splice(9, 0, {
      header: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            {hasPermission("products", "canEdit") && (
              <ProductFormSheet
                key={row.original.id}
                title="Update Products"
                description="Update necessary product information here"
                submitButtonText="Update Product"
                actionVerb="updated"
                initialData={{
                  name: row.original.name,
                  description: row.original.description ?? "",
                  image: row.original.image_url,
                  sku: row.original.sku,
                  category: row.original.category_id,
                  costPrice: row.original.cost_price,
                  salesPrice: row.original.selling_price,
                  stock: row.original.stock,
                  minStockThreshold: row.original.min_stock_threshold,
                  slug: row.original.slug,
                }}
                action={(formData) => editProduct(row.original.id, formData)}
                previewImage={row.original.image_url}
              >
                <SheetTooltip content="Edit Product">
                  <PenSquare className="size-5" />
                </SheetTooltip>
              </ProductFormSheet>
            )}

            {hasPermission("products", "canDelete") && (
              <TableActionAlertDialog
                title={`Delete ${row.original.name}?`}
                description="This action cannot be undone. This will permanently delete the product and its associated data from the database."
                tooltipContent="Delete Product"
                actionButtonText="Delete Product"
                toastSuccessMessage={`Product "${row.original.name}" deleted successfully!`}
                queryKey="products"
                action={() => deleteProduct(row.original.id)}
              >
                <Trash2 className="size-5" />
              </TableActionAlertDialog>
            )}
          </div>
        );
      },
    });
  }

  return columns;
};

export const skeletonColumns: SkeletonColumn[] = [
  {
    header: <Checkbox disabled checked={false} />,
    cell: <Skeleton className="size-4 rounded-sm" />,
  },
  {
    header: "product name",
    cell: (
      <div className="flex gap-2 items-center">
        <Skeleton className="size-8 rounded-full" />

        <Skeleton className="w-28 h-8" />
      </div>
    ),
  },
  {
    header: "category",
    cell: <Skeleton className="w-32 h-8" />,
  },
  {
    header: "price",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "sale price",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "stock",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "status",
    cell: <Skeleton className="w-24 h-8" />,
  },
  {
    header: "view",
    cell: <Skeleton className="w-8 h-8" />,
  },
  {
    header: "published",
    cell: <Skeleton className="w-16 h-10" />,
  },
  {
    header: "actions",
    cell: <Skeleton className="w-20 h-8" />,
  },
];

import Link from "next/link";
import { ZoomIn, PenSquare, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import Typography from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { formatAmount } from "@/helpers/formatAmount";
import {
  SheetTooltip,
  AlertDialogTooltip,
} from "@/components/shared/table/TableActionTooltip";

import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import ProductFormSheet from "../forms/ProductFormSheet";
import { ProductBadgeVariants } from "@/constants/badge";
import { Product } from "@/services/products/types";
import { SkeletonColumn } from "@/types/skeleton";

import { editProduct } from "@/actions/products/editProduct";

const handleSwitchChange = () => {};

export const columns: ColumnDef<Product>[] = [
  {
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
  },
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
        <Link href={`/product/${row.original.slug}`}>
          <ZoomIn className="size-5" />
        </Link>
      </Button>
    ),
  },
  {
    header: "published",
    cell: ({ row }) => (
      <div className="pl-5">
        <Switch
          checked={row.original.published}
          onCheckedChange={(value) => handleSwitchChange()}
        />
      </div>
    ),
  },
  {
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
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

          <AlertDialog>
            <AlertDialogTooltip content="Delete Product">
              <Trash2 className="size-5" />
            </AlertDialogTooltip>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

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

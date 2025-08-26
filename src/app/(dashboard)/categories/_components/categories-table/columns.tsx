import { PenSquare, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";

import { TableSwitch } from "@/components/shared/table/TableSwitch";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { SheetTooltip } from "@/components/shared/table/TableActionTooltip";
import { TableActionAlertDialog } from "@/components/shared/table/TableActionAlertDialog";
import CategoryFormSheet from "../form/CategoryFormSheet";
import { Category } from "@/services/categories/types";
import { SkeletonColumn } from "@/types/skeleton";

import { editCategory } from "@/actions/categories/editCategory";
import { deleteCategory } from "@/actions/categories/deleteCategory";
import { toggleCategoryPublishedStatus } from "@/actions/categories/toggleCategoryStatus";
import { HasPermission } from "@/hooks/use-authorization";

export const getColumns = ({
  hasPermission,
}: {
  hasPermission: HasPermission;
}) => {
  const columns: ColumnDef<Category>[] = [
    {
      header: "icon",
      cell: ({ row }) => (
        <ImagePlaceholder
          src={row.original.image_url}
          alt={row.original.name}
          width={32}
          height={32}
          className="size-8 rounded-full"
        />
      ),
    },
    {
      header: "name",
      cell: ({ row }) => row.original.name,
    },
    {
      header: "description",
      cell: ({ row }) => (
        <Typography className="block max-w-md xl:max-w-lg truncate">
          {row.original.description}
        </Typography>
      ),
    },
  ];

  if (hasPermission("categories", "canTogglePublished")) {
    columns.splice(4, 0, {
      header: "published",
      cell: ({ row }) => (
        <div className="pl-5">
          <TableSwitch
            checked={row.original.published}
            toastSuccessMessage="Category status updated successfully."
            queryKey="categories"
            onCheckedChange={() =>
              toggleCategoryPublishedStatus(
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
    hasPermission("categories", "canDelete") ||
    hasPermission("categories", "canEdit")
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

    columns.splice(5, 0, {
      header: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            {hasPermission("categories", "canEdit") && (
              <CategoryFormSheet
                key={row.original.id}
                title="Update Category"
                description="Update necessary category information here"
                submitButtonText="Update Category"
                actionVerb="updated"
                initialData={{
                  name: row.original.name,
                  description: row.original.description ?? "",
                  image: row.original.image_url,
                  slug: row.original.slug,
                }}
                action={(formData) => editCategory(row.original.id, formData)}
                previewImage={row.original.image_url}
              >
                <SheetTooltip content="Edit Category">
                  <PenSquare className="size-5" />
                </SheetTooltip>
              </CategoryFormSheet>
            )}

            {hasPermission("categories", "canDelete") && (
              <TableActionAlertDialog
                title={`Delete ${row.original.name}?`}
                description="This action cannot be undone. This will permanently delete the category and its associated data from the database."
                tooltipContent="Delete Category"
                actionButtonText="Delete Category"
                toastSuccessMessage={`Category "${row.original.name}" deleted successfully!`}
                queryKey="categories"
                action={() => deleteCategory(row.original.id)}
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
    header: "icon",
    cell: <Skeleton className="w-8 h-8 rounded-full" />,
  },
  {
    header: "name",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "description",
    cell: <Skeleton className="w-[32rem] h-8" />,
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

import { PenSquare, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";

import { TableSwitch } from "@/components/shared/table/TableSwitch";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { SheetTooltip } from "@/components/shared/table/TableActionTooltip";
import { TableActionAlertDialog } from "@/components/shared/table/TableActionAlertDialog";
import CouponFormSheet from "../form/CouponFormSheet";
import { CouponBadgeVariants } from "@/constants/badge";
import { SkeletonColumn } from "@/types/skeleton";
import { Coupon, CouponStatus } from "@/services/coupons/types";

import { editCoupon } from "@/actions/coupons/editCoupon";
import { deleteCoupon } from "@/actions/coupons/deleteCoupon";
import { toggleCouponPublishedStatus } from "@/actions/coupons/toggleCouponStatus";
import { HasPermission } from "@/hooks/use-authorization";

export const getColumns = ({
  hasPermission,
}: {
  hasPermission: HasPermission;
}) => {
  const columns: ColumnDef<Coupon>[] = [
    {
      header: "campaign name",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <ImagePlaceholder
            src={row.original.image_url}
            alt={row.original.campaign_name}
            width={32}
            height={32}
            className="size-8 rounded-full"
          />

          <Typography className="capitalize block truncate">
            {row.original.campaign_name}
          </Typography>
        </div>
      ),
    },
    {
      header: "code",
      cell: ({ row }) => (
        <Typography className="uppercase">{row.original.code}</Typography>
      ),
    },
    {
      header: "discount",
      cell: ({ row }) => {
        const discountType = row.original.discount_type;

        if (discountType === "fixed") {
          return `$${row.original.discount_value}`;
        }

        return `${row.original.discount_value}%`;
      },
    },
    {
      header: "start date",
      cell: ({ row }) => format(row.original.start_date, "PP"),
    },
    {
      header: "end date",
      cell: ({ row }) => format(row.original.end_date, "PP"),
    },
    {
      header: "status",
      cell: ({ row }) => {
        const currentTime = new Date();
        const endTime = new Date(row.original.end_date);

        const status: CouponStatus =
          currentTime > endTime ? "expired" : "active";

        return (
          <Badge
            variant={CouponBadgeVariants[status]}
            className="flex-shrink-0 text-xs capitalize"
          >
            {status}
          </Badge>
        );
      },
    },
  ];

  if (hasPermission("coupons", "canTogglePublished")) {
    columns.splice(3, 0, {
      header: "published",
      cell: ({ row }) => (
        <div className="pl-5">
          <TableSwitch
            checked={row.original.published}
            toastSuccessMessage="Coupon status updated successfully."
            queryKey="coupons"
            onCheckedChange={() =>
              toggleCouponPublishedStatus(
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
    hasPermission("coupons", "canDelete") ||
    hasPermission("coupons", "canEdit")
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

    columns.splice(8, 0, {
      header: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            {hasPermission("coupons", "canEdit") && (
              <CouponFormSheet
                key={row.original.id}
                title="Update Coupon"
                description="Update necessary coupon information here"
                submitButtonText="Update Coupon"
                actionVerb="updated"
                initialData={{
                  name: row.original.campaign_name,
                  code: row.original.code,
                  image: row.original.image_url,
                  startDate: new Date(row.original.start_date),
                  endDate: new Date(row.original.end_date),
                  isPercentageDiscount:
                    row.original.discount_type === "percentage",
                  discountValue: row.original.discount_value,
                }}
                action={(formData) => editCoupon(row.original.id, formData)}
                previewImage={row.original.image_url}
              >
                <SheetTooltip content="Edit Coupon">
                  <PenSquare className="size-5" />
                </SheetTooltip>
              </CouponFormSheet>
            )}

            {hasPermission("coupons", "canDelete") && (
              <TableActionAlertDialog
                title={`Delete ${row.original.campaign_name}?`}
                description="This action cannot be undone. This will permanently delete the coupon and its associated data from the database."
                tooltipContent="Delete Coupon"
                actionButtonText="Delete Coupon"
                toastSuccessMessage={`Coupon "${row.original.campaign_name}" deleted successfully!`}
                queryKey="coupons"
                action={() => deleteCoupon(row.original.id)}
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
    header: "campaign name",
    cell: (
      <div className="flex gap-2 items-center">
        <Skeleton className="size-8 rounded-full" />

        <Skeleton className="w-28 h-8" />
      </div>
    ),
  },
  {
    header: "code",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "discount",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "published",
    cell: <Skeleton className="w-16 h-10" />,
  },
  {
    header: "start date",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "end date",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "status",
    cell: <Skeleton className="w-20 h-10" />,
  },
  {
    header: "actions",
    cell: <Skeleton className="w-20 h-8" />,
  },
];

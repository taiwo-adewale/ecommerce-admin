import { PenSquare, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import noProfilePicture from "public/assets/no-profile-picture.jpg";

import { TableSwitch } from "@/components/shared/table/TableSwitch";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { TooltipWrapper } from "@/components/shared/table/TableActionTooltip";
import { SheetTooltip } from "@/components/shared/table/TableActionTooltip";
import { TableActionAlertDialog } from "@/components/shared/table/TableActionAlertDialog";
import StaffFormSheet from "../form/StaffFormSheet";
import { StaffBadgeVariants } from "@/constants/badge";
import { SkeletonColumn } from "@/types/skeleton";
import { Staff } from "@/services/staff/types";
import { format } from "date-fns";

import { editStaff } from "@/actions/staff/editStaff";
import { deleteStaff } from "@/actions/staff/deleteStaff";
import { toggleStaffPublishedStatus } from "@/actions/staff/toggleStaffStatus";
import { HasPermission, IsSelf } from "@/hooks/use-authorization";

const handleDemoDelete = () => {
  toast.error("Sorry, this feature is not allowed in demo mode", {
    position: "top-center",
  });
};

export const getColumns = ({
  hasPermission,
  isSelf,
}: {
  hasPermission: HasPermission;
  isSelf: IsSelf;
}) => {
  const columns: ColumnDef<Staff>[] = [
    {
      header: "name",
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <ImagePlaceholder
            src={row.original.image_url || noProfilePicture}
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
      header: "email",
      cell: ({ row }) => (
        <Typography className="block max-w-52 truncate">
          {row.original.email}
        </Typography>
      ),
    },
    {
      header: () => <span className="block text-center">phone</span>,
      id: "phone",
      cell: ({ row }) => (
        <Typography className="block text-center">
          {row.original.phone || "—"}
        </Typography>
      ),
    },
    {
      header: "joining date",
      cell: ({ row }) => format(row.original.created_at, "PP"),
    },
    {
      header: "role",
      cell: ({ row }) => (
        <Typography className="capitalize font-medium">
          {row.original.staff_roles?.display_name}
        </Typography>
      ),
    },
    {
      header: "status",
      cell: ({ row }) => {
        const status = row.original.published ? "active" : "inactive";

        return (
          <Badge
            variant={StaffBadgeVariants[status]}
            className="flex-shrink-0 text-xs capitalize"
          >
            {status}
          </Badge>
        );
      },
    },
  ];

  if (hasPermission("staff", "canTogglePublished")) {
    columns.splice(6, 0, {
      header: "published",
      cell: ({ row }) => (
        <div className="pl-5">
          <TableSwitch
            checked={row.original.published}
            toastSuccessMessage="Staff status updated successfully."
            queryKey="staff"
            onCheckedChange={() =>
              toggleStaffPublishedStatus(
                row.original.id,
                row.original.published
              )
            }
          />
        </div>
      ),
    });
  }

  columns.splice(7, 0, {
    header: () => <span className="block text-center">actions</span>,
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center gap-1">
          {isSelf(row.original.id) && (
            <StaffFormSheet
              key={row.original.id}
              title="Update Staff"
              description="Update necessary staff information here"
              submitButtonText="Update Staff"
              actionVerb="updated"
              initialData={{
                name: row.original.name,
                phone: row.original.phone ?? "",
                image: row.original.image_url ?? undefined,
              }}
              action={(formData) => editStaff(row.original.id, formData)}
              previewImage={row.original.image_url ?? undefined}
              staffEmail={row.original.email}
            >
              <SheetTooltip
                buttonClassName={
                  !hasPermission("staff", "canEdit") ? "ml-5" : undefined
                }
                content="Edit Profile"
              >
                <PenSquare className="size-5" />
              </SheetTooltip>
            </StaffFormSheet>
          )}

          {hasPermission("staff", "canDelete") && (
            <TooltipWrapper content="Delete Staff">
              <Button
                onClick={handleDemoDelete}
                variant="ghost"
                size="icon"
                className="text-foreground"
              >
                <Trash2 className="size-5" />
              </Button>
            </TooltipWrapper>

            // <TableActionAlertDialog
            //   title={`Delete ${row.original.name}?`}
            //   description="This action cannot be undone. This will permanently delete the staff and associated data from the database."
            //   tooltipContent="Delete Staff"
            //   actionButtonText="Delete Staff"
            //   toastSuccessMessage={`Staff "${row.original.name}" deleted successfully!`}
            //   queryKey="staff"
            //   action={() => deleteStaff(row.original.id)}
            // >
            //   <Trash2 className="size-5" />
            // </TableActionAlertDialog>
          )}
        </div>
      );
    },
  });

  return columns;
};

export const skeletonColumns: SkeletonColumn[] = [
  {
    header: "name",
    cell: (
      <div className="flex gap-2 items-center">
        <Skeleton className="size-8 rounded-full" />

        <Skeleton className="w-28 h-8" />
      </div>
    ),
  },
  {
    header: "email",
    cell: <Skeleton className="w-32 h-8" />,
  },
  {
    header: "phone",
    cell: <Skeleton className="w-20 h-10" />,
  },
  {
    header: "joining date",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "role",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "status",
    cell: <Skeleton className="w-24 h-8" />,
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

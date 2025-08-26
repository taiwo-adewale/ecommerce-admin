import Link from "next/link";
import { ZoomIn, PenSquare, Trash2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";

import { SheetTooltip } from "@/components/shared/table/TableActionTooltip";
import { TableActionAlertDialog } from "@/components/shared/table/TableActionAlertDialog";
import CustomerFormSheet from "../form/CustomerFormSheet";
import { Customer } from "@/services/customers/types";
import { SkeletonColumn } from "@/types/skeleton";
import { TooltipWrapper } from "@/components/shared/table/TableActionTooltip";

import { editCustomer } from "@/actions/customers/editCustomer";
import { deleteCustomer } from "@/actions/customers/deleteCustomer";
import { HasPermission } from "@/hooks/use-authorization";

export const getColumns = ({
  hasPermission,
}: {
  hasPermission: HasPermission;
}) => {
  const columns: ColumnDef<Customer>[] = [
    {
      header: "id",
      cell: ({ row }) => (
        <Typography className="uppercase">
          {row.original.id.slice(-4)}
        </Typography>
      ),
    },
    {
      header: "joining date",
      cell: ({ row }) => format(row.original.created_at, "PP"),
    },
    {
      header: "name",
      cell: ({ row }) => row.original.name,
    },
    {
      header: "email",
      cell: ({ row }) => (
        <Typography className="block max-w-52 xl:max-w-60 truncate">
          {row.original.email}
        </Typography>
      ),
    },
    {
      header: "phone",
      cell: ({ row }) => (
        <Typography className={cn(!row.original.phone && "pl-6")}>
          {row.original.phone || "—"}
        </Typography>
      ),
    },
    {
      header: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <TooltipWrapper content="View Customer Orders">
              <Button
                size="icon"
                asChild
                variant="ghost"
                className="text-foreground"
              >
                <Link href={`/customer-orders/${row.original.id}`}>
                  <ZoomIn className="size-5" />
                </Link>
              </Button>
            </TooltipWrapper>

            {hasPermission("customers", "canEdit") && (
              <CustomerFormSheet
                key={row.original.id}
                title="Update Customers"
                description="Update necessary customer information here"
                submitButtonText="Update Customer"
                actionVerb="updated"
                initialData={{
                  name: row.original.name,
                  email: row.original.email,
                  phone: row.original.phone ?? "",
                }}
                action={(formData) => editCustomer(row.original.id, formData)}
              >
                <SheetTooltip content="Edit Customer">
                  <PenSquare className="size-5" />
                </SheetTooltip>
              </CustomerFormSheet>
            )}

            {hasPermission("customers", "canDelete") && (
              <TableActionAlertDialog
                title={`Delete ${row.original.name}?`}
                description="This action cannot be undone. This will permanently delete this customer and associated data from the database."
                tooltipContent="Delete Customer"
                actionButtonText="Delete Customer"
                toastSuccessMessage={`Customer "${row.original.name}" deleted successfully!`}
                queryKey="customers"
                action={() => deleteCustomer(row.original.id)}
              >
                <Trash2 className="size-5" />
              </TableActionAlertDialog>
            )}
          </div>
        );
      },
    },
  ];

  return columns;
};

export const skeletonColumns: SkeletonColumn[] = [
  {
    header: "id",
    cell: <Skeleton className="w-10 h-8" />,
  },
  {
    header: "joining date",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "name",
    cell: <Skeleton className="w-24 h-8" />,
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
    header: "actions",
    cell: <Skeleton className="w-24 h-8" />,
  },
];

import Link from "next/link";
import { ZoomIn } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SelectItem } from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatAmount } from "@/helpers/formatAmount";

import { TableSelect } from "@/components/shared/table/TableSelect";
import { OrderBadgeVariants } from "@/constants/badge";
import { Order, OrderStatus } from "@/services/orders/types";
import { SkeletonColumn } from "@/types/skeleton";

import { changeOrderStatus } from "@/actions/orders/changeOrderStatus";
import { PrintInvoiceButton } from "./PrintInvoiceButton";
import { HasPermission } from "@/hooks/use-authorization";

export const getColumns = ({
  hasPermission,
}: {
  hasPermission: HasPermission;
}) => {
  const columns: ColumnDef<Order>[] = [
    {
      header: "invoice no",
      cell: ({ row }) => row.original.invoice_no,
    },
    {
      header: "order time",
      cell: ({ row }) =>
        `${format(row.original.order_time, "PP")} ${format(
          row.original.order_time,
          "p"
        )}`,
    },
    {
      header: "customer name",
      cell: ({ row }) => (
        <span className="block max-w-52 truncate">
          {row.original.customers?.name}
        </span>
      ),
    },
    {
      header: "method",
      cell: ({ row }) => (
        <span className="capitalize">{row.original.payment_method}</span>
      ),
    },
    {
      header: "amount",
      cell: ({ row }) => formatAmount(row.original.total_amount),
    },
    {
      header: "status",
      cell: ({ row }) => {
        const status = row.original.status;

        return (
          <Badge
            variant={OrderBadgeVariants[status]}
            className="flex-shrink-0 text-xs capitalize"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      header: "invoice",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            {hasPermission("orders", "canPrint") && (
              <PrintInvoiceButton orderId={row.original.id} />
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground"
                  asChild
                >
                  <Link href={`/orders/${row.original.id}`}>
                    <ZoomIn className="size-5" />
                  </Link>
                </Button>
              </TooltipTrigger>

              <TooltipContent>
                <p>View Invoice</p>
              </TooltipContent>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  if (hasPermission("orders", "canChangeStatus")) {
    columns.splice(6, 0, {
      header: "action",
      cell: ({ row }) => {
        return (
          <TableSelect
            value={row.original.status}
            toastSuccessMessage="Order status updated successfully."
            queryKey="orders"
            onValueChange={(value) =>
              changeOrderStatus(row.original.id, value as OrderStatus)
            }
          >
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </TableSelect>
        );
      },
    });
  }

  return columns;
};

export const skeletonColumns: SkeletonColumn[] = [
  {
    header: "invoice no",
    cell: <Skeleton className="w-20 h-8" />,
  },
  {
    header: "order time",
    cell: <Skeleton className="w-32 h-8" />,
  },
  {
    header: "customer name",
    cell: <Skeleton className="w-32 h-8" />,
  },
  {
    header: "method",
    cell: <Skeleton className="w-14 h-8" />,
  },
  {
    header: "amount",
    cell: <Skeleton className="w-16 h-8" />,
  },
  {
    header: "status",
    cell: <Skeleton className="w-16 h-8" />,
  },
  {
    header: "action",
    cell: <Skeleton className="w-24 h-10" />,
  },
  {
    header: "invoice",
    cell: <Skeleton className="w-20 h-8" />,
  },
];

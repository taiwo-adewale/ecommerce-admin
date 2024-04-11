"use client";

import Link from "next/link";
import { Printer, ZoomIn } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatAmount } from "@/helpers/formatAmount";
import { formatDate } from "@/helpers/formatDate";

import { Order } from "@/types/order";
import { SkeletonColumn } from "@/types/skeleton";
import {
  OrderBadgeStatus,
  OrderBadgeVariants,
  ORDER_BADGE_STATUSES,
} from "@/types/badge";

const changeStatus = (value: OrderBadgeStatus, invoiceNo: string) => {};
const printInvoice = (invoiceNo: string) => {};

export const columns: ColumnDef<Order>[] = [
  {
    header: "invoice no",
    cell: ({ row }) => row.original.invoiceNo,
  },
  {
    header: "order time",
    cell: ({ row }) => formatDate(row.original.orderTime),
  },
  {
    header: "customer name",
    cell: ({ row }) => (
      <span className="block max-w-52 truncate">
        {row.original.customerName}
      </span>
    ),
  },
  {
    header: "method",
    cell: ({ row }) => (
      <span className="capitalize">{row.original.method}</span>
    ),
  },
  {
    header: "amount",
    cell: ({ row }) => formatAmount(row.original.amount),
  },
  {
    header: "status",
    cell: ({ row }) => {
      const status: OrderBadgeStatus = row.original.status;

      return (
        <Badge
          variant={OrderBadgeVariants[status]}
          className="flex-shrink-0 text-xs"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    header: "action",
    cell: ({ row }) => {
      const invoiceNo = row.original.invoiceNo;

      return (
        <Select
          onValueChange={(value: OrderBadgeStatus) =>
            changeStatus(value, invoiceNo)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={row.original.status} />
          </SelectTrigger>

          <SelectContent>
            {ORDER_BADGE_STATUSES.map((badgeStatus) => (
              <SelectItem value={badgeStatus} key={badgeStatus}>
                {badgeStatus}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
  {
    header: "invoice",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => printInvoice(row.original.invoiceNo)}
                className="text-foreground"
              >
                <Printer className="size-5" />
              </Button>
            </TooltipTrigger>

            <TooltipContent>
              <p>Print Invoice</p>
            </TooltipContent>
          </Tooltip>

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

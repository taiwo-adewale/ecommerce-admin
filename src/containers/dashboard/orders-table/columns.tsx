"use client";

import Link from "next/link";
import { Printer, ZoomIn } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { BadgeStatus, BadgeVariants, badgeStatuses } from "@/types/badge";

const changeStatus = (value: BadgeStatus, invoiceNo: string) => {};
const printInvoice = (invoiceNo: string) => {};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "invoiceNo",
    header: "invoice no",
    cell: ({ row }) => row.getValue("invoiceNo"),
  },
  {
    accessorKey: "orderTime",
    header: "order time",
    cell: ({ row }) => formatDate(row.getValue("orderTime")),
  },
  {
    accessorKey: "customerName",
    header: "customer name",
    cell: ({ row }) => {
      return (
        <span className="block max-w-52 truncate">
          {row.getValue("customerName")}
        </span>
      );
    },
  },
  {
    accessorKey: "method",
    header: "method",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("method")}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "amount",
    cell: ({ row }) => formatAmount(row.getValue("amount")),
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => {
      const status: BadgeStatus = row.getValue("status");

      return (
        <Badge
          variant={BadgeVariants[status]}
          className="flex-shrink-0 text-xs"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "action",
    header: "action",
    cell: ({ row }) => {
      const invoiceNo = row.getValue("invoiceNo");

      return (
        <Select
          onValueChange={(value: BadgeStatus) =>
            changeStatus(value, invoiceNo as string)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={row.getValue("status")} />
          </SelectTrigger>

          <SelectContent>
            {badgeStatuses.map((badgeStatus) => (
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
    accessorKey: "invoice",
    header: "invoice",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => printInvoice(row.getValue("invoiceNo"))}
                className="text-foreground"
              >
                <Printer className="w-5 h-5" />
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
                <Link href="#">
                  <ZoomIn className="w-5 h-5" />
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

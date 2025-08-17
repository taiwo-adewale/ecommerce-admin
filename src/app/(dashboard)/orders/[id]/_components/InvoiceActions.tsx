"use client";

import { DownloadCloud, Printer, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePdfDownload } from "@/hooks/use-pdf-download";
import { OrderDetails } from "@/services/orders/types";
import InvoicePdfTemplate from "./InvoicePdfTemplate";

export function InvoiceActions({ order }: { order: OrderDetails }) {
  const { isLoading, downloadTemplate } = usePdfDownload();

  const printInvoice = () => {
    window.print();
  };

  const downloadInvoice = () => {
    downloadTemplate({
      htmlId: `invoice-${order.invoice_no}`,
      pdfName: `Invoice-${order.invoice_no}`,
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-between print:hidden">
        <Button size="lg" disabled={isLoading} onClick={downloadInvoice}>
          Download Invoice{" "}
          {isLoading ? (
            <Loader2 className="ml-2 size-4 animate-spin" />
          ) : (
            <DownloadCloud className="ml-2 size-4" />
          )}
        </Button>

        <Button size="lg" onClick={printInvoice}>
          Print Invoice <Printer className="ml-2 size-4" />
        </Button>
      </div>

      <div className="absolute -z-[1] opacity-0 -top-[9999px] -left-[9999px]">
        <InvoicePdfTemplate order={order} />
      </div>
    </>
  );
}

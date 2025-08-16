"use client";

import { DownloadCloud, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

export function InvoiceActions() {
  const printInvoice = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap gap-3 justify-between print:hidden">
      <Button size="lg">
        Download Invoice <DownloadCloud className="ml-2 size-4" />
      </Button>

      <Button size="lg" onClick={printInvoice}>
        Print Invoice <Printer className="ml-2 size-4" />
      </Button>
    </div>
  );
}

import { Printer, Loader2 } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { usePagePrint } from "@/hooks/use-page-print";

export function PrintInvoiceButton({ orderId }: { orderId: string }) {
  const { isLoading, printPage } = usePagePrint();

  if (isLoading)
    return (
      <Button variant="ghost" size="icon" disabled className="text-foreground">
        <Loader2 className="size-5 animate-spin" />
      </Button>
    );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => printPage(`/orders/${orderId}`)}
          className="text-foreground"
        >
          <Printer className="size-5" />
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p>Print Invoice</p>
      </TooltipContent>
    </Tooltip>
  );
}

"use client";

import { useTransition } from "react";
import { FileJson, FileSpreadsheet } from "lucide-react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Database } from "@/types/supabase";
import { exportAsCSV, exportAsJSON } from "@/helpers/exportData";

type SuccessResponse = { data: any[] };
type ErrorResponse = { error: string };
type ActionResponse = SuccessResponse | ErrorResponse;

type Props = {
  tableName: keyof Database["public"]["Tables"];
  action: () => Promise<ActionResponse>;
};

export function ExportDataButtons({ tableName, action }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleExport = (format: "json" | "csv") => {
    toast.info(`Exporting ${tableName} as ${format.toUpperCase()}...`);

    startTransition(async () => {
      const result = await action();

      if ("error" in result) {
        toast.error(result.error);
      } else if ("data" in result) {
        if (format === "json") {
          exportAsJSON(result.data, tableName);
        } else if (format === "csv") {
          exportAsCSV(result.data, tableName);
        }
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        className="h-12"
        disabled={isPending}
        onClick={() => handleExport("csv")}
      >
        <FileSpreadsheet className="mr-2 size-4" />
        Export CSV
      </Button>

      <Button
        variant="outline"
        className="h-12"
        disabled={isPending}
        onClick={() => handleExport("json")}
      >
        <FileJson className="mr-2 size-4" />
        Export JSON
      </Button>
    </div>
  );
}

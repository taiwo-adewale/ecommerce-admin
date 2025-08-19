"use client";

import { useTransition } from "react";
import { FileJson, FileSpreadsheet } from "lucide-react";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Database } from "@/types/supabase";
import { fetchAllData } from "@/actions/fetchAllData";
import { exportAsCSV, exportAsJSON } from "@/helpers/exportData";

type Props = {
  tableName: keyof Database["public"]["Tables"];
  fileName: string;
};

export function ExportDataButtons({ tableName, fileName }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleExport = (format: "json" | "csv") => {
    toast.info(`Exporting ${tableName} as ${format.toUpperCase()}...`);

    startTransition(async () => {
      const result = await fetchAllData(tableName);

      if (result.error) {
        toast.error(result.error);
      } else if (result.data) {
        if (format === "json") {
          exportAsJSON(result.data, fileName);
        } else if (format === "csv") {
          exportAsCSV(result.data, fileName);
        }
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        disabled={isPending}
        onClick={() => handleExport("csv")}
      >
        <FileSpreadsheet className="mr-2 size-4" />
        Export CSV
      </Button>

      <Button
        variant="outline"
        disabled={isPending}
        onClick={() => handleExport("json")}
      >
        <FileJson className="mr-2 size-4" />
        Export JSON
      </Button>
    </div>
  );
}

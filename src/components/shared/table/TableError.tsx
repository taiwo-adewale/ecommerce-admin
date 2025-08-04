import { AlertCircle, RefreshCw } from "lucide-react";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

type TableErrorProps<TData> = {
  errorMessage?: string;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TData, Error>>;
};

export default function TableError<TData>({
  errorMessage = "Something went wrong while trying to fetch data.",
  refetch,
}: TableErrorProps<TData>) {
  return (
    <div className="rounded-md border-destructive border-2 overflow-hidden">
      <div className="px-4 py-12 min-h-60 text-center grid place-items-center">
        <div className="flex flex-col items-center gap-4 text-destructive">
          <AlertCircle className="size-7" />

          <Typography>{errorMessage}</Typography>

          <Button
            onClick={() => refetch()}
            variant="destructive"
            className="py-3 px-8 mt-2"
          >
            <RefreshCw className="size-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}

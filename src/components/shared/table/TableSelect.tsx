import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ServerActionResponse } from "@/types/server-action";

type Props = {
  value: string;
  toastSuccessMessage: string;
  queryKey: string;
  children: React.ReactNode;
  onValueChange: (value: string) => Promise<ServerActionResponse>;
};

export function TableSelect({
  value,
  toastSuccessMessage,
  queryKey,
  children,
  onValueChange,
}: Props) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const handleValueChange = (newValue: string) => {
    startTransition(async () => {
      const result = await onValueChange(newValue);

      if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        toast.success(toastSuccessMessage, { position: "top-center" });
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    });
  };

  return (
    <Select
      disabled={isPending}
      value={value}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="capitalize min-w-32">
        <SelectValue placeholder={value} />
      </SelectTrigger>

      <SelectContent>{children}</SelectContent>
    </Select>
  );
}

import { useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { ServerActionResponse } from "@/types/server-action";

type Props = {
  checked: boolean;
  toastSuccessMessage: string;
  queryKey: string;
  onCheckedChange: () => Promise<ServerActionResponse>;
};

export function TableSwitch({
  checked,
  toastSuccessMessage,
  queryKey,
  onCheckedChange,
}: Props) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const handleSwitchToggle = () => {
    startTransition(async () => {
      const result = await onCheckedChange();

      if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        toast.success(toastSuccessMessage, { position: "top-center" });
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      }
    });
  };

  return (
    <Switch
      checked={checked}
      disabled={isPending}
      onCheckedChange={handleSwitchToggle}
    />
  );
}

import { useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { AlertDialogTooltip } from "@/components/shared/table/TableActionTooltip";
import { FormSubmitButton } from "../form/FormSubmitButton";
import { ServerActionResponse } from "@/types/server-action";

type Props = {
  title: string;
  description: string;
  tooltipContent: string;
  actionButtonText: string;
  toastSuccessMessage: string;
  queryKey: string;
  children: React.ReactNode;
  action: () => Promise<ServerActionResponse>;
};

export function TableActionAlertDialog({
  title,
  description,
  tooltipContent,
  actionButtonText,
  toastSuccessMessage,
  queryKey,
  children,
  action,
}: Props) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConfirm = () => {
    startTransition(async () => {
      const result = await action();

      if ("dbError" in result) {
        toast.error(result.dbError);
      } else {
        toast.success(toastSuccessMessage, { position: "top-center" });
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        setIsDialogOpen(false);
      }
    });
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTooltip content={tooltipContent}>
        {children}
      </AlertDialogTooltip>

      <AlertDialogContent>
        <AlertDialogHeader className="mb-4">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <FormSubmitButton
            variant="destructive"
            isPending={isPending}
            onClick={handleConfirm}
            className="py-2 px-4"
          >
            {actionButtonText}
          </FormSubmitButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

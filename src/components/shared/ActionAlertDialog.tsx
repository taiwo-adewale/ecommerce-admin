import { useState, useTransition } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ServerActionResponse } from "@/types/server-action";

type Props = {
  title: string;
  description: string;
  actionButtonText: string;
  toastSuccessMessage: string;
  queryKey: string;
  children: React.ReactNode;
  action: () => Promise<ServerActionResponse>;
  onSuccess?: () => void;
};

export function ActionAlertDialog({
  title,
  description,
  actionButtonText,
  toastSuccessMessage,
  queryKey,
  children,
  action,
  onSuccess,
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
        onSuccess && onSuccess();
      }
    });
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="mb-4">
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isPending}
            type="submit"
            className="py-2 px-4"
            size="lg"
            onClick={handleConfirm}
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {actionButtonText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

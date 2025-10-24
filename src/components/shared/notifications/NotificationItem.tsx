"use client";

import Image from "next/image";
import { useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Notification } from "@/services/notifications/types";
import { deleteNotification } from "@/services/notifications";
import { createBrowserClient } from "@/lib/supabase/client";

type Props = {
  notification: Notification;
};

export default function NotificationItem({ notification }: Props) {
  const queryClient = useQueryClient();

  const {
    mutate: handleDelete,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () =>
      deleteNotification(createBrowserClient(), {
        notificationId: notification.id,
      }),
    onSuccess: () => {
      toast.success("Notification deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
  });

  useEffect(() => {
    if (isError) {
      toast.error(
        "There was an error while trying to delete notification. Please try again!"
      );
    }
  }, [isError]);

  return (
    <div className="flex items-center justify-between p-3 border-t border-t-border first:border-t-0 sm:gap-x-2">
      <div className="flex items-center gap-x-3">
        <Image
          src={notification.image_url}
          alt={notification.title}
          width={30}
          height={30}
          className="size-[1.875rem] rounded-full flex-shrink-0 self-start mt-1.5 sm:mt-0 sm:self-center object-cover"
        />

        <div className="flex flex-col">
          <Typography
            component="p"
            className="text-[0.8125rem] md:text-[0.8125rem] line-clamp-2 sm:line-clamp-1 mb-2 sm:mb-1.5"
          >
            {notification.title}
          </Typography>

          <div className="flex flex-col-reverse items-start sm:items-center sm:flex-row gap-x-2 gap-y-2">
            {notification.type === "low_stock" ? (
              <Badge variant="destructive" className="flex-shrink-0">
                Stock Out
              </Badge>
            ) : (
              <Badge variant="success" className="flex-shrink-0">
                New Order
              </Badge>
            )}

            <Typography component="p" className="text-xs md:text-xs">
              {format(new Date(notification.created_at), "MMM d yyyy - hh:mma")}
            </Typography>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 w-8 h-8"
        disabled={isPending}
        onClick={() => handleDelete()}
      >
        {isPending ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <X className="size-3.5" />
        )}
      </Button>
    </div>
  );
}

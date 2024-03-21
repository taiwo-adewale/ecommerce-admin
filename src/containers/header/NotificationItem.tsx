import Image from "next/image";
import { X } from "lucide-react";

import { Notification } from "@/types/notifications";
import { Badge } from "@/components/ui/badge";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

type Props = {
  notification: Notification;
  deleteNotification: () => void;
};

export default function NotificationItem({
  notification,
  deleteNotification,
}: Props) {
  const notificationDetails =
    notification.type === "stock-out"
      ? {
          title: notification.item + " stock out, please check!",
          badge: (
            <Badge variant="destructive" className="flex-shrink-0">
              Stock Out
            </Badge>
          ),
        }
      : notification.type === "new-order"
      ? {
          title:
            notification.name + " placed $" + notification.price + " order!",
          badge: (
            <Badge variant="success" className="flex-shrink-0">
              New Order
            </Badge>
          ),
        }
      : null;

  if (!notificationDetails) return null;

  return (
    <div className="flex items-center justify-between p-3 border-t border-t-border first:border-t-0 sm:gap-x-2">
      <div className="flex items-center gap-x-3">
        <Image
          src={notification.imageUrl}
          alt={notificationDetails.title}
          width={30}
          height={30}
          className="size-[1.875rem] rounded-full flex-shrink-0 self-start mt-1.5 sm:mt-0 sm:self-center"
        />

        <div className="flex flex-col">
          <Typography
            component="p"
            className="text-[0.8125rem] md:text-[0.8125rem] line-clamp-2 sm:line-clamp-1 mb-2 sm:mb-1.5"
          >
            {notificationDetails.title}
          </Typography>

          <div className="flex flex-col-reverse items-start sm:items-center sm:flex-row gap-x-2 gap-y-2">
            {notificationDetails.badge}

            <Typography component="p" className="text-xs md:text-xs">
              {notification.timestamp}
            </Typography>
          </div>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0 w-8 h-8"
        onClick={deleteNotification}
      >
        <X className="size-3.5" />
      </Button>
    </div>
  );
}

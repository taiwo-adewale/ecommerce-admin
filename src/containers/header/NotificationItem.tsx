import Image from "next/image";
import { X } from "lucide-react";

import { useDispatch } from "@/redux/utils";
import { deleteNotification } from "@/redux/features/notification-slice";
import { Notification } from "@/types/notifications";
import { Badge } from "@/components/ui/badge";
import { TypographyP } from "@/components/ui/typography";

type Props = {
  notification: Notification;
};

export default function NotificationItem({ notification }: Props) {
  const dispatch = useDispatch();

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

  const handleDeleteNotification = (id: string) => {
    dispatch(deleteNotification(id));
  };

  if (!notificationDetails) return null;

  return (
    <div className="flex items-center justify-between p-3 border-t border-t-border first:border-t-0 sm:gap-x-2">
      <div className="flex items-center gap-x-3">
        <Image
          src={notification.imageUrl}
          alt={notificationDetails.title}
          width={30}
          height={30}
          className="w-[1.875rem] h-[1.875rem] rounded-full flex-shrink-0 self-start mt-1.5 sm:mt-0 sm:self-center"
        />

        <div className="flex flex-col">
          <TypographyP className="text-[0.8125rem] md:text-[0.8125rem] line-clamp-2 sm:line-clamp-1 mb-2 sm:mb-1.5 font-light">
            {notificationDetails.title}
          </TypographyP>

          <div className="flex flex-col-reverse items-start sm:items-center sm:flex-row gap-x-2 gap-y-2">
            {notificationDetails.badge}

            <TypographyP className="text-xs md:text-xs">
              {notification.timestamp}
            </TypographyP>
          </div>
        </div>
      </div>

      <button
        onClick={() => handleDeleteNotification(notification.id)}
        className="flex-shrink-0 p-2 rounded-full hover:bg-accent"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

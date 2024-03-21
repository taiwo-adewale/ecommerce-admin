"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Typography from "@/components/ui/typography";
import NotificationItem from "./NotificationItem";
import NotificationsBadge from "./NotificationsBadge";

// dummy notifications
import { testNotifications } from "@/test-files/notifications";

export default function Notifications() {
  const [notifications, setNotifications] = useState(testNotifications);
  const [unreadNotifications, setUnreadNotifications] = useState(
    notifications.length
  );

  const handleNotificationsOpen = () => {
    setUnreadNotifications(0);
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild onClick={handleNotificationsOpen}>
          <Button variant="ghost" size="icon">
            <Bell />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          alignOffset={-60}
          asChild
          className="flex flex-col p-0 w-[18rem] sm:w-[22rem]"
        >
          <ScrollArea type="auto" className="h-full max-h-[350px]">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <NotificationItem
                  key={`notification-${index}`}
                  notification={notification}
                  deleteNotification={() =>
                    handleDeleteNotification(notification.id)
                  }
                />
              ))
            ) : (
              <div className="w-full text-center px-4 py-6">
                <Typography component="p" className="text-sm md:text-sm">
                  You have no notifications!
                </Typography>
              </div>
            )}
          </ScrollArea>
        </PopoverContent>
      </Popover>

      {unreadNotifications > 0 && (
        <NotificationsBadge value={unreadNotifications} />
      )}
    </div>
  );
}

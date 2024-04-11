"use client";

import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import { fetchNotifications } from "@/data/notifications";

const NotificationsBadge = () => {
  const {
    data: notificationCount,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    select: (data) => data.length,
  });

  if (isLoading || isError || !notificationCount) return null;

  return (
    <div
      className={cn(
        "absolute rounded-full flex justify-center items-center text-white bg-red-500 dark:bg-destructive pointer-events-none",
        notificationCount < 100
          ? "left-[15%] top-[10%] size-4"
          : "left-[8%] top-[4%] size-5"
      )}
    >
      <Typography className="text-[0.5rem] md:text-[0.5rem] mt-0.5">
        {notificationCount < 100 ? (
          notificationCount
        ) : (
          <>
            99<sup>+</sup>
          </>
        )}
      </Typography>
    </div>
  );
};

export default NotificationsBadge;

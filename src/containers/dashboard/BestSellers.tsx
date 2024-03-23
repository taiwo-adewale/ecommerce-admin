"use client";

import { Pie } from "react-chartjs-2";
import { useTheme } from "next-themes";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import useGetMountStatus from "@/hooks/useGetMountStatus";

export default function BestSellers() {
  const mounted = useGetMountStatus();
  const { theme } = useTheme();

  return (
    <Card>
      <Typography variant="h3" className="mb-4">
        Best Selling Products
      </Typography>

      <CardContent className="pb-2">
        <div className="relative h-[18.625rem]">
          {mounted ? (
            <Pie
              data={{
                labels: [
                  "Green Leaf Lettuce",
                  "Rainbow Chard",
                  "Clementine",
                  "Mint",
                ],
                datasets: [
                  {
                    label: "Orders",
                    data: [270, 238, 203, 153],
                    backgroundColor: [
                      "rgb(34, 197, 94)",
                      "rgb(59, 130, 246)",
                      "rgb(249, 115, 22)",
                      "rgb(99, 102, 241)",
                    ],
                    borderColor:
                      theme === "light" ? "rgb(255,255,255)" : "rgb(23,23,23)",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
              }}
            />
          ) : (
            <Skeleton className="size-full" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

import { HiOutlineRefresh } from "react-icons/hi";
import { HiOutlineSquare3Stack3D, HiCalendarDays } from "react-icons/hi2";

import { cn } from "@/lib/utils";
import Typography from "@/components/ui/typography";
import { DashboardCard } from "@/types/card";

export default function SalesOverview() {
  const cards: DashboardCard[] = [
    {
      icon: <HiOutlineSquare3Stack3D />,
      title: "Today Orders",
      value: "$897.40",
      className: "bg-teal-600",
    },
    {
      icon: <HiOutlineSquare3Stack3D />,
      title: "Yesterday Orders",
      value: "$679.93",
      className: "bg-orange-400",
    },
    {
      icon: <HiOutlineRefresh />,
      title: "This Month",
      value: "$13146.96",
      className: "bg-blue-500",
    },
    {
      icon: <HiCalendarDays />,
      title: "Last Month",
      value: "$31964.92",
      className: "bg-cyan-600",
    },
    {
      icon: <HiCalendarDays />,
      title: "All-Time Sales",
      value: "$626513.05",
      className: "bg-emerald-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-2">
      {cards.map((card, index) => (
        <div
          key={`sales-overview-${index}`}
          className={cn(
            "p-6 rounded-lg flex flex-col items-center justify-center space-y-3 text-white text-center",
            card.className
          )}
        >
          <div className="[&>svg]:size-8">{card.icon}</div>

          <Typography className="text-base">{card.title}</Typography>

          <Typography className="text-2xl font-semibold">
            {card.value}
          </Typography>
        </div>
      ))}
    </div>
  );
}

import {
  HiOutlineShoppingCart,
  HiOutlineRefresh,
  HiOutlineCheck,
} from "react-icons/hi";
import { HiOutlineSquare3Stack3D, HiCalendarDays } from "react-icons/hi2";
import { BsTruck } from "react-icons/bs";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/shared/PageTitle";
import Typography from "@/components/ui/typography";

type Card1 = {
  icon: React.ReactNode;
  title: string;
  value: string;
  details?: string;
  className: string;
};

type Card2 = {
  icon: React.ReactNode;
  title: string;
  value: string;
  iconClassName: string;
};

export default function DashboardOverview() {
  const cards: Card1[] = [
    {
      icon: <HiOutlineSquare3Stack3D />,
      title: "Today Orders",
      value: "$897.40",
      details: "Cash : $897.40 Card : $0.00 Credit : $0.00",
      className: "bg-teal-600",
    },
    {
      icon: <HiOutlineSquare3Stack3D />,
      title: "Yesterday Orders",
      value: "$679.93",
      details: "Cash : $679.93 Card : $0.00 Credit : $0.00",
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

  const cards2: Card2[] = [
    {
      icon: <HiOutlineShoppingCart />,
      title: "Total Orders",
      value: "815",
      iconClassName:
        "text-orange-600 dark:text-orange-100 bg-orange-100 dark:bg-orange-500",
    },
    {
      icon: <HiOutlineRefresh />,
      title: "Orders Pending",
      value: "263",
      iconClassName:
        "text-teal-600 dark:text-teal-100 bg-teal-100 dark:bg-teal-500",
    },
    {
      icon: <BsTruck />,
      title: "Orders Processing",
      value: "97",
      iconClassName:
        "text-blue-600 dark:text-blue-100 bg-blue-100 dark:bg-blue-500",
    },
    {
      icon: <HiOutlineCheck />,
      title: "Orders Delivered",
      value: "418",
      iconClassName:
        "text-emerald-600 dark:text-emerald-100 bg-emerald-100 dark:bg-emerald-500",
    },
  ];

  return (
    <section>
      <PageTitle>Dashboard Overview</PageTitle>

      <div className="space-y-8 mb-8">
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-2">
          {cards.map((card, index) => (
            <div
              key={`card-1-${index}`}
              className={cn(
                "p-6 rounded-lg flex flex-col items-center space-y-3 text-white",
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

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {cards2.map((card) => (
            <Card key={card.title} className="p-4 shadow-none">
              <CardContent className="flex items-center gap-3 p-0">
                <div
                  className={cn(
                    "size-12 rounded-full grid place-items-center [&>svg]:size-5",
                    card.iconClassName
                  )}
                >
                  {card.icon}
                </div>

                <div className="flex flex-col gap-y-1">
                  <Typography className="text-sm text-muted-foreground">
                    {card.title}
                  </Typography>

                  <Typography className="text-2xl font-semibold text-popover-foreground">
                    {card.value}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 shadow-none">
            <Typography variant="h3" className="mb-4">
              Weekly Sales
            </Typography>

            <CardContent className="p-0"></CardContent>
          </Card>

          <Card className="p-4 shadow-none">
            <Typography variant="h3" className="mb-4">
              Best Selling Products
            </Typography>

            <CardContent className="p-0"></CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

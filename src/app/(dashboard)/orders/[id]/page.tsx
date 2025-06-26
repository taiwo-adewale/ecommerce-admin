import { DownloadCloud, Printer } from "lucide-react";
import { BsFillHandbagFill } from "react-icons/bs";

import PageTitle from "@/components/shared/PageTitle";
import Typography from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { fetchOrder } from "@/data/orders";
import { OrderBadgeVariants } from "@/constants/badge";

type PageParams = {
  params: {
    id: string;
  };
};

export default async function Order({ params: { id } }: PageParams) {
  const order = await fetchOrder({ id });

  return (
    <section>
      <PageTitle>Invoice</PageTitle>

      <Card className="mb-8 text-muted-foreground p-4 lg:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-x-4 gap-y-6">
          <div className="flex flex-col">
            <Typography
              className="uppercase text-card-foreground mb-1.5 md:text-xl tracking-wide"
              variant="h2"
            >
              invoice
            </Typography>

            <div className="flex items-center gap-x-2">
              <Typography className="uppercase font-semibold text-xs">
                status
              </Typography>

              <Badge
                variant={OrderBadgeVariants[order.status]}
                className="flex-shrink-0 text-xs capitalize"
              >
                {order.status}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col text-sm gap-y-0.5 md:text-right">
            <div className="flex items-center md:justify-end gap-x-1">
              <BsFillHandbagFill className="size-6 text-primary mb-1.5 flex-shrink-0" />
              <Typography
                component="span"
                variant="h2"
                className="text-card-foreground"
              >
                Zorvex
              </Typography>
            </div>

            <Typography component="p">
              2 Lawson Avenue, California, United States
            </Typography>
            <Typography component="p">+1 (212) 456-7890</Typography>
            <Typography component="p" className="break-words">
              ecommerceadmin@gmail.com
            </Typography>
            <Typography component="p">
              ecommerce-admin-board.vercel.app
            </Typography>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-10">
          <div>
            <Typography
              variant="p"
              component="h4"
              className="font-semibold uppercase text-card-foreground mb-1"
            >
              date
            </Typography>

            <Typography className="text-sm">Mar 3, 2024</Typography>
          </div>

          <div>
            <Typography
              variant="p"
              component="h4"
              className="font-semibold uppercase text-card-foreground mb-1"
            >
              invoice no
            </Typography>

            <Typography className="text-sm">#29392</Typography>
          </div>

          <div className="md:text-right">
            <Typography
              variant="p"
              component="h4"
              className="font-semibold uppercase text-card-foreground mb-1"
            >
              invoice to
            </Typography>

            <div className="flex flex-col text-sm gap-y-0.5">
              <Typography component="p">Lawson Brendan</Typography>
              <Typography component="p" className="break-words">
                lawsonbrendan23@yahoo.com
              </Typography>
              <Typography component="p">+1 (796) 992-5853</Typography>
              <Typography component="p">Sit butx eos nihil</Typography>
              <Typography component="p">
                Dolor ncidunt eos nihil quo quae amet
              </Typography>
            </div>
          </div>
        </div>

        <div className="border rounded-md overflow-hidden mb-10">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 dark:bg-transparent">
                <TableHead className="uppercase h-10 whitespace-nowrap">
                  SR.
                </TableHead>
                <TableHead className="uppercase h-10 whitespace-nowrap">
                  product title
                </TableHead>
                <TableHead className="uppercase h-10 whitespace-nowrap text-center">
                  quantity
                </TableHead>
                <TableHead className="uppercase h-10 whitespace-nowrap text-center">
                  item price
                </TableHead>
                <TableHead className="uppercase h-10 whitespace-nowrap text-right">
                  amount
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell className="py-3">1</TableCell>
                <TableCell className="font-semibold py-3 px-6 text-card-foreground">
                  Lettuce
                </TableCell>
                <TableCell className="font-semibold py-3 text-center">
                  5
                </TableCell>
                <TableCell className="font-semibold py-3 text-center">
                  $193.26
                </TableCell>
                <TableCell className="font-semibold py-3 text-primary text-right">
                  $996.30
                </TableCell>
              </TableRow>

              <TableRow className="hover:bg-transparent">
                <TableCell className="py-3">2</TableCell>
                <TableCell className="font-semibold py-3 px-6 text-card-foreground">
                  Mustard
                </TableCell>
                <TableCell className="font-semibold py-3 text-center">
                  12
                </TableCell>
                <TableCell className="font-semibold py-3 text-center">
                  $200.00
                </TableCell>
                <TableCell className="font-semibold py-3 text-primary text-right">
                  $2400.00
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="bg-background rounded-lg flex flex-col gap-4 md:justify-between md:flex-row p-6 md:px-8 mb-4">
          <div>
            <Typography
              component="h4"
              className="font-medium text-sm uppercase mb-1 tracking-wide"
            >
              payment method
            </Typography>

            <Typography className="text-base capitalize font-semibold text-card-foreground tracking-wide">
              {order.method}
            </Typography>
          </div>

          <div>
            <Typography
              component="h4"
              className="font-medium text-sm uppercase mb-1 tracking-wide"
            >
              shipping cost
            </Typography>

            <Typography className="text-base capitalize font-semibold text-card-foreground tracking-wide">
              $60.00
            </Typography>
          </div>

          <div>
            <Typography
              component="h4"
              className="font-medium text-sm uppercase mb-1 tracking-wide"
            >
              discount
            </Typography>

            <Typography className="text-base capitalize font-semibold text-card-foreground tracking-wide">
              $0.00
            </Typography>
          </div>

          <div>
            <Typography
              component="h4"
              className="font-medium text-sm uppercase mb-1 tracking-wide"
            >
              total amount
            </Typography>

            <Typography className="text-xl capitalize font-semibold tracking-wide text-primary">
              $1056.30
            </Typography>
          </div>
        </div>
      </Card>

      <div className="flex flex-wrap gap-3 justify-between">
        <Button size="lg">
          Download Invoice <DownloadCloud className="ml-2 size-4" />
        </Button>

        <Button size="lg">
          Print Invoice <Printer className="ml-2 size-4" />
        </Button>
      </div>
    </section>
  );
}

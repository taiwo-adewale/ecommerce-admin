import PageTitle from "@/components/shared/PageTitle";
import AllOrders from "./orders-table";

import { DownloadCloud } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import DatePicker from "./DatePicker";
import { ORDER_STATUSES, ORDER_METHODS } from "@/constants/orders";

export default async function Orders() {
  return (
    <section>
      <PageTitle>Orders</PageTitle>

      <Card className="mb-5">
        <form className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4 lg:gap-6">
            <Input
              type="search"
              placeholder="Search by customer name"
              className="h-12 md:basis-1/5"
            />

            <Select>
              <SelectTrigger className="capitalize md:basis-1/5">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                {ORDER_STATUSES.map((status) => (
                  <SelectItem
                    value={status}
                    key={status}
                    className="capitalize"
                  >
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="md:basis-1/5">
                <SelectValue placeholder="Limit" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="5">Last 5 days</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="14">Last 14 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="capitalize md:basis-1/5">
                <SelectValue placeholder="Method" />
              </SelectTrigger>

              <SelectContent>
                {ORDER_METHODS.map((method) => (
                  <SelectItem
                    value={method}
                    key={method}
                    className="capitalize"
                  >
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button className="h-12 flex-shrink-0 md:basis-1/5">
              Download <DownloadCloud className="ml-2 size-4" />
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-4 lg:gap-6">
            <div className="md:basis-[35%]">
              <Label className="text-muted-foreground font-normal">
                Start date
              </Label>
              <DatePicker />
            </div>

            <div className="md:basis-[35%]">
              <Label className="text-muted-foreground font-normal">
                End date
              </Label>
              <DatePicker />
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-4 md:basis-[30%]">
              <Button size="lg" className="h-12 flex-grow">
                Filter
              </Button>
              <Button size="lg" variant="secondary" className="h-12 flex-grow">
                Reset
              </Button>
            </div>
          </div>
        </form>
      </Card>

      <AllOrders perPage={20} />
    </section>
  );
}

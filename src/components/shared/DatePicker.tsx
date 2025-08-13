"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  className?: string;
  date: string | undefined;
  setDate: (date: string) => void;
  container?: HTMLDivElement;
};

export function DatePicker({ className, date, setDate, container }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-12 justify-between text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          {date ? format(date, "PPP") : <span>Pick a date</span>}

          <CalendarIcon className="ml-2 size-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent portalContainer={container} className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : new Date()}
          onSelect={(date) => {
            if (date) {
              setDate(new Date(date).toISOString());
              setOpen(false);
            }
          }}
          disabled={{
            before: new Date("2023-01-01"),
            after: new Date(),
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

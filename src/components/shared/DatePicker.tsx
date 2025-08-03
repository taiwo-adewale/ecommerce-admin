"use client";

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
};

export default function DatePicker({ className, date, setDate }: Props) {
  return (
    <Popover>
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

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={(date) => {
            if (date) setDate(new Date(date).toISOString());
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("2023-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

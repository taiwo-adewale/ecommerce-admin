"use client";

import { forwardRef, useState, useEffect } from "react";
import { format, isValid } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  date: Date;
  container?: HTMLDivElement;
  onValueChange: (date: string) => void;
};

export const DatetimePicker = forwardRef(function DatetimePickerRender(
  { date, container, onValueChange }: Props,
  ref
) {
  const [open, setOpen] = useState(false);
  const [datetime, setDatetime] = useState<Date>(date);

  useEffect(() => {
    if (isValid(datetime)) {
      onValueChange(datetime.toISOString());
    }
  }, [datetime, onValueChange]);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const updatedDatetime = new Date(datetime);
      updatedDatetime.setFullYear(newDate.getFullYear());
      updatedDatetime.setMonth(newDate.getMonth());
      updatedDatetime.setDate(newDate.getDate());
      setDatetime(updatedDatetime);
      setOpen(false);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = e.target.value;
    const [hours, minutes] = timeValue
      .split(":")
      .map((str) => parseInt(str, 10));

    if (!isNaN(hours) && !isNaN(minutes)) {
      const updatedDatetime = new Date(datetime);
      updatedDatetime.setHours(hours);
      updatedDatetime.setMinutes(minutes);
      updatedDatetime.setSeconds(0);
      setDatetime(updatedDatetime);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex gap-2 w-full sm:w-2/3">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full h-12 justify-between text-left font-normal",
                !datetime && "text-muted-foreground"
              )}
            >
              {isValid(datetime) ? (
                format(datetime, "PPP")
              ) : (
                <span>Pick a date</span>
              )}

              <CalendarIcon className="ml-2 size-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-full overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
            portalContainer={container}
          >
            <Calendar
              mode="single"
              selected={datetime}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
              disabled={{
                before: new Date(),
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="w-full sm:w-1/3 relative">
        <Input
          type="time"
          step="60"
          value={isValid(datetime) ? format(datetime, "HH:mm") : "12:00"}
          onChange={handleTimeChange}
          className="bg-background h-12 pr-10 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />

        <Clock className="ml-2 size-4 absolute top-4 right-4" />
      </div>
    </div>
  );
});

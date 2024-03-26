import { Bell } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import NotificationsBadge from "./NotificationsBadge";
import NotificationContent from "./NotificationContent";

export default function Notifications() {
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
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
          <ScrollArea type="auto" className="h-full max-h-[22rem]">
            <NotificationContent />
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <NotificationsBadge />
    </div>
  );
}

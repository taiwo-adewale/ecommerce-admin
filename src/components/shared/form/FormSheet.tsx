import { X } from "lucide-react";

import { SheetClose, SheetHeader, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

type FormSheetContentProps = {
  children: React.ReactNode;
};

export const FormSheetContent = ({ children }: FormSheetContentProps) => (
  <div className="flex flex-col size-full bg-background">{children}</div>
);

type FormSheetBodyProps = {
  children: React.ReactNode;
};

export const FormSheetBody = ({ children }: FormSheetBodyProps) => (
  <div className="flex-grow overflow-y-auto p-6 sm:p-10">{children}</div>
);

type FormSheetHeaderProps = {
  children: React.ReactNode;
};

export const FormSheetHeader = ({ children }: FormSheetHeaderProps) => (
  <SheetHeader className="flex-shrink-0 flex-row gap-4 justify-between text-left bg-popover p-6 border-b">
    {children}

    <SheetClose asChild>
      <Button
        variant="ghost"
        size="icon"
        className="text-foreground flex-shrink-0"
      >
        <X className="size-6" />
      </Button>
    </SheetClose>
  </SheetHeader>
);

type FormSheetFooterProps = {
  children: React.ReactNode;
};

export const FormSheetFooter = ({ children }: FormSheetFooterProps) => (
  <SheetFooter className="flex-shrink-0 bg-popover border-t sm:flex-row-reverse">
    {children}

    <SheetClose asChild>
      <Button
        variant="secondary"
        size="lg"
        className="w-full hidden sm:inline-flex"
      >
        Cancel
      </Button>
    </SheetClose>
  </SheetFooter>
);

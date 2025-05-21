import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetHeader,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";

export default function EditProduct() {
  return (
    <>
      <SheetHeader className="flex-row gap-4 justify-between text-left bg-background p-6">
        <div className="flex flex-col">
          <SheetTitle>Add Product</SheetTitle>
          <SheetDescription>
            Add your product and necessary information from here
          </SheetDescription>
        </div>

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

      <div className="flex-grow grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right">
            Name
          </label>
          <input id="name" value="Pedro Duarte" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="username" className="text-right">
            Username
          </label>
          <input id="username" value="@peduarte" className="col-span-3" />
        </div>
      </div>

      <SheetFooter>
        <SheetClose asChild>
          <Button variant="secondary" size="lg" className="w-full">
            Cancel
          </Button>
        </SheetClose>

        <Button size="lg" className="w-full">
          Add Product
        </Button>
      </SheetFooter>
    </>
  );
}

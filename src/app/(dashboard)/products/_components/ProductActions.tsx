"use client";

import { useState } from "react";
import { Upload, Download, PenSquare, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import AddProduct from "./forms/AddProduct";

export default function ProductActions() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <Card className="mb-5">
      <div className="flex flex-col xl:flex-row xl:justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          <Button variant="outline">
            <Upload className="mr-2 size-4" /> Export
          </Button>

          <Button variant="outline">
            <Download className="mr-2 size-4" /> Import
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="secondary"
            size="lg"
            className="sm:flex-grow xl:flex-grow-0"
          >
            <PenSquare className="mr-2 size-4" /> Bulk Action
          </Button>

          <Button
            variant="destructive"
            size="lg"
            className="sm:flex-grow xl:flex-grow-0"
          >
            <Trash2 className="mr-2 size-4" /> Delete
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="sm:flex-grow xl:flex-grow-0"
              >
                <Plus className="mr-2 size-4" /> Add Product
              </Button>
            </SheetTrigger>

            <SheetContent className="w-[90%] max-w-5xl">
              <AddProduct handleSheetClose={handleSheetClose} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </Card>
  );
}

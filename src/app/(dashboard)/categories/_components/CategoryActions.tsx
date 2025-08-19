"use client";

import { PenSquare, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SheetTrigger } from "@/components/ui/sheet";
import { ExportDataButtons } from "@/components/shared/ExportDataButtons";

import { addCategory } from "@/actions/categories/addCategory";
import CategoryFormSheet from "./form/CategoryFormSheet";

export default function CategoryActions() {
  return (
    <Card className="mb-5">
      <form className="flex flex-col xl:flex-row xl:justify-between gap-4">
        <ExportDataButtons tableName="categories" fileName="Categories" />

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

          <CategoryFormSheet
            title="Add Category"
            description="Add product category and necessary information here"
            submitButtonText="Add Category"
            actionVerb="added"
            action={addCategory}
          >
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="sm:flex-grow xl:flex-grow-0"
              >
                <Plus className="mr-2 size-4" /> Add Category
              </Button>
            </SheetTrigger>
          </CategoryFormSheet>
        </div>
      </form>
    </Card>
  );
}

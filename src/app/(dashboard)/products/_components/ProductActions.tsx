"use client";

import { PenSquare, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SheetTrigger } from "@/components/ui/sheet";
import { ExportDataButtons } from "@/components/shared/ExportDataButtons";

import { addProduct } from "@/actions/products/addProduct";
import ProductFormSheet from "./form/ProductFormSheet";

export default function ProductActions() {
  return (
    <Card className="mb-5">
      <div className="flex flex-col xl:flex-row xl:justify-between gap-4">
        <ExportDataButtons tableName="products" fileName="Products" />

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

          <ProductFormSheet
            title="Add Product"
            description="Add necessary product information here"
            submitButtonText="Add Product"
            actionVerb="added"
            action={addProduct}
          >
            <SheetTrigger asChild>
              <Button
                variant="default"
                size="lg"
                className="sm:flex-grow xl:flex-grow-0"
              >
                <Plus className="mr-2 size-4" /> Add Product
              </Button>
            </SheetTrigger>
          </ProductFormSheet>
        </div>
      </div>
    </Card>
  );
}

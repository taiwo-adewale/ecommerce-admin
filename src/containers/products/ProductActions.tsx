import { Upload, Download, PenSquare, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ProductActions() {
  return (
    <Card className="mb-5">
      <form className="flex flex-col xl:flex-row xl:justify-between gap-4">
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

          <Button
            variant="default"
            size="lg"
            className="sm:flex-grow xl:flex-grow-0"
          >
            <Plus className="mr-2 size-4" /> Add Product
          </Button>
        </div>
      </form>
    </Card>
  );
}

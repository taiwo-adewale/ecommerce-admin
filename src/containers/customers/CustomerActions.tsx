import { Upload, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CustomerActions() {
  return (
    <Card className="mb-5">
      <div className="flex flex-wrap gap-3">
        <Button variant="outline">
          <Upload className="mr-2 size-4" /> Export
        </Button>

        <Button variant="outline">
          <Download className="mr-2 size-4" /> Import
        </Button>
      </div>
    </Card>
  );
}

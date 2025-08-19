import { Card } from "@/components/ui/card";
import { ExportDataButtons } from "@/components/shared/ExportDataButtons";

export default function CustomerActions() {
  return (
    <Card className="mb-5">
      <ExportDataButtons tableName="customers" fileName="Customers" />
    </Card>
  );
}

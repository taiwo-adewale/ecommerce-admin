import { Card } from "@/components/ui/card";
import { exportCustomers } from "@/actions/customers/exportCustomers";
import { ExportDataButtons } from "@/components/shared/ExportDataButtons";

export default function CustomerActions() {
  return (
    <Card className="mb-5">
      <ExportDataButtons action={exportCustomers} tableName="customers" />
    </Card>
  );
}

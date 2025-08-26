"use client";

import { PenSquare, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SheetTrigger } from "@/components/ui/sheet";
import { ActionAlertDialog } from "@/components/shared/ActionAlertDialog";
import { ExportDataButtons } from "@/components/shared/ExportDataButtons";

import CouponFormSheet from "./form/CouponFormSheet";
import CouponBulkActionSheet from "./form/CouponBulkActionSheet";
import { addCoupon } from "@/actions/coupons/addCoupon";
import { deleteCoupons } from "@/actions/coupons/deleteCoupons";
import { exportCoupons } from "@/actions/coupons/exportCoupons";
import { RowSelectionProps } from "@/types/data-table";
import { editCategories } from "@/actions/categories/editCategories";
import { useAuthorization } from "@/hooks/use-authorization";

export default function CouponActions({
  rowSelection,
  setRowSelection,
}: RowSelectionProps) {
  const { hasPermission } = useAuthorization();

  return (
    <Card className="mb-5">
      <form className="flex flex-col xl:flex-row xl:justify-between gap-4">
        <ExportDataButtons action={exportCoupons} tableName="coupons" />

        {(hasPermission("coupons", "canEdit") ||
          hasPermission("coupons", "canDelete") ||
          hasPermission("coupons", "canCreate")) && (
          <div className="flex flex-col sm:flex-row gap-4">
            {hasPermission("coupons", "canEdit") && (
              <CouponBulkActionSheet
                action={(formData) =>
                  editCategories(Object.keys(rowSelection), formData)
                }
                onSuccess={() => setRowSelection({})}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="secondary"
                    size="lg"
                    type="button"
                    disabled={!Boolean(Object.keys(rowSelection).length)}
                    className="sm:flex-grow xl:flex-grow-0 transition-opacity duration-300"
                  >
                    <PenSquare className="mr-2 size-4" /> Bulk Action
                  </Button>
                </SheetTrigger>
              </CouponBulkActionSheet>
            )}

            {hasPermission("coupons", "canDelete") && (
              <ActionAlertDialog
                title={`Delete ${Object.keys(rowSelection).length} coupons?`}
                description="This action cannot be undone. This will permanently delete the coupons and their associated data from the database."
                actionButtonText="Delete Coupons"
                toastSuccessMessage="Coupons deleted successfully"
                queryKey="coupons"
                action={() => deleteCoupons(Object.keys(rowSelection))}
                onSuccess={() => setRowSelection({})}
              >
                <Button
                  variant="destructive"
                  size="lg"
                  type="button"
                  disabled={!Boolean(Object.keys(rowSelection).length)}
                  className="sm:flex-grow xl:flex-grow-0 transition-opacity duration-300"
                >
                  <Trash2 className="mr-2 size-4" />
                  Delete
                </Button>
              </ActionAlertDialog>
            )}

            {hasPermission("coupons", "canCreate") && (
              <CouponFormSheet
                title="Add Coupon"
                description="Add necessary coupon information here"
                submitButtonText="Add Coupon"
                actionVerb="added"
                action={addCoupon}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="default"
                    size="lg"
                    className="sm:flex-grow xl:flex-grow-0"
                  >
                    <Plus className="mr-2 size-4" /> Add Coupon
                  </Button>
                </SheetTrigger>
              </CouponFormSheet>
            )}
          </div>
        )}
      </form>
    </Card>
  );
}

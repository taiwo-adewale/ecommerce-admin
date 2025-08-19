"use client";

import { PenSquare, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SheetTrigger } from "@/components/ui/sheet";
import { ExportDataButtons } from "@/components/shared/ExportDataButtons";

import CouponFormSheet from "./form/CouponFormSheet";
import { addCoupon } from "@/actions/coupons/addCoupon";
import { exportCoupons } from "@/actions/coupons/exportCoupons";

export default function CouponActions() {
  return (
    <Card className="mb-5">
      <form className="flex flex-col xl:flex-row xl:justify-between gap-4">
        <ExportDataButtons action={exportCoupons} tableName="coupons" />

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
        </div>
      </form>
    </Card>
  );
}

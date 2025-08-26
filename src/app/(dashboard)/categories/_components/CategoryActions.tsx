"use client";

import { PenSquare, Trash2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SheetTrigger } from "@/components/ui/sheet";
import { ActionAlertDialog } from "@/components/shared/ActionAlertDialog";
import { ExportDataButtons } from "@/components/shared/ExportDataButtons";

import CategoryFormSheet from "./form/CategoryFormSheet";
import CategoryBulkActionSheet from "./form/CategoryBulkActionSheet";
import { addCategory } from "@/actions/categories/addCategory";
import { deleteCategories } from "@/actions/categories/deleteCategories";
import { exportCategories } from "@/actions/categories/exportCategories";
import { editCategories } from "@/actions/categories/editCategories";
import { RowSelectionProps } from "@/types/data-table";
import { useAuthorization } from "@/hooks/use-authorization";

export default function CategoryActions({
  rowSelection,
  setRowSelection,
}: RowSelectionProps) {
  const { hasPermission } = useAuthorization();

  return (
    <Card className="mb-5">
      <form className="flex flex-col xl:flex-row xl:justify-between gap-4">
        <ExportDataButtons action={exportCategories} tableName="categories" />

        {(hasPermission("categories", "canEdit") ||
          hasPermission("categories", "canDelete") ||
          hasPermission("categories", "canCreate")) && (
          <div className="flex flex-col sm:flex-row gap-4">
            {hasPermission("categories", "canEdit") && (
              <CategoryBulkActionSheet
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
              </CategoryBulkActionSheet>
            )}

            {hasPermission("categories", "canDelete") && (
              <ActionAlertDialog
                title={`Delete ${Object.keys(rowSelection).length} categories?`}
                description="This action cannot be undone. This will permanently delete the categories and their associated data from the database."
                actionButtonText="Delete Categories"
                toastSuccessMessage="Categories deleted successfully"
                queryKey="categories"
                action={() => deleteCategories(Object.keys(rowSelection))}
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

            {hasPermission("categories", "canCreate") && (
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
            )}
          </div>
        )}
      </form>
    </Card>
  );
}

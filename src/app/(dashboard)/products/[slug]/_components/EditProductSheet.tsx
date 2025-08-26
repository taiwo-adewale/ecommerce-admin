"use client";

import { SheetTrigger } from "@/components/ui/sheet";
import { editProduct } from "@/actions/products/editProduct";
import { ProductDetails } from "@/services/products/types";
import ProductFormSheet from "../../_components/form/ProductFormSheet";

import { useAuthorization } from "@/hooks/use-authorization";

type Props = {
  product: ProductDetails;
  children: React.ReactNode;
};

export async function EditProductSheet({ product, children }: Props) {
  const { hasPermission } = useAuthorization();

  if (!hasPermission("products", "canEdit")) return null;

  return (
    <ProductFormSheet
      title="Update Products"
      description="Update necessary product information here"
      submitButtonText="Update Product"
      actionVerb="updated"
      initialData={{
        name: product.name,
        description: product.description ?? "",
        image: product.image_url,
        sku: product.sku,
        category: product.category_id,
        costPrice: product.cost_price,
        salesPrice: product.selling_price,
        stock: product.stock,
        minStockThreshold: product.min_stock_threshold,
        slug: product.slug,
      }}
      action={(formData) => editProduct(product.id, formData)}
      previewImage={product.image_url}
    >
      <SheetTrigger asChild>{children}</SheetTrigger>
    </ProductFormSheet>
  );
}

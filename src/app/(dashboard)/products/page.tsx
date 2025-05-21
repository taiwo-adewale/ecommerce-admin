import { Metadata } from "next";

import PageTitle from "@/components/shared/PageTitle";
import AllProducts from "./_components/products-table";
import ProductActions from "./_components/ProductActions";
import ProductFilters from "./_components/ProductFilters";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  return (
    <section>
      <PageTitle>Products</PageTitle>

      <ProductActions />
      <ProductFilters />
      <AllProducts />
    </section>
  );
}

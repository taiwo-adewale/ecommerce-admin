import { Metadata } from "next";

import PageTitle from "@/components/shared/PageTitle";
import Products from "./_components";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  return (
    <section>
      <PageTitle>Products</PageTitle>

      <Products />
    </section>
  );
}

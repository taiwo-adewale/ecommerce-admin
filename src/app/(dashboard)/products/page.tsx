import { Metadata } from "next";

import Products from "@/containers/products";

export const metadata: Metadata = {
  title: "Products",
};

export default async function ProductsPage() {
  return <Products />;
}

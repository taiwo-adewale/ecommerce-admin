import { Metadata } from "next";

import Categories from "@/containers/categories";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  return <Categories />;
}

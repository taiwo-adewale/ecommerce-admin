import { Metadata } from "next";

import PageTitle from "@/components/shared/PageTitle";
import Categories from "./_components";

export const metadata: Metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  return (
    <section>
      <PageTitle>Categories</PageTitle>

      <Categories />
    </section>
  );
}

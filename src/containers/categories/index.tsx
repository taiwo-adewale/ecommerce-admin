import PageTitle from "@/components/shared/PageTitle";
import CategoryActions from "./CategoryActions";
import CategoryFilters from "./CategoryFilters";
import AllCategories from "./categories-table";

export default function Categories() {
  return (
    <section>
      <PageTitle>Categories</PageTitle>

      <CategoryActions />
      <CategoryFilters />
      <AllCategories />
    </section>
  );
}

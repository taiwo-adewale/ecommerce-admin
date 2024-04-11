import PageTitle from "@/components/shared/PageTitle";
import AllProducts from "./products-table";
import ProductActions from "./ProductActions";
import ProductFilters from "./ProductFilters";

export default function Products() {
  return (
    <section>
      <PageTitle>Products</PageTitle>

      <ProductActions />
      <ProductFilters />
      <AllProducts />
    </section>
  );
}

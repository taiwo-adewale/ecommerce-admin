import PageTitle from "@/components/shared/PageTitle";
import CustomerActions from "./CustomerActions";
import CustomerFilters from "./CustomerFilters";
import AllCustomers from "./customers-table";

export default async function Customers() {
  return (
    <section>
      <PageTitle>Customers</PageTitle>

      <CustomerActions />
      <CustomerFilters />
      <AllCustomers />
    </section>
  );
}

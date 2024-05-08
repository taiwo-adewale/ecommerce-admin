import PageTitle from "@/components/shared/PageTitle";
import StaffFilters from "./StaffFilters";
import StaffTable from "./staff-table";

export default function AllStaff() {
  return (
    <section>
      <PageTitle>All Staff</PageTitle>

      <StaffFilters />
      <StaffTable />
    </section>
  );
}

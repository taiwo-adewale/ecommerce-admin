import { Metadata } from "next";

import PageTitle from "@/components/shared/PageTitle";
import StaffTable from "./_components/staff-table";
import StaffFilters from "./_components/StaffFilters";

export const metadata: Metadata = {
  title: "Staff",
};

export default async function StaffPage() {
  return (
    <section>
      <PageTitle>All Staff</PageTitle>

      <StaffFilters />
      <StaffTable />
    </section>
  );
}

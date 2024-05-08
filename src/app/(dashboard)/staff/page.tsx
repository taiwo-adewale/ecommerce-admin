import { Metadata } from "next";

import AllStaff from "@/containers/staff";

export const metadata: Metadata = {
  title: "Staff",
};

export default async function StaffPage() {
  return <AllStaff />;
}

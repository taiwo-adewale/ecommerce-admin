import { Metadata } from "next";

import Customers from "@/containers/customers";

export const metadata: Metadata = {
  title: "Customers",
};

export default async function CustomersPage() {
  return <Customers />;
}

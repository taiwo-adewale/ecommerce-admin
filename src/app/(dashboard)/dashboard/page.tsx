import { Metadata } from "next";

import Dashboard from "@/containers/dashboard";

export const metadata: Metadata = {
  title: "Ecommerce admin dashboard",
};

export default async function DashboardPage() {
  return <Dashboard />;
}

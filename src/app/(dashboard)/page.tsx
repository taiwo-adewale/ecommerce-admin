import { Metadata } from "next";

import Dashboard from "@/containers/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return <Dashboard />;
}

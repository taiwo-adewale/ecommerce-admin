import DashboardOverview from "@/containers/dashboard/Overview";
import RecentOrders from "@/containers/dashboard/RecentOrders";

export default async function Dashboard() {
  return (
    <>
      <DashboardOverview />
      <RecentOrders />
    </>
  );
}

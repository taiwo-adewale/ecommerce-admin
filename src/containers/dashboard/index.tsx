import PageTitle from "@/components/shared/PageTitle";
import SalesOverview from "./SalesOverview";
import StatusOverview from "./StatusOverview";
import DashboardCharts from "./dashboard-charts";
import RecentOrders from "@/containers/orders/orders-table";

export default function Dashboard() {
  return (
    <>
      <section>
        <PageTitle>Dashboard Overview</PageTitle>

        <div className="space-y-8 mb-8">
          <SalesOverview />
          <StatusOverview />
          <DashboardCharts />
        </div>
      </section>

      <section>
        <PageTitle component="h2">Recent Orders</PageTitle>

        <RecentOrders />
      </section>
    </>
  );
}

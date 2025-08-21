import { Metadata } from "next";
import { notFound } from "next/navigation";
import { IoBagHandle } from "react-icons/io5";

import { Card } from "@/components/ui/card";
import Typography from "@/components/ui/typography";
import PageTitle from "@/components/shared/PageTitle";

import CustomerOrdersTable from "./_components/Table";
import { createServerClient } from "@/lib/supabase/server";
import { fetchCustomerOrders } from "@/services/customers";

type PageParams = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: PageParams): Promise<Metadata> {
  try {
    const { customerOrders } = await fetchCustomerOrders(createServerClient(), {
      id,
    });

    if (customerOrders.length === 0) {
      return { title: "No customer orders" };
    }

    return { title: customerOrders[0].customers.name };
  } catch (e) {
    return { title: "Customer not found" };
  }
}

export default async function CustomerOrders({ params: { id } }: PageParams) {
  try {
    const { customerOrders } = await fetchCustomerOrders(createServerClient(), {
      id,
    });

    return (
      <section>
        <PageTitle>Customer Order List</PageTitle>

        {customerOrders.length === 0 ? (
          <Card className="w-full flex flex-col text-center items-center py-8">
            <IoBagHandle className="text-red-500 size-20 mb-4" />
            <Typography>This customer has no order yet!</Typography>
          </Card>
        ) : (
          <CustomerOrdersTable data={customerOrders} />
        )}
      </section>
    );
  } catch (e) {
    return notFound();
  }
}

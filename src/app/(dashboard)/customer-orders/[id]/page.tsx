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

export async function generateMetadata({ params: { id } }: PageParams) {
  const { customerOrders, error } = await fetchCustomerOrders(
    createServerClient(),
    {
      id,
    }
  );

  if (error) {
    return { title: "Customer not found" } as Metadata;
  }

  if (customerOrders.length === 0) {
    return { title: "No orders" } as Metadata;
  }

  return {
    title: customerOrders[0].customers.name,
  };
}

export default async function CustomerOrders({ params: { id } }: PageParams) {
  const { customerOrders, error } = await fetchCustomerOrders(
    createServerClient(),
    {
      id,
    }
  );

  if (error) {
    return notFound();
  }

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
}

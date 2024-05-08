import { Metadata } from "next";

import Coupons from "@/containers/coupons";

export const metadata: Metadata = {
  title: "Coupons",
};

export default async function CouponsPage() {
  return <Coupons />;
}

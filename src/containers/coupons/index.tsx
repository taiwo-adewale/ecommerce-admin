import PageTitle from "@/components/shared/PageTitle";
import CouponActions from "./CouponActions";
import CouponFilters from "./CouponFilters";
import AllCoupons from "./coupons-table";

export default function Coupons() {
  return (
    <section>
      <PageTitle>Coupons</PageTitle>

      <CouponActions />
      <CouponFilters />
      <AllCoupons />
    </section>
  );
}

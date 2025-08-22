"use client";

import { useState, Fragment } from "react";

import AllCoupons from "./coupons-table";
import CouponActions from "./CouponActions";
import CouponFilters from "./CouponFilters";

export default function Products() {
  const [rowSelection, setRowSelection] = useState({});

  return (
    <Fragment>
      <CouponActions
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <CouponFilters />
      <AllCoupons
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
    </Fragment>
  );
}
